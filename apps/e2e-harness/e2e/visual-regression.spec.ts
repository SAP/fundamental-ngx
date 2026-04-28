import { expect, test } from '@playwright/test';

const routes = [
    { path: '/button/types', name: 'button-types' },
    { path: '/combobox/basic', name: 'combobox-basic' },
    { path: '/form-container/basic', name: 'form-container-basic' }
];

test.describe('Visual Regression', () => {
    for (const route of routes) {
        test(`${route.name} should match baseline screenshot`, async ({ page }) => {
            await page.goto(route.path);
            await page.waitForLoadState('networkidle');

            // Disable animations/transitions for stable screenshots
            await page.addStyleTag({
                content: `
                    *, *::before, *::after {
                        animation-duration: 0s !important;
                        animation-delay: 0s !important;
                        transition-duration: 0s !important;
                        transition-delay: 0s !important;
                    }
                `
            });

            // Small wait for style injection to take effect
            await page.waitForTimeout(100);

            await expect(page).toHaveScreenshot(`${route.name}.png`, {
                fullPage: true,
                maxDiffPixelRatio: 0.01
            });
        });
    }
});
