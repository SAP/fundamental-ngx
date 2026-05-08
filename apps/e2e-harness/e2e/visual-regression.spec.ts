import { expect, test } from './fixtures/base.fixture';

test.describe('Visual Regression', () => {
    const sampleRoutes = [
        { path: 'core/button/types', name: 'core-button-types' },
        { path: 'core/combobox/combobox', name: 'core-combobox-basic' },
        { path: 'platform/form-container/form-basic', name: 'platform-form-container-basic' }
    ];

    for (const route of sampleRoutes) {
        test(`${route.name} should match baseline screenshot`, async ({ page, goto }) => {
            await goto(route.path);

            await expect(page).toHaveScreenshot(`${route.name}.png`, {
                fullPage: true,
                maxDiffPixelRatio: 0.01
            });
        });
    }
});
