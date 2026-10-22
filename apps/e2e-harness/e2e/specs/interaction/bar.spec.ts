import { expect, test } from '../../fixtures/base.fixture';

test.describe('ui5/bar', () => {
    test('keeps the default Bar structural without toolbar semantics', async ({ page, goto }) => {
        await goto('ui5/bar/basic');
        await expect(page.locator('ui5-bar')).not.toHaveAttribute('role', 'toolbar');
    });

    test('renders icons without SAP-icons-v5 loader errors', async ({ page, goto }) => {
        const consoleErrors: string[] = [];
        page.on('console', (message) => {
            if (message.type() === 'error') {
                consoleErrors.push(message.text());
            }
        });
        await goto('ui5/bar/basic');
        const iconButtons = page.locator('ui5-bar ui5-button');
        await expect(iconButtons).toHaveCount(2);
        const icons = await iconButtons.evaluateAll((buttons) =>
            buttons.map((button) => ({
                name: button.getAttribute('icon'),
                hasPath: Boolean(button.shadowRoot?.querySelector('ui5-icon')?.shadowRoot?.querySelector('svg path'))
            }))
        );
        expect({
            missingLoaderErrors: consoleErrors.filter((message) => message.includes('SAP-icons-v5')),
            icons
        }).toEqual({
            missingLoaderErrors: [],
            icons: [
                { name: 'home', hasPath: true },
                { name: 'action-settings', hasPath: true }
            ]
        });
    });
});
