import { webDriver } from '../../driver/wdio';
import { ComboBoxPo } from '../pages/combobox.po';
import ComboboxData from '../fixtures/appData/combobox.page-content';

describe('Split menu button test suite', () => {
    const comboBoxPage = new ComboBoxPo();

    beforeAll(() => {
        comboBoxPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('Verify each combobox consist of input and button', () => {
        comboBoxPage.verifyComboBoxComponents(ComboboxData.activeTypeNames, ComboboxData.notActiveTypeNames);
    });

    it('Verify dropdown expands after clicking on the button', () => {
        comboBoxPage.verifyDropdownToggle(ComboboxData.activeTypeNames);
    });

    it('Verify each input while typing', () => {
        comboBoxPage.verifyInputWhileTyping(ComboboxData.appleOption, ComboboxData.activeTypeNames);
    });

    it('Verify dropdown collapsed after selecting an option', () => {
        comboBoxPage.verifyDropdownCollapsedAfterSelectingOption(ComboboxData.appleOption, ComboboxData.activeTypeNames);
    });

    it('Verify selected option is highlighted', () => {
        comboBoxPage.verifySelectedOptionHighlighted(ComboboxData.appleOption, ComboboxData.bananaOption, ComboboxData.activeTypeNames);
    });

    it('Verify option hint when entering first characters', () => {
        comboBoxPage.verifyOptionHintWhileTyping(ComboboxData.appleOption, ComboboxData.activeTypeNames);
    })

    it('Verify LTR and RTL orientation', () => {
        comboBoxPage.checkRtlSwitch();
    })

    it('Verify group headers are not interactive.', () => {
        comboBoxPage.verifyGroupHeadersAreNotInteractive();
    })

    it('Verify navigation by arrow buttons', () => {
        comboBoxPage.verifyNavigationByArrowButtons(ComboboxData.activeTypeNames);
    })

    it('Verify combobox with two columns while typing', () => {
        comboBoxPage.verifyComboboxWithTwoColumnsWhileTyping();
    })

    it('Verify options sorting', () => {
       for (let i = 0; i < ComboboxData.activeTypeNames.length; i++) {
           const textArr = comboBoxPage.getDropdownOptionsText(ComboboxData.activeTypeNames[i]);
           expect(textArr.sort()).toEqual(textArr);
       }
    });
});
