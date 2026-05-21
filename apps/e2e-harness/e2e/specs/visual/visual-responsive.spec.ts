import { readFileSync } from 'fs';
import { resolve } from 'path';

import { expect, RouteEntry, test } from '../../fixtures/base.fixture';

const manifest = JSON.parse(readFileSync(resolve(__dirname, '../../config/e2e.routes.json'), 'utf-8'));
const visualSkipFile = JSON.parse(readFileSync(resolve(__dirname, '../../config/visual-skip.json'), 'utf-8'));
const visualSkipRoutes = new Set<string>(visualSkipFile.skipped.map((s: { route: string }) => s.route));
const allRoutes: RouteEntry[] = manifest.routes;

const RESPONSIVE_COMPONENTS: { library: string; component: string; example: string }[] = [
    { library: 'core', component: 'shellbar', example: 'basic' },
    { library: 'core', component: 'table', example: 'table' },
    { library: 'core', component: 'dialog', example: 'auto-label-dialog' },
    { library: 'core', component: 'toolbar', example: 'toolbar' },
    { library: 'core', component: 'panel', example: 'expandable' },
    { library: 'core', component: 'split-button', example: 'types' },
    { library: 'core', component: 'tabs', example: 'tabs' },
    { library: 'core', component: 'dynamic-page', example: 'dynamic-page' },
    { library: 'platform', component: 'table', example: 'default' },
    { library: 'platform', component: 'search-field', example: 'basic' }
];

function findRoute(lib: string, comp: string, example: string): RouteEntry | undefined {
    return allRoutes.find((r) => r.library === lib && r.component === comp && r.example === example);
}

test.describe('Visual Regression — Responsive Viewports', () => {
    for (const target of RESPONSIVE_COMPONENTS) {
        const route = findRoute(target.library, target.component, target.example);
        if (!route || visualSkipRoutes.has(route.path)) {
            continue;
        }

        test(`${route.library}/${route.component}/${route.example}`, async ({ page, goto }) => {
            await goto(route.path);

            await expect(page).toHaveScreenshot(`responsive/${route.library}/${route.component}-${route.example}.png`, {
                fullPage: true,
                maxDiffPixelRatio: 0.01,
                animations: 'disabled'
            });
        });
    }
});
