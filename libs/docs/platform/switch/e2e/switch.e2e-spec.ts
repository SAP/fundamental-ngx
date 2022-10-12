import { SwitchPo } from './switch.po';
import {
    default_compact_switch_alternative_text,
    default_switch_alternative_text,
    disabled_switch_alternative_text,
    form_disabled_switch_alternative_text,
    semantic_compact_switch_alternative_text,
    semantic_switch_alternative_text
} from './swich-page-content';
import {
    browserIsIEorSafari,
    browserIsSafari,
    click,
    getAttributeByName,
    getCSSPropertyByName,
    getElementAriaLabel,
    getElementSize,
    isElementClickable,
    mouseHoverElement,
    pause,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Verify Switch component', () => {
    const switchPage = new SwitchPo();
    const {
        defaultSwitchLabel,
        defaultSwitchInput,
        defaultSwitchSizeAttr,
        defaultSwitchHandel,
        defaultCompactSwitchLabel,
        defaultCompactSwitchInput,
        defaultCompactSwitchSizeAttr,
        defaultCompactSwitchHandel,
        disabledSwitchLabel,
        disabledSwitchInput,
        disabledSwitchHandel,
        formDisabledSwitchLabel,
        formDisabledSwitchInput,
        formDisabledSwitchHandel,
        semanticSwitchLabel,
        semanticSwitchInput,
        semanticSwitchHandel,
        semanticSwitchIconOff,
        semanticSwitchIconOn,
        semanticCompactSwitchLabel,
        semanticCompactSwitchInput,
        semanticCompactSwitchHandel,
        semanticCompactSwitchIconOff,
        semanticCompactSwitchIconOn
    } = switchPage;

    beforeAll(async () => {
        await switchPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(switchPage.root);
        await waitForElDisplayed(switchPage.title);
    }, 1);

    describe('has default and compact switch and', () => {
        it('should default change something to active or inactive', async () => {
            // capture before state
            await waitForPresent(defaultSwitchInput);
            const isCheckedBefore = await getAttributeByName(defaultSwitchInput, 'aria-checked');
            await click(defaultSwitchHandel);
            // capture after state
            const isCheckedAfter = await getAttributeByName(defaultSwitchInput, 'aria-checked');

            await expect(isCheckedBefore).toBe('false', 'Default switch has incorrect state before click');
            await expect(isCheckedAfter).toBe('true', 'Default switch has incorrect state after click');
        });

        it('should compact change something to active or inactive', async () => {
            // capture before state
            const isCheckedBefore = await getAttributeByName(defaultCompactSwitchInput, 'aria-checked');
            await click(defaultCompactSwitchHandel);
            // capture after state
            const isCheckedAfter = await getAttributeByName(defaultCompactSwitchInput, 'aria-checked');

            await expect(isCheckedBefore).toBe('false', 'Default compact switch has incorrect state before click');
            await expect(isCheckedAfter).toBe('true', 'Default compact switch has incorrect state after click');
        });

        it('should default change state on hover', async () => {
            const handelColorBefore = await getCSSPropertyByName(defaultSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (await browserIsSafari()) {
                return;
            }

            await mouseHoverElement(defaultSwitchHandel);
            const handelColorAfter = await getCSSPropertyByName(defaultSwitchHandel, 'background-color');

            await expect(handelColorBefore.value).not.toBe(handelColorAfter.value);
        });

        it('should compact default change state on hover', async () => {
            const handelColorBefore = await getCSSPropertyByName(defaultCompactSwitchHandel, 'background-color');
            if (await browserIsIEorSafari()) {
                // mouse hover doesn't work for safari
                return;
            }
            await mouseHoverElement(defaultCompactSwitchHandel);
            const handelColorAfter = await getCSSPropertyByName(defaultCompactSwitchHandel, 'background-color');

            await expect(handelColorBefore.value).not.toBe(handelColorAfter.value);
        });

        it('compact switch should be smaller than default', async () => {
            await waitForPresent(defaultSwitchSizeAttr);
            await waitForElDisplayed(defaultSwitchSizeAttr);
            await waitForPresent(defaultCompactSwitchSizeAttr);
            await waitForElDisplayed(defaultCompactSwitchSizeAttr);
            const defaultSwitchSize = await getElementSize(defaultSwitchSizeAttr);
            const defaultCompactSwitchSize = await getElementSize(defaultCompactSwitchSizeAttr);

            await expect(defaultSwitchSize.height).toBeGreaterThan(defaultCompactSwitchSize.height, 'height');
            await expect(defaultSwitchSize.width).toBeGreaterThan(defaultCompactSwitchSize.width, 'width');
        });
    });

    describe('has disabled and disabled-form switch and ', () => {
        it('should not be able to interact with disabled switch', async () => {
            await scrollIntoView(disabledSwitchInput);
            const isClickable = await isElementClickable(disabledSwitchInput);
            await expect(isClickable).toBe(false);
        });

        it('should not be able to interact with disabled form switch', async () => {
            // TODO: Investigate problem with disabled switch in Safari
            if (await browserIsSafari()) {
                return;
            }
            await waitForPresent(formDisabledSwitchInput);
            await scrollIntoView(formDisabledSwitchInput);
            const isClickable = await isElementClickable(formDisabledSwitchInput);
            await expect(isClickable).toBe(false);
        });

        it('should not change state on hover', async () => {
            await waitForPresent(disabledSwitchHandel);
            const handelColorBefore = await getCSSPropertyByName(disabledSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(disabledSwitchHandel);
            await mouseHoverElement(disabledSwitchHandel);
            const handelColorAfter = await getCSSPropertyByName(disabledSwitchHandel, 'background-color');

            await expect(handelColorBefore.value).toBe(handelColorAfter.value);
        });

        it('form should not change state on hover', async () => {
            const handelColorBefore = await getCSSPropertyByName(formDisabledSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(formDisabledSwitchHandel);
            await mouseHoverElement(formDisabledSwitchHandel);
            const handelColorAfter = await getCSSPropertyByName(formDisabledSwitchHandel, 'background-color');

            await expect(handelColorBefore.value).toBe(handelColorAfter.value);
        });
    });

    it('should have alternative title or aria-label for all switches', async () => {
        await waitForPresent(defaultSwitchInput);
        const alternativeTextDefaultSwitch = await getElementAriaLabel(defaultSwitchLabel);
        const alternativeTextDefaultCompactSwitch = await getElementAriaLabel(defaultCompactSwitchLabel);
        const alternativeTextDisabledSwitch = await getElementAriaLabel(disabledSwitchLabel);
        const alternativeTextFormDisabledSwitch = await getElementAriaLabel(formDisabledSwitchLabel);
        const alternativeTextSemanticSwitch = await getElementAriaLabel(semanticSwitchLabel);
        const alternativeTextSemanticCompactFormDisabledSwitch = await getElementAriaLabel(semanticCompactSwitchLabel);

        await expect(alternativeTextDefaultSwitch).toBe(default_switch_alternative_text);
        await expect(alternativeTextDefaultCompactSwitch).toBe(default_compact_switch_alternative_text);
        await expect(alternativeTextDisabledSwitch).toBe(disabled_switch_alternative_text);
        await expect(alternativeTextFormDisabledSwitch).toBe(form_disabled_switch_alternative_text);
        await expect(alternativeTextSemanticSwitch).toBe(semantic_switch_alternative_text);
        await expect(alternativeTextSemanticCompactFormDisabledSwitch).toBe(semantic_compact_switch_alternative_text);
    });
    /*
    xit('test accessibility', async ()=> {
        const testResult = await runAxeTest('Test Switch component', $$('.docs-tile__content.docs-tile-content-example')
        .get(0).locator().value); // switchPage.root.locator().value
        expect(testResult.violations.length).toBe(0);
    });*/

    it('should have RTL orientation', async () => {
        await switchPage.checkRtlSwitch();
    });

    describe('has semantic switch and', () => {
        it('should change something from positive to negative', async () => {
            // capture before state
            const isCheckedBefore = await getAttributeByName(semanticSwitchInput, 'aria-checked');
            const onIconStateBefore = await getCSSPropertyByName(semanticSwitchIconOn, 'visibility');
            const offIconStateBefore = await getCSSPropertyByName(semanticSwitchIconOff, 'visibility');
            await click(semanticSwitchHandel);
            // pause for animation
            await pause(500);
            // capture after state
            const isCheckedAfter = await getAttributeByName(semanticSwitchInput, 'aria-checked');
            const onIconStateAfter = await getCSSPropertyByName(semanticSwitchIconOn, 'visibility');
            const offIconStateAfter = await getCSSPropertyByName(semanticSwitchIconOff, 'visibility');

            await expect(isCheckedBefore).toBe('false', 'Semantic switch has incorrect state before click');
            await expect(isCheckedAfter).toBe('true', 'Semantic switch has incorrect state after click');
            await expect(onIconStateBefore.value).toBe('hidden');
            await expect(offIconStateBefore.value).toBe('visible');
            await expect(onIconStateAfter.value).toBe('visible');
            await expect(offIconStateAfter.value).toBe('hidden');
        });

        it('compact should change something from positive to negative', async () => {
            // capture before state
            const isCheckedBefore = await getAttributeByName(semanticCompactSwitchInput, 'aria-checked');
            const onIconStateBefore = await getCSSPropertyByName(semanticCompactSwitchIconOn, 'visibility');
            const offIconStateBefore = await getCSSPropertyByName(semanticCompactSwitchIconOff, 'visibility');
            await click(semanticCompactSwitchHandel);
            // pause for animation
            await pause(500);
            // capture after state
            const isCheckedAfter = await getAttributeByName(semanticCompactSwitchInput, 'aria-checked');
            const onIconStateAfter = await getCSSPropertyByName(semanticCompactSwitchIconOn, 'visibility');
            const offIconStateAfter = await getCSSPropertyByName(semanticCompactSwitchIconOff, 'visibility');

            await expect(isCheckedBefore).toBe('true', 'Semantic compact switch has incorrect state before click');
            await expect(isCheckedAfter).toBe('false', 'Semantic compact switch has incorrect state after click');
            await expect(onIconStateBefore.value).toBe('visible');
            await expect(offIconStateBefore.value).toBe('hidden');
            await expect(onIconStateAfter.value).toBe('hidden');
            await expect(offIconStateAfter.value).toBe('visible');
        });

        it('should semantic change state on hover', async () => {
            const handelColorBefore = await getCSSPropertyByName(semanticSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (!(await browserIsIEorSafari())) {
                await scrollIntoView(semanticSwitchHandel);
                await mouseHoverElement(semanticSwitchHandel);
                const handelColorAfter = await getCSSPropertyByName(semanticSwitchHandel, 'background-color');

                await expect(handelColorBefore.value).not.toBe(handelColorAfter.value);
                return;
            }
            console.log('Skip for Safari and IE');
        });

        it('should semantic compact change state on hover', async () => {
            const handelColorBefore = await getCSSPropertyByName(semanticCompactSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(semanticCompactSwitchHandel);
            await mouseHoverElement(semanticCompactSwitchHandel);
            const handelColorAfter = await getCSSPropertyByName(semanticCompactSwitchHandel, 'background-color');

            await expect(handelColorBefore.value).not.toBe(handelColorAfter.value);
        });

        // No example given to verify
        /*        xit('should be able to display 2-3 letters', async () => {
        });*/
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await switchPage.saveExampleBaselineScreenshot();
            await expect(await switchPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    /* xdescribe('has correct page content', () => {
         // TODO: add page content checks
    });*/
});
