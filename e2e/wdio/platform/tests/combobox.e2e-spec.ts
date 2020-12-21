import { webDriver } from '../../driver/wdio';
import { ComboBoxPo } from '../pages/combobox.po';
import ComboboxData from '../fixtures/appData/combobox.page-content';

describe('Combobox test suite', () => {
    const {getDropdownOptionsText, verifyComboBoxComponents, verifyDropdownToggle, verifyInputWhileTyping,
        verifyDropdownCollapsedAfterSelectingOption, verifyNavigationByArrowButtons, verifyGroupHeadersAreNotInteractive,
        verifyOptionHintWhileTyping, verifySelectedOptionHighlighted, verifyComboboxWithTwoColumnsWhileTyping} = new ComboBoxPo();

    const comboBoxPage: ComboBoxPo = new ComboBoxPo();

    beforeAll(() => {
        comboBoxPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('Verify each combobox consist of input and button', () => {
        verifyComboBoxComponents(ComboboxData.activeTypeNames, ComboboxData.notActiveTypeNames);
    });

    it('Verify dropdown expands after clicking on the button', () => {
        verifyDropdownToggle(ComboboxData.activeTypeNames);
    });

    it('Verify each input while typing', () => {
        verifyInputWhileTyping(ComboboxData.appleOption, ComboboxData.activeTypeNames);
    });

    it('Verify dropdown collapsed after selecting an option', () => {
        verifyDropdownCollapsedAfterSelectingOption(ComboboxData.appleOption, ComboboxData.activeTypeNames);
    });

    it('Verify selected option is highlighted', () => {
        verifySelectedOptionHighlighted(ComboboxData.appleOption, ComboboxData.bananaOption, ComboboxData.activeTypeNames);
    });

    xit('Verify option hint when entering first characters', () => {
        verifyOptionHintWhileTyping(ComboboxData.appleOption, ComboboxData.activeTypeNames);
    })

    it('Verify LTR and RTL orientation', () => {
        comboBoxPage.checkRtlSwitch();
    })

    it('Verify group headers are not interactive.', () => {
        verifyGroupHeadersAreNotInteractive();
    })

    it('Verify navigation by arrow buttons', () => {
        verifyNavigationByArrowButtons(ComboboxData.activeTypeNames);
    })

    it('Verify combobox with two columns while typing', () => {
        verifyComboboxWithTwoColumnsWhileTyping();
    })

    it('Verify options sorting', () => {
       for (let i = 0; i < ComboboxData.activeTypeNames.length; i++) {
           const textArr = getDropdownOptionsText(ComboboxData.activeTypeNames[i]);
           expect(textArr.sort()).toEqual(textArr);
       }
    });
});
