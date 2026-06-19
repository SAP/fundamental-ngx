import { execSync } from 'child_process';
import { resolve } from 'path';

export default function globalSetup(): void {
    const script = resolve(process.cwd(), 'apps/e2e-harness/scripts/generate-routes.ts');
    execSync(`npx tsx "${script}"`, { stdio: 'inherit' });
}
