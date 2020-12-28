import {
    click, getAttributeByNameArr,
    getElementArrayLength,
    getText,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
} from '../../driver/wdio';
import { MultiInputPo } from '../pages/multi-input.po';

describe('Combobox test suite', function() {
    const multiInputPage: MultiInputPo = new MultiInputPo();

    beforeAll(() => {
        multiInputPage.open();
    });

    afterEach(() => {
        refreshPage();
    });

    it('Verify multi input allows user to enter multiple values', () => {
        const activeButtonsQuantity = getElementArrayLength(multiInputPage.activeDropDownButtons);
        for (let i = 0; i < activeButtonsQuantity; i++) {
            if (i !== activeButtonsQuantity - 2) {
                multiInputPage.expandDropdown(multiInputPage.activeDropDownButtons, i);
                const optionsArr = getAttributeByNameArr(multiInputPage.options, 'ng-reflect-title');
                multiInputPage.selectOption(optionsArr[0]);
                multiInputPage.expandDropdown(multiInputPage.activeDropDownButtons, i);
                multiInputPage.selectOption(optionsArr[1]);
                expect(getText(multiInputPage.filledInput, i)).toContain(optionsArr[0]);
                expect(getText(multiInputPage.filledInput, i)).toContain(optionsArr[1]);
                expect(getText(multiInputPage.filledInput, i).split('\n')[0]).toBe(optionsArr[0]);
                expect(getText(multiInputPage.filledInput, i).split('\n')[1]).toBe(optionsArr[1]);
            } else {
                multiInputPage.expandDropdown(multiInputPage.activeDropDownButtons, i);
                const optionsArr = getAttributeByNameArr(multiInputPage.options, 'ng-reflect-title');
                multiInputPage.selectOption(optionsArr[0]);
                multiInputPage.selectOption(optionsArr[1]);
                click(multiInputPage.approveButton);
                expect(getText(multiInputPage.filledInput, i)).toContain(optionsArr[0]);
                expect(getText(multiInputPage.filledInput, i)).toContain(optionsArr[1]);
                expect(getText(multiInputPage.filledInput, i).split('\n')[0]).toBe(optionsArr[0]);
                expect(getText(multiInputPage.filledInput, i).split('\n')[1]).toBe(optionsArr[1]);
            }
        }
    });

    it('Check RTL/LTR orientation', () => {
        multiInputPage.checkRtlSwitch();
    });

    it('Verify group headers are not interactive', () => {
        const headersQuantity = getElementArrayLength(multiInputPage.groupHeader);
        multiInputPage.expandDropdown(multiInputPage.groupDropdown);
        for (let i = 0; i < headersQuantity; i++) {
            scrollIntoView(multiInputPage.groupHeader, i);
            click(multiInputPage.groupHeader, i);
            waitForElDisplayed(multiInputPage.expandedDropdown);
        }
    });

    it('Verify A token can be added using suggestions or value help.', () => {
        const inputQuantity = getElementArrayLength(multiInputPage.activeInputs);
        for (let i = 0; i < inputQuantity - 2; i++) {
            multiInputPage.expandDropdown(multiInputPage.activeDropDownButtons, i);
            const optionsArr = getAttributeByNameArr(multiInputPage.options, 'ng-reflect-title');
            setValue(multiInputPage.activeInputs, optionsArr[0].substring(0, 2), i);
            multiInputPage.selectOption(optionsArr[0]);
            expect(getText(multiInputPage.filledInput, i)).toContain(optionsArr[0]);
        }
    });

    fit('Verify The user can deselect an item by clicking its delete icon[X].', () => {
        const activeButtonsQuantity = getElementArrayLength(multiInputPage.activeDropDownButtons);
        for (let i = 0; i < activeButtonsQuantity; i++) {
            if (i !== activeButtonsQuantity - 2) {
                multiInputPage.expandDropdown(multiInputPage.activeDropDownButtons, i);
                const optionsArr = getAttributeByNameArr(multiInputPage.options, 'ng-reflect-title');
                multiInputPage.selectOption(optionsArr[0]);
                expect(getText(multiInputPage.filledInput, i)).toContain(optionsArr[0]);
                scrollIntoView(multiInputPage.crossButton(optionsArr[0]));
                click(multiInputPage.crossButton(optionsArr[0]));
                expect(multiInputPage.crossButton(optionsArr[0])).not.toBeDisplayed();
            } else {
                multiInputPage.expandDropdown(multiInputPage.activeDropDownButtons, i);
                const optionsArr = getAttributeByNameArr(multiInputPage.options, 'ng-reflect-title');
                multiInputPage.selectOption(optionsArr[0]);
                click(multiInputPage.approveButton);
                expect(getText(multiInputPage.filledInput, i)).toContain(optionsArr[0]);
                scrollIntoView(multiInputPage.crossButton(optionsArr[0]));
                click(multiInputPage.crossButton(optionsArr[0]));
                expect(multiInputPage.crossButton(optionsArr[0])).not.toBeDisplayed();
            }
        }
    });
});
