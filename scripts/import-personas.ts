/**
 * Imports the 301 specialist personas from data/personas-source (relative to the repo root)
 * into content/bots/specialists/<specialty>/<slug>.json. Idempotent: regenerates the folder.
 *   npm run personas:import
 */
import fs from 'node:fs';
import path from 'node:path';
import { parsePersonaMarkdown, personaSlug, personaToBot, SPECIALTIES, uniqueSlug } from '../lib/personas';
import { validateBot } from '../lib/schema';

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, 'data', 'personas-source', 'categories');
const CORE = path.join(ROOT, 'content', 'bots');
const TARGET = path.join(CORE, 'specialists');

const taken = new Set(
  fs
    .readdirSync(CORE)
    .filter((f) => f.endsWith('.json'))
    .map((f) => (JSON.parse(fs.readFileSync(path.join(CORE, f), 'utf8')) as { id: string }).id),
);

fs.rmSync(TARGET, { recursive: true, force: true });
let count = 0;
const problems: string[] = [];

for (const specialty of SPECIALTIES) {
  const dir = path.join(SOURCE, specialty, 'personas');
  if (!fs.existsSync(dir)) {
    problems.push(`missing source folder: ${path.relative(ROOT, dir)}`);
    continue;
  }
  fs.mkdirSync(path.join(TARGET, specialty), { recursive: true });
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
    const where = path.relative(ROOT, path.join(dir, file));
    try {
      const parsed = parsePersonaMarkdown(fs.readFileSync(path.join(dir, file), 'utf8'));
      const id = uniqueSlug(personaSlug(parsed.name), taken);
      const bot = personaToBot(parsed, specialty, id);
      const result = validateBot(bot as unknown as Record<string, unknown>, where);
      if (result.issues.length) {
        problems.push(...result.issues);
        continue;
      }
      fs.writeFileSync(path.join(TARGET, specialty, `${id}.json`), JSON.stringify(bot, null, 2) + '\n');
      count++;
    } catch (error) {
      problems.push(`${where}: ${(error as Error).message}`);
    }
  }
}

if (problems.length) {
  console.error(`❌ ${problems.length} problem(s):\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`✅ Imported ${count} specialist personas into ${path.relative(ROOT, TARGET)}/`);
