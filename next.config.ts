import type { NextConfig } from 'next';

/**
 * Output mode (optional):
 *   NEXT_OUTPUT=export      → fully static site in ./out (any static host, Nginx, HestiaCP)
 *   NEXT_OUTPUT=standalone  → minimal Node server for Docker (see Dockerfile)
 *   (unset)                 → default Next.js output (Vercel, `next start`)
 */
const output = process.env.NEXT_OUTPUT === 'export' || process.env.NEXT_OUTPUT === 'standalone' ? process.env.NEXT_OUTPUT : undefined;
const isStaticExport = output === 'export';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output,
  // Route files ending in `.dynamic.ts` (the MCP POST endpoint) need a server runtime, so they are
  // only picked up when the build is not a static export.
  pageExtensions: isStaticExport ? ['tsx', 'ts', 'jsx', 'js'] : ['dynamic.ts', 'tsx', 'ts', 'jsx', 'js'],
  // The MCP endpoint reads content/ at runtime — make sure it ships with serverless/standalone builds.
  outputFileTracingIncludes: { '/api/mcp': ['./content/**/*'] },
};

export default nextConfig;
