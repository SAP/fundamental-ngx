import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/base.fixture';

const routes = [
    { path: 'core/button/types', name: 'Button Types' },
    { path: 'core/combobox/combobox', name: 'Combobox Basic' },
    { path: 'platform/form-container/form-basic', name: 'Form Container Basic' }
];

const HARNESS_EXCLUDED_RULES = ['region', 'page-has-heading-one'];

test.describe('Accessibility Audit', () => {
    for (const route of routes) {
        test(`${route.name} should have no accessibility violations`, async ({ page, goto }) => {
            await goto(route.path);

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
