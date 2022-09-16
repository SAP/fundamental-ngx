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

    beforeAll(() => {
        switchPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(switchPage.root);
        waitForElDisplayed(switchPage.title);
    }, 1);

    describe('has default and compact switch and', () => {
        it('should default change something to active or inactive', () => {
            // capture before state
            waitForPresent(defaultSwitchInput);
            const isCheckedBefore = getAttributeByName(defaultSwitchInput, 'aria-checked');
            click(defaultSwitchHandel);
            // capture after state
            const isCheckedAfter = getAttributeByName(defaultSwitchInput, 'aria-checked');

            expect(isCheckedBefore).toBe('false', 'Default switch has incorrect state before click');
            expect(isCheckedAfter).toBe('true', 'Default switch has incorrect state after click');
        });

        it('should compact change something to active or inactive', () => {
            // capture before state
            const isCheckedBefore = getAttributeByName(defaultCompactSwitchInput, 'aria-checked');
            click(defaultCompactSwitchHandel);
            // capture after state
            const isCheckedAfter = getAttributeByName(defaultCompactSwitchInput, 'aria-checked');

            expect(isCheckedBefore).toBe('false', 'Default compact switch has incorrect state before click');
            expect(isCheckedAfter).toBe('true', 'Default compact switch has incorrect state after click');
        });

        it('should default change state on hover', () => {
            const handelColorBefore = getCSSPropertyByName(defaultSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browserIsSafari()) {
                return;
            }

            mouseHoverElement(defaultSwitchHandel);
            const handelColorAfter = getCSSPropertyByName(defaultSwitchHandel, 'background-color');

            expect(handelColorBefore.value).not.toBe(handelColorAfter.value);
        });

        it('should compact default change state on hover', () => {
            const handelColorBefore = getCSSPropertyByName(defaultCompactSwitchHandel, 'background-color');
            if (browserIsIEorSafari()) {
                // mouse hover doesn't work for safari
                return;
            }
            mouseHoverElement(defaultCompactSwitchHandel);
            const handelColorAfter = getCSSPropertyByName(defaultCompactSwitchHandel, 'background-color');

            expect(handelColorBefore.value).not.toBe(handelColorAfter.value);
        });

        it('compact switch should be smaller than default', () => {
            waitForPresent(defaultSwitchSizeAttr);
            waitForElDisplayed(defaultSwitchSizeAttr);
            waitForPresent(defaultCompactSwitchSizeAttr);
            waitForElDisplayed(defaultCompactSwitchSizeAttr);
            const defaultSwitchSize = getElementSize(defaultSwitchSizeAttr);
            const defaultCompactSwitchSize = getElementSize(defaultCompactSwitchSizeAttr);

            expect(defaultSwitchSize.height).toBeGreaterThan(defaultCompactSwitchSize.height, 'height');
            expect(defaultSwitchSize.width).toBeGreaterThan(defaultCompactSwitchSize.width, 'width');
        });
    });

    describe('has disabled and disabled-form switch and ', () => {
        it('should not be able to interact with disabled switch', () => {
            scrollIntoView(disabledSwitchInput);
            const isClickable = isElementClickable(disabledSwitchInput);
            expect(isClickable).toBe(false);
        });

        it('should not be able to interact with disabled form switch', () => {
            // TODO: Investigate problem with disabled switch in Safari
            if (browserIsSafari()) {
                return;
            }
            waitForPresent(formDisabledSwitchInput);
            scrollIntoView(formDisabledSwitchInput);
            const isClickable = isElementClickable(formDisabledSwitchInput);
            expect(isClickable).toBe(false);
        });

        it('should not change state on hover', () => {
            waitForPresent(disabledSwitchHandel);
            const handelColorBefore = getCSSPropertyByName(disabledSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browserIsSafari()) {
                return;
            }
            scrollIntoView(disabledSwitchHandel);
            mouseHoverElement(disabledSwitchHandel);
            const handelColorAfter = getCSSPropertyByName(disabledSwitchHandel, 'background-color');

            expect(handelColorBefore.value).toBe(handelColorAfter.value);
        });

        it('form should not change state on hover', () => {
            const handelColorBefore = getCSSPropertyByName(formDisabledSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browserIsSafari()) {
                return;
            }
            scrollIntoView(formDisabledSwitchHandel);
            mouseHoverElement(formDisabledSwitchHandel);
            const handelColorAfter = getCSSPropertyByName(formDisabledSwitchHandel, 'background-color');

            expect(handelColorBefore.value).toBe(handelColorAfter.value);
        });
    });

    it('should have alternative title or aria-label for all switches', () => {
        waitForPresent(defaultSwitchInput);
        const alternativeTextDefaultSwitch = getElementAriaLabel(defaultSwitchLabel);
        const alternativeTextDefaultCompactSwitch = getElementAriaLabel(defaultCompactSwitchLabel);
        const alternativeTextDisabledSwitch = getElementAriaLabel(disabledSwitchLabel);
        const alternativeTextFormDisabledSwitch = getElementAriaLabel(formDisabledSwitchLabel);
        const alternativeTextSemanticSwitch = getElementAriaLabel(semanticSwitchLabel);
        const alternativeTextSemanticCompactFormDisabledSwitch = getElementAriaLabel(semanticCompactSwitchLabel);

        expect(alternativeTextDefaultSwitch).toBe(default_switch_alternative_text);
        expect(alternativeTextDefaultCompactSwitch).toBe(default_compact_switch_alternative_text);
        expect(alternativeTextDisabledSwitch).toBe(disabled_switch_alternative_text);
        expect(alternativeTextFormDisabledSwitch).toBe(form_disabled_switch_alternative_text);
        expect(alternativeTextSemanticSwitch).toBe(semantic_switch_alternative_text);
        expect(alternativeTextSemanticCompactFormDisabledSwitch).toBe(semantic_compact_switch_alternative_text);
    });
    /*
    xit('test accessibility', async ()=> {
        const testResult = await runAxeTest('Test Switch component', $$('.docs-tile__content.docs-tile-content-example')
        .get(0).locator().value); // switchPage.root.locator().value
        expect(testResult.violations.length).toBe(0);
    });*/

    it('should have RTL orientation', () => {
        switchPage.checkRtlSwitch();
    });

    describe('has semantic switch and', () => {
        it('should change something from positive to negative', () => {
            // capture before state
            const isCheckedBefore = getAttributeByName(semanticSwitchInput, 'aria-checked');
            const onIconStateBefore = getCSSPropertyByName(semanticSwitchIconOn, 'visibility');
            const offIconStateBefore = getCSSPropertyByName(semanticSwitchIconOff, 'visibility');
            click(semanticSwitchHandel);
            // pause for animation
            pause(500);
            // capture after state
            const isCheckedAfter = getAttributeByName(semanticSwitchInput, 'aria-checked');
            const onIconStateAfter = getCSSPropertyByName(semanticSwitchIconOn, 'visibility');
            const offIconStateAfter = getCSSPropertyByName(semanticSwitchIconOff, 'visibility');

            expect(isCheckedBefore).toBe('false', 'Semantic switch has incorrect state before click');
            expect(isCheckedAfter).toBe('true', 'Semantic switch has incorrect state after click');
            expect(onIconStateBefore.value).toBe('hidden');
            expect(offIconStateBefore.value).toBe('visible');
            expect(onIconStateAfter.value).toBe('visible');
            expect(offIconStateAfter.value).toBe('hidden');
        });

        it('compact should change something from positive to negative', () => {
            // capture before state
            const isCheckedBefore = getAttributeByName(semanticCompactSwitchInput, 'aria-checked');
            const onIconStateBefore = getCSSPropertyByName(semanticCompactSwitchIconOn, 'visibility');
            const offIconStateBefore = getCSSPropertyByName(semanticCompactSwitchIconOff, 'visibility');
            click(semanticCompactSwitchHandel);
            // pause for animation
            pause(500);
            // capture after state
            const isCheckedAfter = getAttributeByName(semanticCompactSwitchInput, 'aria-checked');
            const onIconStateAfter = getCSSPropertyByName(semanticCompactSwitchIconOn, 'visibility');
            const offIconStateAfter = getCSSPropertyByName(semanticCompactSwitchIconOff, 'visibility');

            expect(isCheckedBefore).toBe('true', 'Semantic compact switch has incorrect state before click');
            expect(isCheckedAfter).toBe('false', 'Semantic compact switch has incorrect state after click');
            expect(onIconStateBefore.value).toBe('visible');
            expect(offIconStateBefore.value).toBe('hidden');
            expect(onIconStateAfter.value).toBe('hidden');
            expect(offIconStateAfter.value).toBe('visible');
        });

        it('should semantic change state on hover', () => {
            const handelColorBefore = getCSSPropertyByName(semanticSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (!browserIsIEorSafari()) {
                scrollIntoView(semanticSwitchHandel);
                mouseHoverElement(semanticSwitchHandel);
                const handelColorAfter = getCSSPropertyByName(semanticSwitchHandel, 'background-color');

                expect(handelColorBefore.value).not.toBe(handelColorAfter.value);
                return;
            }
            console.log('Skip for Safari and IE');
        });

        it('should semantic compact change state on hover', () => {
            const handelColorBefore = getCSSPropertyByName(semanticCompactSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browserIsSafari()) {
                return;
            }
            scrollIntoView(semanticCompactSwitchHandel);
            mouseHoverElement(semanticCompactSwitchHandel);
            const handelColorAfter = getCSSPropertyByName(semanticCompactSwitchHandel, 'background-color');

            expect(handelColorBefore.value).not.toBe(handelColorAfter.value);
        });

        // No example given to verify
        /*        xit('should be able to display 2-3 letters', async () => {
        });*/
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            switchPage.saveExampleBaselineScreenshot();
            expect(switchPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    /* xdescribe('has correct page content', () => {
         // TODO: add page content checks
    });*/
});
