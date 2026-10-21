'use server';

import { VENUE } from '@/lib/site';

async function sendViaResend(opts: {
  from: string;
  to: string;
  subject: string;
  text: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(opts),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export interface ReserveActionResult {
  ok?: true;
  error?: string | undefined;
}

export async function reserveAction(
  formData: FormData,
): Promise<ReserveActionResult | undefined> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const date = String(formData.get('date') ?? '').trim();
  const guests = String(formData.get('guests') ?? '').trim();
  const time = String(formData.get('time') ?? '').trim();
  const occasion = String(formData.get('occasion') ?? '').trim();
  const notes = String(formData.get('notes') ?? '').trim();

  if (!name) return { error: 'We need a name for the booking.' };
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return { error: 'Please leave a reachable email.' };
  if (!phone) return { error: 'A contact phone helps us reach you on the day.' };
  if (!date || !time) return { error: 'Pick the date and time you have in mind.' };
  const party = Number(guests);
  if (!Number.isFinite(party) || party < 1)
    return { error: 'Let us know how many guests are coming.' };

  if (party > VENUE.booking.maxPartyOnline) {
    return { error: VENUE.booking.largerPartyNote };
  }

  const summary = {
    name,
    email,
    phone,
    date,
    time,
    guests: party,
    occasion,
    notes,
    submittedAt: new Date().toISOString(),
  } as const;

  const sent = await sendViaResend({
    from: process.env.RESEND_FROM ?? 'Rustic House <onboarding@resend.dev>',
    to: process.env.RESEND_TO ?? VENUE.reservationsEmail,
    subject: `Reservation request — ${name} · ${date} ${time} · ${party} guests`,
    text: Object.entries(summary)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n'),
  });
  if (!sent) console.log('[reserve]', summary);

  return { ok: true };
}

export async function contactAction(
  formData: FormData,
): Promise<ReserveActionResult | undefined> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const subject = String(formData.get('subject') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name) return { error: 'Tell us who is writing.' };
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return { error: 'A reachable email helps us reply.' };
  if (!subject || !message) return { error: 'Leave a short subject and message.' };

  const summary = { name, email, subject, message, submittedAt: new Date().toISOString() };

  const sent = await sendViaResend({
    from: process.env.RESEND_FROM ?? 'Rustic House <onboarding@resend.dev>',
    to: process.env.RESEND_TO ?? VENUE.email,
    subject: `[Contact] ${subject}`,
    text: Object.entries(summary)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n'),
  });
  if (!sent) console.log('[contact]', summary);

  return { ok: true };
}

export async function enquiryAction(
  formData: FormData,
): Promise<ReserveActionResult | undefined> {
  return contactAction(formData);
}
