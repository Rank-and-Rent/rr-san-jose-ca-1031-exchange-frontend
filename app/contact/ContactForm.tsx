"use client";

import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRIMARY_STATE_ABBR } from '@/lib/config';
import { servicesData } from '@/data/services';

// Extend window type for Turnstile
declare global {
  interface Window {
    _turnstileLoaded?: boolean;
    _lastTurnstileToken?: string;
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      execute: (widgetId: string, options?: Record<string, unknown>) => Promise<string>;
      reset: (widgetId: string) => void;
    };
  }
}

// Utility to load Turnstile script exactly once
function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window._turnstileLoaded) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );
    if (existing) {
      window._turnstileLoaded = true;
      return resolve();
    }
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => {
      window._turnstileLoaded = true;
      resolve();
    };
    s.onerror = () => {
      console.error("Failed to load Turnstile script");
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.appendChild(s);
  });
}

// Base project types (legacy options)
const baseProjectTypes = [
  'Multifamily Property Identification',
  'Industrial Property Search',
  'Triple Net Retail Properties',
  'Medical Office Buildings',
  'Self Storage Facilities',
  'Hospitality Assets',
  'Land Development Sites',
  'Mixed Use Properties',
  'Exchange Timeline Planning',
  'Qualified Intermediary Coordination',
  'Reverse Exchange Setup',
  'Construction Exchange Oversight',
  'CPA and Attorney Alignment',
  'Other'
];

// Get all service names from servicesData
const allServiceNames = servicesData.map(service => service.name);

// Combine base types with service names, removing duplicates and sorting alphabetically
const getAllProjectTypes = (customType?: string): string[] => {
  const types = new Set([...baseProjectTypes, ...allServiceNames]);
  if (customType && customType.trim()) {
    types.add(customType.trim());
  }
  return Array.from(types).sort();
};

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  timeline: string;
  details: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type ContactFormProps = {
  onSuccess?: () => void;
  showHeading?: boolean;
  className?: string;
  darkMode?: boolean;
};

function ContactFormContent({ onSuccess, showHeading = false, className = '', darkMode = false }: ContactFormProps) {
  const searchParams = useSearchParams();
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    timeline: '',
    details: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileId, setTurnstileId] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Get projectType from URL params to include in dropdown options
  const projectTypeParam = searchParams?.get('projectType');
  
  // Memoize project types list to include any custom type from URL
  const projectTypes = useMemo(() => {
    return getAllProjectTypes(projectTypeParam || undefined);
  }, [projectTypeParam]);

  // Load Turnstile script
  useEffect(() => {
    let cancelled = false;
    const initTimeout = setTimeout(async () => {
      if (cancelled) return;
      if (!siteKey) return;

      try {
        await loadTurnstile();
        if (cancelled) return;

        if (!window.turnstile) {
          console.error("Turnstile API not available");
          return;
        }

        if (!captchaRef.current) {
          console.error("Turnstile ref not mounted");
          return;
        }

        const id: string = window.turnstile.render(captchaRef.current, {
          sitekey: siteKey,
          size: "normal",
          callback: (token: string) => {
            setTurnstileReady(true);
          },
          "error-callback": () => {
            console.warn("Turnstile error");
            setTurnstileReady(false);
          },
          "timeout-callback": () => {
            console.warn("Turnstile timeout");
            setTurnstileReady(false);
          },
        });
        setTurnstileId(id);
        setTurnstileReady(true);
        console.log("Turnstile initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Turnstile:", error);
        setTurnstileReady(false);
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(initTimeout);
    };
  }, [siteKey]);

  useEffect(() => {
    // Prefill form from URL parameters
    const projectTypeParam = searchParams?.get('projectType');
    const locationParam = searchParams?.get('location');

    if (projectTypeParam) {
      setFormData(prev => ({ ...prev, projectType: projectTypeParam }));
    }

    if (locationParam && !projectTypeParam) {
      setFormData(prev => ({
        ...prev,
        projectType: `${locationParam} Property Search`,
        details: `Interested in 1031 exchange opportunities in ${locationParam}, ${PRIMARY_STATE_ABBR}.`
      }));
    }
  }, [searchParams]);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.projectType) newErrors.projectType = 'Project type is required';
    // Timeline and Details are optional per requirements

    return newErrors;
  };

  const handlePhoneChange = (value: string) => {
    // Only allow digits, spaces, parentheses, hyphens, and plus signs
    const cleaned = value.replace(/[^\d\s()\-+]/g, '');
    setFormData(prev => ({ ...prev, phone: cleaned }));
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);

    try {
      // Verify Turnstile is ready
      if (siteKey && (!turnstileReady || !window.turnstile || !turnstileId)) {
        setSubmitError('Please complete the security verification.');
        setIsSubmitting(false);
        return;
      }

      // Get Turnstile token
      let turnstileToken = '';
      if (siteKey && window.turnstile && turnstileId) {
        try {
          // Reset before executing to avoid "already executed" error
          window.turnstile.reset(turnstileId);
          turnstileToken = await new Promise<string>((resolve, reject) => {
            if (!window.turnstile) {
              reject(new Error("Turnstile not available"));
              return;
            }
            window.turnstile.execute(turnstileId, {
              async: true,
              action: "form_submit",
              callback: (t: string) => resolve(t),
              "error-callback": () => reject(new Error("turnstile-error")),
              "timeout-callback": () => reject(new Error("turnstile-timeout")),
            });
          });
        } catch (err) {
          console.error("Turnstile execution error:", err);
          setSubmitError('Security verification failed. Please try again.');
          setIsSubmitting(false);
          if (window.turnstile && turnstileId) {
            window.turnstile.reset(turnstileId);
          }
          return;
        }
      }

      // Prepare phone number (digits only)
      const phoneDigits = formData.phone.replace(/\D/g, '');

      // Submit to API
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: phoneDigits,
          projectType: formData.projectType,
          timeline: formData.timeline,
          details: formData.details,
          'cf-turnstile-response': turnstileToken,
      }),
    });

    if (response.ok) {
        // Reset form
      setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          projectType: '',
          timeline: '',
          details: ''
        });
        // Reset turnstile
        if (window.turnstile && turnstileId) {
          window.turnstile.reset(turnstileId);
        }
        setIsSubmitted(true);
        // Call success callback
        if (onSuccess) {
          onSuccess();
        }
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to submit form' }));
        setSubmitError(errorData.error || 'Failed to submit form. Please try again.');
        // Reset turnstile on error
        if (window.turnstile && turnstileId) {
          window.turnstile.reset(turnstileId);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An error occurred. Please try again or contact us directly.');
      // Reset turnstile on error
      if (window.turnstile && turnstileId) {
        window.turnstile.reset(turnstileId);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-lg text-center">
        <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Thank You!</h2>
        <p className="text-lg text-[#4B5563] mb-8">
          We've received your message and will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {showHeading && (
        <>
          <h1 className="text-3xl font-semibold text-[#0F172A] mb-6">Contact Us</h1>
          <p className="text-[#4B5563] mb-8">
            Tell us about your 1031 exchange needs. We'll help you identify replacement properties and coordinate the exchange process.
          </p>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
              Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-3 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
              required
          />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="company" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
            Company
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-3 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
          />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
              Email *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-3 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
              required
          />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
              Phone *
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-3 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
              required
          />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="projectType" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
            Project Type *
          </label>
          <select
            id="projectType"
            value={formData.projectType}
            onChange={(e) => handleInputChange('projectType', e.target.value)}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-3 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
            required
          >
            <option value="">Select a project type</option>
            {projectTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>}
        </div>

        <div>
          <label htmlFor="timeline" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
            Timeline
          </label>
          <select
            id="timeline"
            value={formData.timeline}
            onChange={(e) => handleInputChange('timeline', e.target.value)}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-3 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
          >
            <option value="">Select timeline</option>
            <option value="Immediate">Immediate</option>
            <option value="45 days">45 days</option>
            <option value="180 days">180 days</option>
            <option value="Planning phase">Planning phase</option>
          </select>
          {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
        </div>

        <div>
          <label htmlFor="details" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
            Details
          </label>
          <textarea
            id="details"
            value={formData.details}
            onChange={(e) => handleInputChange('details', e.target.value)}
            rows={6}
            placeholder="Tell us about your current property, desired replacement property types, budget, and any specific requirements..."
            className="w-full rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-3 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40 resize-vertical"
          />
          {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details}</p>}
        </div>

        {submitError && (
          <div className="border border-red-500/40 bg-red-500/10 p-4 rounded-lg">
            <p className="text-red-500 text-sm">{submitError}</p>
          </div>
        )}

        {/* Turnstile Container */}
        {siteKey && (
          <div className="flex justify-center">
            <div ref={captchaRef} className="min-h-[78px]" />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !!(siteKey && !turnstileReady)}
          className="w-full rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </form>

      <p className={`mt-6 text-xs ${darkMode ? 'text-white/70' : 'text-[#4B5563]'}`}>
        Educational content only. Not tax or legal advice. A California 1031 intermediary will confirm identity before
        collecting additional information.
      </p>
    </div>
  );
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <Suspense fallback={<div className={props.className}>Loading form...</div>}>
      <ContactFormContent {...props} />
    </Suspense>
  );
}
