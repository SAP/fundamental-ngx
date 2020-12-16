import { SwitchPo } from '../pages/switch.po';
import { getValueOfAttribute, hoverMouse, waitForPresence } from '../../helper/helper';
import switchPageContent from '../fixtures/appData/swich-page-content';
import { browser } from 'protractor';

describe('Verify Switch component', function() {
    const switchPage = new SwitchPo();
    beforeAll(async () => {
        await switchPage.open();
    });

    afterEach(async () => {
        await browser.refresh();
    });

    describe('has default and compact switch and', function() {
        it('should default change something to active or inactive', async () => {
            // capture before state
            await waitForPresence(await switchPage.defaultSwitch);
            const isCheckedBefore = await getValueOfAttribute(await switchPage.defaultSwitch, 'aria-checked');
            const handelColorBefore = await switchPage.defaultSwitchHandel.getCssValue('background-color');
            await switchPage.defaultSwitchHandel.click();
            // capture after state
            const isCheckedAfter = await getValueOfAttribute(await switchPage.defaultSwitch, 'aria-checked');
            const handelColorAfter = await switchPage.defaultSwitchHandel.getCssValue('background-color');

            expect(isCheckedBefore).toBe('false', 'Default switch has incorrect state before click');
            expect(handelColorBefore).toBe('rgba(255, 255, 255, 1)');
            expect(isCheckedAfter).toBe('true', 'Default switch has incorrect state after click' );
            expect(handelColorAfter).toBe('rgba(8, 84, 160, 1)');
        });

        it('should compact change something to active or inactive', async () => {
            // capture before state
            const isCheckedBefore = await getValueOfAttribute(await switchPage.defaultCompactSwitch, 'aria-checked');
            const handelColorBefore = await switchPage.defaultCompactSwitchHandel.getCssValue('background-color');
            await switchPage.defaultCompactSwitchHandel.click();
            // capture after state
            const isCheckedAfter = await getValueOfAttribute(await switchPage.defaultCompactSwitch, 'aria-checked');
            const handelColorAfter = await switchPage.defaultCompactSwitchHandel.getCssValue('background-color');

            expect(isCheckedBefore).toBe('false', 'Default compact switch has incorrect state before click');
            expect(handelColorBefore).toBe('rgba(255, 255, 255, 1)');
            expect(isCheckedAfter).toBe('true', 'Default compact switch has incorrect state after click' );
            expect(handelColorAfter).toBe('rgba(8, 84, 160, 1)');
        });

        it('should default change state on hover', async () => {
            const handelColorBefore = await switchPage.defaultSwitchHandel.getCssValue('background-color');
            // capture handel color on Mouse hover
            const handelColorAfter = await hoverMouse(await switchPage.defaultSwitchHandel).then( () => {
                return switchPage.defaultSwitchHandel.getCssValue('background-color');
            });

            expect(handelColorBefore).toBe('rgba(255, 255, 255, 1)');
            expect(handelColorAfter).toBe('rgba(235, 245, 254, 1)');
        });

        it('should compact default change state on hover', async () => {
            const handelColorBefore = await switchPage.defaultCompactSwitchHandel.getCssValue('background-color');
            // capture handel color on Mouse hover
            const handelColorAfter = await hoverMouse(await switchPage.defaultCompactSwitchHandel).then( () => {
                return switchPage.defaultCompactSwitchHandel.getCssValue('background-color');
            });

            expect(handelColorBefore).toBe('rgba(255, 255, 255, 1)');
            expect(handelColorAfter).toBe('rgba(235, 245, 254, 1)');
        });

        it('compact switch should be smaller than default', async () => {
            const defaultSwitchSize = await switchPage.defaultSwitchSize.getSize();
            const defaultCompactSwitchSize = await switchPage.defaultCompactSwitchSize.getSize();

            expect(defaultSwitchSize.height > defaultCompactSwitchSize.height).toBe(true);
            expect(defaultSwitchSize.width > defaultCompactSwitchSize.width).toBe(true);
        });
    });

    describe('has disabled and disabled-form switch and ', function() {
        it('should not be able to interact with disabled switch', async () => {
            const isCheckedBefore = await getValueOfAttribute(await switchPage.disabledSwitch, 'aria-checked');

            await browser.actions().mouseMove(switchPage.disabledSwitchHandel).click();
            const isCheckedAfter = await getValueOfAttribute(await switchPage.disabledSwitch, 'aria-checked');

            expect(isCheckedBefore === isCheckedAfter).toBe(true);
        });

        it('should not be able to interact with disabled form switch', async () => {
            const isCheckedBefore = await getValueOfAttribute(await switchPage.formDisabledSwitch, 'aria-checked');
            await browser.actions().mouseMove(switchPage.formDisabledSwitchHandel).click();
            const isCheckedAfter = await getValueOfAttribute(await switchPage.formDisabledSwitch, 'aria-checked');

            expect(isCheckedBefore === isCheckedAfter).toBe(true);
        });

        it('should not change state on hover', async () => {
            const handelColorBefore = await switchPage.disabledSwitchHandel.getCssValue('background-color');
            // capture handel color on Mouse hover
            const handelColorAfter = await hoverMouse(await switchPage.disabledSwitchHandel).then( () => {
                return switchPage.disabledSwitchHandel.getCssValue('background-color');
            });

            expect(handelColorBefore).toBe(handelColorAfter);
        });

        it('form should not change state on hover', async () => {
            const handelColorBefore = await switchPage.formDisabledSwitchHandel.getCssValue('background-color');
            // capture handel color on Mouse hover
            const handelColorAfter = await hoverMouse(await switchPage.formDisabledSwitchHandel).then( () => {
                return switchPage.formDisabledSwitchHandel.getCssValue('background-color');
            });

            expect(handelColorBefore).toBe(handelColorAfter);
        });
    });


    it('should have alternative title or aria-label for all switches', async () => {
        const alternativeTextDefaultSwitch = await getValueOfAttribute(await switchPage.defaultSwitch, 'aria-label');
        const alternativeTextDefaultCompactSwitch = await getValueOfAttribute(await switchPage.defaultCompactSwitch, 'aria-label');
        const alternativeTextDisabledSwitch = await getValueOfAttribute(await switchPage.disabledSwitch, 'aria-label');
        const alternativeTextFormDisabledSwitch = await getValueOfAttribute(await switchPage.formDisabledSwitch, 'aria-label');
        const alternativeTextSemanticSwitch = await getValueOfAttribute(await switchPage.semanticSwitch, 'aria-label');
        const alternativeTextSemanticCompactFormDisabledSwitch = await getValueOfAttribute(await switchPage.semanticCompactSwitch, 'aria-label');

        expect(alternativeTextDefaultSwitch).toBe(switchPageContent.default_switch_alternative_text);
        expect(alternativeTextDefaultCompactSwitch).toBe(switchPageContent.default_compact_switch_alternative_text);
        expect(alternativeTextDisabledSwitch).toBe(switchPageContent.disabled_switch_alternative_text);
        expect(alternativeTextFormDisabledSwitch).toBe(switchPageContent.form_disabled_switch_alternative_text);
        expect(alternativeTextSemanticSwitch).toBe(switchPageContent.semantic_switch_alternative_text);
        expect(alternativeTextSemanticCompactFormDisabledSwitch).toBe(switchPageContent.semantic_compact_switch_alternative_text);
    });
/*

    xit('test accessibility', async ()=> {
        const testResult = await runAxeTest('Test Switch component', $$('.docs-tile__content.docs-tile-content-example').get(0).locator().value); // switchPage.root.locator().value
        expect(testResult.violations.length).toBe(0);
    });
*/

    it('should have RTL orientation', async () => {
        await switchPage.exampleAreaContainersArr.each(async (area, index) => {
            expect(await area.getCssValue('direction')).toBe('ltr', 'css prop direction ' + index);
            expect(await area.getAttribute('dir')).toBe('', 'dir attr ' + index);
            await switchPage.rtlSwitcherArr.get(index).click();
            expect(await area.getCssValue('direction')).toBe('rtl');
            expect(await area.getAttribute('dir')).toBe('rtl');
        })
    });

    describe('has semantic switch and', function() {
        it('should change something from positive to negative', async () => {
            // capture before state
            const isCheckedBefore = await getValueOfAttribute(await switchPage.semanticSwitch, 'aria-checked');
            const onIconStateBefore = await switchPage.semanticSwitchIconOn.getCssValue('visibility');
            const offIconStateBefore = await switchPage.semanticSwitchIconOff.getCssValue('visibility');
            await switchPage.semanticSwitchHandel.click();
            // capture after state
            const isCheckedAfter = await getValueOfAttribute(await switchPage.semanticSwitch, 'aria-checked');
            const onIconStateAfter = await switchPage.semanticSwitchIconOn.getCssValue('visibility');
            const offIconStateAfter = await switchPage.semanticSwitchIconOff.getCssValue('visibility');

            expect(isCheckedBefore).toBe('false', 'Semantic switch has incorrect state before click');
            expect(isCheckedAfter).toBe('true', 'Semantic switch has incorrect state after click' );
            expect(onIconStateBefore).toBe('hidden');
            expect(offIconStateBefore).toBe('visible');
            expect(onIconStateAfter).toBe('visible');
            expect(offIconStateAfter).toBe('hidden');
        });

        it('compact should change something from positive to negative', async () => {
            // capture before state
            const isCheckedBefore = await getValueOfAttribute(await switchPage.semanticCompactSwitch, 'aria-checked');
            const onIconStateBefore = await switchPage.semanticCompactSwitchIconOn.getCssValue('visibility');
            const offIconStateBefore = await switchPage.semanticCompactSwitchIconOff.getCssValue('visibility');
            await switchPage.semanticCompactSwitchHandel.click();
            // capture after state
            const isCheckedAfter = await getValueOfAttribute(await switchPage.semanticCompactSwitch, 'aria-checked');
            const onIconStateAfter = await switchPage.semanticCompactSwitchIconOn.getCssValue('visibility');
            const offIconStateAfter = await switchPage.semanticCompactSwitchIconOff.getCssValue('visibility');

            expect(isCheckedBefore).toBe('true', 'Semantic compact switch has incorrect state before click');
            expect(isCheckedAfter).toBe('false', 'Semantic compact switch has incorrect state after click' );
            expect(onIconStateBefore).toBe('visible');
            expect(offIconStateBefore).toBe('hidden');
            expect(onIconStateAfter).toBe('hidden');
            expect(offIconStateAfter).toBe('visible');
        });

        it('should semantic change state on hover', async () => {
            const handelColorBefore = await switchPage.semanticSwitchHandel.getCssValue('background-color');
            // capture handel color on Mouse hover
            const handelColorAfter = await hoverMouse(await switchPage.semanticSwitchHandel).then( () => {
                return switchPage.semanticSwitchHandel.getCssValue('background-color');
            });

            expect(handelColorBefore).toBe('rgba(255, 255, 255, 1)');
            expect(handelColorAfter).toBe('rgba(255, 235, 235, 1)');
        });

        it('should semantic compact change state on hover', async () => {
            const handelColorBefore = await switchPage.semanticCompactSwitchHandel.getCssValue('background-color');
            // capture handel color on Mouse hover
            const handelColorAfter = await hoverMouse(await switchPage.semanticCompactSwitchHandel).then( () => {
                return switchPage.semanticCompactSwitchHandel.getCssValue('background-color');
            });

            expect(handelColorBefore).toBe('rgba(255, 255, 255, 1)');
            expect(handelColorAfter).toBe('rgba(241, 253, 246, 1)');
        });

        // No example given to verify
/*        xit('should be able to display 2-3 letters', async () => {

        });*/
    });

/*    xdescribe('has correct page content', function() {
        // TODO: add page content checks
    });*/
});
