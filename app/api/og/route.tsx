import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a0a2e',
          backgroundImage: 'linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%)',
          fontSize: 60,
          fontWeight: 700,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            marginBottom: 20,
            background: 'linear-gradient(to right, #9333ea, #3b82f6)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Resilience Loop
        </div>
        <div
          style={{
            fontSize: 30,
            color: '#c4b5fd',
            maxWidth: 600,
            lineHeight: 1.2,
          }}
        >
          Build lasting emotional resilience, one loop at a time
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
