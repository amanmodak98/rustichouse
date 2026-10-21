'use client';

import React from 'react';
import { Button } from '@/components/surfaces/Button';
import { contactAction, enquiryAction } from '@/lib/actions/reserve';

function Field({
  label,
  name,
  type = 'text',
  textarea,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-body text-xs tracking-[0.18em] text-ink/55 uppercase">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={5}
          className="border-0 border-b border-ink/25 bg-transparent py-3 font-body text-base text-ink outline-none transition-colors focus:border-terracotta"
        />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          required
          className="border-0 border-b border-ink/25 bg-transparent py-3 font-body text-base text-ink outline-none transition-colors focus:border-terracotta"
        />
      )}
    </label>
  );
}

function FieldDark({
  label,
  name,
  type = 'text',
  textarea,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-body text-xs tracking-[0.18em] text-cream/55 uppercase">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={4}
          placeholder="The date, headcount, occasion…"
          className="border-0 border-b border-cream/25 bg-transparent py-3 font-body text-base text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-ember"
        />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          required
          className="border-0 border-b border-cream/25 bg-transparent py-3 font-body text-base text-cream outline-none transition-colors focus:border-ember"
        />
      )}
    </label>
  );
}

/**
 * ClientComponent — form-bound wrapper for any server action so it can be
 * embedded in a server component (which would otherwise fail to serialize the
 * action prop). Pending state is client-side.
 */
function SubmitForm({
  action,
  className,
  children,
  dark,
}: {
  action: (fd: FormData) => Promise<unknown>;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  const [pending, start] = React.useTransition();
  return (
    <form
      action={(fd) => {
        start(async () => {
          await action(fd);
        });
      }}
      className={className}
      data-pending={pending ? 'true' : undefined}
    >
      {children}
    </form>
  );
}

export function ContactForm() {
  return (
    <SubmitForm action={contactAction} className="mt-10 grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" />
        <Field label="Email" name="email" type="email" />
      </div>
      <Field label="Subject" name="subject" />
      <Field label="Message" name="message" textarea />
      <Button type="submit" size="lg">Send message</Button>
    </SubmitForm>
  );
}

export function EnquiryForm() {
  return (
    <SubmitForm action={enquiryAction} className="grid gap-6" dark>
      <FieldDark label="Your name" name="name" />
      <div className="grid gap-6 sm:grid-cols-2">
        <FieldDark label="Email" name="email" type="email" />
        <FieldDark label="Phone" name="phone" type="tel" />
      </div>
      <FieldDark label="Subject" name="subject" defaultValue="Private events enquiry" />
      <FieldDark label="Tell us about the evening" name="message" textarea />
      <Button variant="cream" size="lg" type="submit">Send enquiry</Button>
    </SubmitForm>
  );
}
