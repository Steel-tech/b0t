import { NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { oauthStateTable } from '@/lib/schema';
import { logger } from '@/lib/logger';

/**
 * Twitter OAuth 2.0 Authorization Endpoint
 *
 * Generates an OAuth 2.0 authorization URL and redirects the user to Twitter
 * to authorize the application.
 *
 * Flow:
 * 1. Check if user is authenticated
 * 2. Generate OAuth 2.0 authorization link with PKCE
 * 3. Store state and codeVerifier in database
 * 4. Redirect user to Twitter authorization page
 */
export async function GET() {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login first.' },
        { status: 401 }
      );
    }

    // Try to get Twitter OAuth 2.0 app credentials from database first, fallback to env vars
    let clientId = process.env.TWITTER_CLIENT_ID;
    let clientSecret = process.env.TWITTER_CLIENT_SECRET;

    // If not in env, try to get from database (user_credentials table)
    if (!clientId || !clientSecret) {
      try {
        const { getCredentialFields } = await import('@/lib/workflows/credentials');
        const fields = await getCredentialFields(session.user.id, 'twitter_oauth2_app');

        if (fields) {
          clientId = fields.client_id;
          clientSecret = fields.client_secret;
        }
      } catch (error) {
        logger.error(
          {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
          },
          'Failed to fetch Twitter OAuth app credentials from database'
        );
      }
    }

    // Check if credentials are available
    if (!clientId || !clientSecret) {
      logger.error('Twitter OAuth 2.0 app credentials not configured');
      return NextResponse.json(
        { error: 'Twitter OAuth is not configured. Please add Twitter OAuth app credentials (Client ID and Secret) in the credentials page.' },
        { status: 500 }
      );
    }

    // Initialize Twitter API client with OAuth 2.0 credentials
    const client = new TwitterApi({
      clientId,
      clientSecret,
    });

    // Generate callback URL
    const callbackUrl = process.env.NEXTAUTH_URL
      ? `${process.env.NEXTAUTH_URL}/api/auth/twitter/callback`
      : 'http://localhost:3000/api/auth/twitter/callback';

    // Generate OAuth 2.0 authorization link with PKCE
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
      callbackUrl,
      {
        scope: [
          'tweet.read',
          'tweet.write',
          'users.read',
          'offline.access', // Required for refresh token
        ],
      }
    );

    // Store state and codeVerifier in database
    await db.insert(oauthStateTable).values({
      state,
      codeVerifier,
      userId: session.user.id,
      provider: 'twitter',
    });

    logger.info(
      { userId: session.user.id, provider: 'twitter' },
      'Generated Twitter OAuth authorization URL'
    );

    // Redirect to Twitter authorization page
    return NextResponse.redirect(url);
  } catch (error) {
    logger.error({ error }, 'Failed to generate Twitter OAuth URL');
    return NextResponse.json(
      { error: 'Failed to initiate Twitter authorization' },
      { status: 500 }
    );
  }
}
