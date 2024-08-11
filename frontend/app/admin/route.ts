import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const adminURL = process.env.PAYLOAD_CMS_URL //'http://youtube.com' 

    console.log('req.nextUrl.pathname:', req.nextUrl.pathname)
    const targetUrl = new URL(req.nextUrl.pathname, adminURL); // Adjusted for dynamic paths

    console.log(`Proxying request to: ${targetUrl.toString()}`);

    const fetchOptions: RequestInit = {
      method: req.method,
      headers: req.headers,
      body: req.body ? req.body : undefined,
      redirect: 'manual',
    };

    const proxyResponse = await fetch(targetUrl.toString(), fetchOptions);

    // Handle problematic status codes manually
    if ([304, 204].includes(proxyResponse.status)) {
      return new Response(null, {
        status: proxyResponse.status,
        headers: proxyResponse.headers,
      });
    }

    const responseHeaders = new Headers();
    proxyResponse.headers.forEach((value, key) => {
      responseHeaders.set(key, value);
    });

    const body = await proxyResponse.text(); // or .arrayBuffer() or .json() depending on your needs

    return new NextResponse(body, {
      headers: responseHeaders,
      status: proxyResponse.status,
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new NextResponse('Proxy error', { status: 500 });
  }
}
