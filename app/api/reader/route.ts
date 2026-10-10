import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get('url');

  if (!urlParam) {
    return NextResponse.json({ error: 'URL requerida' }, { status: 400 });
  }

  try {
    let targetUrl = urlParam;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Fenixy/1.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    clearTimeout(timeout);

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html') && !contentType.includes('text/plain')) {
      return NextResponse.json({
        isDirectMedia: true,
        url: targetUrl,
        contentType,
      });
    }

    const html = await response.text();

    // Basic extraction of title and meta description
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : targetUrl;

    return NextResponse.json({
      success: true,
      url: targetUrl,
      title,
      htmlLength: html.length,
      status: response.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || 'Error al conectar con la página',
        url: urlParam,
      },
      { status: 500 }
    );
  }
}
