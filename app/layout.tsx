import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Resilience Loop - Build lasting emotional resilience',
  description: 'Build lasting emotional resilience, one loop at a time.',
  openGraph: {
    title: 'Resilience Loop',
    description: 'Build lasting emotional resilience through daily journaling and gamified tracking',
    images: ['/api/og'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og`,
    'fc:frame:button:1': 'Log My Resilience',
    'fc:frame:button:1:action': 'post',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
