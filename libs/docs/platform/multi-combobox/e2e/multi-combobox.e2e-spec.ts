import {
    click,
    doesItExist,
    getElementArrayLength,
    getText,
    getTextArr,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    waitForElDisappear,
    waitForElDisplayed
} from '../../../../../e2e';
import { MultiComboboxPo } from './multi-combobox.po';

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
        dialogInput
    } = multiComboboxPage;
    const mobileExample = 6;
    const nMoreExample = 5;
    const twoColumnExample = 9;
    const searchValue = 'app';

    beforeAll(async () => {
        await multiComboboxPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await multiComboboxPage.waitForRoot();
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

        it('should be able to select multiple items via checkbox and tokens created for selected items in nMoreExample', async () => {
            await expandList(nMoreExample);
            await click(listItemCheckbox, 0);
            await pause(1000);
            const markedItems = (await getTextArr(selectedListItem)).sort();
            await click(expandButton, nMoreExample);
            const tokens = await getText(tokenInputField, nMoreExample);
            const tokensArr = tokens.split('\n').sort();

            await expect(markedItems).withContext(tokensArr);
        });

        it('should be able to select multiple items via checkbox and tokens created for selected items in twoColumnExample', async () => {
            await expandList(twoColumnExample);
            await click(listItemCheckbox, 0);
            await pause(1000);
            const markedItems = (await getTextArr(selectedListItem)).sort().toString();
            const filteredMarkedItems = markedItems.replace('\nFruits', '').replace('\nFruits', '');
            await click(expandButton, twoColumnExample);
            const tokens = await getText(tokenInputField, twoColumnExample);
            const tokensArr = tokens.split('\n').sort().toString();

            await expect(filteredMarkedItems).withContext(tokensArr);
        });

        it('should be able to select multiple items via checkbox and tokens created for selected items in other examples', async () => {
            await expandList(0);
            await click(listItemCheckbox, 0);
            await pause(1000);
            const markedItems = (await getTextArr(selectedListItem)).sort();
            await click(expandButton, 0);
            const tokens = await getText(tokenInputField, 0);
            const tokensArr = tokens.split('\n').sort();

            await expect(markedItems).withContext(tokensArr, `example set ${0} mismatch`);
        });

        it('should be able to remove token by clicking the X button', async () => {
            const initialTokenCount = await getElementArrayLength(token);
            await scrollIntoView(tokenInputField);
            await click(tokenCloseButton);
            const newTokenCount = await getElementArrayLength(token);

            await expect(newTokenCount).withContext(initialTokenCount - 1);
        });

        it('should be able to search by typing and get relevant results', async () => {
            const inputCount = await getElementArrayLength(inputField);

            for (let i = 0; i < inputCount; i++) {
                if (i !== mobileExample) {
                    await scrollIntoView(inputField, i);
                    await click(inputField, i);
                    await sendKeys(searchValue);

                    if (i === inputCount - 2) {
                        await browser.pause(500);
                    }

                    await expect(await waitForElDisplayed(list)).toBe(true, `list ${i} not opened`);
                    const listItemText = await getTextArr(listItem);

                    for (const element of listItemText) {
                        await expect(element.toString().toLowerCase()).toContain(searchValue);
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
            await expect(await waitForElDisappear(dialog)).withContext(true);

            await openMobileList();
            await click(dialogButton, save);
            await expect(await waitForElDisappear(dialog)).withContext(true);

            await openMobileList();
            await click(dialogButton, cancel);
            await expect(await waitForElDisappear(dialog)).withContext(true);
        });

        it('should be able to make multiple selections', async () => {
            await openMobileList();
            await selectTwoItems(dialogListItem);
            const selectedItems = (await getTextArr(selectedDialogItem)).sort();
            await click(dialogButton, save);
            const tokens = (await getTextArr(mobileModeExamples + token)).sort();

            await expect(selectedItems).withContext(tokens);
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

    describe('orientation and visual regression checks', () => {
        it('should check orientation', async () => {
            await multiComboboxPage.checkRtlSwitch();
        });
    });

    async function checkInputExpansion(index: number = 0): Promise<void> {
        await scrollIntoView(expandButton, index);
        await click(expandButton, index);
        await expect(await waitForElDisplayed(list)).toBe(true);
        await click(expandButton, index);
        await expect(await doesItExist(list)).toBe(false);
    }

    async function checkListClosedAfterSelection(index: number = 0): Promise<void> {
        await expandList(index);
        await click(listItem, 1);
        await expect(await doesItExist(list)).toBe(false, `list ${index} not closed`);
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
        await click(expandButton, mobileExample);
        await waitForElDisplayed(dialog);
    }
});
