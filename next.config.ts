import type { NextConfig } from 'next';

/**
 * Output mode (optional):
 *   NEXT_OUTPUT=export      → fully static site in ./out (any static host, Nginx, HestiaCP)
 *   NEXT_OUTPUT=standalone  → minimal Node server for Docker (see Dockerfile)
 *   (unset)                 → default Next.js output (Vercel, `next start`)
 */
const output = process.env.NEXT_OUTPUT === 'export' || process.env.NEXT_OUTPUT === 'standalone' ? process.env.NEXT_OUTPUT : undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output,
};

export default nextConfig;
