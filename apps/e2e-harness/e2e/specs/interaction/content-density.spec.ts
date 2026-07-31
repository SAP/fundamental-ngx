import { expect, test } from '../../fixtures/base.fixture';

/** Text content of the density label for the given host element's own status span. */
async function densityLabel(page: import('@playwright/test').Page, rootSelector: string): Promise<string> {
    const host = page.locator(rootSelector).first();
    const text = await host.evaluate((el) => {
        // For nested components: use :scope > to avoid picking up children's labels
        const own = el.querySelector(':scope > .example-component__object-status .fd-object-status__text');
        // For non-nested components (debug-mode, always-modifiers, custom-modifiers)
        const any = el.querySelector('.fd-object-status__text');
        return (own ?? any)?.textContent ?? '';
    });
    return text.trim().toLowerCase();
}

test.describe('core/content-density — service section', () => {
    test('fd-docs-content-density-user resolves cozy on load (default)', async ({ page, goto }) => {
        await goto('core/content-density/content-density');
        const label = await densityLabel(page, 'fd-docs-content-density-user');
        expect(label).toBe('cozy');
    });

    test('fd-docs-content-density-user host element has is-cozy class on load', async ({ page, goto }) => {
        await goto('core/content-density/content-density');
        const host = page.locator('fd-docs-content-density-user').first();
        await expect(host).toHaveClass(/is-cozy/);
    });
});

test.describe('core/content-density — directive-usage section', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/content-density/directive-usage');
    });

    test('top-level user (no directive) resolves cozy (global default)', async ({ page }) => {
        // The outermost fd-docs-content-density-user has no directive — follows global (cozy)
        const outerLabel = await densityLabel(page, 'fd-directive-usage-example > fd-docs-content-density-user');
        expect(outerLabel).toBe('cozy');
    });

    test('nested fdCozy user resolves cozy regardless of parent', async ({ page }) => {
        // Second-level fd-docs-content-density-user has fdCozy — must stay cozy
        const cozyNode = page.locator('fd-docs-content-density-user[fdcozy]').first();
        const label = await cozyNode.evaluate(
            (el) =>
                el
                    .querySelector(':scope > .example-component__object-status .fd-object-status__text')
                    ?.textContent?.trim()
                    .toLowerCase() ?? ''
        );
        expect(label).toBe('cozy');
    });

    test('fdCompact node inside fdCozy parent resolves compact (directive wins)', async ({ page }) => {
        // Third-level compact node, under fdCozy parent
        const compactNode = page.locator('fd-docs-content-density-user[fdcompact]').first();
        const label = await compactNode.evaluate(
            (el) =>
                el
                    .querySelector(':scope > .example-component__object-status .fd-object-status__text')
                    ?.textContent?.trim()
                    .toLowerCase() ?? ''
        );
        expect(label).toBe('compact');
    });

    test('restricted parent is cozy (fdCozy + restrictChildContentDensity)', async ({ page }) => {
        // fd-docs-restricted-density-user has restrict:true and fdCozy
        const restrictedParent = page.locator('fd-docs-restricted-density-user').first();
        const label = await restrictedParent.evaluate(
            (el) =>
                el
                    .querySelector(':scope > .example-component__object-status .fd-object-status__text')
                    ?.textContent?.trim()
                    .toLowerCase() ?? ''
        );
        expect(label).toBe('cozy');
    });

    test('child inside restricting parent shows cozy despite fdCompact directive (s8 guard)', async ({ page }) => {
        // First fd-docs-content-density-user inside fd-docs-restricted-density-user has fdCompact
        // After s8 fix: parent restrict:true forces child to follow parent (cozy)
        const restrictedChild = page
            .locator('fd-docs-restricted-density-user fd-docs-content-density-user[fdcompact]')
            .first();
        const label = await restrictedChild.evaluate(
            (el) =>
                el
                    .querySelector(':scope > .example-component__object-status .fd-object-status__text')
                    ?.textContent?.trim()
                    .toLowerCase() ?? ''
        );
        expect(label).toBe('cozy');
    });

    test('child inside restricting parent has is-cozy class (Bug 2 guard — class not stripped)', async ({ page }) => {
        // s1-b/Bug 2: dedup logic was stripping is-* class when parent resolved same density
        const restrictedChild = page
            .locator('fd-docs-restricted-density-user fd-docs-content-density-user[fdcompact]')
            .first();
        await expect(restrictedChild).toHaveClass(/is-cozy/);
        await expect(restrictedChild).not.toHaveClass(/is-compact/);
    });
});

test.describe('core/content-density — toggle-directive section', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/content-density/toggle-directive');
    });

    test('user resolves compact when checkbox is checked (fdCompact=true)', async ({ page }) => {
        // Default state: checkbox checked, fdCompact=true → compact
        const label = await densityLabel(page, 'fd-docs-content-density-user');
        expect(label).toBe('compact');
    });

    test('user reverts to global density when checkbox is unchecked (fdCompact=false)', async ({ page }) => {
        // Uncheck the checkbox → fdCompact=false → reverts to global (cozy default)
        const checkbox = page.locator('fd-checkbox').first();
        await checkbox.click();
        await page.waitForTimeout(100); // allow signal propagation
        const label = await densityLabel(page, 'fd-docs-content-density-user');
        // The example's global service defaults to cozy (no external toggle here — island)
        expect(label).toBe('cozy');
    });
});

test.describe('core/content-density — advanced-config: debug-mode', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/content-density/advanced-config/debug-mode');
    });

    test('resolves cozy on load (default)', async ({ page }) => {
        const label = await densityLabel(page, 'fd-docs-debug-mode-example');
        expect(label).toBe('cozy');
    });
});

test.describe('core/content-density — advanced-config: always-modifiers', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/content-density/advanced-config/always-modifiers');
    });

    test('resolves cozy on load (default)', async ({ page }) => {
        const label = await densityLabel(page, 'fd-docs-always-modifiers-example');
        expect(label).toBe('cozy');
    });
});

test.describe('core/content-density — advanced-config: custom-modifiers', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/content-density/advanced-config/custom-modifiers');
    });

    test('resolves cozy on load (default)', async ({ page }) => {
        const label = await densityLabel(page, 'fd-docs-custom-modifiers-example');
        expect(label).toBe('cozy');
    });

    test('host element has density--cozy class on load (custom modifier, not is-cozy)', async ({ page }) => {
        // CustomModifiersExampleComponent uses density--<value> classes, NOT is-* classes
        const host = page.locator('fd-docs-custom-modifiers-example .custom-mod').first();
        await expect(host).toHaveClass(/density--cozy/);
        await expect(host).not.toHaveClass(/density--compact/);
        await expect(host).not.toHaveClass(/density--condensed/);
    });
});

test.describe('core/content-density — advanced-config (full example with own toggle)', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/content-density/advanced-config/advanced-config');
    });

    test('debug-mode observer falls back to compact when condensed selected (s10 guard)', async ({ page }) => {
        // Click "Condensed" in the segmented button
        const condensedBtn = page.locator('button[fd-button]', { hasText: 'Condensed' }).first();
        await condensedBtn.click();
        await page.waitForTimeout(100);

        // DebugModeExampleComponent supports only [compact, cozy] → condensed falls back to compact
        const label = await densityLabel(page, 'fd-docs-debug-mode-example');
        expect(label).toBe('compact');

        // Class reflects the FALLBACK, not condensed
        const host = page.locator('fd-docs-debug-mode-example');
        await expect(host).toHaveClass(/is-compact/);
        await expect(host).not.toHaveClass(/is-condensed/);
    });

    test('always-modifiers observer resolves condensed when condensed selected (no fallback — all 3 supported)', async ({
        page
    }) => {
        const condensedBtn = page.locator('button[fd-button]', { hasText: 'Condensed' }).first();
        await condensedBtn.click();
        await page.waitForTimeout(100);

        // AlwaysModifiersExampleComponent supports [compact, cozy, condensed] → no fallback
        const label = await densityLabel(page, 'fd-docs-always-modifiers-example');
        expect(label).toBe('condensed');
    });

    test('custom-modifiers shows density--condensed class when condensed selected (s10 guard)', async ({ page }) => {
        const condensedBtn = page.locator('button[fd-button]', { hasText: 'Condensed' }).first();
        await condensedBtn.click();
        await page.waitForTimeout(100);

        // CustomModifiersExampleComponent reads GlobalContentDensityService directly → no fallback
        const host = page.locator('fd-docs-custom-modifiers-example .custom-mod').first();
        await expect(host).toHaveClass(/density--condensed/);
        await expect(host).not.toHaveClass(/density--compact/);
    });
});
