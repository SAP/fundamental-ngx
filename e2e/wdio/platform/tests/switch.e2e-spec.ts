import { SwitchPo } from '../pages/switch.po';
import switchPageContent from '../fixtures/appData/swich-page-content';
import { webDriver } from '../../driver/wdio';

describe('Verify Switch component', function() {
    const switchPage = new SwitchPo();
    beforeAll(() => {
        switchPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
        webDriver.waitForDisplayed(switchPage.root, 0, 10000);
    });

    describe('has default and compact switch and', function() {
        it('should default change something to active or inactive', () => {
            // capture before state
            webDriver.waitElementToBePresentInDOM(switchPage.defaultSwitch);
            const isCheckedBefore = webDriver.getAttributeByName(switchPage.defaultSwitch, 'aria-checked');
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.defaultSwitchHandel, 'background-color');
            webDriver.click(switchPage.defaultSwitchHandel);
            // capture after state
            const isCheckedAfter = webDriver.getAttributeByName(switchPage.defaultSwitch, 'aria-checked');
            const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.defaultSwitchHandel, 'background-color');

            expect(isCheckedBefore).toBe('false', 'Default switch has incorrect state before click');
            expect(handelColorBefore.value).toContain('255,255,255');
            expect(isCheckedAfter).toBe('true', 'Default switch has incorrect state after click');
            expect(handelColorAfter.value).toContain('8,84,160');
        });

        it('should compact change something to active or inactive', () => {
            // capture before state
            const isCheckedBefore = webDriver.getAttributeByName(switchPage.defaultCompactSwitch, 'aria-checked');
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.defaultCompactSwitchHandel, 'background-color');
            webDriver.click(switchPage.defaultCompactSwitchHandel);
            // capture after state
            const isCheckedAfter = webDriver.getAttributeByName(switchPage.defaultCompactSwitch, 'aria-checked');
            const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.defaultCompactSwitchHandel, 'background-color');

            expect(isCheckedBefore).toBe('false', 'Default compact switch has incorrect state before click');
            expect(handelColorBefore.value).toContain('255,255,255');
            expect(isCheckedAfter).toBe('true', 'Default compact switch has incorrect state after click');
            expect(handelColorAfter.value).toContain('8,84,160');
        });

        it('should default change state on hover', () => {
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.defaultSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                webDriver.mouseHoverElement(switchPage.defaultSwitchHandel);

                const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.defaultSwitchHandel, 'background-color');

                expect(handelColorBefore.value).toContain('255,255,255');
                expect(handelColorAfter.value).toContain('235,245,254');
            }
        });

        it('should compact default change state on hover', () => {
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.defaultCompactSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                webDriver.mouseHoverElement(switchPage.defaultCompactSwitchHandel);
                const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.defaultCompactSwitchHandel, 'background-color');


                expect(handelColorBefore.value).toContain('255,255,255');
                expect(handelColorAfter.value).toContain('235,245,254');
            }
        });

        it('compact switch should be smaller than default', () => {
            const defaultSwitchSize = webDriver.getElementSize(switchPage.defaultSwitchSize) as WebdriverIO.SizeReturn;
            const defaultCompactSwitchSize = webDriver.getElementSize(switchPage.defaultCompactSwitchSize) as WebdriverIO.SizeReturn;

            expect(defaultSwitchSize.height > defaultCompactSwitchSize.height).toBe(true);
            expect(defaultSwitchSize.width > defaultCompactSwitchSize.width).toBe(true);
        });
    });

    describe('has disabled and disabled-form switch and ', function() {
        it('should not be able to interact with disabled switch', () => {
            webDriver.scrollIntoView(switchPage.disabledSwitch);
            const isClickable = webDriver.isElementClickable(switchPage.disabledSwitch);
            expect(isClickable).toBe(false);
        });

        it('should not be able to interact with disabled form switch', () => {
            // TODO: Investigate problem with disabled switch in Safari
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                webDriver.waitForDisplayed(switchPage.formDisabledSwitch);
                webDriver.scrollIntoView(switchPage.formDisabledSwitch);
                const isClickable = webDriver.isElementClickable(switchPage.formDisabledSwitch);
                expect(isClickable).toBe(false);
            }
        });

        it('should not change state on hover', () => {
            webDriver.waitElementToBePresentInDOM(switchPage.disabledSwitchHandel);
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.disabledSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browser.capabilities.browserName === 'Safari') {
                console.log('skip');
            } else {
                webDriver.scrollIntoView(switchPage.disabledSwitchHandel);
                webDriver.mouseHoverElement(switchPage.disabledSwitchHandel);
                const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.disabledSwitchHandel, 'background-color');

                expect(handelColorBefore.value).toBe(handelColorAfter.value);
            }
        });

        it('form should not change state on hover', () => {
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.formDisabledSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browser.capabilities.browserName === 'Safari') {
                console.log('skip');
            } else {
                webDriver.scrollIntoView(switchPage.formDisabledSwitchHandel);
                webDriver.mouseHoverElement(switchPage.formDisabledSwitchHandel);
                const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.formDisabledSwitchHandel, 'background-color');

                expect(handelColorBefore.value).toBe(handelColorAfter.value);
            }
        });
    });


    it('should have alternative title or aria-label for all switches', () => {
        webDriver.waitElementToBePresentInDOM(switchPage.defaultSwitch);
        const alternativeTextDefaultSwitch = webDriver.getAttributeByName(switchPage.defaultSwitch, 'aria-label');
        const alternativeTextDefaultCompactSwitch = webDriver.getAttributeByName(switchPage.defaultCompactSwitch, 'aria-label');
        const alternativeTextDisabledSwitch = webDriver.getAttributeByName(switchPage.disabledSwitch, 'aria-label');
        const alternativeTextFormDisabledSwitch = webDriver.getAttributeByName(switchPage.formDisabledSwitch, 'aria-label');
        const alternativeTextSemanticSwitch = webDriver.getAttributeByName(switchPage.semanticSwitch, 'aria-label');
        const alternativeTextSemanticCompactFormDisabledSwitch = webDriver.getAttributeByName(switchPage.semanticCompactSwitch, 'aria-label');

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
        const arrL = webDriver.getElementArrayLength(switchPage.exampleAreaContainersArr);
        for (let i = 0; arrL > i; i++) {
            webDriver.scrollIntoView(switchPage.exampleAreaContainersArr, i);
            expect(webDriver.getCSSPropertyByName(switchPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ' + i);
            const dirValueBefore = webDriver.getAttributeByName(switchPage.exampleAreaContainersArr, 'dir', i);
            expect([null, '']).toContain(dirValueBefore);
            webDriver.click(switchPage.rtlSwitcherArr, i);
            expect(webDriver.getCSSPropertyByName(switchPage.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
            expect(webDriver.getAttributeByName(switchPage.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
        }
    });

    describe('has semantic switch and', function() {
        it('should change something from positive to negative', () => {
            // capture before state
            const isCheckedBefore = webDriver.getAttributeByName(switchPage.semanticSwitch, 'aria-checked');
            const onIconStateBefore = webDriver.getCSSPropertyByName(switchPage.semanticSwitchIconOn, 'visibility');
            const offIconStateBefore = webDriver.getCSSPropertyByName(switchPage.semanticSwitchIconOff, 'visibility');
            webDriver.click(switchPage.semanticSwitchHandel);
            // capture after state
            const isCheckedAfter = webDriver.getAttributeByName(switchPage.semanticSwitch, 'aria-checked');
            const onIconStateAfter = webDriver.getCSSPropertyByName(switchPage.semanticSwitchIconOn, 'visibility');
            const offIconStateAfter = webDriver.getCSSPropertyByName(switchPage.semanticSwitchIconOff, 'visibility');

            expect(isCheckedBefore).toBe('false', 'Semantic switch has incorrect state before click');
            expect(isCheckedAfter).toBe('true', 'Semantic switch has incorrect state after click');
            expect(onIconStateBefore.value).toBe('hidden');
            expect(offIconStateBefore.value).toBe('visible');
            expect(onIconStateAfter.value).toBe('visible');
            expect(offIconStateAfter.value).toBe('hidden');
        });

        it('compact should change something from positive to negative', () => {
            // capture before state
            const isCheckedBefore = webDriver.getAttributeByName(switchPage.semanticCompactSwitch, 'aria-checked');
            const onIconStateBefore = webDriver.getCSSPropertyByName(switchPage.semanticCompactSwitchIconOn, 'visibility');
            const offIconStateBefore = webDriver.getCSSPropertyByName(switchPage.semanticCompactSwitchIconOff, 'visibility');
            webDriver.click(switchPage.semanticCompactSwitchHandel);
            // capture after state
            const isCheckedAfter = webDriver.getAttributeByName(switchPage.semanticCompactSwitch, 'aria-checked');
            const onIconStateAfter = webDriver.getCSSPropertyByName(switchPage.semanticCompactSwitchIconOn, 'visibility');
            const offIconStateAfter = webDriver.getCSSPropertyByName(switchPage.semanticCompactSwitchIconOff, 'visibility');

            expect(isCheckedBefore).toBe('true', 'Semantic compact switch has incorrect state before click');
            expect(isCheckedAfter).toBe('false', 'Semantic compact switch has incorrect state after click');
            expect(onIconStateBefore.value).toBe('visible');
            expect(offIconStateBefore.value).toBe('hidden');
            expect(onIconStateAfter.value).toBe('hidden');
            expect(offIconStateAfter.value).toBe('visible');
        });

        it('should semantic change state on hover', () => {
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.semanticSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                webDriver.scrollIntoView(switchPage.semanticSwitchHandel);
                webDriver.mouseHoverElement(switchPage.semanticSwitchHandel);
                const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.semanticSwitchHandel, 'background-color');

                expect(handelColorBefore.value).toContain('255,255,255');
                expect(handelColorAfter.value).toContain('255,235,235');
            }
        });

        it('should semantic compact change state on hover', () => {
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.semanticCompactSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                webDriver.scrollIntoView(switchPage.semanticCompactSwitchHandel);
                webDriver.mouseHoverElement(switchPage.semanticCompactSwitchHandel);
                const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.semanticCompactSwitchHandel, 'background-color');

                expect(handelColorBefore.value).toContain('255,255,255');
                expect(handelColorAfter.value).toContain('241,253,246');
            }
        });

        // No example given to verify
        /*        xit('should be able to display 2-3 letters', async () => {
        });*/
    });

    /*xdescribe('has correct page content', function() {
         // TODO: add page content checks
    });*/
});
