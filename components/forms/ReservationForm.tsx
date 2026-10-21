'use client';

import { useState, useTransition } from 'react';
import { reserveAction } from '@/lib/actions/reserve';
import { VENUE } from '@/lib/site';
import { Button } from '@/components/surfaces/Button';

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const TIME_SLOTS = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

const OCCASIONS = ['Dinner', 'Celebration', 'Date', 'Birthday', 'Anniversary', 'Business', 'Friends'];

/**
 * ReservationForm — server action drives submission. If RESEND_API_KEY is set
 * the action emails the request; otherwise it logs server-side. Either way the
 * user is sent to /reserve/thank-you on success. Server-side validation only;
 * the form itself is deliberately simple so the focus stays on the room.
 */
export function ReservationForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={(fd) => {
        setError(null);
        startTransition(async () => {
          const res = await reserveAction(fd);
          if (res && 'error' in res) setError(res.error ?? 'Something went wrong.');
          else window.location.href = '/reserve/thank-you';
        });
      }}
      className="grid gap-6"
    >
      <Field label="Your name" name="name" required placeholder="As you would be greeted" />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          placeholder={VENUE.phoneE164}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        <Field
          label="Date"
          name="date"
          type="date"
          required
          min={todayPlus(0)}
          defaultValue={todayPlus(VENUE.booking.advanceNoticeDays)}
        />
        <FieldSelect label="Guests" name="guests" options={['1', '2', '3', '4', '5', '6', '7', '8']} required />
        <FieldSelect label="Time" name="time" options={TIME_SLOTS} required defaultValue="19:00" />
      </div>
      <FieldSelect label="Occasion" name="occasion" options={OCCASIONS} placeholder="Optional" />
      <FieldTextarea
        label="A note for the kitchen"
        name="notes"
        placeholder="Allergies, dietary needs, who you are celebrating..."
      />

      {error ? (
        <p role="alert" className="rounded-2xl border border-wine/30 bg-wine/5 p-4 text-sm text-wine-deep">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-xs text-ink/50">
          We hold your table for {VENUE.booking.seatingMinutes} minutes. Free up to {VENUE.booking.cancellationHours}h before.
        </p>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? 'Sending…' : 'Request reservation'}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  defaultValue,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  min?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-body text-xs tracking-[0.18em] text-ink/50 uppercase">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        min={min}
        className="w-full border-0 border-b border-ink/25 bg-transparent py-3 font-display text-xl text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-terracotta"
      />
    </label>
  );
}

function FieldSelect({
  label,
  name,
  options,
  required,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-body text-xs tracking-[0.18em] text-ink/50 uppercase">{label}</span>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
        className="w-full border-0 border-b border-ink/25 bg-transparent py-3 font-display text-xl text-ink outline-none transition-colors focus:border-terracotta"
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-body text-xs tracking-[0.18em] text-ink/50 uppercase">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none border-0 border-b border-ink/25 bg-transparent py-3 font-body text-base text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-terracotta"
      />
    </label>
  );
}