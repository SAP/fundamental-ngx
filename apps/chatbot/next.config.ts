import type { NextConfig } from 'next';
import path from 'path';

const config: NextConfig = {
    // Compile the shared MCP TypeScript source that lives outside this app dir.
    transpilePackages: ['@fundamental-ngx/mcp-server'],
    outputFileTracingRoot: path.join(__dirname, '../../'),
    typescript: { ignoreBuildErrors: false },
    webpack(webpackConfig) {
        // Next.js webpack does not auto-resolve TypeScript path aliases that
        // point outside the app directory. Explicitly alias the bare subpath
        // so webpack can locate the source file.
        webpackConfig.resolve.alias['@fundamental-ngx/mcp-server/web'] = path.resolve(
            __dirname,
            '../../libs/mcp-server/src/web.ts'
        );
        return webpackConfig;
    }
};

export default config;
