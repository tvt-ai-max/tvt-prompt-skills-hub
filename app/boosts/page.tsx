import { permanentRedirect } from 'next/navigation';

/** Since V3, Boosts live inside Prompts as the "Deep Reasoning" category. */
export default function BoostsPage() {
  permanentRedirect('/prompts?category=deep-reasoning');
}
