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
    });

    describe('has default and compact switch and', function() {
        it('should default change something to active or inactive', async () => {
            // capture before state
            webDriver.waitForDisplayed(switchPage.defaultSwitch);
            const isCheckedBefore = webDriver.getAttributeByName(switchPage.defaultSwitch, 'aria-checked');
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.defaultSwitchHandel, 'background-color');
            webDriver.click(switchPage.defaultSwitchHandel);
            // capture after state
            const isCheckedAfter = webDriver.getAttributeByName(switchPage.defaultSwitch, 'aria-checked');
            const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.defaultSwitchHandel, 'background-color');

            expect(isCheckedBefore).toBe('false', 'Default switch has incorrect state before click');
            expect(handelColorBefore.value).toBe('rgba(255,255,255,1)');
            expect(isCheckedAfter).toBe('true', 'Default switch has incorrect state after click');
            expect(handelColorAfter.value).toBe('rgba(8,84,160,1)');
        });

        it('should compact change something to active or inactive', async () => {
            // capture before state
            const isCheckedBefore = webDriver.getAttributeByName(switchPage.defaultCompactSwitch, 'aria-checked');
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.defaultCompactSwitchHandel, 'background-color');
            webDriver.click(switchPage.defaultCompactSwitchHandel);
            // capture after state
            const isCheckedAfter = webDriver.getAttributeByName(switchPage.defaultCompactSwitch, 'aria-checked');
            const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.defaultCompactSwitchHandel, 'background-color');

            expect(isCheckedBefore).toBe('false', 'Default compact switch has incorrect state before click');
            expect(handelColorBefore.value).toBe('rgba(255,255,255,1)');
            expect(isCheckedAfter).toBe('true', 'Default compact switch has incorrect state after click');
            expect(handelColorAfter.value).toBe('rgba(8,84,160,1)');
        });

        it('should default change state on hover', async () => {
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.defaultSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            webDriver.mouseHoverElement(switchPage.defaultSwitchHandel);
            const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.defaultSwitchHandel, 'background-color');

            expect(handelColorBefore.value).toBe('rgba(255,255,255,1)');
            expect(handelColorAfter.value).toBe('rgba(235,245,254,1)');
        });

        it('should compact default change state on hover', async () => {
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.defaultCompactSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            webDriver.mouseHoverElement(switchPage.defaultCompactSwitchHandel);
            const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.defaultCompactSwitchHandel, 'background-color');


            expect(handelColorBefore.value).toBe('rgba(255,255,255,1)');
            expect(handelColorAfter.value).toBe('rgba(235,245,254,1)');
        });

        it('compact switch should be smaller than default', async () => {
            const defaultSwitchSize = webDriver.getElementSize(switchPage.defaultSwitchSize) as WebdriverIO.SizeReturn;
            const defaultCompactSwitchSize = webDriver.getElementSize(switchPage.defaultCompactSwitchSize) as WebdriverIO.SizeReturn;

            expect(defaultSwitchSize.height > defaultCompactSwitchSize.height).toBe(true);
            expect(defaultSwitchSize.width > defaultCompactSwitchSize.width).toBe(true);
        });
    });

    describe('has disabled and disabled-form switch and ', function() {
        it('should not be able to interact with disabled switch', async () => {
            const isCheckedBefore = webDriver.getAttributeByName(switchPage.disabledSwitch, 'aria-checked');
            webDriver.mouseHoverElement(switchPage.disabledSwitchHandel);
            webDriver.click(switchPage.disabledSwitchHandel);
            webDriver.mouseHoverElement(switchPage.disabledSwitchHandel);
            webDriver.click(switchPage.disabledSwitchHandel);
            const isCheckedAfter = webDriver.getAttributeByName(switchPage.disabledSwitch, 'aria-checked');

            expect(isCheckedBefore === isCheckedAfter).toBe(true);
        });

        it('should not be able to interact with disabled form switch', () => {
            const isCheckedBefore = webDriver.getAttributeByName(switchPage.formDisabledSwitch, 'aria-checked');
            webDriver.mouseHoverElement(switchPage.formDisabledSwitchHandel);
            webDriver.click(switchPage.formDisabledSwitchHandel);
            const isCheckedAfter = webDriver.getAttributeByName(switchPage.formDisabledSwitch, 'aria-checked');

            expect(isCheckedBefore === isCheckedAfter).toBe(true);
        });

        it('should not change state on hover', () => {
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.disabledSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            webDriver.mouseHoverElement(switchPage.disabledSwitchHandel);
            const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.disabledSwitchHandel, 'background-color');

            expect(handelColorBefore.value).toBe(handelColorAfter.value);
        });

        it('form should not change state on hover', () => {
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.formDisabledSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            webDriver.mouseHoverElement(switchPage.formDisabledSwitchHandel);
            const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.formDisabledSwitchHandel, 'background-color');


            expect(handelColorBefore.value).toBe(handelColorAfter.value);
        });
    });


    it('should have alternative title or aria-label for all switches', async () => {
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

    fit('should have RTL orientation', () => {
       const arrL = webDriver.getElementArrayLength(switchPage.exampleAreaContainersArr);
         //for (let i = 0; arrL > i; i++) {
            expect(webDriver.getCSSPropertyByName(switchPage.exampleAreaContainersArr, 'direction', 0).value).toBe('ltr', '1css prop direction ' + 0);
            expect(webDriver.getAttributeByName(switchPage.exampleAreaContainersArr, 'dir', 0)).toBe('', '1 dir');
            webDriver.click(switchPage.rtlSwitcherArr, 0);
            expect(webDriver.getCSSPropertyByName(switchPage.exampleAreaContainersArr, 'direction' , 0).value).toBe('rtl', '2 rtl ');
            expect(webDriver.getAttributeByName(switchPage.exampleAreaContainersArr, 'dir', 0)).toBe('rtl', '2 dir ');
        //}
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

        it('should semantic change state on hover', async () => {
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.semanticSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            webDriver.mouseHoverElement(switchPage.semanticSwitchHandel);
            const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.semanticSwitchHandel, 'background-color');

            expect(handelColorBefore.value).toBe('rgba(255, 255, 255, 1)');
            expect(handelColorAfter.value).toBe('rgba(255, 235, 235, 1)');
        });

        it('should semantic compact change state on hover', () => {
            const handelColorBefore = webDriver.getCSSPropertyByName(switchPage.semanticCompactSwitchHandel, 'background-color');
            // capture handel color on Mouse hover
            webDriver.mouseHoverElement(switchPage.semanticCompactSwitchHandel);
            const handelColorAfter = webDriver.getCSSPropertyByName(switchPage.semanticCompactSwitchHandel, 'background-color');


            expect(handelColorBefore.value).toBe('rgba(255, 255, 255, 1)');
            expect(handelColorAfter.value).toBe('rgba(241, 253, 246, 1)');
        });

        // No example given to verify
        /*        xit('should be able to display 2-3 letters', async () => {
        });*/
    });

    /*xdescribe('has correct page content', function() {
         // TODO: add page content checks
    });*/
});
