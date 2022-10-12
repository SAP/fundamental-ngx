import { UploadCollectionPo } from './upload-collection.po';

import {
    click,
    getCurrentUrl,
    getElementArrayLength,
    getElementPlaceholder,
    getText,
    getValue,
    isElementClickable,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForNotDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { columnHeaderTestArr, paginationTestArr, testFolder1, testFolderArr } from './upload-collection-content';

describe('Upload collection test suite', () => {
    const uploadCollectionPage = new UploadCollectionPo();
    const {
        defaultExample,
        disableExample,
        readonlyExample,
        turnOffExample,
        buttons,
        tableItems,
        menuItem,
        tablePages,
        tableResult,
        linkNext,
        linkPrevious,
        inputFields,
        columnHeaders,
        tableContent,
        transparentButton,
        dialogInputField,
        dialogCreateButton,
        tableItemCount,
        menuButton,
        checkbox,
        busyIndicator,
        fileNameLabel,
        listItemTitle,
        listItem,
        moveButton,
        tableItem,
        ghostButton,
        dialog
    } = uploadCollectionPage;

    beforeAll(async () => {
        await uploadCollectionPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(uploadCollectionPage.root);
        await waitForElDisplayed(uploadCollectionPage.title);
    }, 1);

    it('should check the possibility of creating table item for Default and Without Pagination and Search examples', async () => {
        await checkCreatingFolder(defaultExample);
        await checkCreatingFolder(turnOffExample);
    });

    it('should check the possibility of removing table item for Default and Without Pagination and Search examples', async () => {
        await checkRemovingItem(defaultExample);
        await checkRemovingItem(turnOffExample);
    });

    it('should check the choice how many items display on page for all examples', async () => {
        await checkDisplayedItemsPerPage(defaultExample);
        await checkDisplayedItemsPerPage(disableExample);
        await checkDisplayedItemsPerPage(readonlyExample);
    });

    it('should check selected pages by clicking each option for all examples', async () => {
        await checkSelectedPages(defaultExample);
        await checkSelectedPages(disableExample);
        await checkSelectedPages(readonlyExample);
    });

    it('should check selected pages by clicking previous and next link for all examples', async () => {
        await checkSelectedPagesByNextPrevious(defaultExample);
        await checkSelectedPagesByNextPrevious(disableExample);
        await checkSelectedPagesByNextPrevious(readonlyExample);
    });

    it('should check placeholders all examples', async () => {
        const inputLength = await getElementArrayLength(inputFields);
        for (let i = 0; i < inputLength; i++) {
            await expect(await getElementPlaceholder(inputFields, i)).toBe('Search');
        }
    });

    it('should check table column headers displayed correctly for all examples', async () => {
        await checkColumnHeaderText(defaultExample);
        await checkColumnHeaderText(disableExample);
        await checkColumnHeaderText(readonlyExample, ' div');
        await checkColumnHeaderText(turnOffExample, ' div');
    });

    it('should check searching table contents for all examples', async () => {
        await checkAbleToSearch(defaultExample);
        await checkAbleToSearch(disableExample);
        await checkAbleToSearch(readonlyExample);
    });

    it('should check for clickability cancel button in dialog header window', async () => {
        await checkClickabilityCancelButton(defaultExample);
        await checkClickabilityCancelButton(defaultExample);
    });

    // skip due to https://github.com/SAP/fundamental-ngx/issues/7098
    xit('should check renaming folder', async () => {
        await checkRenaming(turnOffExample);
        await checkRenaming(defaultExample);
    });

    xit('should check moving folders', async () => {
        // skipped due to cannot reproduce failure, needs further investigation
        if ((await getCurrentUrl()).includes('localhost')) {
            return;
        }
        await checkMovingFolders(defaultExample);
        await checkMovingFolders(turnOffExample);
    });

    it('should check orientation', async () => {
        await uploadCollectionPage.checkRtlSwitch();
    });

    async function checkMovingFolders(selector: string): Promise<void> {
        const movedFolderName = (await getText(selector + fileNameLabel)).trim();
        await click(selector + tableItem);
        await click(selector + checkbox, 1);
        await click(selector + ghostButton);
        await pause(1000);
        const folderName = (await getText(listItemTitle, 1)).trim();
        await click(listItem, 1);
        await click(moveButton);
        const itemsLength = await getElementArrayLength(selector + tableItem);
        for (let i = 0; i < itemsLength; i++) {
            await scrollIntoView(selector + tableItem, i);
            if ((await getText(selector + fileNameLabel, i)).trim() === folderName) {
                await click(selector + fileNameLabel, i);
                break;
            }
        }
        let j = 0;
        const subItemsLength = await getElementArrayLength(selector + tableItem);
        for (let i = 0; i < subItemsLength; i++) {
            if ((await getText(selector + fileNameLabel, i)).trim() === movedFolderName) {
                j = 1;
                break;
            }
        }
        await expect(j).toBe(1);
    }

    async function checkRenaming(selector: string): Promise<void> {
        await scrollIntoView(selector + checkbox);
        await click(selector + checkbox, 1);
        await click(selector + inputFields);
        await sendKeys('Backspace');
        await sendKeys('0');
        const newName = await getValue(selector + inputFields);
        await click(selector + checkbox, 1);
        await waitForNotDisplayed(selector + busyIndicator);
        await expect((await getText(selector + fileNameLabel)).trim()).toEqual(newName);
    }

    async function checkDisplayedItemsPerPage(selector: string): Promise<void> {
        await scrollIntoView(selector + buttons);
        const tenItems = await getElementArrayLength(selector + tableItems);
        await expect(tenItems).toEqual(10);

        await click(selector + buttons);
        await click(menuItem);
        await pause(300);

        const fiveItems = await getElementArrayLength(selector + tableItems);
        await expect(fiveItems).toEqual(5);

        await click(selector + buttons);
        await click(menuItem, 2);
        await pause(300);

        const fifteenItems = await getElementArrayLength(selector + tableItems);
        await expect(fifteenItems).toEqual(15);

        await scrollIntoView(selector + buttons);
        await click(selector + buttons);
        await click(menuItem, 3);
        await pause(300);

        const twentyItems = await getElementArrayLength(selector + tableItems);
        await expect(twentyItems).toEqual(20);
    }

    async function checkSelectedPages(selector: string): Promise<void> {
        await scrollIntoView(selector + tablePages);
        const linksLength = await getElementArrayLength(selector + tablePages);
        for (let i = 0; i < linksLength; i++) {
            await click(selector + tablePages, i);
            await pause(300);
            await expect((await getText(selector + tableResult)).trim()).toBe(paginationTestArr[i]);
        }
    }

    async function checkSelectedPagesByNextPrevious(selector: string): Promise<void> {
        await scrollIntoView(selector + linkNext);
        await click(selector + linkNext);
        await pause(300);
        await expect((await getText(selector + tableResult)).trim()).toBe(paginationTestArr[1]);

        await click(selector + linkPrevious);
        await pause(300);
        await expect((await getText(selector + tableResult)).trim()).toBe(paginationTestArr[0]);
    }

    async function checkColumnHeaderText(selector: string, str: string = ''): Promise<void> {
        await scrollIntoView(selector + columnHeaders + str);
        const headerLength = await getElementArrayLength(selector + columnHeaders + str);
        for (let i = 0; i < headerLength; i++) {
            await expect((await getText(selector + columnHeaders + str, i)).trim()).toBe(columnHeaderTestArr[i]);
        }
    }

    async function checkAbleToSearch(selector: string): Promise<void> {
        await scrollIntoView(selector + inputFields);
        await setValue(selector + inputFields, 'Folder');
        const contentLength = await getElementArrayLength(selector + tableContent);
        await expect(contentLength).toEqual(4);
        for (let i = 0; i < contentLength; i++) {
            await expect((await getText(selector + tableContent, i)).trim()).toBe(testFolderArr[i]);
        }
    }

    async function checkCreatingFolder(selector: string): Promise<void> {
        await scrollIntoView(selector);
        const countBeforeAdd = (await getText(selector + tableItemCount)).trim();
        await expect(countBeforeAdd).toEqual('All files (54)');
        await click(selector + transparentButton);
        await setValue(dialogInputField, testFolder1);
        await click(dialogCreateButton);
        await pause(300);
        await expect((await getText(selector + tableItemCount)).trim()).toBe('All files (55)');
        const countAfterAdd = (await getText(selector + tableItemCount)).trim();
        await expect(countAfterAdd).toEqual('All files (55)');
        await expect((await getText(selector + tableContent, 4)).trim()).toBe(testFolder1);
    }

    async function checkRemovingItem(selector: string): Promise<void> {
        await scrollIntoView(selector);
        const countBeforeRemove = (await getText(selector + tableItemCount)).trim();
        await expect(countBeforeRemove).toEqual('All files (54)');
        await click(selector + transparentButton, 5);
        await click(menuButton, 3);
        await pause(300);
        const countAfterRemove = (await getText(selector + tableItemCount)).trim();
        await expect(countAfterRemove).toEqual('All files (53)');
    }

    async function checkClickabilityCancelButton(selector: string): Promise<void> {
        await scrollIntoView(selector + transparentButton);
        await click(defaultExample + transparentButton);
        await waitForElDisplayed(dialog);
        await expect(await isElementClickable(dialogCreateButton, 1)).toBe(true, '"Cancel" button not clickable');
        await sendKeys(['Escape']);
    }
});
