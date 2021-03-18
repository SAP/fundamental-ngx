import { ValueHelpDialogPo } from '../pages/value-help-dialog.po';
import {
    browserIsFirefox,
    clearValue,
    click, doesItExist, getAttributeByName,
    getElementArrayLength,
    getText,
    refreshPage, scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import {
    conditionInclusions, inputIDs, tableInclusions, tableExclusions, conditionExclusions, customInclusionLabels,
    customExclusionLabels, exclusionLabel, inclusionLabel, basicSearchId, mobileAttr
} from '../fixtures/appData/value-help-dialog-contents';
import { valueZero, valueOne, searchValues } from '../fixtures/testData/value-help-dialog';

describe('Value help dialog test suite', function() {
    const valueHelpDialogPage = new ValueHelpDialogPo();
    const {
        inputFields, dialogHeader, openDialogBtn, formInputField, goBtn, tableRows, pageHeader, tableCheckboxes,
        selectedItemName, selectedTokens, formTabs, addBtn, dialogContainer, footerBtns, productNameColumn,
        productCodeColumn, productCityColumn, productZipcodeColumn, productAddressColumn, productNicknameColumn,
        conditionSelectors, conditionsInputField, dropdownOptions, selectedItemID, miniOpenDialogBtn,
        menuDialogBtn, menuCheckboxes, inputToken, menuItemNames, advSearchLabels, tableColumn,
        sectionLabels, disableCheckboxes, currentDisplayedPage, nextPageBtn, previousPageBtn, advSearchOptions,
        advSearchToggle, tableCheckboxesFF, mobileExampleDialog, xBtn
    } = valueHelpDialogPage;

    beforeAll(() => {
        valueHelpDialogPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(pageHeader);
    }, 1);

    describe('Basic Value Help Dialog examples', function() {
        it('should check default view and header', () => {
            click(openDialogBtn);
            // skip due to https://github.com/SAP/fundamental-ngx/issues/4573
            // expect(getElementArrayLength(inputFields)).toBe(2);
            expect(waitForElDisplayed(dialogHeader)).toBe(true);
            expect(['', null]).not.toContain(getText(dialogHeader));
        });

        it('should check the basic search results', () => {
            click(openDialogBtn);
            click(formInputField(basicSearchId));
            sendKeys(searchValues[0]);
            click(goBtn);
            checkResults(tableRows, searchValues[0]);
        });

        it('should check advanced search results', () => {
            click(openDialogBtn);
            const advSearchFieldCount = 6;
            const searchResultsColumnsArr = [productNameColumn, productCodeColumn, productCityColumn, productZipcodeColumn,
                productAddressColumn, productNicknameColumn];

            for (let i = 0; advSearchFieldCount > i; i++) {
                click(formInputField(inputIDs[i]));
                sendKeys(searchValues[i]);
                click(goBtn);
                checkResults(searchResultsColumnsArr[i], searchValues[i]);
                click(formInputField(inputIDs[i]));
                clearValue(formInputField(inputIDs[i]));
            }
        });

        it('should check the selection appears as a token', () => {
            click(openDialogBtn);
            clickTableCheckbox(1);
            const selectedItem = getText(selectedItemName);
            expect(getText(selectedTokens)).toEqual(selectedItem);
        });

        // TODO: enable after resolving https://github.com/SAP/fundamental-ngx/issues/4957
        xit('should check define conditions inclusions', () => {
            click(openDialogBtn);
            click(formTabs, 1);
            click(addBtn);
            click(conditionsInputField, 1);
            sendKeys(valueZero);
            click(conditionSelectors);
            checkConditionalTokens(tableInclusions);
        });

        // TODO: enable after resolving https://github.com/SAP/fundamental-ngx/issues/4957
        xit('should check the inclusion conditional statements', () => {
            click(openDialogBtn);
            click(formTabs, 1);
            click(addBtn);
            click(conditionsInputField, 1);
            sendKeys(valueZero);
            click(conditionSelectors, 1);

            const optionsCount = getElementArrayLength(dropdownOptions);
            for (let i = 0; optionsCount > i; i++) {
                if (i === 2) {
                    click(dropdownOptions, i);
                    click(conditionsInputField, 2);
                    sendKeys(valueOne);
                    expect(getText(selectedTokens)).toEqual(conditionInclusions[i]);
                    click(conditionSelectors, 1);
                    continue;
                }
                click(dropdownOptions, i);
                expect(getText(selectedTokens)).toEqual(conditionInclusions[i]);
                click(conditionSelectors, 1);
            }
        });

        it('should check define conditions exclusions', () => {
            click(openDialogBtn);
            click(formTabs, 1);
            click(addBtn, 1);
            click(conditionsInputField, 1);
            sendKeys(valueZero);
            click(conditionSelectors);
            checkConditionalTokens(tableExclusions);
        });

        // TODO: enable after resolving https://github.com/SAP/fundamental-ngx/issues/4957
        xit('should check the exclusion conditional statements', () => {
            click(openDialogBtn);
            click(formTabs, 1);
            click(addBtn, 1);
            click(conditionsInputField, 1);
            sendKeys(valueZero);
            click(conditionSelectors, 1);
            checkConditionalTokens(conditionExclusions, 1);

        });

        it('should check the cancel button', () => {
            click(openDialogBtn);
            waitForPresent(dialogContainer);
            click(footerBtns, 1);
            waitForPresent(openDialogBtn);
        });

        it('should check the table pagination', () => {
            click(openDialogBtn);
            expect(getText(currentDisplayedPage)).toEqual('1');
            click(nextPageBtn);
            expect(getText(currentDisplayedPage)).toEqual('2');
            click(previousPageBtn);
            expect(getText(currentDisplayedPage)).toEqual('1');
        });

        xit('should check advanced search options appear for each table column', () => {
            // Skip due to: https://github.com/SAP/fundamental-ngx/issues/4588
            click(openDialogBtn);
            const columnCount = getElementArrayLength(tableColumn);

            for (let i = 0; columnCount > i; i++) {
                expect(getText(advSearchLabels, i)).toEqual(getText(tableColumn, i));
            }
        });

        it('should check advanced search toggle', () => {
            click(openDialogBtn);
            expect(doesItExist(advSearchOptions)).toBe(true);
            click(advSearchToggle);
            expect(doesItExist(advSearchOptions)).toBe(false);
            click(advSearchToggle);
            expect(doesItExist(advSearchOptions)).toBe(true);
        });

        it('should check the remove conditions btn', () => {
            click(openDialogBtn);
            click(formTabs, 1);
            click(addBtn);
            expect(doesItExist(conditionSelectors)).toBe(true);
            click(xBtn);
            expect(doesItExist(conditionSelectors)).toBe(false);
        });
    });

    describe('custom strategy labels examples', function() {
        it('should check define conditions custom inclusions', () => {
            scrollIntoView(openDialogBtn, 1);
            click(openDialogBtn, 1);
            click(addBtn);
            click(conditionsInputField, 1);
            sendKeys(valueZero);
            click(conditionSelectors, 1);

            const optionsCount = getElementArrayLength(dropdownOptions);
            for (let i = 0; optionsCount > i; i++) {
                if (i === 2) {
                    expect(getText(dropdownOptions, i)).toEqual(customInclusionLabels[i]);
                    click(dropdownOptions, i);
                    click(conditionsInputField, 2);
                    sendKeys(valueOne);
                    expect(getText(selectedTokens)).toEqual(conditionInclusions[i]);
                    click(conditionSelectors, 1);
                    continue;
                }
                expect(getText(dropdownOptions, i)).toEqual(customInclusionLabels[i]);
                click(dropdownOptions, i);
                expect(getText(selectedTokens)).toEqual(conditionInclusions[i]);
                click(conditionSelectors, 1);
            }
        });

        // TODO: enable after resolving https://github.com/SAP/fundamental-ngx/issues/4957
        xit('should check define conditions custom exclusions', () => {
            scrollIntoView(openDialogBtn, 1);
            click(openDialogBtn, 1);
            click(addBtn, 1);
            click(conditionsInputField, 1);
            sendKeys(valueZero);
            click(conditionSelectors, 1);

            const optionsCount = getElementArrayLength(dropdownOptions);
            for (let i = 0; optionsCount > i; i++) {
                expect(getText(dropdownOptions, i)).toEqual(customExclusionLabels[i]);
                click(dropdownOptions, i);
                expect(getText(selectedTokens)).toEqual(conditionExclusions[i]);
                click(conditionSelectors, 1);
            }
        });
    });

    describe('token display function for the value help dialog examples', function() {
        it('should check custom tokens', () => {
            scrollIntoView(openDialogBtn, 2);
            click(openDialogBtn, 2);
            clickTableCheckbox(1);
            const selectedItem = getText(selectedItemName);
            const selectedItemId = getText(selectedItemID);
            expect(getText(selectedTokens)).toEqual(selectedItem + ` (Id: ${selectedItemId})`);
        });
    });

    describe('filters combinations examples', function() {
        it('should check inclusion and exclusions disabled', () => {
            scrollIntoView(openDialogBtn, 3);
            click(openDialogBtn, 3);
            expect(doesItExist(formTabs)).toBe(false);
        });

        xit('should check inclusions disabled, exclusions enabled', () => {
            // skip due to https://github.com/SAP/fundamental-ngx/issues/4574
            scrollIntoView(openDialogBtn, 3);
            click(disableCheckboxes, 1);
            click(openDialogBtn, 3);
            expect(doesItExist(formTabs)).toBe(true);
            click(formTabs, 1);
            expect(getText(sectionLabels)).toEqual(exclusionLabel);

        });

        xit('should check exclusions disabled, inclusions enabled', () => {
            // skip due to https://github.com/SAP/fundamental-ngx/issues/4574
            scrollIntoView(openDialogBtn, 3);
            click(disableCheckboxes);
            click(openDialogBtn, 3);
            expect(doesItExist(formTabs)).toBe(true);
            click(formTabs, 1);
            expect(getText(sectionLabels)).toEqual(inclusionLabel);
        });
    });

    describe('selection in value help dialog examples', function() {
        it('should check single selection results', () => {
            scrollIntoView(miniOpenDialogBtn);
            click(miniOpenDialogBtn);
            click(productNameColumn, 1);
            const selectedItem = getText(selectedItemName);
            expect(getText(selectedTokens)).toEqual(selectedItem);
            click(productNameColumn, 4);
            const newSelectedItem = getText(selectedItemName);
            expect(getElementArrayLength(selectedTokens)).toBe(1);
            expect(getText(selectedTokens)).toEqual(newSelectedItem);
        });

        it('should check multi selection results', () => {
            scrollIntoView(miniOpenDialogBtn, 1);
            click(miniOpenDialogBtn, 1);
            clickTableCheckbox(1);
            clickTableCheckbox(2);
            clickTableCheckbox(3);

            const tokensCount = getElementArrayLength(selectedTokens);
            for (let i = 0; tokensCount > i; i++) {
                expect(getText(selectedItemName, i)).toEqual(getText(selectedTokens, i));
            }
        });

        it('should check form closes after one selection', () => {
            scrollIntoView(miniOpenDialogBtn, 2);
            click(miniOpenDialogBtn, 2);
            click(productNameColumn, 1);
            expect(doesItExist(dialogContainer)).toBe(false);
        });
    });

    describe('multi input field with value help dialog examples', function() {
        it('should check selection from mini dialog menu', () => {
            scrollIntoView(menuDialogBtn);
            click(menuDialogBtn);
            const itemName = getText(menuItemNames);
            click(menuCheckboxes);
            click(menuDialogBtn);
            expect(getText(inputToken)).toEqual(itemName);
        });

        it('should check selection from main dialog', () => {
            scrollIntoView(openDialogBtn, 4);
            click(openDialogBtn, 4);
            clickTableCheckbox(1);
            const selectedItem = getText(selectedItemName);
            expect(getText(selectedTokens)).toEqual(selectedItem);
            click(footerBtns, 2);
            expect(getText(inputToken)).toEqual(selectedItem.toUpperCase());
        });
    });

    describe('mobile version examples', function() {
        it('should check mobile property true', () => {
            expect(getAttributeByName(mobileExampleDialog, mobileAttr)).toBe('true');
        });
    });

    describe('should check orientation', function() {
        it('should check RTL and LTR orientations', () => {
            valueHelpDialogPage.checkRtlSwitch();
        });
    });

    function checkResults(selector: string, expectation: string): void {
        const resultsCount = getElementArrayLength(selector);

        for (let i = 1; resultsCount > i; i++) {
            scrollIntoView(selector, i);
            expect(getText(selector, i).toLowerCase()).toContain(expectation);
        }
    }

    function checkConditionalTokens(expectation: string[], selectorIndex: number = 0): void {
        const optionsCount = getElementArrayLength(dropdownOptions);
        for (let i = 0; optionsCount > i; i++) {
            click(dropdownOptions, i);
            expect(getText(selectedTokens)).toEqual(expectation[i]);
            click(conditionSelectors, selectorIndex);
        }
    }

    function clickTableCheckbox(index: number): void {
        return (browserIsFirefox() ? click(tableCheckboxesFF, index) : click(tableCheckboxes, index));
    }
});
