// web/web/app/api/scott/route.js
import { NextResponse } from 'next/server';
import { scrapeScott } from '../../scrapers.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // optional, avoids static caching

export async function GET() {
  try {
    const times = await scrapeScott();
    return NextResponse.json(times);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to scrape Scott hours' }, { status: 500 });
  }
}
