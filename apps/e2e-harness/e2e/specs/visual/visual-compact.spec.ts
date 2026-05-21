import { readFileSync } from 'fs';
import { resolve } from 'path';

import { expect, RouteEntry, test } from '../../fixtures/base.fixture';

const manifest = JSON.parse(readFileSync(resolve(__dirname, '../../config/e2e.routes.json'), 'utf-8'));
const visualSkipFile = JSON.parse(readFileSync(resolve(__dirname, '../../config/visual-skip.json'), 'utf-8'));
const visualSkipRoutes = new Set<string>(visualSkipFile.skipped.map((s: { route: string }) => s.route));
const allRoutes: RouteEntry[] = manifest.routes;

const COMPACT_COMPONENTS: { library: string; component: string; example: string }[] = [
    { library: 'core', component: 'button', example: 'types' },
    { library: 'core', component: 'input', example: 'form-group' },
    { library: 'core', component: 'combobox', example: 'combobox' },
    { library: 'core', component: 'select', example: 'adding' },
    { library: 'core', component: 'date-picker', example: 'allow-null' },
    { library: 'core', component: 'multi-input', example: 'multi-input' },
    { library: 'core', component: 'table', example: 'table' },
    { library: 'core', component: 'list', example: 'action' },
    { library: 'core', component: 'toolbar', example: 'toolbar' },
    { library: 'core', component: 'tabs', example: 'tabs' },
    { library: 'core', component: 'message-strip', example: 'message-strip' },
    { library: 'platform', component: 'form-container', example: 'form-basic' },
    { library: 'platform', component: 'table', example: 'default' },
    { library: 'platform', component: 'list', example: 'list' }
];

function findRoute(lib: string, comp: string, example: string): RouteEntry | undefined {
    return allRoutes.find((r) => r.library === lib && r.component === comp && r.example === example);
}

test.describe('Visual Regression — Compact Content Density', () => {
    for (const target of COMPACT_COMPONENTS) {
        const route = findRoute(target.library, target.component, target.example);
        if (!route || visualSkipRoutes.has(route.path)) {
            continue;
        }

        test(`${route.library}/${route.component}/${route.example}`, async ({ page }) => {
            await page.goto(`/${route.path}?density=compact`);
            await page.waitForLoadState('domcontentloaded');
            await page.waitForTimeout(1000);
            await page.evaluate(() => document.documentElement.classList.add('e2e-no-animations'));
            await page.locator('html.e2e-no-animations').waitFor({ state: 'attached' });

            await expect(page).toHaveScreenshot(`compact/${route.library}/${route.component}-${route.example}.png`, {
                fullPage: true,
                maxDiffPixelRatio: 0.01,
                animations: 'disabled'
            });
        });
    }
});
