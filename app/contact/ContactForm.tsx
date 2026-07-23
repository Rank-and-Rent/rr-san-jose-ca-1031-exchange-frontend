"use client";

import { useState, useEffect, useRef, Suspense } from 'react';

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

type FormData = {
  name: string;
  phone: string;
  email: string;
  hasCompleted1031: boolean;
  notes: string;
};

const initialFormData: FormData = {
  name: '',
  phone: '',
  email: '',
  hasCompleted1031: false,
  notes: '',
};

type FormErrors = Partial<Record<"name" | "phone" | "email", string>>;

type ContactFormProps = {
  onSuccess?: () => void;
  className?: string;
  darkMode?: boolean;
};

function ContactFormContent({ onSuccess, className = '', darkMode = false }: ContactFormProps) {
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileId, setTurnstileId] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const siteKey = "";

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
          name: formData.name,
          email: formData.email,
          phone: formData.phone.replace(/\D/g, ''),
          hasCompleted1031: formData.hasCompleted1031 ? "Yes" : "No",
          notes: formData.notes,
          turnstileToken,
        }),
      });

      if (response.ok) {
        setFormData(initialFormData);
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

  const handleChange = (field: "name" | "phone" | "email" | "notes") => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (field === "name" || field === "phone" || field === "email") {
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // San Jose design system - clean, minimal
  const inputBase = "w-full border-b bg-transparent py-3 text-sm focus:outline-none transition-colors";
  const labelBase = "block text-xs font-medium uppercase tracking-[0.15em] mb-2";

  const inputStyles = darkMode
    ? `${inputBase} border-white/20 text-white placeholder:text-white/50 focus:border-lime`
    : `${inputBase} border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-900`;

  const labelStyles = darkMode
    ? `${labelBase} text-white/60`
    : `${labelBase} text-gray-400`;

  if (isSubmitted) {
    return (
      <div className={`border p-8 text-center ${darkMode ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'} ${className}`}>
        <div className={`w-16 h-16 ${darkMode ? 'bg-lime/20' : 'bg-gray-100'} flex items-center justify-center mx-auto mb-6`}>
          <svg className={`w-8 h-8 ${darkMode ? 'text-lime' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className={`text-2xl font-light ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Thank You</h2>
        <p className={`${darkMode ? 'text-white/80' : 'text-gray-500'} font-light`}>
          A San Jose exchange specialist will contact you within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-8">
        <p className="text-xs font-light uppercase tracking-[0.3em] text-gray-400 mb-3">Start Your Exchange</p>
        <h2 className={`text-2xl font-light tracking-wide ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Start Your Exchange Plan
        </h2>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Row 1: Name + Phone */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelStyles}>Name <span className="text-gray-900">*</span></label>
            <input type="text" id="name" name="name" autoComplete="name" value={formData.name} onChange={handleChange('name')}
              placeholder="Primary investor or advisor name" className={inputStyles} required/>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="phone" className={labelStyles}>Phone Number <span className="text-gray-900">*</span></label>
            <input type="tel" id="phone" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange('phone')}
              placeholder="We confirm timelines within one business day" className={inputStyles} required/>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelStyles}>Email <span className="text-gray-900">*</span></label>
          <input type="email" id="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange('email')}
            placeholder="We send a confirmation and checklist" className={inputStyles} required/>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Prior 1031 exchange */}
        <div className="flex items-center gap-3">
          <input type="hidden" name="hasCompleted1031" value="No" />
          <input
            id="hasCompleted1031"
            type="checkbox"
            name="hasCompleted1031"
            value="Yes"
            checked={formData.hasCompleted1031}
            onChange={(e) => setFormData(prev => ({ ...prev, hasCompleted1031: e.target.checked }))}
            className="h-4 w-4"
          />
          <label htmlFor="hasCompleted1031" className={`${labelStyles} mb-0`}>Have you completed a 1031 exchange before?</label>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className={labelStyles}>Notes</label>
          <textarea id="notes" name="notes" rows={5} value={formData.notes} onChange={handleChange('notes')} className={`${inputStyles} resize-none`} placeholder="Share any exchange questions or context"></textarea>
        </div>

        {submitError && (
          <div className="border border-red-500/40 bg-red-500/10 p-4">
            <p className="text-red-500 text-sm">{submitError}</p>
          </div>
        )}

        <button type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            darkMode ? 'bg-lime text-gray-900 hover:bg-lime-light' : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <p className={`mt-6 text-xs ${darkMode ? 'text-white/60' : 'text-gray-400'}`}>
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
