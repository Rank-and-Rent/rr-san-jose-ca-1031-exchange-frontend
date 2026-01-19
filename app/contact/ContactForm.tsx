"use client";

import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { servicesData } from '@/data/services';

declare global {
  interface Window {
    _turnstileLoaded?: boolean;
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      execute: (widgetId: string, options?: Record<string, unknown>) => Promise<string>;
      reset: (widgetId: string) => void;
    };
  }
}

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
    s.onerror = () => reject(new Error("Turnstile script failed to load"));
    document.head.appendChild(s);
  });
}

const serviceOptions = [
  "Forward Exchange",
  "Reverse Exchange",
  "Qualified Intermediary Services",
  "Property Identification",
  "NNN Property Identification",
  "Exchange Consultation",
  "Form 8824 Preparation",
  "Boot Analysis",
];

const timelineOptions = ["Immediate", "45 days", "180 days", "Planning phase"];

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  city: string;
  timeline: string;
  property: string;
  estimatedCloseDate: string;
  message: string;
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
    email: '',
    phone: '',
    company: '',
    projectType: '',
    city: '',
    timeline: '',
    property: '',
    estimatedCloseDate: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileId, setTurnstileId] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Combine service options with services from data
  const allServices = useMemo(() => {
    const dataServices = servicesData.map((s) => s.name);
    const combined = new Set([...serviceOptions, ...dataServices]);
    return Array.from(combined).sort();
  }, []);

  // Prefill from URL params
  useEffect(() => {
    const projectTypeParam = searchParams?.get('projectType');
    if (projectTypeParam) {
      setFormData(prev => ({ ...prev, projectType: projectTypeParam }));
    }
  }, [searchParams]);

  // Load Turnstile
  useEffect(() => {
    let cancelled = false;
    const initTimeout = setTimeout(async () => {
      if (cancelled || !siteKey) return;

      try {
        await loadTurnstile();
        if (cancelled || !window.turnstile || !captchaRef.current) return;

        const id = window.turnstile.render(captchaRef.current, {
          sitekey: siteKey,
          size: "normal",
          callback: () => setTurnstileReady(true),
          "error-callback": () => setTurnstileReady(false),
          "timeout-callback": () => setTurnstileReady(false),
        });
        setTurnstileId(id);
        setTurnstileReady(true);
      } catch {
        setTurnstileReady(false);
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(initTimeout);
    };
  }, [siteKey]);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.projectType) newErrors.projectType = 'Please select a service';
    return newErrors;
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
      if (siteKey && (!turnstileReady || !window.turnstile || !turnstileId)) {
        setSubmitError('Please complete the security verification.');
        setIsSubmitting(false);
        return;
      }

      let turnstileToken = '';
      if (siteKey && window.turnstile && turnstileId) {
        try {
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
        } catch {
          setSubmitError('Security verification failed. Please try again.');
          setIsSubmitting(false);
          if (window.turnstile && turnstileId) window.turnstile.reset(turnstileId);
          return;
        }
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.replace(/\D/g, ''),
          details: formData.message,
          turnstileToken,
        }),
      });

      if (response.ok) {
        setFormData({
          name: '', email: '', phone: '', company: '', projectType: '',
          city: '', timeline: '', property: '', estimatedCloseDate: '', message: ''
        });
        if (window.turnstile && turnstileId) window.turnstile.reset(turnstileId);
        setIsSubmitted(true);
        onSuccess?.();
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to submit form' }));
        setSubmitError(errorData.error || 'Failed to submit form. Please try again.');
        if (window.turnstile && turnstileId) window.turnstile.reset(turnstileId);
      }
    } catch {
      setSubmitError('An error occurred. Please try again or contact us directly.');
      if (window.turnstile && turnstileId) window.turnstile.reset(turnstileId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const inputStyles = darkMode
    ? "w-full border border-white/20 bg-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40"
    : "w-full border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";

  const labelStyles = darkMode ? "block text-sm font-medium mb-2 text-white" : "block text-sm font-medium mb-2 text-navy";
  const hintStyles = darkMode ? "text-xs text-white/50 mt-1" : "text-xs text-gray-500 mt-1";

  if (isSubmitted) {
    return (
      <div className={`border rounded-lg p-8 text-center ${darkMode ? 'border-white/20 bg-white/10' : 'border-gray-200 bg-white'}`}>
        <div className={`w-16 h-16 ${darkMode ? 'bg-lime/20' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
          <svg className={`w-8 h-8 ${darkMode ? 'text-lime' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-navy'} mb-4`}>Thank You!</h2>
        <p className={`${darkMode ? 'text-white/80' : 'text-gray-600'}`}>
          We've received your inquiry. A San Jose exchange specialist will contact you within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {showHeading && (
        <>
          <h1 className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-navy'} mb-6`}>Start Your Exchange Plan</h1>
          <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'} mb-8`}>
            Tell us about your 1031 exchange needs. We'll help you identify replacement properties and coordinate the exchange process.
          </p>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelStyles}>Name <span className="text-blue-500">*</span></label>
          <input type="text" id="name" value={formData.name} onChange={handleChange('name')} 
            placeholder="Primary investor or advisor name" className={inputStyles} required />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelStyles}>Email <span className="text-blue-500">*</span></label>
          <input type="email" id="email" value={formData.email} onChange={handleChange('email')}
            placeholder="We send a confirmation and documentation checklist" className={inputStyles} required />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelStyles}>Phone <span className="text-blue-500">*</span></label>
          <input type="tel" id="phone" value={formData.phone} onChange={handleChange('phone')}
            placeholder="We confirm timelines by phone within one business day" className={inputStyles} required />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className={labelStyles}>Company</label>
          <input type="text" id="company" value={formData.company} onChange={handleChange('company')}
            placeholder="Company or organization name (optional)" className={inputStyles} />
        </div>

        {/* Service */}
        <div>
          <label htmlFor="projectType" className={labelStyles}>Service <span className="text-blue-500">*</span></label>
          <select id="projectType" value={formData.projectType} onChange={handleChange('projectType')} className={inputStyles} required>
            <option value="">Select the service you are interested in</option>
            {allServices.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className={labelStyles}>City</label>
          <input type="text" id="city" value={formData.city} onChange={handleChange('city')}
            placeholder="Primary metro or submarket (optional)" className={inputStyles} />
        </div>

        {/* Timeline */}
        <div>
          <label htmlFor="timeline" className={labelStyles}>Timeline</label>
          <select id="timeline" value={formData.timeline} onChange={handleChange('timeline')} className={inputStyles}>
            <option value="">Select timeline (optional)</option>
            {timelineOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <p className={hintStyles}>When do you plan to start your exchange?</p>
        </div>

        {/* Property Being Sold */}
        <div>
          <label htmlFor="property" className={labelStyles}>Property Being Sold</label>
          <input type="text" id="property" value={formData.property} onChange={handleChange('property')}
            placeholder="Include property type, location, and estimated value (optional)" className={inputStyles} />
        </div>

        {/* Estimated Close Date */}
        <div>
          <label htmlFor="estimatedCloseDate" className={labelStyles}>Estimated Close Date</label>
          <input type="date" id="estimatedCloseDate" value={formData.estimatedCloseDate} onChange={handleChange('estimatedCloseDate')} className={inputStyles} />
          <p className={hintStyles}>Determines your 45 day and 180 day milestones (optional)</p>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelStyles}>Message</label>
          <textarea id="message" value={formData.message} onChange={handleChange('message')} rows={4}
            placeholder="Outline goals, replacement preferences, or coordination needs (optional)" className={inputStyles} />
        </div>

        {submitError && (
          <div className="border border-red-500/40 bg-red-500/10 rounded-lg p-4">
            <p className="text-red-500 text-sm">{submitError}</p>
          </div>
        )}

        {siteKey && (
          <div className="flex justify-center">
            <div ref={captchaRef} className="min-h-[78px]" />
          </div>
        )}

        <button type="submit" disabled={isSubmitting || !!(siteKey && !turnstileReady)}
          className={`w-full rounded-lg px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            darkMode ? 'bg-lime text-navy-dark hover:bg-lime-light' : 'bg-navy text-white hover:bg-navy-light'
          }`}>
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>

      <p className={`mt-6 text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
        Consult your QI, CPA, and legal counsel before executing exchange strategies.
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
