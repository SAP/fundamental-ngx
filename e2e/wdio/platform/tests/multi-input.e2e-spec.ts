import {
    browserIsIEorSafari,
    click,
    getAttributeByName,
    getAttributeByNameArr,
    getElementArrayLength, getElementPlaceholder,
    getText,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import { placeholderValue } from '../fixtures/appData/file-uploader.page-content';
import { MultiInputPo } from '../pages/multi-input.po';

xdescribe('Multi input test suite', function() {
    const multiInputPage: MultiInputPo = new MultiInputPo();
    const {
        mobileMainInput, expandedDropdown, activeDropdownButtons, allDropdownButtons, disabledDropdownButtons,
        activeInputs, mobileInput, disabledInputs, filledInput, approveButton, groupHeader, groupDropdown, options,
        dropdownOptions, selectedToken, crossButton, dropdownOptionText, dropdownOptionTextValueHelp
    } = multiInputPage;

    beforeAll(() => {
        multiInputPage.open();
        waitForPresent(mobileMainInput);
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(allDropdownButtons);
    }, 1);

    it('Verify multi input allows user to enter multiple values', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for IE and Safari');
            return;
        }

        const activeButtonsQuantity = getElementArrayLength(activeDropdownButtons);
        for (let i = 0; i < activeButtonsQuantity; i++) {
            if (i !== activeButtonsQuantity - 2) {
                multiInputPage.expandDropdown(activeDropdownButtons, i);
                const optionsArr = getAttributeByNameArr(options, 'ng-reflect-title');
                multiInputPage.selectOption(optionsArr[0]);
                multiInputPage.expandDropdown(activeDropdownButtons, i);
                multiInputPage.selectOption(optionsArr[1]);
                expect(getText(filledInput, i)).toContain(optionsArr[0]);
                expect(getText(filledInput, i)).toContain(optionsArr[1]);
                expect(getText(filledInput, i).split('\n')[0]).toBe(optionsArr[0]);
                expect(getText(filledInput, i).split('\n')[1]).toBe(optionsArr[1]);
            } else {
                multiInputPage.expandDropdown(activeDropdownButtons, i);
                const optionsArr = getAttributeByNameArr(options, 'ng-reflect-title');
                multiInputPage.selectOption(optionsArr[0]);
                multiInputPage.selectOption(optionsArr[1]);
                click(approveButton);
                expect(getText(filledInput, i)).toContain(optionsArr[0]);
                expect(getText(filledInput, i)).toContain(optionsArr[1]);
                expect(getText(filledInput, i).split('\n')[0]).toBe(optionsArr[0]);
                expect(getText(filledInput, i).split('\n')[1]).toBe(optionsArr[1]);
            }
        }
    });

    it('Check RTL/LTR orientation', () => {
        multiInputPage.checkRtlSwitch();
    });

    it('Verify group headers are not interactive', () => {
        const headersQuantity = getElementArrayLength(groupHeader);
        multiInputPage.expandDropdown(groupDropdown);
        for (let i = 0; i < headersQuantity; i++) {
            scrollIntoView(groupHeader, i);
            click(groupHeader, i);
            waitForElDisplayed(expandedDropdown);
        }
    });

    it('Verify A token can be added using suggestions or value help.', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for IE and Safari');
            return;
        }
        const inputQuantity = getElementArrayLength(activeInputs);
        for (let i = 0; i < inputQuantity - 2; i++) {
            multiInputPage.expandDropdown(activeDropdownButtons, i);
            const optionsArr = getAttributeByNameArr(options, 'ng-reflect-title');
            setValue(activeInputs, optionsArr[0].substring(0, 2), i);
            multiInputPage.selectOption(optionsArr[0]);
            expect(getText(filledInput, i)).toContain(optionsArr[0]);
        }
    });

    it('Verify The user can deselect an item by clicking its delete icon[X].', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for IE and Safari');
            return;
        }

        const activeButtonsQuantity = getElementArrayLength(activeDropdownButtons);
        for (let i = 0; i < activeButtonsQuantity; i++) {
            if (i !== activeButtonsQuantity - 2) {
                multiInputPage.expandDropdown(activeDropdownButtons, i);
                const optionsArr = getAttributeByNameArr(options, 'ng-reflect-title');
                multiInputPage.selectOption(optionsArr[0]);
                expect(getText(filledInput, i)).toContain(optionsArr[0]);
                scrollIntoView(crossButton(optionsArr[0]));
                click(crossButton(optionsArr[0]));
                expect(crossButton(optionsArr[0])).not.toBeDisplayed();
            } else {
                multiInputPage.expandDropdown(activeDropdownButtons, i);
                const optionsArr = getAttributeByNameArr(options, 'ng-reflect-title');
                multiInputPage.selectOption(optionsArr[0]);
                click(approveButton);
                expect(getText(filledInput, i)).toContain(optionsArr[0]);
                scrollIntoView(crossButton(optionsArr[0]));
                click(crossButton(optionsArr[0]));
                expect(crossButton(optionsArr[0])).not.toBeDisplayed();
            }
        }
    });

    it('Verify When the user starts typing in the input field, the list is filtered', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for IE and Safari');
            return;
        }
        multiInputPage.expandDropdown(activeDropdownButtons, 1);
        const optionsArr = getAttributeByNameArr(options, 'ng-reflect-title');
        click(activeDropdownButtons, 1);
        setValue(activeInputs, optionsArr[1].substring(0, 3), 1);
        let filteredOptions = getElementArrayLength(dropdownOptions);
        for (let j = 0; j < filteredOptions; j++) {
            const dropdownOption = getText(dropdownOptionTextValueHelp, j);
            expect(dropdownOption).toContain(optionsArr[1].substring(0, 3));
        }
        scrollIntoView(multiInputPage.activeInputs, 0);
        multiInputPage.expandDropdown(activeDropdownButtons, 0);
        setValue(activeInputs, optionsArr[0].substring(0, 3), 0);
        filteredOptions = getElementArrayLength(dropdownOptions);
        for (let j = 0; j < filteredOptions; j++) {
            const dropdownOption = getText(dropdownOptionText, j);
            expect(dropdownOption).toContain(optionsArr[0].substring(0, 3));
        }
        multiInputPage.expandDropdown(activeDropdownButtons, 5);
        setValue(mobileInput, optionsArr[4].substring(0, 3));
        filteredOptions = getElementArrayLength(dropdownOptions);
        for (let j = 0; j < filteredOptions; j++) {
            const dropdownOption = getText(dropdownOptionTextValueHelp, j);
            expect(dropdownOption).toContain(optionsArr[4].substring(0, 3));
        }
    });

    it('Verify user can delete the token using backspace and delete key', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for IE and Safari');
            return;
        }

        const activeButtonsQuantity = getElementArrayLength(activeDropdownButtons);
        for (let i = 0; i < activeButtonsQuantity; i++) {
            if (i !== activeButtonsQuantity - 2) {
                multiInputPage.expandDropdown(activeDropdownButtons, i);
                const optionsArr = getAttributeByNameArr(options, 'ng-reflect-title');
                multiInputPage.selectOption(optionsArr[0]);
                expect(getText(filledInput, i)).toContain(optionsArr[0]);
                expect(getText(filledInput, i).split('\n')[0]).toBe(optionsArr[0]);
                click(selectedToken);
                sendKeys(['Backspace', 'Backspace']);
                expect(selectedToken).not.toBeDisplayed();
            } else {
                multiInputPage.expandDropdown(activeDropdownButtons, i);
                const optionsArr = getAttributeByNameArr(options, 'ng-reflect-title');
                multiInputPage.selectOption(optionsArr[0]);
                click(approveButton);
                expect(getText(filledInput, i)).toContain(optionsArr[0]);
                expect(getText(filledInput, i).split('\n')[0]).toBe(optionsArr[0]);
                click(selectedToken);
                sendKeys(['Backspace', 'Backspace']);
                expect(selectedToken).not.toBeDisplayed();
            }
        }
    });

    it('Verify inputs should have placeholder', () => {
        const activeInputsQuantity = getElementArrayLength(activeInputs);
        for (let i = 0; i < activeInputsQuantity; i++) {
            expect(placeholderValue).toContain(getElementPlaceholder
            (activeInputs, i));
        }
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            multiInputPage.saveExampleBaselineScreenshot();
            expect(multiInputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
