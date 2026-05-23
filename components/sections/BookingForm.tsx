'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { cn }            from '@/lib/utils';

// ── Types ────────────────────────────────────────────────────────────────────
type Fields = {
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
  service:   string;
  vehicle:   string;
  message:   string;
};
type Errors  = Partial<Record<keyof Fields, string>>;
type Touched = Partial<Record<keyof Fields, boolean>>;

const INITIAL: Fields = { firstName: '', lastName: '', email: '', phone: '', service: '', vehicle: '', message: '' };

const SERVICE_OPTIONS = [
  { value: 'paint-correction',       label: 'Paint Correction'                     },
  { value: 'ceramic-coating',        label: 'Ceramic Coating'                       },
  { value: 'correction-and-coating', label: 'Paint Correction + Ceramic Coating'    },
  { value: 'protection-plan',        label: '6-Month Protection Plan'               },
  { value: 'unsure',                 label: 'Not sure — please advise me'           },
];

// ── Validation ────────────────────────────────────────────────────────────────
function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.firstName.trim() || f.firstName.length < 2)  e.firstName = 'Please enter your first name.';
  if (!f.lastName.trim()  || f.lastName.length < 2)   e.lastName  = 'Please enter your last name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))   e.email     = 'Please enter a valid email address.';
  if (f.phone.replace(/\D/g, '').length < 8)          e.phone     = 'Please enter a valid phone number.';
  if (!f.service)                                      e.service   = 'Please select a service.';
  if (!f.vehicle.trim() || f.vehicle.length < 3)      e.vehicle   = 'Please enter your vehicle make and model.';
  if (!f.message.trim() || f.message.length < 20)     e.message   = 'Please give us a bit more detail (min. 20 characters).';
  return e;
}

// ── Sub-components ────────────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="mt-1.5 text-[0.75rem] text-red-400 tracking-wide"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const INPUT_BASE = [
  'w-full bg-bg-secondary border border-border',
  'focus:border-accent focus:bg-bg-tertiary',
  'text-fg placeholder-fg-muted/45 px-4 py-3.5 text-sm font-sans',
  'transition-all duration-300 outline-none appearance-none',
].join(' ');

const LABEL_BASE = 'block text-[0.6875rem] tracking-[0.18em] text-fg-muted uppercase mb-2';

// ── Main component ────────────────────────────────────────────────────────────
export default function BookingForm() {
  const [form,       setForm]       = useState<Fields>(INITIAL);
  const [errors,     setErrors]     = useState<Errors>({});
  const [touched,    setTouched]    = useState<Touched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);

  const update = useCallback(
    (field: keyof Fields) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setForm((f) => ({ ...f, [field]: value }));
        // Re-validate the field in real-time after first blur
        if (touched[field]) {
          const errs = validate({ ...form, [field]: value });
          setErrors((prev) => ({ ...prev, [field]: errs[field] }));
        }
      },
    [form, touched],
  );

  const blur = useCallback(
    (field: keyof Fields) => () => {
      setTouched((t) => ({ ...t, [field]: true }));
      const errs = validate(form);
      setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    },
    [form],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true])) as Touched;
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    // ────────────────────────────────────────────────────────────────────────
    // TODO: Replace this stub with real form submission.
    //
    // Option A — Formspree (drop-in, no backend):
    //   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //     method: 'POST', headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(form),
    //   });
    //
    // Option B — Next.js API route:
    //   Create /app/api/booking/route.ts, POST `form` as JSON, send email via
    //   Nodemailer / Resend / SendGrid, return 200.
    //
    // Option C — EmailJS client-side:
    //   await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY');
    // ────────────────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 1600)); // simulated network delay

    setSubmitting(false);
    setSubmitted(true);
  };

  const CONTACT_INFO = [
    { label: 'Response time', value: 'Within 24 hours'           },
    { label: 'Location',      value: 'Sydney, NSW (by appt.)'    },
    { label: 'Availability',  value: `${12 - 8} slots open — May 2026` },
  ];

  return (
    <section
      id="booking"
      className="py-section-sm md:py-section bg-bg-secondary border-t border-border"
      aria-labelledby="booking-heading"
    >
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">

          {/* ── Left — copy ─────────────────────────────── */}
          <div>
            <RevealWrapper>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-accent" aria-hidden />
                <span className="text-accent text-label tracking-[0.25em] uppercase">Reserve Your Slot</span>
              </div>
              <h2
                id="booking-heading"
                className="font-display italic text-display-xl text-fg leading-[0.94] mb-8 text-balance"
              >
                Start the conversation.
              </h2>
            </RevealWrapper>

            <RevealWrapper delay={0.1}>
              <p className="text-fg-muted leading-relaxed mb-5 text-pretty">
                Fill in the form and we'll respond within 24 hours with a personalised
                quote and availability confirmation. No payment required at this stage.
              </p>
              <p className="text-fg-muted leading-relaxed text-pretty">
                If you're unsure which service suits your vehicle, select "Please advise me"
                and we'll assess your paint condition and recommend the right package.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={0.18} className="mt-12 space-y-5">
              {CONTACT_INFO.map(({ label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="w-6 h-px bg-border-light mt-[0.65em] shrink-0" aria-hidden />
                  <div>
                    <p className="text-fg-muted text-[0.6875rem] tracking-[0.18em] uppercase mb-0.5">{label}</p>
                    <p className="text-fg text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </RevealWrapper>
          </div>

          {/* ── Right — form / success ───────────────────── */}
          <RevealWrapper delay={0.14} direction="left">
            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col py-16"
                  role="status"
                  aria-live="polite"
                  aria-atomic
                >
                  {/* Diamond checkmark icon */}
                  <span className="mb-8 w-12 h-12 border border-accent/50 rotate-45 flex items-center justify-center">
                    <svg className="-rotate-45" width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                      <path d="M2 7l4 4 10-10" stroke="#C9A97A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>

                  <h3 className="font-display italic text-display-md text-fg mb-5">
                    Enquiry received.
                  </h3>
                  <p className="text-fg-muted leading-relaxed max-w-sm mb-4">
                    We've received your request and will be in touch within 24 hours with a
                    personalised quote and availability confirmation for your chosen month.
                  </p>
                  <p className="text-fg-muted text-sm leading-relaxed max-w-sm">
                    In the meantime, you're welcome to explore our work on Instagram.
                  </p>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Booking enquiry form"
                >
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className={LABEL_BASE}>
                        First Name <span className="text-accent" aria-hidden>*</span>
                      </label>
                      <input
                        id="firstName" type="text" autoComplete="given-name"
                        value={form.firstName} onChange={update('firstName')} onBlur={blur('firstName')}
                        placeholder="James"
                        aria-required aria-invalid={!!errors.firstName}
                        className={cn(INPUT_BASE, errors.firstName && 'border-red-500/55')}
                      />
                      <FieldError message={errors.firstName} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={LABEL_BASE}>
                        Last Name <span className="text-accent" aria-hidden>*</span>
                      </label>
                      <input
                        id="lastName" type="text" autoComplete="family-name"
                        value={form.lastName} onChange={update('lastName')} onBlur={blur('lastName')}
                        placeholder="Richardson"
                        aria-required aria-invalid={!!errors.lastName}
                        className={cn(INPUT_BASE, errors.lastName && 'border-red-500/55')}
                      />
                      <FieldError message={errors.lastName} />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label htmlFor="email" className={LABEL_BASE}>
                      Email Address <span className="text-accent" aria-hidden>*</span>
                    </label>
                    <input
                      id="email" type="email" autoComplete="email"
                      value={form.email} onChange={update('email')} onBlur={blur('email')}
                      placeholder="james@example.com"
                      aria-required aria-invalid={!!errors.email}
                      className={cn(INPUT_BASE, errors.email && 'border-red-500/55')}
                    />
                    <FieldError message={errors.email} />
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label htmlFor="phone" className={LABEL_BASE}>
                      Phone Number <span className="text-accent" aria-hidden>*</span>
                    </label>
                    <input
                      id="phone" type="tel" autoComplete="tel"
                      value={form.phone} onChange={update('phone')} onBlur={blur('phone')}
                      placeholder="+61 4XX XXX XXX"
                      aria-required aria-invalid={!!errors.phone}
                      className={cn(INPUT_BASE, errors.phone && 'border-red-500/55')}
                    />
                    <FieldError message={errors.phone} />
                  </div>

                  {/* Service */}
                  <div className="mb-4">
                    <label htmlFor="service" className={LABEL_BASE}>
                      Service Required <span className="text-accent" aria-hidden>*</span>
                    </label>
                    <select
                      id="service"
                      value={form.service} onChange={update('service')} onBlur={blur('service')}
                      aria-required aria-invalid={!!errors.service}
                      className={cn(INPUT_BASE, errors.service && 'border-red-500/55')}
                    >
                      <option value="" disabled>Select a service…</option>
                      {SERVICE_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <FieldError message={errors.service} />
                  </div>

                  {/* Vehicle */}
                  <div className="mb-4">
                    <label htmlFor="vehicle" className={LABEL_BASE}>
                      Vehicle Make &amp; Model <span className="text-accent" aria-hidden>*</span>
                    </label>
                    <input
                      id="vehicle" type="text"
                      value={form.vehicle} onChange={update('vehicle')} onBlur={blur('vehicle')}
                      placeholder="e.g. 2021 Porsche 911 Carrera S"
                      aria-required aria-invalid={!!errors.vehicle}
                      className={cn(INPUT_BASE, errors.vehicle && 'border-red-500/55')}
                    />
                    <FieldError message={errors.vehicle} />
                  </div>

                  {/* Message */}
                  <div className="mb-8">
                    <label htmlFor="message" className={LABEL_BASE}>
                      About your vehicle <span className="text-accent" aria-hidden>*</span>
                    </label>
                    <textarea
                      id="message" rows={4}
                      value={form.message} onChange={update('message')} onBlur={blur('message')}
                      placeholder="Paint condition, known defects, what you're hoping to achieve, preferred timeframe…"
                      aria-required aria-invalid={!!errors.message}
                      className={cn(INPUT_BASE, 'resize-none', errors.message && 'border-red-500/55')}
                    />
                    <FieldError message={errors.message} />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-accent text-bg font-medium tracking-wide text-sm hover:bg-accent-light disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <span className="group-hover:translate-x-1.5 transition-transform duration-300" aria-hidden>→</span>
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-fg-muted text-xs text-center tracking-wide">
                    We respond within 24 hours. No spam, ever.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
