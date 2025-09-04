import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Handle frame button clicks
    const buttonIndex = body.untrustedData?.buttonIndex;
    
    if (buttonIndex === 1) {
      // "Log My Resilience" button clicked
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og" />
            <meta property="fc:frame:button:1" content="Open App" />
            <meta property="fc:frame:button:1:action" content="post" />
            <meta property="fc:frame:button:1:target" content="${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}" />
          </head>
          <body>
            <p>Welcome to Resilience Loop!</p>
          </body>
        </html>`,
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
