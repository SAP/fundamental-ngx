import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/date-picker', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/date-picker/single');
    });

    test('opens calendar on button click', async ({ page }) => {
        const datePickerButton = page.locator('fd-date-picker button[aria-label]').first();
        await datePickerButton.click();
        const calendar = page.locator('fd-calendar');
        await expect(calendar).toBeVisible();
    });

    test('selects a date from calendar', async ({ page }) => {
        const datePickerButton = page.locator('fd-date-picker button[aria-label]').first();
        await datePickerButton.click();
        const calendar = page.locator('fd-calendar');
        await expect(calendar).toBeVisible();
        const dayCell = calendar.locator('td[role="gridcell"]:not(.fd-calendar__item--other)').nth(14);
        await dayCell.click();
        await expect(calendar).toBeHidden();
        const input = page.locator('fd-date-picker input').first();
        await expect(input).not.toHaveValue('');
    });

    test('navigates months with arrow buttons', async ({ page }) => {
        const datePickerButton = page.locator('fd-date-picker button[aria-label]').first();
        await datePickerButton.click();
        const calendar = page.locator('.cdk-overlay-container fd-calendar, fd-calendar').first();
        await expect(calendar).toBeVisible();
        const monthButton = calendar.locator('button[data-fd-calendar-month]');
        const initialMonth = await monthButton.getAttribute('data-fd-calendar-month');
        const rightArrow = calendar.locator('.fd-calendar__action--arrow-right button');
        await rightArrow.click();
        await expect(monthButton).not.toHaveAttribute('data-fd-calendar-month', initialMonth as string);
    });

    test('closes calendar on Escape', async ({ page }) => {
        const datePickerButton = page.locator('fd-date-picker button[aria-label]').first();
        await datePickerButton.click();
        const calendar = page.locator('fd-calendar');
        await expect(calendar).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(calendar).toBeHidden();
    });

    test('allows keyboard input in date field', async ({ page }) => {
        const input = page.locator('fd-date-picker input').first();
        await input.click();
        await input.fill('5/15/2026');
        await input.press('Tab');
        await expect(input).toHaveValue('5/15/2026');
    });
});
