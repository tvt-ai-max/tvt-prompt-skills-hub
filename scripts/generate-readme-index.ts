/**
 * Regenerates the "Curated Directory Index" section of README.md from content/.
 *   npm run readme            → write README.md
 *   npm run readme -- --check → exit 1 if README.md is stale (used in CI)
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadContent } from '../lib/loader';
import { buildReadmeIndex, injectIndex } from '../lib/readme';
import { SITE_URL } from '../lib/site';

const README = path.join(process.cwd(), 'README.md');
const check = process.argv.includes('--check');

const { prompts, skills, boosts, workflows, bots, issues, sources } = loadContent();
if (issues.length) {
  console.error(`❌ Content has ${issues.length} issue(s) — run npm run validate first.`);
  process.exit(1);
}
const byTitle = <T extends { title: string }>(a: T, b: T) => a.title.localeCompare(b.title);
const items = [...prompts.sort(byTitle), ...skills.sort(byTitle), ...boosts.sort(byTitle)];

const current = fs.readFileSync(README, 'utf8');
const next = injectIndex(current, buildReadmeIndex(items, sources, SITE_URL, { workflows, bots }));

if (check) {
  if (next !== current) {
    console.error('❌ README.md directory index is out of date. Run `npm run readme` and commit the result.');
    process.exit(1);
  }
  console.log('✅ README.md directory index is up to date.');
} else {
  fs.writeFileSync(README, next);
  console.log(`✅ README.md directory index regenerated (${items.length} items, ${workflows.length} workflows, ${bots.length} bots).`);
}
