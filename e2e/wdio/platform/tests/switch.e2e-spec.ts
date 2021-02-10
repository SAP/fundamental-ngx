import { SwitchPo } from '../pages/switch.po';
import switchPageContent from '../fixtures/appData/swich-page-content';
import {
    browserIsIE,
    browserIsIEorSafari,
    browserIsSafari,
    click,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getElementSize,
    isElementClickable,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';

describe('Verify Switch component', function() {
    const switchPage = new SwitchPo();
    beforeAll(() => {
        switchPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(switchPage.root, 0, 20000);
    }, 1);

    describe('has default and compact switch and', function() {
        it('should default change something to active or inactive', () => {
            // capture before state
            waitForPresent(switchPage.defaultSwitchInput);
            const isCheckedBefore = getAttributeByName(switchPage.defaultSwitchInput, 'aria-checked');
            const handelColorBefore = getCSSPropertyByName(switchPage.defaultSwitchHandel, 'background-color');
            click(switchPage.defaultSwitchHandel);
            // capture after state
            const isCheckedAfter = getAttributeByName(switchPage.defaultSwitchInput, 'aria-checked');
            const handelColorAfter = getCSSPropertyByName(switchPage.defaultSwitchHandel, 'background-color');

            expect(isCheckedBefore).toBe('false', 'Default switch has incorrect state before click');
            expect(handelColorBefore.value).toContain('255,255,255');
            expect(isCheckedAfter).toBe('true', 'Default switch has incorrect state after click');
            expect(handelColorAfter.value).toContain('8,84,160');
        });

        it('should compact change something to active or inactive', () => {
            // capture before state
            const isCheckedBefore = getAttributeByName(switchPage.defaultCompactSwitchInput, 'aria-checked');
            const handelColorBefore = getCSSPropertyByName(switchPage.defaultCompactSwitchHandel, 'background-color');
            click(switchPage.defaultCompactSwitchHandel);
            // capture after state
            const isCheckedAfter = getAttributeByName(switchPage.defaultCompactSwitchInput, 'aria-checked');
            const handelColorAfter = getCSSPropertyByName(switchPage.defaultCompactSwitchHandel, 'background-color');

            expect(isCheckedBefore).toBe('false', 'Default compact switch has incorrect state before click');
            expect(handelColorBefore.value).toContain('255,255,255');
            expect(isCheckedAfter).toBe('true', 'Default compact switch has incorrect state after click');
            expect(handelColorAfter.value).toContain('8,84,160');
        });

        it('should default change state on hover', () => {
            const handelColorBefore = getCSSPropertyByName(switchPage.defaultSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }

            mouseHoverElement(switchPage.defaultSwitchHandel);
            const handelColorAfter = getCSSPropertyByName(switchPage.defaultSwitchHandel, 'background-color');

            expect(handelColorBefore.value).toContain('255,255,255');
            expect(handelColorAfter.value).toContain('235,245,254');
        });

        it('should compact default change state on hover', () => {
            const handelColorBefore = getCSSPropertyByName(switchPage.defaultCompactSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            mouseHoverElement(switchPage.defaultCompactSwitchHandel);
            const handelColorAfter = getCSSPropertyByName(switchPage.defaultCompactSwitchHandel, 'background-color');

            expect(handelColorBefore.value).toContain('255,255,255');
            expect(handelColorAfter.value).toContain('235,245,254');
        });

        it('compact switch should be smaller than default', () => {
            waitForPresent(switchPage.defaultSwitchSize);
            waitForElDisplayed(switchPage.defaultSwitchSize);
            waitForPresent(switchPage.defaultCompactSwitchSize);
            waitForElDisplayed(switchPage.defaultCompactSwitchSize);
            const defaultSwitchSize = getElementSize(switchPage.defaultSwitchSize);
            const defaultCompactSwitchSize = getElementSize(switchPage.defaultCompactSwitchSize);

            expect(defaultSwitchSize.height).toBeGreaterThan(defaultCompactSwitchSize.height, 'height');
            expect(defaultSwitchSize.width).toBeGreaterThan(defaultCompactSwitchSize.width, 'width');
        });
    });

    describe('has disabled and disabled-form switch and ', function() {
        it('should not be able to interact with disabled switch', () => {
            scrollIntoView(switchPage.disabledSwitchInput);
            const isClickable = isElementClickable(switchPage.disabledSwitchInput);
            expect(isClickable).toBe(false);
        });

        it('should not be able to interact with disabled form switch', () => {
            // TODO: Investigate problem with disabled switch in Safari
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            waitForPresent(switchPage.formDisabledSwitchInput);
            scrollIntoView(switchPage.formDisabledSwitchInput);
            const isClickable = isElementClickable(switchPage.formDisabledSwitchInput);
            expect(isClickable).toBe(false);
        });

        it('should not change state on hover', () => {
            waitForPresent(switchPage.disabledSwitchHandel);
            const handelColorBefore = getCSSPropertyByName(switchPage.disabledSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browserIsSafari()) {
                console.log('Skip for Safari');
                return;
            }
            scrollIntoView(switchPage.disabledSwitchHandel);
            mouseHoverElement(switchPage.disabledSwitchHandel);
            const handelColorAfter = getCSSPropertyByName(switchPage.disabledSwitchHandel, 'background-color');

            expect(handelColorBefore.value).toBe(handelColorAfter.value);
        });

        it('form should not change state on hover', () => {
            const handelColorBefore = getCSSPropertyByName(switchPage.formDisabledSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browserIsSafari()) {
                console.log('Skip for Safari');
                return;
            }
            scrollIntoView(switchPage.formDisabledSwitchHandel);
            mouseHoverElement(switchPage.formDisabledSwitchHandel);
            const handelColorAfter = getCSSPropertyByName(switchPage.formDisabledSwitchHandel, 'background-color');

            expect(handelColorBefore.value).toBe(handelColorAfter.value);
        });
    });


    it('should have alternative title or aria-label for all switches', () => {
        waitForPresent(switchPage.defaultSwitchInput);
        const alternativeTextDefaultSwitch = getAttributeByName(switchPage.defaultSwitchLabel, 'aria-label');
        const alternativeTextDefaultCompactSwitch = getAttributeByName(switchPage.defaultCompactSwitchLabel, 'aria-label');
        const alternativeTextDisabledSwitch = getAttributeByName(switchPage.disabledSwitchLabel, 'aria-label');
        const alternativeTextFormDisabledSwitch = getAttributeByName(switchPage.formDisabledSwitchLabel, 'aria-label');
        const alternativeTextSemanticSwitch = getAttributeByName(switchPage.semanticSwitchLabel, 'aria-label');
        const alternativeTextSemanticCompactFormDisabledSwitch = getAttributeByName(switchPage.semanticCompactSwitchLabel, 'aria-label');

        expect(alternativeTextDefaultSwitch).toBe(switchPageContent.default_switch_alternative_text);
        expect(alternativeTextDefaultCompactSwitch).toBe(switchPageContent.default_compact_switch_alternative_text);
        expect(alternativeTextDisabledSwitch).toBe(switchPageContent.disabled_switch_alternative_text);
        expect(alternativeTextFormDisabledSwitch).toBe(switchPageContent.form_disabled_switch_alternative_text);
        expect(alternativeTextSemanticSwitch).toBe(switchPageContent.semantic_switch_alternative_text);
        expect(alternativeTextSemanticCompactFormDisabledSwitch).toBe(switchPageContent.semantic_compact_switch_alternative_text);
    });
    /*
    xit('test accessibility', async ()=> {
        const testResult = await runAxeTest('Test Switch component', $$('.docs-tile__content.docs-tile-content-example')
        .get(0).locator().value); // switchPage.root.locator().value
        expect(testResult.violations.length).toBe(0);
    });*/


    it('should have RTL orientation', () => {
        const arrL = getElementArrayLength(switchPage.exampleAreaContainersArr);
        for (let i = 0; arrL > i; i++) {
            scrollIntoView(switchPage.exampleAreaContainersArr, i);
            expect(getCSSPropertyByName(switchPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ' + i);
            const dirValueBefore = getAttributeByName(switchPage.exampleAreaContainersArr, 'dir', i);
            expect([null, '']).toContain(dirValueBefore);
            click(switchPage.rtlSwitcherArr, i);
            expect(getCSSPropertyByName(switchPage.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
            expect(getAttributeByName(switchPage.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
        }
    });

    describe('has semantic switch and', function() {
        it('should change something from positive to negative', () => {
            if (browserIsIE()) {
                console.log('Skip for IE');
                return;
            }

            // capture before state
            const isCheckedBefore = getAttributeByName(switchPage.semanticSwitchInput, 'aria-checked');
            const onIconStateBefore = getCSSPropertyByName(switchPage.semanticSwitchIconOn, 'visibility');
            const offIconStateBefore = getCSSPropertyByName(switchPage.semanticSwitchIconOff, 'visibility');
            click(switchPage.semanticSwitchHandel);
            // capture after state
            const isCheckedAfter = getAttributeByName(switchPage.semanticSwitchInput, 'aria-checked');
            const onIconStateAfter = getCSSPropertyByName(switchPage.semanticSwitchIconOn, 'visibility');
            const offIconStateAfter = getCSSPropertyByName(switchPage.semanticSwitchIconOff, 'visibility');

            expect(isCheckedBefore).toBe('false', 'Semantic switch has incorrect state before click');
            expect(isCheckedAfter).toBe('true', 'Semantic switch has incorrect state after click');
            expect(onIconStateBefore.value).toBe('hidden');
            expect(offIconStateBefore.value).toBe('visible');
            expect(onIconStateAfter.value).toBe('visible');
            expect(offIconStateAfter.value).toBe('hidden');
        });

        it('compact should change something from positive to negative', () => {
            // capture before state
            const isCheckedBefore = getAttributeByName(switchPage.semanticCompactSwitchInput, 'aria-checked');
            const onIconStateBefore = getCSSPropertyByName(switchPage.semanticCompactSwitchIconOn, 'visibility');
            const offIconStateBefore = getCSSPropertyByName(switchPage.semanticCompactSwitchIconOff, 'visibility');
            click(switchPage.semanticCompactSwitchHandel);
            // capture after state
            const isCheckedAfter = getAttributeByName(switchPage.semanticCompactSwitchInput, 'aria-checked');
            const onIconStateAfter = getCSSPropertyByName(switchPage.semanticCompactSwitchIconOn, 'visibility');
            const offIconStateAfter = getCSSPropertyByName(switchPage.semanticCompactSwitchIconOff, 'visibility');

            expect(isCheckedBefore).toBe('true', 'Semantic compact switch has incorrect state before click');
            expect(isCheckedAfter).toBe('false', 'Semantic compact switch has incorrect state after click');
            expect(onIconStateBefore.value).toBe('visible');
            expect(offIconStateBefore.value).toBe('hidden');
            expect(onIconStateAfter.value).toBe('hidden');
            expect(offIconStateAfter.value).toBe('visible');
        });

        it('should semantic change state on hover', () => {
            const handelColorBefore = getCSSPropertyByName(switchPage.semanticSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (!browserIsIEorSafari()) {
                scrollIntoView(switchPage.semanticSwitchHandel);
                mouseHoverElement(switchPage.semanticSwitchHandel);
                const handelColorAfter = getCSSPropertyByName(switchPage.semanticSwitchHandel, 'background-color');

                expect(handelColorBefore.value).toContain('255,255,255');
                expect(handelColorAfter.value).toContain('255,235,235');
                return;
            }
            console.log('Skip for Safari and IE');
        });

        it('should semantic compact change state on hover', () => {
            const handelColorBefore = getCSSPropertyByName(switchPage.semanticCompactSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            scrollIntoView(switchPage.semanticCompactSwitchHandel);
            mouseHoverElement(switchPage.semanticCompactSwitchHandel);
            const handelColorAfter = getCSSPropertyByName(switchPage.semanticCompactSwitchHandel, 'background-color');

            expect(handelColorBefore.value).toContain('255,255,255');
            expect(handelColorAfter.value).toContain('241,253,246');

        });

        // No example given to verify
        /*        xit('should be able to display 2-3 letters', async () => {
        });*/
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            switchPage.saveExampleBaselineScreenshot('switch');
            expect(switchPage.compareWithBaseline('switch')).toBeLessThan(1);
        });
    });


    /*xdescribe('has correct page content', function() {
         // TODO: add page content checks
    });*/
});
