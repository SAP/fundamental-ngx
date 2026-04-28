import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
    { path: '/button/types', name: 'Button Types' },
    { path: '/combobox/basic', name: 'Combobox Basic' },
    { path: '/form-container/basic', name: 'Form Container Basic' }
];

// Rules excluded from the harness shell (not component-level issues)
const HARNESS_EXCLUDED_RULES = ['region', 'page-has-heading-one'];

test.describe('Accessibility Audit', () => {
    for (const route of routes) {
        test(`${route.name} should have no accessibility violations`, async ({ page }) => {
            await page.goto(route.path);
            await page.waitForLoadState('networkidle');

            const results = await new AxeBuilder({ page }).disableRules(HARNESS_EXCLUDED_RULES).analyze();

            const violations = results.violations.map((v) => ({
                id: v.id,
                impact: v.impact,
                description: v.description,
                nodes: v.nodes.length
            }));

            expect(violations).toEqual([]);
        });
    }
});
