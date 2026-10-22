import { Locator } from '@playwright/test';
import { expect, test } from '../../fixtures/base.fixture';

function textArea(page: import('@playwright/test').Page, counterMode: 'None' | 'Auto' | 'Always'): Locator {
    return page.locator('ui5-textarea[counter-mode="' + counterMode + '"]');
}

function textAreaInput(textAreaLocator: Locator): Locator {
    return textAreaLocator.locator('textarea');
}

function characterCounter(textAreaLocator: Locator): Locator {
    return textAreaLocator.locator('.ui5-textarea-exceeded-text');
}

test.describe('ui5/text-area', () => {
    test('uses None mode for a hard limit without a counter', async ({ page, goto }) => {
        await goto('ui5/text-area/character-counter-modes');
        const none = textArea(page, 'None');
        const input = textAreaInput(none);
        await expect(none).toBeVisible();
        await expect(characterCounter(none)).toHaveCount(0);
        const maxLength = Number(await input.getAttribute('maxlength'));
        expect(maxLength).toBeGreaterThan(0);
        await input.fill('x'.repeat(maxLength + 1));
        await expect(input).toHaveValue('x'.repeat(maxLength));
    });

    test('shows the Auto counter on focus without changing height', async ({ page, goto }) => {
        await goto('ui5/text-area/character-counter-modes');
        const auto = textArea(page, 'Auto');
        const input = textAreaInput(auto);
        const counter = characterCounter(auto);
        await expect(auto).toBeVisible();
        const beforeFocus = await auto.boundingBox();
        await expect(counter).toBeHidden();
        await input.focus();
        await expect(counter).toBeVisible();
        expect((await auto.boundingBox())?.height).toBe(beforeFocus?.height);
        const maxLength = Number(await auto.getAttribute('maxlength'));
        const value = 'x'.repeat(maxLength + 1);
        await input.fill(value);
        await expect(input).toHaveValue(value);
    });

    test('keeps the Always counter visible and allows text beyond its limit', async ({ page, goto }) => {
        await goto('ui5/text-area/character-counter-modes');
        const always = textArea(page, 'Always');
        const input = textAreaInput(always);
        await expect(always).toBeVisible();
        await expect(characterCounter(always)).toBeVisible();
        const maxLength = Number(await always.getAttribute('maxlength'));
        const value = 'x'.repeat(maxLength + 1);
        await input.fill(value);
        await expect(input).toHaveValue(value);
    });

    test('derives every accessible name from its visible label', async ({ page, goto }) => {
        await goto('ui5/text-area/character-counter-modes');
        const textAreas = [
            ['None', 'None — hard limit (100)', 'None — hard limit (100)', 'The counter is never shown'],
            [
                'Auto',
                'Auto — counter on focus (100)',
                'Auto — counter on focus (100) 100 characters left',
                'Focus to reveal the counter'
            ],
            [
                'Always',
                'Always — soft limit (100)',
                'Always — soft limit (100) 100 characters left',
                'The counter is always visible'
            ]
        ] as const;
        for (const [counterMode, labelText, accessibleName, placeholder] of textAreas) {
            const label = page.locator('label', { hasText: labelText });
            const area = textArea(page, counterMode);
            const input = textAreaInput(area);
            const labelId = await label.getAttribute('id');
            expect(labelId).not.toBeNull();
            await expect(area).toHaveAttribute('accessible-name-ref', labelId as string);
            await expect(input).toHaveAccessibleName(accessibleName);
            await expect(input).not.toHaveAccessibleName(placeholder);
        }
    });
});
