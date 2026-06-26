// src/components/ContactFormModal.tsx
"use client";

import React, { useState, useEffect } from 'react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false); 
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY, 
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => onClose(), 2000); 
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-xl p-4" onClick={onClose}>
      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-stone-100">Hello ! Let's Talk</h3>
            <p className="text-xs text-zinc-400 mt-1">Hiring managers, recruiters, and founders! drop your targets below.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="relative z-10 py-12 text-center">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-stone-200 font-bold text-lg">Message sent successfully!</p>
            <p className="text-zinc-500 text-xs mt-1">Looking forward to syncing up.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6 text-left">
            
            {/* Input Field: Full Name / Company */}
            <div className="relative border-b border-zinc-800 focus-within:border-stone-400 transition-colors duration-300 pb-1">
              <div className="flex justify-between items-baseline mb-1">
                <label className="block text-[9px] uppercase font-bold tracking-widest text-zinc-400">Your Identity</label>
                <span className="text-[10px] text-zinc-500 font-medium">Name, Company, or Firm</span>
              </div>
              <input 
                type="text" required placeholder="Sarah Jenkins (Tech Recruiting / Startup Inc.)" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent text-stone-100 text-sm focus:outline-none py-1 placeholder-zinc-700"
              />
            </div>

            {/* Input Field: Work Email */}
            <div className="relative border-b border-zinc-800 focus-within:border-stone-400 transition-colors duration-300 pb-1">
              <div className="flex justify-between items-baseline mb-1">
                <label className="block text-[9px] uppercase font-bold tracking-widest text-zinc-400">Where to Reply</label>
                <span className="text-[10px] text-zinc-500 font-medium">Direct work or personal email</span>
              </div>
              <input 
                type="email" required placeholder="sarah@company.com" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent text-stone-100 text-sm focus:outline-none py-1 placeholder-zinc-700"
              />
            </div>

            {/* Textarea Field: Context Details */}
            <div className="relative border-b border-zinc-800 focus-within:border-stone-400 transition-colors duration-300 pb-1">
              <div className="flex justify-between items-baseline mb-1">
                <label className="block text-[9px] uppercase font-bold tracking-widest text-zinc-400">Your Message</label>
                <span className="text-[10px] text-zinc-500 font-medium">Role requirements, stack details, or project ideas</span>
              </div>
              <textarea 
                rows={4} required 
                placeholder="We are looking for an engineer to own a Next.js build / contract position open / full-time role options..." 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent text-stone-100 text-sm focus:outline-none py-1 resize-none placeholder-zinc-700 leading-relaxed"
              />
            </div>

            {/* Action Trigger Row */}
            <div className="pt-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 text-sm font-semibold rounded-xl bg-white hover:bg-stone-100 text-zinc-950 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? "Routing Transmission..." : "Send Secure Message"}</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}