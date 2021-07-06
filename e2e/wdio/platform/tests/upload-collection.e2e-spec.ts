import { UploadCollectionPo } from '../pages/upload-collection.po';

import {
    click, getElementArrayLength, getElementPlaceholder, getText, isElementClickable,
    refreshPage, scrollIntoView, setValue,
    waitForPresent
} from '../../driver/wdio';
import {
    columnHeaderTestArr,
    testArr, testFolder1,
    testFolderArr
} from '../fixtures/appData/upload-collection-content';

describe('Upload collection test suite', function() {
    const uploadCollectionPage = new UploadCollectionPo();
    const {
        defaultExample, disableExample, readonlyExample, turnOffExample, buttons, tableItems, menuItem, tablePages,
        tableResult, linkNext, linkPrevious, inputFields, columnHeaders, tableContent, transparentButton,
        dialogInputField, dialogCreateButton, tableItemCount, menuButton
    } = uploadCollectionPage;

    beforeAll(() => {
        uploadCollectionPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(defaultExample);
    }, 1);


    it('should check the possibility of creating table item for Default and Without Pagination and Search examples', () => {
        creatingFolder(defaultExample);
        creatingFolder(turnOffExample);
    });

    it('should check the possibility of removing table item for Default and Without Pagination and Search examples', () => {
        removingItem(defaultExample);
        removingItem(turnOffExample);
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


    it('should check orientation', () => {
        uploadCollectionPage.checkRtlSwitch();
    });

    function checkDisplayedItemsPerPage(selector: string): void {
        scrollIntoView(selector + buttons);
        const tenItems = getElementArrayLength(selector + tableItems);
        expect(tenItems).toEqual(10);

        click(selector + buttons);
        click(menuItem);

        const fiveItems = getElementArrayLength(selector + tableItems);
        expect(fiveItems).toEqual(5);

        click(selector + buttons);
        click(menuItem, 2);

        const fifteenItems = getElementArrayLength(selector + tableItems);
        expect(fifteenItems).toEqual(15);

        scrollIntoView(selector + buttons);
        click(selector + buttons);
        click(menuItem, 3);

        const twentyItems = getElementArrayLength(selector + tableItems);
        expect(twentyItems).toEqual(20);
    }

    function checkSelectedPages(selector: string): void {
        scrollIntoView(selector + tablePages);
        const linksLength = getElementArrayLength(selector + tablePages);
        for (let i = 0; i < linksLength; i++) {
            click(selector + tablePages, i);
            expect(getText(selector + tableResult)).toBe(testArr[i]);
        }
    }

    function checkSelectedPagesByNextPrevious(selector: string): void {
        scrollIntoView(selector + linkNext);
        click(selector + linkNext);
        expect(getText(selector + tableResult)).toBe(testArr[1]);

        click(selector + linkPrevious);
        expect(getText(selector + tableResult)).toBe(testArr[0]);
    }

    function checkColumnHeaderText(selector: string, str: string = ''): void {
        scrollIntoView(selector + columnHeaders + str);
        const headerLength = getElementArrayLength(selector + columnHeaders + str);
        for (let i = 0; i < headerLength; i++) {
            expect(getText(selector + columnHeaders + str, i)).toBe(columnHeaderTestArr[i]);
        }
    }

    function checkAbleToSearch(selector: string): void {
        scrollIntoView(selector + inputFields);
        setValue(selector + inputFields, 'Folder');
        const contentLength = getElementArrayLength(selector + tableContent);
        expect(contentLength).toEqual(4);
        for (let i = 0; i < contentLength; i++) {
            expect(getText(selector + tableContent, i)).toBe(testFolderArr[i]);
        }
    }

    function creatingFolder(selector: string): void {
        scrollIntoView(selector);
        expect(getText(selector + tableItemCount)).toBe('54');
        click(selector + transparentButton);
        setValue(dialogInputField, testFolder1);
        expect(isElementClickable(dialogCreateButton, 1)).toBe(true, '"Cancel" button not clickable');
        click(dialogCreateButton);
        expect(getText(selector + tableItemCount)).toBe('55');
        expect(getText(selector + tableContent, 4)).toBe(testFolder1);
    }

    function removingItem(selector: string): void {
        scrollIntoView(selector);
        expect(getText(selector + tableItemCount)).toBe('54');
        click(selector + transparentButton, 5);
        click(menuButton, 3);
        expect(getText(selector + tableItemCount)).toBe('53');
    }
});
