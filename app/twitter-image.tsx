import { ImageResponse } from 'next/og';
import { VENUE } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'nodejs';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #1b1a17 0%, #2a1e15 70%, #5c1f1a 100%)',
          color: '#fbf5e8',
          fontFamily: 'serif',
        }}
      >
        {/* Decorative warm wash, kept as a single self-closing sibling */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            inset: 0,
            background:
              'radial-gradient(60% 50% at 15% 10%, rgba(199,106,62,0.45), transparent 70%), radial-gradient(50% 40% at 95% 95%, rgba(92,31,26,0.5), transparent 60%)',
          }}
        />

        {/* Top eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 18,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#c76a3e',
          }}
        >
          <div style={{ display: 'flex', width: 16, height: 1, background: '#c76a3e' }} />
          <div style={{ display: 'flex' }}>{`Est. ${VENUE.founded} · ${VENUE.addressLocality}`}</div>
        </div>

        {/* Headline block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 124,
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
              color: '#fbf5e8',
              fontWeight: 400,
            }}
          >
            Rustic House
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 56,
              fontStyle: 'italic',
              color: '#b4523b',
            }}
          >
            {VENUE.tagline}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#f2e8d5',
            opacity: 0.7,
          }}
        >
          <div style={{ display: 'flex' }}>{VENUE.description.slice(0, 48)}…</div>
          <div style={{ display: 'flex', letterSpacing: '0.15em' }}>
            {VENUE.addressLocality.toUpperCase()}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}