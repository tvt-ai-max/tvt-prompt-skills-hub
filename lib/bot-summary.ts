import type { BotItem, BotPayload, BotSummary } from '@/types/hub';
import { customInstructionsText } from '@/lib/personas';

export function botTier(bot: Pick<BotItem, 'tier'>): 'core' | 'specialist' {
  return bot.tier === 'specialist' ? 'specialist' : 'core';
}

export function toBotSummary(bot: BotItem): BotSummary {
  return {
    id: bot.id,
    name: bot.name,
    role: bot.role,
    department: bot.department,
    avatar: bot.avatar,
    description: bot.description,
    tier: botTier(bot),
    specialty: bot.specialty,
    tags: bot.tags,
    recommendedModels: bot.recommendedModels,
  };
}

export function toBotPayload(bot: BotItem): BotPayload {
  return { id: bot.id, name: bot.name, systemPrompt: bot.systemPrompt, customInstructions: customInstructionsText(bot) };
}

/** Claude Code / OpenClaw subagent file. */
export function botSubagentMarkdown(bot: BotItem): string {
  const list = (items: string[]) => `[${items.map((m) => JSON.stringify(m)).join(', ')}]`;
  return `---\nname: ${bot.id}\ndescription: ${JSON.stringify(bot.description)}\nrole: ${JSON.stringify(bot.role)}\nmodels: ${list(bot.recommendedModels)}\ntools: ${list(bot.tools)}\n---\n\n${bot.systemPrompt}\n`;
}
