import { readFileSync } from 'fs';
import { resolve } from 'path';

import { expect, RouteEntry, test } from '../../fixtures/base.fixture';

const manifest = JSON.parse(readFileSync(resolve(__dirname, '../../config/e2e.routes.json'), 'utf-8'));
const visualSkipFile = JSON.parse(readFileSync(resolve(__dirname, '../../config/visual-skip.json'), 'utf-8'));
const visualSkipRoutes = new Set<string>(visualSkipFile.skipped.map((s: { route: string }) => s.route));
const allRoutes: RouteEntry[] = manifest.routes;

const PRIORITY_COMPONENTS: { library: string; component: string; example: string }[] = [
    { library: 'core', component: 'button', example: 'types' },
    { library: 'core', component: 'dialog', example: 'auto-label-dialog' },
    { library: 'core', component: 'table', example: 'table' },
    { library: 'core', component: 'menu', example: 'disabled' },
    { library: 'core', component: 'tabs', example: 'tabs' },
    { library: 'core', component: 'select', example: 'adding' },
    { library: 'core', component: 'combobox', example: 'combobox' },
    { library: 'core', component: 'date-picker', example: 'allow-null' },
    { library: 'core', component: 'message-strip', example: 'message-strip' },
    { library: 'core', component: 'list', example: 'action' },
    { library: 'core', component: 'popover', example: 'closing' },
    { library: 'platform', component: 'form-container', example: 'form-basic' },
    { library: 'platform', component: 'table', example: 'default' },
    { library: 'core', component: 'input', example: 'form-group' }
];

function findRoute(lib: string, comp: string, example: string): RouteEntry | undefined {
    return allRoutes.find((r) => r.library === lib && r.component === comp && r.example === example);
}

test.describe('Visual Regression — High Contrast (sap_horizon_hcb)', () => {
    for (const target of PRIORITY_COMPONENTS) {
        const route = findRoute(target.library, target.component, target.example);
        if (!route || visualSkipRoutes.has(route.path)) {
            continue;
        }

        test(`${route.library}/${route.component}/${route.example}`, async ({ page }) => {
            await page.goto(`/${route.path}?theme=sap_horizon_hcb`);
            await page.waitForLoadState('domcontentloaded');
            await page.waitForFunction(
                () => getComputedStyle(document.documentElement).getPropertyValue('--sapBackgroundColor').trim() !== ''
            );
            await page.evaluate(() => document.documentElement.classList.add('e2e-no-animations'));
            await page.locator('html.e2e-no-animations').waitFor({ state: 'attached' });

            await expect(page).toHaveScreenshot(`hcb/${route.library}/${route.component}-${route.example}.png`, {
                fullPage: true,
                maxDiffPixelRatio: 0.01,
                animations: 'disabled'
            });
        });
    }
});
