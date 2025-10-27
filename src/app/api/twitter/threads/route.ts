import { NextRequest, NextResponse } from 'next/server';
import { db, useSQLite } from '@/lib/db';
import { tweetsTableSQLite, tweetsTablePostgres } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import { checkStrictRateLimit } from '@/lib/ratelimit';
import { logger, logApiRequest, logApiError } from '@/lib/logger';

/**
 * Posted Threads History API
 *
 * Fetches all posted threads/tweets from the database
 *
 * GET /api/twitter/threads
 * Query params:
 *   limit?: number (default 100, max 500)
 *   offset?: number (default 0)
 */

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await checkStrictRateLimit(request);
  if (rateLimitResult) return rateLimitResult;

  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(Number(searchParams.get('limit')) || 100, 500);
    const offset = Number(searchParams.get('offset')) || 0;

    logger.info({ limit, offset }, 'Fetching posted threads history');

    let threads;

    if (useSQLite) {
      threads = await (db as ReturnType<typeof import('drizzle-orm/better-sqlite3').drizzle>)
        .select()
        .from(tweetsTableSQLite)
        .orderBy(desc(tweetsTableSQLite.postedAt))
        .limit(limit)
        .offset(offset);
    } else {
      threads = await (db as ReturnType<typeof import('drizzle-orm/node-postgres').drizzle>)
        .select()
        .from(tweetsTablePostgres)
        .orderBy(desc(tweetsTablePostgres.postedAt))
        .limit(limit)
        .offset(offset);
    }

    // Transform the data for the frontend
    const formattedThreads = threads.map(thread => ({
      id: thread.id,
      content: thread.content,
      tweetId: thread.tweetId,
      status: thread.status,
      postedAt: thread.postedAt,
      createdAt: thread.createdAt,
    }));

    logApiRequest('GET', '/api/twitter/threads', 200);

    return NextResponse.json({
      success: true,
      count: formattedThreads.length,
      threads: formattedThreads,
      pagination: {
        limit,
        offset,
        hasMore: formattedThreads.length === limit,
      },
    });
  } catch (error) {
    logApiError('GET', '/api/twitter/threads', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch threads history',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
