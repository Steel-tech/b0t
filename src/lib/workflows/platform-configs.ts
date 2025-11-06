/**
 * Platform Credential Configurations
 *
 * Defines the credential fields required for each platform/service.
 * Used by the credential form to dynamically render input fields.
 */

export interface CredentialFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'password' | 'textarea' | 'email' | 'url';
  placeholder?: string;
  required: boolean;
  description?: string;
}

export interface PlatformConfig {
  id: string;
  name: string;
  category: string;
  icon?: string;
  fields: CredentialFieldConfig[];
}

export const PLATFORM_CONFIGS: Record<string, PlatformConfig> = {
  // ============================================
  // AI SERVICES
  // ============================================
  openai: {
    id: 'openai',
    name: 'OpenAI',
    category: 'AI',
    fields: [
      {
        key: 'api_key',
        label: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'sk-...',
        description: 'Your OpenAI API key from platform.openai.com'
      }
    ]
  },

  anthropic: {
    id: 'anthropic',
    name: 'Anthropic Claude',
    category: 'AI',
    fields: [
      {
        key: 'api_key',
        label: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'sk-ant-...',
        description: 'Your Anthropic API key from console.anthropic.com'
      }
    ]
  },

  cohere: {
    id: 'cohere',
    name: 'Cohere',
    category: 'AI',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  stabilityai: {
    id: 'stabilityai',
    name: 'Stability AI',
    category: 'AI',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  replicate: {
    id: 'replicate',
    name: 'Replicate',
    category: 'AI',
    fields: [
      { key: 'api_key', label: 'API Token', type: 'password', required: true }
    ]
  },

  huggingface: {
    id: 'huggingface',
    name: 'Hugging Face',
    category: 'AI',
    fields: [
      { key: 'api_key', label: 'API Token', type: 'password', required: true }
    ]
  },

  // ============================================
  // SOCIAL MEDIA
  // ============================================
  twitter: {
    id: 'twitter',
    name: 'Twitter',
    category: 'Social Media',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true },
      { key: 'api_secret', label: 'API Secret', type: 'password', required: true },
      { key: 'access_token', label: 'Access Token', type: 'password', required: true },
      { key: 'access_secret', label: 'Access Token Secret', type: 'password', required: true }
    ]
  },

  reddit: {
    id: 'reddit',
    name: 'Reddit',
    category: 'Social Media',
    fields: [
      { key: 'client_id', label: 'Client ID', type: 'text', required: true },
      { key: 'client_secret', label: 'Client Secret', type: 'password', required: true },
      { key: 'username', label: 'Username', type: 'text', required: true },
      { key: 'password', label: 'Password', type: 'password', required: true }
    ]
  },

  youtube: {
    id: 'youtube',
    name: 'YouTube',
    category: 'Social Media',
    fields: [
      { key: 'client_id', label: 'Client ID', type: 'text', required: true },
      { key: 'client_secret', label: 'Client Secret', type: 'password', required: true },
      { key: 'refresh_token', label: 'Refresh Token', type: 'password', required: true }
    ]
  },

  instagram: {
    id: 'instagram',
    name: 'Instagram',
    category: 'Social Media',
    fields: [
      { key: 'access_token', label: 'Access Token', type: 'password', required: true }
    ]
  },

  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    category: 'Social Media',
    fields: [
      { key: 'client_key', label: 'Client Key', type: 'text', required: true },
      { key: 'client_secret', label: 'Client Secret', type: 'password', required: true }
    ]
  },

  // ============================================
  // COMMUNICATION
  // ============================================
  slack: {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    fields: [
      { key: 'bot_token', label: 'Bot Token', type: 'password', required: true, placeholder: 'xoxb-...' }
    ]
  },

  discord: {
    id: 'discord',
    name: 'Discord',
    category: 'Communication',
    fields: [
      { key: 'bot_token', label: 'Bot Token', type: 'password', required: true }
    ]
  },

  telegram: {
    id: 'telegram',
    name: 'Telegram',
    category: 'Communication',
    fields: [
      { key: 'bot_token', label: 'Bot Token', type: 'password', required: true }
    ]
  },

  resend: {
    id: 'resend',
    name: 'Resend',
    category: 'Communication',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  twilio: {
    id: 'twilio',
    name: 'Twilio',
    category: 'Communication',
    fields: [
      { key: 'account_sid', label: 'Account SID', type: 'text', required: true },
      { key: 'auth_token', label: 'Auth Token', type: 'password', required: true },
      { key: 'phone_number', label: 'Phone Number', type: 'text', required: true, placeholder: '+1234567890' }
    ]
  },

  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    category: 'Communication',
    fields: [
      { key: 'api_token', label: 'API Token', type: 'password', required: true },
      { key: 'phone_number_id', label: 'Phone Number ID', type: 'text', required: true }
    ]
  },

  zendesk: {
    id: 'zendesk',
    name: 'Zendesk',
    category: 'Communication',
    fields: [
      { key: 'subdomain', label: 'Subdomain', type: 'text', required: true, placeholder: 'yourcompany' },
      { key: 'email', label: 'Email', type: 'email', required: true },
      { key: 'api_token', label: 'API Token', type: 'password', required: true }
    ]
  },

  intercom: {
    id: 'intercom',
    name: 'Intercom',
    category: 'Communication',
    fields: [
      { key: 'access_token', label: 'Access Token', type: 'password', required: true }
    ]
  },

  freshdesk: {
    id: 'freshdesk',
    name: 'Freshdesk',
    category: 'Communication',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true },
      { key: 'domain', label: 'Domain', type: 'text', required: true, placeholder: 'yourcompany.freshdesk.com' }
    ]
  },

  // ============================================
  // DATA & DATABASES
  // ============================================
  airtable: {
    id: 'airtable',
    name: 'Airtable',
    category: 'Data',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  notion: {
    id: 'notion',
    name: 'Notion',
    category: 'Data',
    fields: [
      { key: 'api_key', label: 'Integration Token', type: 'password', required: true }
    ]
  },

  googlesheets: {
    id: 'googlesheets',
    name: 'Google Sheets',
    category: 'Data',
    fields: [
      { key: 'service_account_email', label: 'Service Account Email', type: 'email', required: true },
      { key: 'private_key', label: 'Private Key', type: 'textarea', required: true, description: 'Paste the entire private key from your service account JSON' }
    ]
  },

  mongodb: {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Data',
    fields: [
      { key: 'connection_string', label: 'Connection String', type: 'password', required: true, placeholder: 'mongodb://...' }
    ]
  },

  postgresql: {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Data',
    fields: [
      { key: 'host', label: 'Host', type: 'text', required: true },
      { key: 'port', label: 'Port', type: 'text', required: false, placeholder: '5432' },
      { key: 'database', label: 'Database', type: 'text', required: true },
      { key: 'user', label: 'User', type: 'text', required: true },
      { key: 'password', label: 'Password', type: 'password', required: true }
    ]
  },

  mysql: {
    id: 'mysql',
    name: 'MySQL',
    category: 'Data',
    fields: [
      { key: 'host', label: 'Host', type: 'text', required: true },
      { key: 'port', label: 'Port', type: 'text', required: false, placeholder: '3306' },
      { key: 'database', label: 'Database', type: 'text', required: true },
      { key: 'user', label: 'User', type: 'text', required: true },
      { key: 'password', label: 'Password', type: 'password', required: true }
    ]
  },

  // ============================================
  // BUSINESS & CRM
  // ============================================
  hubspot: {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'Business',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  salesforce: {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'Business',
    fields: [
      { key: 'client_id', label: 'Client ID', type: 'text', required: true },
      { key: 'client_secret', label: 'Client Secret', type: 'password', required: true },
      { key: 'username', label: 'Username', type: 'text', required: true },
      { key: 'password', label: 'Password', type: 'password', required: true }
    ]
  },

  pipedrive: {
    id: 'pipedrive',
    name: 'Pipedrive',
    category: 'Business',
    fields: [
      { key: 'api_token', label: 'API Token', type: 'password', required: true },
      { key: 'company_domain', label: 'Company Domain', type: 'text', required: true, placeholder: 'yourcompany' }
    ]
  },

  // ============================================
  // PAYMENTS
  // ============================================
  stripe: {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payments',
    fields: [
      { key: 'secret_key', label: 'Secret Key', type: 'password', required: true, placeholder: 'sk_...' }
    ]
  },

  square: {
    id: 'square',
    name: 'Square',
    category: 'Payments',
    fields: [
      { key: 'access_token', label: 'Access Token', type: 'password', required: true },
      { key: 'location_id', label: 'Location ID', type: 'text', required: true }
    ]
  },

  // ============================================
  // E-COMMERCE
  // ============================================
  shopify: {
    id: 'shopify',
    name: 'Shopify',
    category: 'E-commerce',
    fields: [
      { key: 'shop_name', label: 'Shop Name', type: 'text', required: true, placeholder: 'yourstore' },
      { key: 'access_token', label: 'Access Token', type: 'password', required: true },
      { key: 'api_version', label: 'API Version', type: 'text', required: false, placeholder: '2024-01' }
    ]
  },

  woocommerce: {
    id: 'woocommerce',
    name: 'WooCommerce',
    category: 'E-commerce',
    fields: [
      { key: 'url', label: 'Store URL', type: 'url', required: true, placeholder: 'https://yourstore.com' },
      { key: 'consumer_key', label: 'Consumer Key', type: 'text', required: true },
      { key: 'consumer_secret', label: 'Consumer Secret', type: 'password', required: true }
    ]
  },

  // ============================================
  // DEVELOPER TOOLS
  // ============================================
  github: {
    id: 'github',
    name: 'GitHub',
    category: 'Developer Tools',
    fields: [
      { key: 'token', label: 'Personal Access Token', type: 'password', required: true }
    ]
  },

  vercel: {
    id: 'vercel',
    name: 'Vercel',
    category: 'Developer Tools',
    fields: [
      { key: 'token', label: 'API Token', type: 'password', required: true }
    ]
  },

  netlify: {
    id: 'netlify',
    name: 'Netlify',
    category: 'Developer Tools',
    fields: [
      { key: 'token', label: 'Personal Access Token', type: 'password', required: true }
    ]
  },

  sentry: {
    id: 'sentry',
    name: 'Sentry',
    category: 'Developer Tools',
    fields: [
      { key: 'dsn', label: 'DSN', type: 'url', required: true },
      { key: 'auth_token', label: 'Auth Token', type: 'password', required: false }
    ]
  },

  datadog: {
    id: 'datadog',
    name: 'Datadog',
    category: 'Developer Tools',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true },
      { key: 'app_key', label: 'Application Key', type: 'password', required: true }
    ]
  },

  // ============================================
  // VIDEO & MEDIA
  // ============================================
  elevenlabs: {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'Video & Media',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  cloudinary: {
    id: 'cloudinary',
    name: 'Cloudinary',
    category: 'Video & Media',
    fields: [
      { key: 'cloud_name', label: 'Cloud Name', type: 'text', required: true },
      { key: 'api_key', label: 'API Key', type: 'text', required: true },
      { key: 'api_secret', label: 'API Secret', type: 'password', required: true }
    ]
  },

  heygen: {
    id: 'heygen',
    name: 'HeyGen',
    category: 'Video & Media',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  runway: {
    id: 'runway',
    name: 'Runway',
    category: 'Video & Media',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  synthesia: {
    id: 'synthesia',
    name: 'Synthesia',
    category: 'Video & Media',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  vimeo: {
    id: 'vimeo',
    name: 'Vimeo',
    category: 'Video & Media',
    fields: [
      { key: 'access_token', label: 'Access Token', type: 'password', required: true }
    ]
  },

  // ============================================
  // LEAD GENERATION
  // ============================================
  clearbit: {
    id: 'clearbit',
    name: 'Clearbit',
    category: 'Lead Generation',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  hunter: {
    id: 'hunter',
    name: 'Hunter.io',
    category: 'Lead Generation',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  apollo: {
    id: 'apollo',
    name: 'Apollo.io',
    category: 'Lead Generation',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  lusha: {
    id: 'lusha',
    name: 'Lusha',
    category: 'Lead Generation',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  // ============================================
  // CONTENT & MEDIA
  // ============================================
  unsplash: {
    id: 'unsplash',
    name: 'Unsplash',
    category: 'Content',
    fields: [
      { key: 'access_key', label: 'Access Key', type: 'password', required: true }
    ]
  },

  pexels: {
    id: 'pexels',
    name: 'Pexels',
    category: 'Content',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  medium: {
    id: 'medium',
    name: 'Medium',
    category: 'Content',
    fields: [
      { key: 'access_token', label: 'Access Token', type: 'password', required: true }
    ]
  },

  bannerbear: {
    id: 'bannerbear',
    name: 'Bannerbear',
    category: 'Content',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  placid: {
    id: 'placid',
    name: 'Placid',
    category: 'Content',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  canva: {
    id: 'canva',
    name: 'Canva',
    category: 'Content',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  ghost: {
    id: 'ghost',
    name: 'Ghost CMS',
    category: 'Content',
    fields: [
      { key: 'url', label: 'Ghost URL', type: 'url', required: true, placeholder: 'https://yourblog.ghost.io' },
      { key: 'admin_api_key', label: 'Admin API Key', type: 'password', required: true }
    ]
  },

  // ============================================
  // VECTOR DATABASES
  // ============================================
  pinecone: {
    id: 'pinecone',
    name: 'Pinecone',
    category: 'AI',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  weaviate: {
    id: 'weaviate',
    name: 'Weaviate',
    category: 'AI',
    fields: [
      { key: 'url', label: 'Weaviate URL', type: 'url', required: true },
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  chromadb: {
    id: 'chromadb',
    name: 'ChromaDB',
    category: 'AI',
    fields: [
      { key: 'url', label: 'ChromaDB URL', type: 'url', required: true, placeholder: 'http://localhost:8000' }
    ]
  },

  // ============================================
  // AUDIO & MUSIC
  // ============================================
  suno: {
    id: 'suno',
    name: 'Suno AI',
    category: 'AI',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  mubert: {
    id: 'mubert',
    name: 'Mubert',
    category: 'AI',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  // ============================================
  // MORE E-COMMERCE
  // ============================================
  etsy: {
    id: 'etsy',
    name: 'Etsy',
    category: 'E-commerce',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'text', required: true },
      { key: 'shop_id', label: 'Shop ID', type: 'text', required: true }
    ]
  },

  ebay: {
    id: 'ebay',
    name: 'eBay',
    category: 'E-commerce',
    fields: [
      { key: 'client_id', label: 'Client ID', type: 'text', required: true },
      { key: 'client_secret', label: 'Client Secret', type: 'password', required: true },
      { key: 'refresh_token', label: 'Refresh Token', type: 'password', required: true }
    ]
  },

  amazonsp: {
    id: 'amazonsp',
    name: 'Amazon Seller Partner',
    category: 'E-commerce',
    fields: [
      { key: 'client_id', label: 'Client ID', type: 'text', required: true },
      { key: 'client_secret', label: 'Client Secret', type: 'password', required: true },
      { key: 'refresh_token', label: 'Refresh Token', type: 'password', required: true }
    ]
  },

  printful: {
    id: 'printful',
    name: 'Printful',
    category: 'E-commerce',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  // ============================================
  // MORE BUSINESS/ACCOUNTING
  // ============================================
  quickbooks: {
    id: 'quickbooks',
    name: 'QuickBooks',
    category: 'Business',
    fields: [
      { key: 'client_id', label: 'Client ID', type: 'text', required: true },
      { key: 'client_secret', label: 'Client Secret', type: 'password', required: true },
      { key: 'refresh_token', label: 'Refresh Token', type: 'password', required: true }
    ]
  },

  xero: {
    id: 'xero',
    name: 'Xero',
    category: 'Business',
    fields: [
      { key: 'client_id', label: 'Client ID', type: 'text', required: true },
      { key: 'client_secret', label: 'Client Secret', type: 'password', required: true },
      { key: 'refresh_token', label: 'Refresh Token', type: 'password', required: true }
    ]
  },

  freshbooks: {
    id: 'freshbooks',
    name: 'FreshBooks',
    category: 'Business',
    fields: [
      { key: 'client_id', label: 'Client ID', type: 'text', required: true },
      { key: 'client_secret', label: 'Client Secret', type: 'password', required: true },
      { key: 'refresh_token', label: 'Refresh Token', type: 'password', required: true }
    ]
  },

  docusign: {
    id: 'docusign',
    name: 'DocuSign',
    category: 'Business',
    fields: [
      { key: 'integration_key', label: 'Integration Key', type: 'text', required: true },
      { key: 'user_id', label: 'User ID', type: 'text', required: true },
      { key: 'private_key', label: 'Private Key', type: 'textarea', required: true }
    ]
  },

  hellosign: {
    id: 'hellosign',
    name: 'HelloSign',
    category: 'Business',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  // ============================================
  // MORE DEVELOPER TOOLS
  // ============================================
  heroku: {
    id: 'heroku',
    name: 'Heroku',
    category: 'Developer Tools',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  circleci: {
    id: 'circleci',
    name: 'CircleCI',
    category: 'Developer Tools',
    fields: [
      { key: 'token', label: 'Personal API Token', type: 'password', required: true }
    ]
  },

  jenkins: {
    id: 'jenkins',
    name: 'Jenkins',
    category: 'Developer Tools',
    fields: [
      { key: 'url', label: 'Jenkins URL', type: 'url', required: true },
      { key: 'user', label: 'Username', type: 'text', required: true },
      { key: 'token', label: 'API Token', type: 'password', required: true }
    ]
  },

  // ============================================
  // MORE COMMUNICATION
  // ============================================
  firebase: {
    id: 'firebase',
    name: 'Firebase',
    category: 'Communication',
    fields: [
      { key: 'service_account', label: 'Service Account JSON', type: 'textarea', required: true }
    ]
  },

  onesignal: {
    id: 'onesignal',
    name: 'OneSignal',
    category: 'Communication',
    fields: [
      { key: 'app_id', label: 'App ID', type: 'text', required: true },
      { key: 'rest_api_key', label: 'REST API Key', type: 'password', required: true }
    ]
  },

  // ============================================
  // DATA PROCESSING
  // ============================================
  bigquery: {
    id: 'bigquery',
    name: 'Google BigQuery',
    category: 'Data',
    fields: [
      { key: 'project_id', label: 'Project ID', type: 'text', required: true },
      { key: 'credentials', label: 'Service Account JSON', type: 'textarea', required: true }
    ]
  },

  snowflake: {
    id: 'snowflake',
    name: 'Snowflake',
    category: 'Data',
    fields: [
      { key: 'account', label: 'Account', type: 'text', required: true },
      { key: 'username', label: 'Username', type: 'text', required: true },
      { key: 'password', label: 'Password', type: 'password', required: true },
      { key: 'warehouse', label: 'Warehouse', type: 'text', required: true }
    ]
  },

  redshift: {
    id: 'redshift',
    name: 'Amazon Redshift',
    category: 'Data',
    fields: [
      { key: 'host', label: 'Host', type: 'text', required: true },
      { key: 'port', label: 'Port', type: 'text', required: false, placeholder: '5439' },
      { key: 'database', label: 'Database', type: 'text', required: true },
      { key: 'user', label: 'User', type: 'text', required: true },
      { key: 'password', label: 'Password', type: 'password', required: true }
    ]
  },

  kafka: {
    id: 'kafka',
    name: 'Apache Kafka',
    category: 'Data',
    fields: [
      { key: 'brokers', label: 'Brokers (comma-separated)', type: 'text', required: true, placeholder: 'broker1:9092,broker2:9092' },
      { key: 'client_id', label: 'Client ID', type: 'text', required: true }
    ]
  },

  rabbitmq: {
    id: 'rabbitmq',
    name: 'RabbitMQ',
    category: 'Data',
    fields: [
      { key: 'url', label: 'Connection URL', type: 'password', required: true, placeholder: 'amqp://localhost:5672' }
    ]
  },

  // ============================================
  // MORE LEAD GENERATION
  // ============================================
  zoominfo: {
    id: 'zoominfo',
    name: 'ZoomInfo',
    category: 'Lead Generation',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true },
      { key: 'username', label: 'Username', type: 'text', required: true },
      { key: 'password', label: 'Password', type: 'password', required: true }
    ]
  },

  proxycurl: {
    id: 'proxycurl',
    name: 'Proxycurl',
    category: 'Lead Generation',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  phantombuster: {
    id: 'phantombuster',
    name: 'PhantomBuster',
    category: 'Lead Generation',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  apify: {
    id: 'apify',
    name: 'Apify',
    category: 'Lead Generation',
    fields: [
      { key: 'api_key', label: 'API Token', type: 'password', required: true }
    ]
  },

  // ============================================
  // GENERAL
  // ============================================
  rapidapi: {
    id: 'rapidapi',
    name: 'RapidAPI',
    category: 'General',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true }
    ]
  },

  custom: {
    id: 'custom',
    name: 'Custom',
    category: 'General',
    fields: [
      { key: 'value', label: 'API Key / Token', type: 'password', required: true }
    ]
  },
};

/**
 * Get platform config by ID
 */
export function getPlatformConfig(platformId: string): PlatformConfig | undefined {
  return PLATFORM_CONFIGS[platformId.toLowerCase()];
}

/**
 * Get all platforms grouped by category
 */
export function getPlatformsByCategory(): Record<string, PlatformConfig[]> {
  const grouped: Record<string, PlatformConfig[]> = {};

  Object.values(PLATFORM_CONFIGS).forEach(config => {
    if (!grouped[config.category]) {
      grouped[config.category] = [];
    }
    grouped[config.category].push(config);
  });

  // Sort platforms within each category
  Object.keys(grouped).forEach(category => {
    grouped[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  return grouped;
}

/**
 * Get all category names
 */
export function getCategories(): string[] {
  const categories = new Set<string>();
  Object.values(PLATFORM_CONFIGS).forEach(config => categories.add(config.category));
  return Array.from(categories).sort();
}
