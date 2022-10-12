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

    beforeAll(async () => {
        await valueHelpDialogPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(valueHelpDialogPage.root);
        await waitForElDisplayed(valueHelpDialogPage.title);
    }, 1);

    if (browserIsSafari()) {
        // skip safari; many test runner issues here
        console.log('skip safari');
        return;
    }

    describe('Basic Value Help Dialog examples', () => {
        it('should check default view and header', async () => {
            await click(openDialogBtn);
            await expect(await getElementArrayLength(inputFields)).toBe(2);
            await expect(await waitForElDisplayed(dialogHeader)).toBe(true);
            await expect(['', null]).not.toContain(await getText(dialogHeader));
        });

        it('should check the basic search results', async () => {
            await click(openDialogBtn);
            await click(basicSearchInput);
            await setValue(basicSearchInput, searchValues[0]);
            await click(goBtn);
            await pause(300);
            await checkResults(tableRows, searchValues[0]);
        });

        it('should check advanced search results', async () => {
            await click(openDialogBtn);
            await click(advSearchToggle);
            await click(showAllBtn);
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
                await click(formInputField(inputIDs[i]));
                await setValue(formInputField(inputIDs[i]), searchValues[i]);
                await click(goBtn);
                await pause(300);
                await checkResults(searchResultsColumnsArr[i], searchValues[i]);
                await click(formInputField(inputIDs[i]));
                await clearValue(formInputField(inputIDs[i]));
            }
        });

        it('should check the selection appears as a token', async () => {
            await click(openDialogBtn);
            await pause(300);
            await clickTableCheckbox(1);
            const selectedItem = await getText(selectedItemName);
            await expect((await getText(selectedTokens)).trim()).toEqual(selectedItem);
        });

        it('should check the inclusion conditional statements', async () => {
            await click(openDialogBtn);
            await click(formTabs, 1);
            await click(conditionsInputField, 1);
            await sendKeys(valueZero);
            await click(conditionsButton);

            const optionsCount = await getElementArrayLength(dropdownOptions);
            for (let i = 0; optionsCount > i; i++) {
                if (i === 2) {
                    await click(dropdownOptions, i);
                    await click(conditionsInputField, 2);
                    await sendKeys(valueOne);
                    await expect((await getText(selectedTokens)).trim()).toEqual(conditionsValues[i]);
                    await click(conditionsButton);
                    continue;
                }
                await click(dropdownOptions, i);
                await expect((await getText(selectedTokens)).trim()).toEqual(conditionsValues[i]);
                await click(conditionsButton);
            }
        });

        it('should check the cancel button', async () => {
            await click(openDialogBtn);
            await waitForPresent(dialogContainer);
            await click(footerBtns, 1);
            await waitForPresent(openDialogBtn);
        });

        it('should check advanced search options appear for table columns', async () => {
            await click(openDialogBtn);
            await waitForElDisplayed(toolbarButtons);
            await click(toolbarButtons);
            await click(showAllBtn);
            const columnCount = await getElementArrayLength(tableColumn);

            for (let i = 0; columnCount - 1 > i; i++) {
                await expect((await getText(advSearchLabels, i)).trim()).toContain(
                    (await getText(tableColumn, i + 1)).trim()
                );
            }
        });

        it('should check advanced search toggle', async () => {
            await click(openDialogBtn);
            await expect(await doesItExist(advSearchOptions)).toBe(false);
            await click(advSearchToggle);
            await expect(await doesItExist(advSearchOptions)).toBe(true);
            await click(advSearchToggle);
            await expect(await doesItExist(advSearchOptions)).toBe(false);
        });

        it('should check the remove conditions btn', async () => {
            await click(openDialogBtn);
            await click(formTabs, 1);
            await expect(await getElementArrayLength(conditionSelectors)).toBe(1);
            await click(addBtn);
            await expect(await getElementArrayLength(conditionSelectors)).toBe(2);
            await click(xBtn);
            await expect(await getElementArrayLength(conditionSelectors)).toBe(1);
        });
    });

    describe('custom strategy labels examples', () => {
        it('should check define conditions custom labels', async () => {
            await scrollIntoView(openDialogBtn, 1);
            await click(openDialogBtn, 1);
            await click(conditionsInputField, 1);
            await sendKeys(valueZero);
            await click(conditionsButton);

            const optionsCount = await getElementArrayLength(dropdownOptions);
            for (let i = 0; optionsCount > i; i++) {
                if (i === 2) {
                    await expect((await getText(dropdownOptions, i)).trim()).toEqual(customLabels[i]);
                    await click(dropdownOptions, i);
                    await click(conditionsInputField, 2);
                    await sendKeys(valueOne);
                    await expect((await getText(selectedTokens)).trim()).toEqual(conditionsValues[i]);
                    await click(conditionsButton);
                    continue;
                }
                await expect((await getText(dropdownOptions, i)).trim()).toEqual(customLabels[i]);
                await click(dropdownOptions, i);
                await expect((await getText(selectedTokens)).trim()).toEqual(conditionsValues[i]);
                await click(conditionsButton);
            }
        });

        // skipp due to https://github.com/SAP/fundamental-ngx/issues/7458
        xit('should check that we can add condition by press Enter', async () => {
            await click(openDialogBtn, 1);
            await click(conditionsInputField, 1);
            await sendKeys(valueZero);
            await sendKeys('Enter');
            await expect(await isElementDisplayed(token)).toBe(true);
        });
    });

    describe('token display function for the value help dialog examples', () => {
        it('should check custom tokens', async () => {
            await scrollIntoView(openDialogBtn, 2);
            await click(openDialogBtn, 2);
            await clickTableCheckbox(1);
            const selectedItem = (await getText(selectedItemName)).trim();
            const selectedItemId = (await getText(selectedItemID)).trim();
            await expect((await getText(selectedTokens)).trim()).toEqual(selectedItem + ` (Id: ${selectedItemId})`);
        });
    });

    describe('selection in value help dialog examples', () => {
        it('should check single selection results', async () => {
            await scrollIntoView(miniOpenDialogBtn);
            await click(miniOpenDialogBtn);
            await click(productNameColumn, 1);
            const selectedItem = (await getText(selectedItemName)).trim();
            await expect((await getText(selectedTokens)).trim()).toEqual(selectedItem);
            await click(productNameColumn, 4);
            const newSelectedItem = (await getText(selectedItemName)).trim();
            await expect(await getElementArrayLength(selectedTokens)).toBe(1);
            await expect((await getText(selectedTokens)).trim()).toEqual(newSelectedItem);
        });

        it('should check multi selection results', async () => {
            await scrollIntoView(miniOpenDialogBtn, 1);
            await click(miniOpenDialogBtn, 1);
            await clickTableCheckbox(1);
            await clickTableCheckbox(2);
            await clickTableCheckbox(3);

            const tokensCount = await getElementArrayLength(selectedTokens);
            for (let i = 0; tokensCount > i; i++) {
                await expect((await getText(selectedItemName, i)).trim()).toEqual(
                    (await getText(selectedTokens, i)).trim()
                );
            }
        });

        it('should check form closes after one selection', async () => {
            await scrollIntoView(miniOpenDialogBtn, 2);
            await click(miniOpenDialogBtn, 2);
            await click(productNameColumn, 1);
            await expect(await doesItExist(dialogContainer)).toBe(false);
        });
    });

    describe('multi input field with value help dialog examples', () => {
        it('should check selection from mini dialog menu', async () => {
            await scrollIntoView(menuDialogBtn);
            await click(menuDialogBtn);
            const itemName = (await getText(menuItemNames)).trim();
            await click(menuCheckboxes);
            await click(menuDialogBtn);
            await expect(await getText(inputToken)).toEqual(itemName);
            await click(openDialogBtn, 3);
            await expect(await getAttributeByName(tableRows, 'aria-selected')).toBe('true');
        });

        it('should check selection from main dialog', async () => {
            await scrollIntoView(openDialogBtn, 3);
            await click(openDialogBtn, 3);
            await clickTableCheckbox(1);
            const selectedItem = (await getText(selectedItemName)).trim();
            await expect((await getText(selectedTokens)).trim()).toEqual(selectedItem);
            await click(footerBtns, 1);
            await waitForPresent(inputToken);
            await expect((await getText(inputToken)).trim()).toEqual(selectedItem.toUpperCase());
        });

        it('should check search field', async () => {
            await click(openDialogBtn, 3);
            const firstName = (await getText(productNameColumn)).toLowerCase().trim();
            await click(cancelButton);
            await click(input, 3);
            await sendKeys(firstName);
            await expect((await getText(dropDownItem)).toLowerCase().trim()).toEqual(firstName);
        });
    });

    describe('Mobile example', () => {
        it('should check selecting in value help dialog', async () => {
            await click(openMobileExampleBtn);
            await click(dialogButton);
            await clickTableCheckbox(1);
            const text = (await getText(productNameColumn)).trim();
            await expect((await getText(token)).trim()).toBe(text);
        });

        it('should check search in mobile example', async () => {
            await click(openMobileExampleBtn);
            await click(dialogButton);
            const text = await getText(productNameColumn);
            await click(dialogButton, 3);
            await setValue(dialogInput, text);
            await click(dialogButton, 2);
            const itemsQuantity = await getElementArrayLength(productNameColumn);

            for (let i = 0; i < itemsQuantity; i++) {
                await expect(await getText(productNameColumn, i)).toContain(text);
            }
        });

        it('should check unselecting token by tokenizer', async () => {
            await click(openMobileExampleBtn);
            await click(dialogButton);
            await clickTableCheckbox(1);
            await clickTableCheckbox(2);
            await expect(await getElementArrayLength(token)).toBe(2);
            await click(dialogButton + '[glyph=decline]');
            await expect(await doesItExist(token)).toBe(false);
            for (let i = 1; i < (await getElementArrayLength(tableRows)) - 1; i++) {
                await expect(await getAttributeByName(tableRows, 'aria-selected', i)).toBe('false');
            }
        });

        it('should check that cross button is disable untill we select an item', async () => {
            await click(openMobileExampleBtn);
            await click(dialogButton);
            await expect(await getElementClass(tokenizerClearButton)).toContain('is-disabled');
            await clickTableCheckbox(1);
            await expect(await getElementClass(tokenizerClearButton)).not.toContain('is-disabled');
        });
    });

    describe('should check orientation', () => {
        it('should check RTL and LTR orientations', async () => {
            await valueHelpDialogPage.checkRtlSwitch();
        });
    });

    async function checkResults(selector: string, expectation: string): Promise<void> {
        const resultsCount = await getElementArrayLength(selector);

        for (let i = 1; resultsCount > i; i++) {
            await scrollIntoView(selector, i);
            await expect((await getText(selector, i)).toLowerCase().trim()).toContain(expectation);
        }
    }

    async function clickTableCheckbox(index: number): Promise<void> {
        (await browserIsFirefox())
            ? await click(tableCheckboxesFF, index)
            : (await browserIsSafari())
            ? await click('table .fd-table__cell--checkbox', index)
            : await click(tableCheckboxes, index);
    }
});
