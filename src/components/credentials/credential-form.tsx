'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PLATFORM_CONFIGS, getPlatformsByCategory } from '@/lib/workflows/platform-configs';
import { useClient } from '@/components/providers/ClientProvider';

interface CredentialFormProps {
  onSuccess: () => void;
}

export function CredentialForm({ onSuccess }: CredentialFormProps) {
  const { currentClient } = useClient();
  const [platform, setPlatform] = useState('openai');
  const [name, setName] = useState('');
  const [fields, setFields] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const platformConfig = PLATFORM_CONFIGS[platform];
  const platformsByCategory = getPlatformsByCategory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Determine if single or multi-field based on platform config
      const isSingleField = platformConfig.fields.length === 1;
      const type = isSingleField ? 'api_key' : 'multi_field';

      const payload: {
        platform: string;
        name: string;
        type: string;
        organizationId?: string;
        value?: string;
        fields?: Record<string, string>;
      } = {
        platform,
        name: name || `${platformConfig.name} Credential`,
        type,
      };

      // Include organizationId if a client is selected
      if (currentClient?.id) {
        payload.organizationId = currentClient.id;
      }

      if (isSingleField) {
        // Single field - send as 'value'
        payload.value = fields[platformConfig.fields[0].key];
      } else {
        // Multi-field - send as 'fields' object
        payload.fields = fields;
      }

      const response = await fetch('/api/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add credential');
      }

      // Reset form
      setFields({});
      setName('');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add credential');
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformChange = (newPlatform: string) => {
    setPlatform(newPlatform);
    setFields({}); // Reset fields when platform changes
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Select value={platform} onValueChange={handlePlatformChange}>
          <SelectTrigger id="platform">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {Object.entries(platformsByCategory).map(([category, platforms]) => (
              <div key={category}>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  {category}
                </div>
                {platforms.map((config) => (
                  <SelectItem key={config.id} value={config.id}>
                    {config.name}
                  </SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          {platformConfig.category} • {platformConfig.fields.length} field{platformConfig.fields.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name (Optional)</Label>
        <Input
          id="name"
          placeholder={`My ${platformConfig.name} Credential`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Friendly name to identify this credential
        </p>
      </div>

      {/* Dynamic fields based on platform configuration */}
      {platformConfig.fields.map((fieldConfig) => (
        <div key={fieldConfig.key} className="space-y-2">
          <Label htmlFor={fieldConfig.key}>
            {fieldConfig.label}
            {fieldConfig.required && <span className="text-destructive ml-1">*</span>}
          </Label>

          {fieldConfig.type === 'textarea' ? (
            <Textarea
              id={fieldConfig.key}
              placeholder={fieldConfig.placeholder}
              value={fields[fieldConfig.key] || ''}
              onChange={(e) => setFields(prev => ({ ...prev, [fieldConfig.key]: e.target.value }))}
              required={fieldConfig.required}
              rows={4}
              className="font-mono text-sm"
            />
          ) : (
            <Input
              id={fieldConfig.key}
              type={fieldConfig.type}
              placeholder={fieldConfig.placeholder}
              value={fields[fieldConfig.key] || ''}
              onChange={(e) => setFields(prev => ({ ...prev, [fieldConfig.key]: e.target.value }))}
              required={fieldConfig.required}
            />
          )}

          {fieldConfig.description && (
            <p className="text-xs text-muted-foreground">
              {fieldConfig.description}
            </p>
          )}
        </div>
      ))}

      <div className="pt-2">
        <p className="text-xs text-muted-foreground mb-3">
          All credentials are encrypted and stored securely
        </p>
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Adding...' : 'Add Credential'}
      </Button>
    </form>
  );
}
