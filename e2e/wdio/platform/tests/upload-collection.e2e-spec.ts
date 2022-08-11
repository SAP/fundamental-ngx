import { UploadCollectionPo } from '../pages/upload-collection.po';

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
} from '../../driver/wdio';
import {
    columnHeaderTestArr,
    paginationTestArr,
    testFolder1,
    testFolderArr
} from '../fixtures/appData/upload-collection-content';

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

    beforeAll(() => {
        uploadCollectionPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(uploadCollectionPage.root);
        waitForElDisplayed(uploadCollectionPage.title);
    }, 1);

    it('should check the possibility of creating table item for Default and Without Pagination and Search examples', () => {
        checkCreatingFolder(defaultExample);
        checkCreatingFolder(turnOffExample);
    });

    it('should check the possibility of removing table item for Default and Without Pagination and Search examples', () => {
        checkRemovingItem(defaultExample);
        checkRemovingItem(turnOffExample);
    });

    it('should check the choice how many items display on page for all examples', () => {
        checkDisplayedItemsPerPage(defaultExample);
        checkDisplayedItemsPerPage(disableExample);
        checkDisplayedItemsPerPage(readonlyExample);
    });

    it('should check selected pages by clicking each option for all examples', () => {
        checkSelectedPages(defaultExample);
        checkSelectedPages(disableExample);
        checkSelectedPages(readonlyExample);
    });

    it('should check selected pages by clicking previous and next link for all examples', () => {
        checkSelectedPagesByNextPrevious(defaultExample);
        checkSelectedPagesByNextPrevious(disableExample);
        checkSelectedPagesByNextPrevious(readonlyExample);
    });

    it('should check placeholders all examples', () => {
        const inputLength = getElementArrayLength(inputFields);
        for (let i = 0; i < inputLength; i++) {
            expect(getElementPlaceholder(inputFields, i)).toBe('Search');
        }
    });

    it('should check table column headers displayed correctly for all examples', () => {
        checkColumnHeaderText(defaultExample);
        checkColumnHeaderText(disableExample);
        checkColumnHeaderText(readonlyExample, ' div');
        checkColumnHeaderText(turnOffExample, ' div');
    });

    it('should check searching table contents for all examples', () => {
        checkAbleToSearch(defaultExample);
        checkAbleToSearch(disableExample);
        checkAbleToSearch(readonlyExample);
    });

    it('should check for clickability cancel button in dialog header window', () => {
        checkClickabilityCancelButton(defaultExample);
        checkClickabilityCancelButton(defaultExample);
    });

    // skip due to https://github.com/SAP/fundamental-ngx/issues/7098
    xit('should check renaming folder', () => {
        checkRenaming(turnOffExample);
        checkRenaming(defaultExample);
    });

    xit('should check moving folders', () => {
        // skipped due to cannot reproduce failure, needs further investigation
        if (getCurrentUrl().includes('localhost')) {
            return;
        }
        checkMovingFolders(defaultExample);
        checkMovingFolders(turnOffExample);
    });

    it('should check orientation', () => {
        uploadCollectionPage.checkRtlSwitch();
    });

    function checkMovingFolders(selector: string): void {
        const movedFolderName = getText(selector + fileNameLabel).trim();
        click(selector + tableItem);
        click(selector + checkbox, 1);
        click(selector + ghostButton);
        pause(1000);
        const folderName = getText(listItemTitle, 1).trim();
        click(listItem, 1);
        click(moveButton);
        const itemsLength = getElementArrayLength(selector + tableItem);
        for (let i = 0; i < itemsLength; i++) {
            scrollIntoView(selector + tableItem, i);
            if (getText(selector + fileNameLabel, i).trim() === folderName) {
                click(selector + fileNameLabel, i);
                break;
            }
        }
        let j = 0;
        const subItemsLength = getElementArrayLength(selector + tableItem);
        for (let i = 0; i < subItemsLength; i++) {
            if (getText(selector + fileNameLabel, i).trim() === movedFolderName) {
                j = 1;
                break;
            }
        }
        expect(j).toBe(1);
    }

    function checkRenaming(selector: string): void {
        scrollIntoView(selector + checkbox);
        click(selector + checkbox, 1);
        click(selector + inputFields);
        sendKeys('Backspace');
        sendKeys('0');
        const newName = getValue(selector + inputFields);
        click(selector + checkbox, 1);
        waitForNotDisplayed(selector + busyIndicator);
        expect(getText(selector + fileNameLabel).trim()).toEqual(newName);
    }

    function checkDisplayedItemsPerPage(selector: string): void {
        scrollIntoView(selector + buttons);
        const tenItems = getElementArrayLength(selector + tableItems);
        expect(tenItems).toEqual(10);

        click(selector + buttons);
        click(menuItem);
        pause(300);

        const fiveItems = getElementArrayLength(selector + tableItems);
        expect(fiveItems).toEqual(5);

        click(selector + buttons);
        click(menuItem, 2);
        pause(300);

        const fifteenItems = getElementArrayLength(selector + tableItems);
        expect(fifteenItems).toEqual(15);

        scrollIntoView(selector + buttons);
        click(selector + buttons);
        click(menuItem, 3);
        pause(300);

        const twentyItems = getElementArrayLength(selector + tableItems);
        expect(twentyItems).toEqual(20);
    }

    function checkSelectedPages(selector: string): void {
        scrollIntoView(selector + tablePages);
        const linksLength = getElementArrayLength(selector + tablePages);
        for (let i = 0; i < linksLength; i++) {
            click(selector + tablePages, i);
            pause(300);
            expect(getText(selector + tableResult).trim()).toBe(paginationTestArr[i]);
        }
    }

    function checkSelectedPagesByNextPrevious(selector: string): void {
        scrollIntoView(selector + linkNext);
        click(selector + linkNext);
        pause(300);
        expect(getText(selector + tableResult).trim()).toBe(paginationTestArr[1]);

        click(selector + linkPrevious);
        pause(300);
        expect(getText(selector + tableResult).trim()).toBe(paginationTestArr[0]);
    }

    function checkColumnHeaderText(selector: string, str: string = ''): void {
        scrollIntoView(selector + columnHeaders + str);
        const headerLength = getElementArrayLength(selector + columnHeaders + str);
        for (let i = 0; i < headerLength; i++) {
            expect(getText(selector + columnHeaders + str, i).trim()).toBe(columnHeaderTestArr[i]);
        }
    }

    function checkAbleToSearch(selector: string): void {
        scrollIntoView(selector + inputFields);
        setValue(selector + inputFields, 'Folder');
        const contentLength = getElementArrayLength(selector + tableContent);
        expect(contentLength).toEqual(4);
        for (let i = 0; i < contentLength; i++) {
            expect(getText(selector + tableContent, i).trim()).toBe(testFolderArr[i]);
        }
    }

    function checkCreatingFolder(selector: string): void {
        scrollIntoView(selector);
        const countBeforeAdd = getText(selector + tableItemCount).trim();
        expect(countBeforeAdd).toEqual('All files (54)');
        click(selector + transparentButton);
        setValue(dialogInputField, testFolder1);
        click(dialogCreateButton);
        pause(300);
        expect(getText(selector + tableItemCount).trim()).toBe('All files (55)');
        const countAfterAdd = getText(selector + tableItemCount).trim();
        expect(countAfterAdd).toEqual('All files (55)');
        expect(getText(selector + tableContent, 4).trim()).toBe(testFolder1);
    }

    function checkRemovingItem(selector: string): void {
        scrollIntoView(selector);
        const countBeforeRemove = getText(selector + tableItemCount).trim();
        expect(countBeforeRemove).toEqual('All files (54)');
        click(selector + transparentButton, 5);
        click(menuButton, 3);
        pause(300);
        const countAfterRemove = getText(selector + tableItemCount).trim();
        expect(countAfterRemove).toEqual('All files (53)');
    }

    function checkClickabilityCancelButton(selector: string): void {
        scrollIntoView(selector + transparentButton);
        click(defaultExample + transparentButton);
        waitForElDisplayed(dialog);
        expect(isElementClickable(dialogCreateButton, 1)).toBe(true, '"Cancel" button not clickable');
        sendKeys(['Escape']);
    }
});
