import { VhdPo } from './vhd.po';
import {
    browserIsFirefox,
    browserIsSafari,
    clearValue,
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    isElementDisplayed,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { conditionsValues, customLabels, inputIDs } from './vhd-contents';
import { searchValues, valueOne, valueZero } from './vhd';

describe('Value help dialog test suite', () => {
    const valueHelpDialogPage = new VhdPo();
    const {
        dialogHeader,
        openDialogBtn,
        basicSearchInput,
        formInputField,
        goBtn,
        tableRows,
        tableCheckboxes,
        selectedItemName,
        selectedTokens,
        formTabs,
        addBtn,
        dialogContainer,
        footerBtns,
        productNameColumn,
        productCodeColumn,
        productCityColumn,
        productZipcodeColumn,
        productAddressColumn,
        productNicknameColumn,
        conditionSelectors,
        conditionsInputField,
        dropdownOptions,
        selectedItemID,
        miniOpenDialogBtn,
        menuDialogBtn,
        menuCheckboxes,
        inputToken,
        menuItemNames,
        advSearchLabels,
        tableColumn,
        advSearchOptions,
        advSearchToggle,
        tableCheckboxesFF,
        xBtn,
        showAllBtn,
        inputFields,
        toolbarButtons,
        conditionsButton,
        cancelButton,
        input,
        dropDownItem,
        openMobileExampleBtn,
        dialogButton,
        dialogInput,
        token,
        tokenizerClearButton
    } = valueHelpDialogPage;

    beforeAll(() => {
        valueHelpDialogPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(valueHelpDialogPage.root);
        waitForElDisplayed(valueHelpDialogPage.title);
    }, 1);

    if (browserIsSafari()) {
        // skip safari; many test runner issues here
        console.log('skip safari');
        return;
    }

    describe('Basic Value Help Dialog examples', () => {
        it('should check default view and header', () => {
            click(openDialogBtn);
            expect(getElementArrayLength(inputFields)).toBe(2);
            expect(waitForElDisplayed(dialogHeader)).toBe(true);
            expect(['', null]).not.toContain(getText(dialogHeader));
        });

        it('should check the basic search results', () => {
            click(openDialogBtn);
            click(basicSearchInput);
            setValue(basicSearchInput, searchValues[0]);
            click(goBtn);
            pause(300);
            checkResults(tableRows, searchValues[0]);
        });

        it('should check advanced search results', () => {
            click(openDialogBtn);
            click(advSearchToggle);
            click(showAllBtn);
            const advSearchFieldCount = 6;
            const searchResultsColumnsArr = [
                productNameColumn,
                productCodeColumn,
                productCityColumn,
                productZipcodeColumn,
                productAddressColumn,
                productNicknameColumn
            ];

            for (let i = 0; advSearchFieldCount > i; i++) {
                click(formInputField(inputIDs[i]));
                setValue(formInputField(inputIDs[i]), searchValues[i]);
                click(goBtn);
                pause(300);
                checkResults(searchResultsColumnsArr[i], searchValues[i]);
                click(formInputField(inputIDs[i]));
                clearValue(formInputField(inputIDs[i]));
            }
        });

        it('should check the selection appears as a token', () => {
            click(openDialogBtn);
            pause(300);
            clickTableCheckbox(1);
            const selectedItem = getText(selectedItemName);
            expect(getText(selectedTokens).trim()).toEqual(selectedItem);
        });

        it('should check the inclusion conditional statements', () => {
            click(openDialogBtn);
            click(formTabs, 1);
            click(conditionsInputField, 1);
            sendKeys(valueZero);
            click(conditionsButton);

            const optionsCount = getElementArrayLength(dropdownOptions);
            for (let i = 0; optionsCount > i; i++) {
                if (i === 2) {
                    click(dropdownOptions, i);
                    click(conditionsInputField, 2);
                    sendKeys(valueOne);
                    expect(getText(selectedTokens).trim()).toEqual(conditionsValues[i]);
                    click(conditionsButton);
                    continue;
                }
                click(dropdownOptions, i);
                expect(getText(selectedTokens).trim()).toEqual(conditionsValues[i]);
                click(conditionsButton);
            }
        });

        it('should check the cancel button', () => {
            click(openDialogBtn);
            waitForPresent(dialogContainer);
            click(footerBtns, 1);
            waitForPresent(openDialogBtn);
        });

        it('should check advanced search options appear for table columns', () => {
            click(openDialogBtn);
            waitForElDisplayed(toolbarButtons);
            click(toolbarButtons);
            click(showAllBtn);
            const columnCount = getElementArrayLength(tableColumn);

            for (let i = 0; columnCount - 1 > i; i++) {
                expect(getText(advSearchLabels, i).trim()).toContain(getText(tableColumn, i + 1).trim());
            }
        });

        it('should check advanced search toggle', () => {
            click(openDialogBtn);
            expect(doesItExist(advSearchOptions)).toBe(false);
            click(advSearchToggle);
            expect(doesItExist(advSearchOptions)).toBe(true);
            click(advSearchToggle);
            expect(doesItExist(advSearchOptions)).toBe(false);
        });

        it('should check the remove conditions btn', () => {
            click(openDialogBtn);
            click(formTabs, 1);
            expect(getElementArrayLength(conditionSelectors)).toBe(1);
            click(addBtn);
            expect(getElementArrayLength(conditionSelectors)).toBe(2);
            click(xBtn);
            expect(getElementArrayLength(conditionSelectors)).toBe(1);
        });
    });

    describe('custom strategy labels examples', () => {
        it('should check define conditions custom labels', () => {
            scrollIntoView(openDialogBtn, 1);
            click(openDialogBtn, 1);
            click(conditionsInputField, 1);
            sendKeys(valueZero);
            click(conditionsButton);

            const optionsCount = getElementArrayLength(dropdownOptions);
            for (let i = 0; optionsCount > i; i++) {
                if (i === 2) {
                    expect(getText(dropdownOptions, i).trim()).toEqual(customLabels[i]);
                    click(dropdownOptions, i);
                    click(conditionsInputField, 2);
                    sendKeys(valueOne);
                    expect(getText(selectedTokens).trim()).toEqual(conditionsValues[i]);
                    click(conditionsButton);
                    continue;
                }
                expect(getText(dropdownOptions, i).trim()).toEqual(customLabels[i]);
                click(dropdownOptions, i);
                expect(getText(selectedTokens).trim()).toEqual(conditionsValues[i]);
                click(conditionsButton);
            }
        });

        // skipp due to https://github.com/SAP/fundamental-ngx/issues/7458
        xit('should check that we can add condition by press Enter', () => {
            click(openDialogBtn, 1);
            click(conditionsInputField, 1);
            sendKeys(valueZero);
            sendKeys('Enter');
            expect(isElementDisplayed(token)).toBe(true);
        });
    });

    describe('token display function for the value help dialog examples', () => {
        it('should check custom tokens', () => {
            scrollIntoView(openDialogBtn, 2);
            click(openDialogBtn, 2);
            clickTableCheckbox(1);
            const selectedItem = getText(selectedItemName).trim();
            const selectedItemId = getText(selectedItemID).trim();
            expect(getText(selectedTokens).trim()).toEqual(selectedItem + ` (Id: ${selectedItemId})`);
        });
    });

    describe('selection in value help dialog examples', () => {
        it('should check single selection results', () => {
            scrollIntoView(miniOpenDialogBtn);
            click(miniOpenDialogBtn);
            click(productNameColumn, 1);
            const selectedItem = getText(selectedItemName).trim();
            expect(getText(selectedTokens).trim()).toEqual(selectedItem);
            click(productNameColumn, 4);
            const newSelectedItem = getText(selectedItemName).trim();
            expect(getElementArrayLength(selectedTokens)).toBe(1);
            expect(getText(selectedTokens).trim()).toEqual(newSelectedItem);
        });

        it('should check multi selection results', () => {
            scrollIntoView(miniOpenDialogBtn, 1);
            click(miniOpenDialogBtn, 1);
            clickTableCheckbox(1);
            clickTableCheckbox(2);
            clickTableCheckbox(3);

            const tokensCount = getElementArrayLength(selectedTokens);
            for (let i = 0; tokensCount > i; i++) {
                expect(getText(selectedItemName, i).trim()).toEqual(getText(selectedTokens, i).trim());
            }
        });

        it('should check form closes after one selection', () => {
            scrollIntoView(miniOpenDialogBtn, 2);
            click(miniOpenDialogBtn, 2);
            click(productNameColumn, 1);
            expect(doesItExist(dialogContainer)).toBe(false);
        });
    });

    describe('multi input field with value help dialog examples', () => {
        it('should check selection from mini dialog menu', () => {
            scrollIntoView(menuDialogBtn);
            click(menuDialogBtn);
            const itemName = getText(menuItemNames).trim();
            click(menuCheckboxes);
            click(menuDialogBtn);
            expect(getText(inputToken)).toEqual(itemName);
            click(openDialogBtn, 3);
            expect(getAttributeByName(tableRows, 'aria-selected')).toBe('true');
        });

        it('should check selection from main dialog', () => {
            scrollIntoView(openDialogBtn, 3);
            click(openDialogBtn, 3);
            clickTableCheckbox(1);
            const selectedItem = getText(selectedItemName).trim();
            expect(getText(selectedTokens).trim()).toEqual(selectedItem);
            click(footerBtns, 1);
            waitForPresent(inputToken);
            expect(getText(inputToken).trim()).toEqual(selectedItem.toUpperCase());
        });

        it('should check search field', () => {
            click(openDialogBtn, 3);
            const firstName = getText(productNameColumn).toLowerCase().trim();
            click(cancelButton);
            click(input, 3);
            sendKeys(firstName);
            expect(getText(dropDownItem).toLowerCase().trim()).toEqual(firstName);
        });
    });

    describe('Mobile example', () => {
        it('should check selecting in value help dialog', () => {
            click(openMobileExampleBtn);
            click(dialogButton);
            clickTableCheckbox(1);
            const text = getText(productNameColumn).trim();
            expect(getText(token).trim()).toBe(text);
        });

        it('should check search in mobile example', () => {
            click(openMobileExampleBtn);
            click(dialogButton);
            const text = getText(productNameColumn);
            click(dialogButton, 3);
            setValue(dialogInput, text);
            click(dialogButton, 2);
            const itemsQuantity = getElementArrayLength(productNameColumn);

            for (let i = 0; i < itemsQuantity; i++) {
                expect(getText(productNameColumn, i)).toContain(text);
            }
        });

        it('should check unselecting token by tokenizer', () => {
            click(openMobileExampleBtn);
            click(dialogButton);
            clickTableCheckbox(1);
            clickTableCheckbox(2);
            expect(getElementArrayLength(token)).toBe(2);
            click(dialogButton + '[glyph=decline]');
            expect(doesItExist(token)).toBe(false);
            for (let i = 1; i < getElementArrayLength(tableRows) - 1; i++) {
                expect(getAttributeByName(tableRows, 'aria-selected', i)).toBe('false');
            }
        });

        it('should check that cross button is disable untill we select an item', () => {
            click(openMobileExampleBtn);
            click(dialogButton);
            expect(getElementClass(tokenizerClearButton)).toContain('is-disabled');
            clickTableCheckbox(1);
            expect(getElementClass(tokenizerClearButton)).not.toContain('is-disabled');
        });
    });

    describe('should check orientation', () => {
        it('should check RTL and LTR orientations', () => {
            valueHelpDialogPage.checkRtlSwitch();
        });
    });

    function checkResults(selector: string, expectation: string): void {
        const resultsCount = getElementArrayLength(selector);

        for (let i = 1; resultsCount > i; i++) {
            scrollIntoView(selector, i);
            expect(getText(selector, i).toLowerCase().trim()).toContain(expectation);
        }
    }

    function clickTableCheckbox(index: number): void {
        browserIsFirefox()
            ? click(tableCheckboxesFF, index)
            : browserIsSafari()
            ? click('table .fd-table__cell--checkbox', index)
            : click(tableCheckboxes, index);
    }
});
