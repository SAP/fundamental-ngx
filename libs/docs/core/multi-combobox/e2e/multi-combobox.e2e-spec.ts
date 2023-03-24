import { MultiComboboxPo } from './multi-combobox.po';
import {
    click,
    doesItExist,
    getElementArrayLength,
    getElementClass,
    getText,
    getTextArr,
    refreshPage,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForNotPresent,
    waitForPresent
} from '../../../../../e2e';

describe('multi-combobox test suite', () => {
    const multiComboboxPage = new MultiComboboxPo();
    const {
        expandButton,
        token,
        tokenCloseButton,
        inputField,
        listItemCheckbox,
        listItem,
        list,
        selectedListItem,
        mobileModeExamples,
        tokenInputField,
        dialog,
        dialogButton,
        dialogListItem,
        selectedDialogItem,
        dialogInput,
        mobileExpandButton,
        showSelectedItemsBtn
    } = multiComboboxPage;
    const mobileExample = 6;
    const nMoreExample = 5;
    const twoColumnExample = 9;
    const tokenizerExample = 16;
    const searchValue = 'app';

    beforeAll(async () => {
        await multiComboboxPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(multiComboboxPage.root);
        await waitForElDisplayed(multiComboboxPage.title);
    }, 1);

    describe('Main checks', () => {
        it('should open and close list by clicking expand button', async () => {
            const exampleCount = await getElementArrayLength(expandButton);
            for (let i = 0; i < exampleCount; i++) {
                if (i !== mobileExample) {
                    await checkInputExpansion(i);
                }
            }
        });

        it('should close list when item selected', async () => {
            const exampleCount = await getElementArrayLength(expandButton);
            for (let i = 0; i < exampleCount; i++) {
                if (i !== mobileExample) {
                    await checkListClosedAfterSelection(i);
                }
            }
        });

        it('should be able to select multiple items via checkbox and tokens created for selected items', async () => {
            const exampleCount = await getElementArrayLength(expandButton);

            for (let i = 0; i < exampleCount; i++) {
                if (i === mobileExample || i === tokenizerExample) {
                    continue;
                }

                if (i === nMoreExample) {
                    await expandList(nMoreExample);
                    await selectTwoItems(listItemCheckbox);
                    const markedItems = (await getTextArr(selectedListItem)).sort();
                    await click(expandButton, nMoreExample);
                    const tokens = await getText(tokenInputField, nMoreExample);
                    const tokensArr = tokens.split('\n').sort();

                    await expect(markedItems).toEqual(tokensArr);
                    continue;
                }

                if (i === twoColumnExample) {
                    await expandList(twoColumnExample);
                    await selectTwoItems(listItemCheckbox);
                    const markedItems = (await getTextArr(selectedListItem)).sort().toString();
                    const filteredMarkedItems = markedItems.replace('\nFruits', '').replace('\nFruits', '');
                    await click(expandButton, twoColumnExample);
                    const tokens = await getText(tokenInputField, twoColumnExample);
                    const tokensArr = tokens.split('\n').sort().toString();

                    await expect(filteredMarkedItems).toEqual(tokensArr);
                    continue;
                }

                await checkMultiSelect(i);
            }
        });

        it('should be able to remove token by clicking the X button', async () => {
            const initialTokenCount = await getElementArrayLength(token);
            await scrollIntoView(tokenInputField);
            await click(tokenCloseButton);
            const newTokenCount = await getElementArrayLength(token);

            await expect(newTokenCount).toEqual(initialTokenCount - 1);
        });

        it('should be able to search by typing and get relevant results', async () => {
            const inputCount = await getElementArrayLength(inputField);

            for (let i = 0; i < inputCount; i++) {
                if (i !== mobileExample && i !== tokenizerExample) {
                    await scrollIntoView(inputField, i);
                    await click(inputField, i);
                    await sendKeys(searchValue);

                    if (i == inputCount - 2) {
                        await browser.pause(500);
                    }

                    await expect(await waitForElDisplayed(list)).toBe(true, `list ${i} not opened`);
                    const listItemText = await getTextArr(listItem);

                    for (const element of listItemText) {
                        await expect(element.toString().toLowerCase()).toContain(
                            searchValue,
                            `Values do not match for index ${i}`
                        );
                    }
                }
            }
        });
    });

    describe('mobile mode examples', () => {
        const close = 0;
        const save = 2;
        const cancel = 3;

        it('should be able to close dialog with X button, cancel button, save button', async () => {
            await openMobileList();
            await click(dialogButton, close);
            await expect(await waitForNotPresent(dialog)).toBe(true, 'dialog is not closed by x button');

            await openMobileList();
            await click(dialogButton, save);
            await expect(await waitForNotPresent(dialog)).toBe(true, 'dialog is not closed by save button');

            await openMobileList();
            await click(dialogButton, cancel);
            await expect(await waitForNotPresent(dialog)).toBe(true, 'dialog is not closed by cancel button');
        });

        it('should be able to make multiple selections', async () => {
            await openMobileList();
            await selectTwoItems(dialogListItem);
            const selectedItems = (await getTextArr(selectedDialogItem)).sort();
            await click(dialogButton, save);
            const tokens = (await getTextArr(mobileModeExamples + token)).sort();

            await expect(selectedItems).toEqual(tokens);
        });

        it('should be able to search by text', async () => {
            await openMobileList();
            await click(dialogInput);
            await sendKeys(searchValue);
            const searchResults = (await getTextArr(dialogListItem)).sort();

            for (const element of searchResults) {
                await expect(element.toString().toLowerCase()).toContain(searchValue);
            }
        });

        it('should be able to toggle selected items view', async () => {
            const viewToggle = 1;

            await openMobileList();
            await selectTwoItems(dialogListItem);
            await click(dialogButton, viewToggle);
            const selectedViewItemCount = await getElementArrayLength(dialogListItem);

            await expect(selectedViewItemCount).toBe(2);
        });
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6978
    xit('should check that items not added if you did not click Save button', async () => {
        await scrollIntoView(mobileModeExamples);
        await click(mobileExpandButton);
        await click(dialogListItem);
        await click(showSelectedItemsBtn);
        await expect(await doesItExist(mobileModeExamples + token)).toBe(false);
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/7082
    xit('should check that Show selected Items - Show all items works correct', async () => {
        await scrollIntoView(mobileModeExamples);
        await click(mobileExpandButton);
        await click(dialogListItem);
        await click(showSelectedItemsBtn);
        await click(showSelectedItemsBtn);
        await expect(await getElementClass(dialogListItem)).toContain('is-selected');
    });

    describe('orientation and visual regression checks', () => {
        it('should check orientation', async () => {
            await multiComboboxPage.checkRtlSwitch();
        });

        xit('should check examples visual regression', async () => {
            await multiComboboxPage.saveExampleBaselineScreenshot();
            await expect(await multiComboboxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    async function checkInputExpansion(index: number = 0): Promise<void> {
        await scrollIntoView(expandButton, index);
        await click(expandButton, index);
        await expect(await waitForElDisplayed(list)).toBe(true, `List is not displayed for index ${index}`);
        await click(expandButton, index);

        await expect(await doesItExist(list)).toBe(false, `List is still displayed for index ${index}`);
    }

    async function checkListClosedAfterSelection(index: number = 0): Promise<void> {
        await expandList(index);
        await click(listItem, 1);
        await expect(await doesItExist(list)).toBe(false, `list ${index} not closed`);
    }

    async function checkMultiSelect(index: number = 0): Promise<void> {
        await expandList(index);
        await selectTwoItems(listItemCheckbox);
        const markedItems = (await getTextArr(selectedListItem)).sort();
        await click(expandButton, index);
        const tokens = await getText(tokenInputField, index);
        const tokensArr = tokens.split('\n').sort();

        await expect(markedItems).toEqual(tokensArr, `example set ${index} mismatch`);
    }

    async function expandList(index: number = 0): Promise<void> {
        await scrollIntoView(expandButton, index);
        await click(expandButton, index);
        await waitForElDisplayed(list);
    }

    async function selectTwoItems(selector: string): Promise<void> {
        await click(selector);
        await click(selector, 1);
    }

    async function openMobileList(): Promise<void> {
        await scrollIntoView(mobileModeExamples);
        await click(mobileModeExamples + expandButton);
        await waitForElDisplayed(dialog);
    }
});
