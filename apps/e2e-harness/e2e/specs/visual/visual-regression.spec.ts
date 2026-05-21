import { readFileSync } from 'fs';
import { resolve } from 'path';

import { expect, RouteEntry, test } from '../../fixtures/base.fixture';

const skipFile = JSON.parse(readFileSync(resolve(__dirname, '../../config/e2e.skip.json'), 'utf-8'));
const visualSkipFile = JSON.parse(readFileSync(resolve(__dirname, '../../config/visual-skip.json'), 'utf-8'));
const skipRoutes = new Set<string>([
    ...skipFile.skipped.map((s: { route: string }) => s.route),
    ...visualSkipFile.skipped.map((s: { route: string }) => s.route)
]);

const manifest = JSON.parse(readFileSync(resolve(__dirname, '../../config/e2e.routes.json'), 'utf-8'));
const routes: RouteEntry[] = manifest.routes.filter((r: RouteEntry) => !skipRoutes.has(r.path));

test.describe('Visual Regression', () => {
    for (const route of routes) {
        test(`${route.library}/${route.component}/${route.example}`, async ({ page, goto }) => {
            await goto(route.path);
            await expect(page).toHaveScreenshot(`${route.library}/${route.component}-${route.example}.png`, {
                fullPage: true,
                maxDiffPixelRatio: 0.01,
                animations: 'disabled'
            });
        });
    }
});
