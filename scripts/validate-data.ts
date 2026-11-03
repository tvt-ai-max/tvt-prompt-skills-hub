/**
 * Validates every file in content/ against types/hub.ts.
 * Usage: npm run validate   (also runs automatically before `npm run build`)
 */
import { loadContent } from '../lib/loader';

const MINIMUMS = { prompts: 25, skills: 10, boosts: 5, workflows: 5, bots: 317 } as const;

const result = loadContent();
const counts = {
  prompts: result.prompts.length,
  skills: result.skills.length,
  boosts: result.boosts.length,
  workflows: result.workflows.length,
  bots: result.bots.length,
};
const problems = [...result.issues];

for (const [tier, min] of Object.entries(MINIMUMS) as [keyof typeof MINIMUMS, number][]) {
  if (counts[tier] < min) problems.push(`catalog: expected at least ${min} ${tier}, found ${counts[tier]}`);
}

console.log('\n🔎 TVT Intelligence Hub — content validation');
console.log(`   files scanned : ${result.files}`);
console.log(`   prompts       : ${counts.prompts}`);
console.log(`   skills        : ${counts.skills}`);
console.log(`   boosts        : ${counts.boosts}  (shown as Prompts › Deep Reasoning)`);
console.log(`   workflows     : ${counts.workflows}`);
console.log(`   bots          : ${counts.bots}`);

if (problems.length) {
  console.error(`\n❌ ${problems.length} problem(s) found:`);
  for (const problem of problems) console.error(`   - ${problem}`);
  process.exit(1);
}

console.log('\n✅ All content items conform to the schema.\n');
