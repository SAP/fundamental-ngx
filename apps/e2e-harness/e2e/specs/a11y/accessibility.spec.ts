import { readFileSync } from 'fs';
import { resolve } from 'path';
import { test } from '../../fixtures/axe.fixture';
import { RouteEntry } from '../../fixtures/base.fixture';

interface SkipEntry {
    route: string;
    reason: string;
}

interface RoutesManifest {
    count: number;
    routes: RouteEntry[];
}

const ROUTES_JSON_PATH = resolve(__dirname, '../../config/e2e.routes.json');
const SKIP_PATH = resolve(__dirname, '../../config/e2e.skip.json');

const manifest: RoutesManifest = JSON.parse(readFileSync(ROUTES_JSON_PATH, 'utf-8'));
const skipList: { skipped: SkipEntry[] } = JSON.parse(readFileSync(SKIP_PATH, 'utf-8'));

const skippedRoutes = new Set(skipList.skipped.map((s) => s.route));
const testableRoutes = manifest.routes.filter((r) => !skippedRoutes.has(r.path));

test.describe('Accessibility sweep', () => {
    test.setTimeout(60_000);

    for (const route of testableRoutes) {
        test(`a11y: ${route.library}/${route.component}/${route.example}`, async ({ page, expectNoA11yViolations }) => {
            await page.goto(`/${route.path}`, { waitUntil: 'domcontentloaded' });
            await page.waitForTimeout(1000);
            await expectNoA11yViolations(page, route.path);
        });
    }
});
