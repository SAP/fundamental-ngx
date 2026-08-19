import { type Page } from '@playwright/test';
import { expect, test } from '../../fixtures/base.fixture';

async function getContentWidth(page: Page): Promise<number> {
    return page.evaluate(() => {
        const overlay = document.querySelector('.fd-docs-fcl-example-overlay-content') as HTMLElement;
        return overlay ? overlay.scrollWidth : 1920;
    });
}

async function getContentHeight(page: Page): Promise<number> {
    return page.evaluate(() => {
        const overlay = document.querySelector('.fd-docs-fcl-example-overlay-content') as HTMLElement;
        return overlay ? overlay.scrollHeight : 1080;
    });
}

test.describe('Flexible Column Layout', () => {
    test('default example - fullscreen view', async ({ page, goto }) => {
        await goto('core/flexible-column-layout/default');
        const openButton = page.locator('button:has-text("Click to open full screen")');
        await openButton.click();
        await page.waitForTimeout(500);

        let contentWidth = await getContentWidth(page);
        let contentHeight = await getContentHeight(page);
        await page.setViewportSize({ width: contentWidth, height: contentHeight });
        await page.waitForTimeout(500);

        const overlayContent = page.locator('.fd-docs-fcl-example-overlay-content');
        await expect(overlayContent).toHaveScreenshot('core-flexible-column-layout-default-fullscreen.png', {
            animations: 'disabled'
        });

        // Open Column 2
        await page.locator('button:has-text("Open Column 2")').click();
        await page.waitForTimeout(1000);
        contentWidth = await getContentWidth(page);
        contentHeight = await getContentHeight(page);
        await page.setViewportSize({ width: contentWidth, height: contentHeight });
        await page.waitForTimeout(500);
        await expect(overlayContent).toHaveScreenshot('core-flexible-column-layout-default-with-mid-column.png', {
            animations: 'disabled'
        });

        // Open Column 3
        await page.locator('button:has-text("Open Column 3")').click();
        await page.waitForTimeout(1000);
        contentWidth = await getContentWidth(page);
        contentHeight = await getContentHeight(page);
        await page.setViewportSize({ width: contentWidth, height: contentHeight });
        await page.waitForTimeout(500);
        await expect(overlayContent).toHaveScreenshot('core-flexible-column-layout-default-with-three-columns.png', {
            animations: 'disabled'
        });
    });

    test('custom-config example - fullscreen view', async ({ page, goto }) => {
        await goto('core/flexible-column-layout/custom-config');
        const openButton = page.locator('button:has-text("Click to open full screen")');
        await openButton.click();
        await page.waitForTimeout(500);

        let contentWidth = await getContentWidth(page);
        let contentHeight = await getContentHeight(page);
        await page.setViewportSize({ width: contentWidth, height: contentHeight });
        await page.waitForTimeout(500);

        const overlayContent = page.locator('.fd-docs-fcl-example-overlay-content');
        await expect(overlayContent).toHaveScreenshot('core-flexible-column-layout-custom-config-fullscreen.png', {
            animations: 'disabled'
        });

        // Open Column 2
        await page.locator('button:has-text("Open Column 2")').click();
        await page.waitForTimeout(1000);
        contentWidth = await getContentWidth(page);
        contentHeight = await getContentHeight(page);
        await page.setViewportSize({ width: contentWidth, height: contentHeight });
        await page.waitForTimeout(500);
        await expect(overlayContent).toHaveScreenshot('core-flexible-column-layout-custom-config-with-mid-column.png', {
            animations: 'disabled'
        });

        // Open Column 3
        await page.locator('button:has-text("Open Column 3")').click();
        await page.waitForTimeout(1000);
        contentWidth = await getContentWidth(page);
        contentHeight = await getContentHeight(page);
        await page.setViewportSize({ width: contentWidth, height: contentHeight });
        await page.waitForTimeout(500);
        await expect(overlayContent).toHaveScreenshot(
            'core-flexible-column-layout-custom-config-with-three-columns.png',
            {
                animations: 'disabled'
            }
        );
    });

    test('dynamic-page example - fullscreen view', async ({ page, goto }) => {
        await goto('core/flexible-column-layout/dynamic-page');
        const openButton = page.locator('button:has-text("Click to open full screen")');
        await openButton.click();
        await page.waitForTimeout(500);

        let contentWidth = await getContentWidth(page);
        let contentHeight = await getContentHeight(page);
        await page.setViewportSize({ width: contentWidth, height: contentHeight });
        await page.waitForTimeout(500);

        const overlayContent = page.locator('.fd-docs-fcl-example-overlay-content');
        await expect(overlayContent).toHaveScreenshot('core-flexible-column-layout-dynamic-page-fullscreen.png', {
            animations: 'disabled'
        });

        // Open Column 2
        await page.locator('button:has-text("Open Column 2")').click();
        await page.waitForTimeout(1000);
        contentWidth = await getContentWidth(page);
        contentHeight = await getContentHeight(page);
        await page.setViewportSize({ width: contentWidth, height: contentHeight });
        await page.waitForTimeout(500);
        await expect(overlayContent).toHaveScreenshot('core-flexible-column-layout-dynamic-page-with-mid-column.png', {
            animations: 'disabled'
        });

        // Open Column 3
        await page.locator('button:has-text("Open Column 3")').click();
        await page.waitForTimeout(1000);
        contentWidth = await getContentWidth(page);
        contentHeight = await getContentHeight(page);
        await page.setViewportSize({ width: contentWidth, height: contentHeight });
        await page.waitForTimeout(500);
        await expect(overlayContent).toHaveScreenshot(
            'core-flexible-column-layout-dynamic-page-with-three-columns.png',
            {
                animations: 'disabled'
            }
        );
    });
});
