import { Page } from '@playwright/test';
import { expect, test } from '../../fixtures/base.fixture';

const ROUTE = 'core/illustrated-message/illustrated-message';
const FIGURE = 'figure[fd-illustrated-message]';

async function forceWidth(page: Page, px: number): Promise<void> {
    await page.evaluate(
        ({ selector, w }) => {
            const fig = document.querySelector(selector) as HTMLElement | null;
            if (!fig) {
                return;
            }
            fig.style.width = `${w}px`;
            fig.style.flex = '0 0 auto';
            window.dispatchEvent(new Event('resize'));
        },
        { selector: FIGURE, w: px }
    );
}

test.describe('core/illustrated-message', () => {
    const cases: Array<{ width: number; bucket: string }> = [
        { width: 800, bucket: 'large' },
        { width: 500, bucket: 'medium' },
        { width: 300, bucket: 'small' },
        { width: 200, bucket: 'xsmall' },
        { width: 120, bucket: 'base' }
    ];

    for (const { width, bucket } of cases) {
        test(`host width ${width}px maps to --${bucket}`, async ({ page, goto }) => {
            await goto(ROUTE);
            const figure = page.locator(FIGURE);
            await expect(figure).toBeVisible();

            await forceWidth(page, width);

            await expect(figure).toHaveClass(new RegExp(`\\bfd-illustrated-message--${bucket}\\b`));
        });
    }

    test('resize re-measures and updates the type bucket', async ({ page, goto }) => {
        await goto(ROUTE);
        const figure = page.locator(FIGURE);
        await expect(figure).toBeVisible();

        await forceWidth(page, 800);
        await expect(figure).toHaveClass(/\bfd-illustrated-message--large\b/);

        await forceWidth(page, 200);
        await expect(figure).toHaveClass(/\bfd-illustrated-message--xsmall\b/);
    });
});
