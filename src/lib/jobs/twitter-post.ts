import { postTweetsWorkflow } from '@/lib/workflows/twitter/post-tweets';
import { logger } from '@/lib/logger';
import { db } from '@/lib/db';
import { appSettingsTable } from '@/lib/schema';

/**
 * Job: Post Tweets
 *
 * Generates and posts tweets (or threads) based on configured prompts.
 * Can post news updates, scheduled content, or any AI-generated tweets.
 *
 * Configuration:
 * - Configure via UI (Twitter page -> Post Tweets -> Prompt/Settings)
 * - Settings are stored in database (appSettingsTable)
 * - Falls back to TWITTER_POST_PROMPT env var if not configured
 */

interface PostJobParams {
  prompt?: string;
  systemPrompt?: string;
  isThread?: boolean;
  threadLength?: number;
  useNewsResearch?: boolean;
  newsTopic?: string;
  newsLanguage?: string;
  newsCountry?: string;
  dryRun?: boolean;
}

/**
 * Load settings from database for a specific job
 */
async function loadJobSettings(jobName: string): Promise<Record<string, unknown>> {
  try {
    const prefix = `${jobName}_`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allSettings = await (db as any)
      .select()
      .from(appSettingsTable) as Array<{ id: number; key: string; value: string; updatedAt: Date | null }>;

    const jobSettings = allSettings
      .filter((setting: { key: string }) => setting.key.startsWith(prefix))
      .reduce((acc: Record<string, unknown>, setting: { key: string; value: string }) => {
        const settingKey = setting.key.replace(prefix, '');
        try {
          acc[settingKey] = JSON.parse(setting.value);
        } catch {
          acc[settingKey] = setting.value;
        }
        return acc;
      }, {} as Record<string, unknown>);

    return jobSettings;
  } catch (error) {
    logger.error({ error }, 'Failed to load job settings from database');
    return {};
  }
}

export async function postTweetsJob(params?: PostJobParams) {
  // Load settings from database
  const settings = await loadJobSettings('post-tweets');

  // Get prompt from params or database settings or fallback to env var
  const prompt = params?.prompt || (settings.prompt as string) || process.env.TWITTER_POST_PROMPT;

  if (!prompt) {
    logger.warn('⚠️  Prompt not configured - set it in the Twitter page UI or TWITTER_POST_PROMPT env var');
    return;
  }

  // Get system prompt from params or database settings
  const systemPrompt = params?.systemPrompt || (settings.systemPrompt as string | undefined);

  // Get thread settings (default to true for threads)
  const isThread = params?.isThread ?? (settings.isThread as boolean | undefined) ?? true;
  const threadLength = params?.threadLength ?? (settings.threadLength as number | undefined) ?? 3;
  const dryRun = params?.dryRun ?? (settings.dryRun as boolean | undefined) ?? false;

  // Get news research settings (default to true for research)
  const useNewsResearch = params?.useNewsResearch ?? (settings.useNewsResearch as boolean | undefined) ?? true;
  const newsTopic = params?.newsTopic ?? (settings.newsTopic as string | undefined) ?? 'technology';
  const newsLanguage = params?.newsLanguage ?? (settings.newsLanguage as string | undefined) ?? 'en';
  const newsCountry = params?.newsCountry ?? (settings.newsCountry as string | undefined) ?? 'US';

  try {
    logger.info('🚀 Starting Post Tweets workflow...');
    logger.info(
      {
        prompt: prompt.substring(0, 100),
        hasCustomPrompt: !!systemPrompt,
        isThread,
        threadLength,
        useNewsResearch,
        newsTopic,
        dryRun,
      },
      'Generating and posting tweet(s)'
    );

    const result = await postTweetsWorkflow({
      prompt,
      systemPrompt,
      isThread,
      threadLength,
      useNewsResearch,
      newsTopic,
      newsLanguage,
      newsCountry,
      dryRun,
    });

    logger.info('✅ Post Tweets workflow completed successfully');
    logger.info({
      tweetsPosted: result.postedTweetIds.length,
      tweetIds: result.postedTweetIds,
    });
  } catch (error) {
    logger.error({ error }, '❌ Failed to execute Post Tweets workflow');
    throw error;
  }
}
