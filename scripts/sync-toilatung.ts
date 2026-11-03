import fs from 'node:fs';
import path from 'node:path';
import { promptsData } from '/Users/mrtony/Remix-Lexi-AI-Agent-Control-Center/toilatung-platform/src/lib/prompts';
import { validatePrompt } from '../lib/schema';
import type { PromptCategory, PromptItem, PromptVariable } from '../types/hub';

function toAsciiKey(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CATEGORY_MAP: Record<string, PromptCategory> = {
  'Marketing & Copy': 'copywriting',
  'Kinh doanh & Ops': 'operations',
  'Kịch bản & Storyboard': 'video',
  'QA & Tối ưu': 'system-design',
  'Hình ảnh & Poster': 'branding',
  'Nhân vật & Tham chiếu': 'video',
  'Phân tích & Remake': 'operations',
  'Video Master': 'video',
  'Google AI Studio': 'system-design',
  'Video & Animation': 'video',
  'Ảnh Kỹ thuật': 'system-design',
  'Training Chatbot': 'system-design',
  'Master Prompt': 'system-design',
};

function refineCategory(item: (typeof promptsData)[0]): PromptCategory {
  const cat = CATEGORY_MAP[item.category] || 'marketing';
  const t = (item.title + ' ' + item.shortDesc).toLowerCase();
  if (t.includes('video') || t.includes('animation') || t.includes('phim') || t.includes('veo') || t.includes('reels') || t.includes('tiktok') || t.includes('goc may')) {
    return 'video';
  }
  if (t.includes('ads') || t.includes('quang cao') || t.includes('facebook ad') || t.includes('meta')) {
    return 'ads';
  }
  if (t.includes('copywriting') || t.includes('kich ban') || t.includes('viet bai') || t.includes('content') || t.includes('hook') || t.includes('pas') || t.includes('aida')) {
    return 'copywriting';
  }
  if (t.includes('seo') || t.includes('geo') || t.includes('tu khoa')) {
    return 'seo';
  }
  if (t.includes('brand') || t.includes('logo') || t.includes('poster') || t.includes('nhan dien')) {
    return 'branding';
  }
  return cat;
}

interface ProcessedPrompt {
  item: PromptItem;
  folder: string;
}

export function processPrompts(): { valid: ProcessedPrompt[]; invalid: { title: string; issues: string[] }[] } {
  const valid: ProcessedPrompt[] = [];
  const invalid: { title: string; issues: string[] }[] = [];
  const usedSlugs = new Set<string>();

  for (const src of promptsData) {
    const category = refineCategory(src);
    let baseSlug = 'tlt-' + slugify(src.title);
    if (!baseSlug || baseSlug === 'tlt-') {
      baseSlug = `tlt-prompt-${src.id}`;
    }
    let slug = baseSlug;
    let counter = 1;
    while (usedSlugs.has(slug)) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }
    usedSlugs.add(slug);

    // Convert brackets to variables
    let template = src.fullPrompt;

    // First replace timestamps like [00:00 - 00:03] with (00:00 - 00:03) so they don't get treated as vars
    template = template.replace(/\[(\d{2}:\d{2}\s*-\s*\d{2}:\d{2})\]/g, '($1)');
    // Also replace standalone bracket numbers like [1], [2], [3]
    template = template.replace(/\[(\d+)\]/g, '($1)');

    const variablesMap = new Map<string, PromptVariable>();

    // Match placeholders: [SOMETHING]
    template = template.replace(/\[([A-Z0-9_\s\u00C0-\u1EF9.,:\/\\-]+)\]/g, (match, rawInner) => {
      const inner = rawInner.trim();
      // Ignore if it's pure numbers or timestamp
      if (/^\d+$/.test(inner) || /^\d{2}:\d{2}/.test(inner)) return match;

      let keyPart = inner;
      let defaultValue = '';
      if (inner.includes('e.g.')) {
        const parts = inner.split(/e\.g\.[:\s,]*/i);
        keyPart = parts[0].trim();
        defaultValue = parts.slice(1).join(' ').trim();
      } else if (inner.includes('ví dụ:')) {
        const parts = inner.split(/ví dụ:[:\s,]*/i);
        keyPart = parts[0].trim();
        defaultValue = parts.slice(1).join(' ').trim();
      }

      let key = toAsciiKey(keyPart);
      if (!key) key = 'VAR_' + Math.random().toString(36).substring(2, 6).toUpperCase();
      // ensure valid key pattern
      key = key.replace(/[^A-Z0-9_]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
      if (!key) key = 'PARAM';

      if (!variablesMap.has(key)) {
        let label = keyPart.replace(/_/g, ' ').toLowerCase();
        label = label.charAt(0).toUpperCase() + label.slice(1);
        variablesMap.set(key, {
          key,
          label: label || key,
          defaultValue: defaultValue || undefined,
          type: defaultValue.length > 60 ? 'textarea' : 'text',
        });
      }

      return `{{${key}}}`;
    });

    const variables: PromptVariable[] = Array.from(variablesMap.values());

    // Clean up template from any malformed brackets or placeholders
    // Ensure no unclosed {{
    const tags = [src.category, src.tool, 'toilatung.com'];
    if (src.locked) tags.push('Master Prompt');

    const promptItem: PromptItem = {
      id: slug,
      title: src.title,
      description: src.shortDesc || src.usage || `Prompt ${src.title} tối ưu cho ${src.tool}`,
      category,
      tier: 'prompt',
      persona: 'toilatung',
      tags: Array.from(new Set(tags.filter(Boolean))),
      author: 'Tôi Là Tùng',
      createdAt: '2026-11-03',
      variables,
      template,
    };

    const targetFolder = `toilatung-${category}`;
    const filePath = `content/prompts/${targetFolder}/${slug}.json`;
    const res = validatePrompt(promptItem as unknown as Record<string, unknown>, filePath);

    if (res.issues.length > 0) {
      invalid.push({ title: src.title, issues: res.issues });
    } else {
      valid.push({ item: promptItem, folder: targetFolder });
    }
  }

  return { valid, invalid };
}

if (process.argv[1] && process.argv[1].endsWith('sync-toilatung.ts')) {
  console.log('🔄 Processing 107 prompts from toilatung-platform...');
  const { valid, invalid } = processPrompts();
  console.log(`✅ Valid: ${valid.length} / 107`);
  if (invalid.length > 0) {
    console.log(`❌ Invalid: ${invalid.length}`);
    for (const inv of invalid) {
      console.log(`  - ${inv.title}:`);
      for (const iss of inv.issues) {
        console.log(`     * ${iss}`);
      }
    }
    process.exit(1);
  }

  const isWrite = process.argv.includes('--write');
  if (isWrite) {
    console.log('💾 Writing files to content/prompts/...');
    for (const { item, folder } of valid) {
      const dir = path.join(process.cwd(), 'content', 'prompts', folder);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const targetFile = path.join(dir, `${item.id}.json`);
      fs.writeFileSync(targetFile, JSON.stringify(item, null, 2), 'utf8');
    }
    console.log(`🎉 Successfully wrote ${valid.length} prompts to content/prompts/!`);
  } else {
    console.log('ℹ️ Dry-run completed. Pass --write to save files.');
  }
}
