import { test, expect } from '../../fixtures/base.fixture';

test.describe('Wizard Interaction', () => {
    test.beforeEach(async ({ goto, page }) => {
        await goto('core/wizard/wizard');
        const openButton = page.locator('button').filter({ hasText: /open full screen/i });
        await openButton.click();
        await page.locator('fd-wizard').waitFor({ state: 'visible' });
    });

    test('displays wizard with steps', async ({ page }) => {
        const wizard = page.locator('fd-wizard');
        await expect(wizard).toBeVisible();
        const steps = page.locator('.fd-wizard__step, li[fd-wizard-step]');
        expect(await steps.count()).toBeGreaterThan(1);
    });

    test('first step is active by default', async ({ page }) => {
        const activeStep = page.locator('.fd-wizard__step--current, .fd-wizard__step--active, li[fd-wizard-step][status="current"]');
        await expect(activeStep.first()).toBeVisible();
    });

    test('navigates to next step via button', async ({ page }) => {
        const nextButton = page.locator('fd-wizard-next-step button, button').filter({ hasText: /go to step 2/i }).first();
        await expect(nextButton).toBeVisible();
        await nextButton.click();
        const completedSteps = page.locator('.fd-wizard__step--completed');
        await expect(completedSteps.first()).toBeVisible();
    });

    test('completed steps are clickable for navigation back', async ({ page }) => {
        const nextButton = page.locator('fd-wizard-next-step button, button').filter({ hasText: /go to step 2/i }).first();
        await expect(nextButton).toBeVisible();
        await nextButton.click();
        const completedStep = page.locator('.fd-wizard__step--completed').first();
        await expect(completedStep).toBeVisible();
        await completedStep.click();
        const currentSteps = page.locator('.fd-wizard__step--current');
        await expect(currentSteps).toHaveCount(1);
    });
});
