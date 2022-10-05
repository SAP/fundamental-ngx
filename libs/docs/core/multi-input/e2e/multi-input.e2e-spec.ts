import {
    browserIsSafari,
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    getText,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

import { MultiInputPo } from './multi-input.po';

import {
    testOptionsArray1,
    testOptionsArray2,
    testOptionsArray3,
    testOptionsArray4,
    testOptionsArray5,
    testOptionsArray6
} from './multi-input-contents';

describe('Multi input test suite', () => {
    const multiInputPage = new MultiInputPo();
    const {
        activeDropdownButtons,
        activeInputs,
        disableInputs,
        simpleMultiInputOptions,
        multiInputOptions,
        buttonShowAll,
        expandedDropdown,
        hiddenAddonButtonInputOptions,
        compactMultiInputOptions,
        multiSelectButton,
        approveButton,
        mobileInputOptions,
        displayObjectOptions,
        searchTermOptions,
        customFilterOptions,
        asyncExampleOptions,
        tokenOptions,
        templateOptions,
        simpleExampleTokens,
        checkboxInput,
        listItem,
        simpleHiddenAddonExampleTokens,
        popover,
        compactExampleTokens,
        dialogCheckbox,
        selectAllItemsBtn,
        dialogListItem,
        compactInput
    } = multiInputPage;

    beforeAll(async () => {
        await multiInputPage.open();
        await waitForPresent(multiInputPage.title);
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(multiInputPage.root);
        await waitForElDisplayed(multiInputPage.title);
    }, 1);

    it('Check RTL/LTR orientation', async () => {
        await multiInputPage.checkRtlSwitch();
    });

    it('Verify inputs should have placeholder', async () => {
        const activeInputsLength = await getElementArrayLength(activeInputs);
        for (let i = 0; i < activeInputsLength; i++) {
            await scrollIntoView(activeInputs, i);
            if (i === 10 || i === 11) {
                await expect(await getAttributeByName(activeInputs, 'placeholder', i)).toBe('Search Here...');
            } else if (i === 12) {
                // skip due to for some reason it returns 'true' in Safari
                if (!(await browserIsSafari())) {
                    await expect(await getAttributeByName(activeInputs, 'placeholder', i)).toBe('');
                }
            } else {
                await expect(await getAttributeByName(activeInputs, 'placeholder', i)).toBe('Search here...');
            }
        }
    });

    it('verify disabled multi inputs', async () => {
        const disableInputsLength = await getElementArrayLength(disableInputs);
        for (let i = 0; i < disableInputsLength; i++) {
            await scrollIntoView(disableInputs, i);
            await expect(await getAttributeByName(disableInputs, 'class', i)).toContain('is-disabled');
        }
    });

    it('should check enter key doesnt add an empty token', async () => {
        const originalTokenCount = await getElementArrayLength(simpleExampleTokens);
        await click(activeInputs);
        await sendKeys(['Enter']);
        const newTokenCount = await getElementArrayLength(simpleExampleTokens);

        await expect(newTokenCount).toEqual(originalTokenCount);
    });

    it('should check multiInput options stay open when clicking checkbox', async () => {
        await click(activeDropdownButtons);
        await waitForElDisplayed(popover);
        await click(checkboxInput);

        await expect(await isElementDisplayed(popover)).toBe(true, 'popover not displayed');
    });

    it('should check multiInput options close when clicking on list item', async () => {
        await click(activeDropdownButtons);
        await waitForElDisplayed(popover);
        await click(listItem);

        await expect(await doesItExist(popover)).toBe(false, 'popover still displayed');
    });

    // TODO: https://github.com/SAP/fundamental-ngx/issues/8790
    xit('should narrow down the selection to a single item and select it', async () => {
        await scrollIntoView(activeInputs, 1);
        await click(activeInputs, 1);
        await sendKeys('apple');
        await waitForElDisplayed(listItem);
        await click(listItem);
        await expect(await getElementArrayLength(simpleHiddenAddonExampleTokens)).toBe(2);
        await expect(await getText(simpleHiddenAddonExampleTokens, 0)).toBe('Kiwi');
        await expect(await getText(simpleHiddenAddonExampleTokens, 1)).toBe('Apple');
    });

    // TODO: https://github.com/SAP/fundamental-ngx/issues/8790
    xit('should be able to select all tokens and delete with delete key', async () => {
        await scrollIntoView(compactExampleTokens);
        await click(activeInputs, 4);
        await sendKeys(['Control', 'a']);
        await sendKeys(['Delete']);
        const newTokenCount = await getElementArrayLength(compactExampleTokens);

        await expect(newTokenCount).toEqual(0);
    });

    describe('Check Mobile Mode Multi Input', () => {
        it('verify Simple Multi Input by select each option', async () => {
            await scrollIntoView(activeDropdownButtons);
            await click(activeDropdownButtons);
            await scrollIntoView(simpleMultiInputOptions, 7);
            await click(simpleMultiInputOptions, 7);
            await click(activeDropdownButtons);
            const inputOptionsLength = await getElementArrayLength(multiInputOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                await scrollIntoView(multiInputOptions, i);
                await expect(await getText(multiInputOptions, i)).toBe(testOptionsArray1[i]);
            }
        });
    });

    describe('Check Hidden Addon Button', () => {
        // TODO: https://github.com/SAP/fundamental-ngx/issues/8790
        xit('verify Hidden Addon Button by select each option', async () => {
            await scrollIntoView(activeInputs, 1);
            await setValue(activeInputs, 'to', 1);
            await scrollIntoView(buttonShowAll);
            await click(buttonShowAll);
            await expect(await waitForElDisplayed(expandedDropdown, 1)).toBe(true);
            await expect(await getText(hiddenAddonButtonInputOptions, 0)).toBe(testOptionsArray2[0]);
            const optionsLength = await getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength; i++) {
                // deselecting first, selecting other
                await scrollIntoView(checkboxInput, i);
                await click(checkboxInput, i);
            }
            const inputOptionsLength = await getElementArrayLength(hiddenAddonButtonInputOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                await scrollIntoView(hiddenAddonButtonInputOptions, i);
                // expecting first element to be not selected, others to be selected
                await expect(await getText(hiddenAddonButtonInputOptions, i)).toBe(testOptionsArray2[i + 1]);
            }
        });
    });

    describe('Check Compact Multi Input', () => {
        it('verify Compact Multi Input by select each option', async () => {
            await scrollIntoView(activeDropdownButtons, 2);
            const inputOptionsLength = await getElementArrayLength(compactMultiInputOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                await scrollIntoView(compactMultiInputOptions, i);
                await expect(await getText(compactMultiInputOptions, i)).toBe(testOptionsArray1[i]);
            }
            await click(activeDropdownButtons, 2);
            const optionsLength = await getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength - 4; i++) {
                await scrollIntoView(checkboxInput, i);
                await click(checkboxInput, i);
            }
            await click(activeDropdownButtons, 2);
            for (let i = 0; i < inputOptionsLength - 4; i++) {
                await scrollIntoView(compactMultiInputOptions, i);
                await expect(await getText(compactMultiInputOptions, i)).toBe(testOptionsArray3[i]);
            }
        });
    });

    describe('Check Mobile Mode Multi Input', () => {
        it('verify Mobile Mode Multi Input by multi select button', async () => {
            await scrollIntoView(activeDropdownButtons, 3);
            await click(activeDropdownButtons, 3);
            await click(multiSelectButton);
            await click(approveButton);
            const inputOptionsLength = await getElementArrayLength(mobileInputOptions);
            for (let i = 0; i < inputOptionsLength - 8; i++) {
                await scrollIntoView(mobileInputOptions, i);
                await expect(await getText(mobileInputOptions, i)).toBe(testOptionsArray1[i]);
            }
        });

        it('verify Mobile Mode Multi Input by select each option', async () => {
            await scrollIntoView(activeDropdownButtons, 3);
            await click(activeDropdownButtons, 3);
            const optionsLength = await getElementArrayLength(dialogCheckbox);
            for (let i = 0; i < optionsLength; i++) {
                await scrollIntoView(dialogCheckbox, i);
                await click(dialogCheckbox, i);
            }
            await click(approveButton);
            const inputOptionsLength = await getElementArrayLength(mobileInputOptions);
            for (let i = 0; i < inputOptionsLength - 8; i++) {
                await scrollIntoView(mobileInputOptions, i);
                await expect(await getText(mobileInputOptions, i)).toBe(testOptionsArray1[i]);
            }
        });

        it('should check selecting all items by clicking Select All button', async () => {
            await scrollIntoView(activeDropdownButtons, 3);
            await click(activeDropdownButtons, 3);
            const optionsLength = await getElementArrayLength(dialogCheckbox);
            await click(selectAllItemsBtn);
            for (let i = 0; i < optionsLength; i++) {
                await expect(await getElementClass(dialogListItem, i)).toContain('is-selected');
            }
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7203
        xit('should check unselecting all items after selecting by Select All button', async () => {
            await scrollIntoView(activeDropdownButtons, 3);
            await click(activeDropdownButtons, 3);
            const optionsLength = await getElementArrayLength(dialogCheckbox);
            await click(selectAllItemsBtn);
            await click(selectAllItemsBtn);
            for (let i = 0; i < optionsLength; i++) {
                await expect(await getElementClass(dialogListItem, i)).not.toContain('is-selected');
            }
        });
    });

    describe('Check Display Object Property', () => {
        it('verify Display Object Property by select each option', async () => {
            await scrollIntoView(activeDropdownButtons, 5);
            await click(activeDropdownButtons, 5);
            const optionsLength = await getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength; i++) {
                await scrollIntoView(checkboxInput, i);
                await click(checkboxInput, i);
            }
            await click(activeDropdownButtons, 5);
            const inputOptionsLength = await getElementArrayLength(displayObjectOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                await scrollIntoView(displayObjectOptions, i);
                await expect(await getText(displayObjectOptions, i)).toBe(testOptionsArray4[i]);
            }
        });
    });

    describe('Check Return results including search term', () => {
        it('verify Return results including search term by clicking each option', async () => {
            await scrollIntoView(activeDropdownButtons, 6);
            await click(activeDropdownButtons, 6);
            const optionsLength = await getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength; i++) {
                await scrollIntoView(checkboxInput, i);
                await click(checkboxInput, i);
            }
            await click(activeDropdownButtons, 6);
            const inputOptionsLength = await getElementArrayLength(searchTermOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                await scrollIntoView(searchTermOptions, i);
                await expect(await getText(searchTermOptions, i)).toBe(testOptionsArray5[i]);
            }
        });
    });

    describe('Check Custom Filter', () => {
        it('verify Custom Filter by clicking each option', async () => {
            await scrollIntoView(activeDropdownButtons, 7);
            await click(activeDropdownButtons, 7);
            const optionsLength = await getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength; i++) {
                await scrollIntoView(checkboxInput, i);
                await click(checkboxInput, i);
            }
            await click(activeDropdownButtons, 7);
            const inputOptionsLength = await getElementArrayLength(customFilterOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                await scrollIntoView(customFilterOptions, i);
                await expect(await getText(customFilterOptions, i)).toBe(testOptionsArray5[i]);
            }
        });
    });

    // Broken due to changes in example's data source.
    xdescribe('Check Observable Async Example', () => {
        it('verify Observable Async Example by clicking each option', async () => {
            await scrollIntoView(activeDropdownButtons, 8);
            await click(activeDropdownButtons, 8);
            const optionsLength = await getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength; i++) {
                await scrollIntoView(checkboxInput, i);
                await click(checkboxInput, i);
            }
            await click(activeDropdownButtons, 8);
            const inputOptionsLength = await getElementArrayLength(asyncExampleOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                await scrollIntoView(asyncExampleOptions, i);
                await expect(await getText(asyncExampleOptions, i)).toBe(testOptionsArray5[i]);
            }
        });
    });

    describe('Check Multi Input in Reactive Form', () => {
        it('verify Multi Input in Reactive Form by clicking each option', async () => {
            await scrollIntoView(activeDropdownButtons, 9);
            await click(activeDropdownButtons, 9);
            await click(checkboxInput, 2);
            await click(checkboxInput, 3);
            await click(activeDropdownButtons, 9);
            const inputOptionsLength = await getElementArrayLength(asyncExampleOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                await scrollIntoView(asyncExampleOptions, i);
                await expect(await getText(asyncExampleOptions, i)).toBe(testOptionsArray5[i]);
            }
        });
    });

    describe('Check Adding New Tokens', () => {
        it('verify Adding New Tokens by clicking each option', async () => {
            await scrollIntoView(activeDropdownButtons, 10);
            await click(activeDropdownButtons, 10);
            const optionsLength = await getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength; i++) {
                await scrollIntoView(checkboxInput, i);
                await click(checkboxInput, i);
            }
            await click(activeDropdownButtons, 10);
            const inputOptionsLength = await getElementArrayLength(tokenOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                await scrollIntoView(tokenOptions, i);
                await expect(await getText(tokenOptions, i)).toBe(testOptionsArray1[i]);
            }
        });
    });

    describe('Check Custom Item Template', () => {
        it('verify Custom Item Template by clicking each option', async () => {
            await scrollIntoView(activeDropdownButtons, 11);
            await click(activeDropdownButtons, 11);
            const optionsLength = await getElementArrayLength(checkboxInput);
            for (let i = 5; i < optionsLength; i++) {
                await scrollIntoView(checkboxInput, i);
                await click(checkboxInput, i);
            }
            await click(activeDropdownButtons, 11);
            const inputOptionsLength = await getElementArrayLength(templateOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                await scrollIntoView(templateOptions, i);
                await expect(await getText(templateOptions, i)).toBe(testOptionsArray6[i]);
            }
        });
    });

    it('should check compact input be smaller than basic input', async () => {
        const basicInputS = await getElementSize(activeInputs);
        const compactInputS = await getElementSize(compactInput);

        await expect(basicInputS.height).toBeGreaterThan(compactInputS.height);
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await multiInputPage.saveExampleBaselineScreenshot();
            await expect(await multiInputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
