import { NextRequest, NextResponse } from 'next/server';
import { getConfigFromRedis, setConfigInRedis } from '@/lib/redis';
import { DEFAULT_CONFIG, SiteConfig, ADMIN_PASSWORD_ENV_KEY } from '@/lib/site-config';

// ─── GET /api/config — Read current config ─────────────────
export async function GET() {
  try {
    const remoteConfig = await getConfigFromRedis<Partial<SiteConfig>>();
    // Merge: remote values override defaults, missing keys fall back
    const merged: SiteConfig = { ...DEFAULT_CONFIG, ...remoteConfig };
    return NextResponse.json({ success: true, config: merged });
  } catch (error) {
    console.error('[api/config] GET error:', error);
    return NextResponse.json({ success: true, config: DEFAULT_CONFIG });
  }
}

// ─── POST /api/config — Save new config ────────────────────
export async function POST(request: NextRequest) {
  try {
    // ─── Auth check ──────────────────────────────
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    const adminPassword = process.env[ADMIN_PASSWORD_ENV_KEY];

    if (!adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Admin password not configured on server. Set ADMIN_PASSWORD env var.' },
        { status: 500 }
      );
    }

    if (token !== adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }

    // ─── Validate and save ───────────────────────
    const body = await request.json();
    const newConfig: SiteConfig = { ...DEFAULT_CONFIG, ...body };

    // Basic validation
    if (!newConfig.whatsappNumber || !newConfig.siteUrl) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp number and site URL are required' },
        { status: 400 }
      );
    }

    const saved = await setConfigInRedis(newConfig);

    if (!saved) {
      return NextResponse.json(
        { success: false, error: 'Failed to save config — Redis unavailable' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, config: newConfig });
  } catch (error) {
    console.error('[api/config] POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
