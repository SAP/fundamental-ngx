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
    const mobileExample = 5;
    const nMoreExample = 4;
    const twoColumnExample = 8;
    const searchValue = 'app';

    beforeAll(() => {
        multiComboboxPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(multiComboboxPage.root);
        waitForElDisplayed(multiComboboxPage.title);
    }, 1);

    describe('Main checks', () => {
        it('should open and close list by clicking expand button', () => {
            const exampleCount = getElementArrayLength(expandButton);
            for (let i = 0; i < exampleCount; i++) {
                if (i !== mobileExample) {
                    checkInputExpansion(i);
                }
            }
        });

        it('should close list when item selected', () => {
            const exampleCount = getElementArrayLength(expandButton);
            for (let i = 0; i < exampleCount; i++) {
                if (i !== mobileExample) {
                    checkListClosedAfterSelection(i);
                }
            }
        });

        it('should be able to select multiple items via checkbox and tokens created for selected items', () => {
            const exampleCount = getElementArrayLength(expandButton);

            for (let i = 0; i < exampleCount; i++) {
                if (i === mobileExample) {
                    continue;
                }

                if (i === nMoreExample) {
                    expandList(nMoreExample);
                    selectTwoItems(listItemCheckbox);
                    const markedItems = getTextArr(selectedListItem).sort();
                    click(expandButton, nMoreExample);
                    const tokens = getText(tokenInputField, nMoreExample);
                    const tokensArr = tokens.split('\n').sort().slice(1);

                    expect(markedItems).toEqual(tokensArr);
                    continue;
                }

                if (i === twoColumnExample) {
                    expandList(twoColumnExample);
                    selectTwoItems(listItemCheckbox);
                    const markedItems = getTextArr(selectedListItem).sort().toString();
                    const filteredMarkedItems = markedItems.replace('\nFruits', '').replace('\nFruits', '');
                    click(expandButton, twoColumnExample);
                    const tokens = getText(tokenInputField, twoColumnExample);
                    const tokensArr = tokens.split('\n').sort().toString();

                    expect(filteredMarkedItems).toEqual(tokensArr);
                    continue;
                }

                checkMultiSelect(i);
            }
        });

        it('should be able to remove token by clicking the X button', () => {
            const initialTokenCount = getElementArrayLength(token);
            scrollIntoView(tokenInputField);
            click(tokenCloseButton);
            const newTokenCount = getElementArrayLength(token);

            expect(newTokenCount).toEqual(initialTokenCount - 1);
        });

        it('should be able to search by typing and get relevant results', () => {
            const inputCount = getElementArrayLength(inputField);

            for (let i = 0; i < inputCount; i++) {
                if (i !== mobileExample) {
                    scrollIntoView(inputField, i);
                    click(inputField, i);
                    sendKeys(searchValue);

                    expect(waitForElDisplayed(list)).toBe(true, `list ${i} not opened`);
                    const listItemText = getTextArr(listItem);

                    listItemText.forEach((element) => {
                        expect(element.toString().toLowerCase()).toContain(searchValue);
                    });
                }
            }
        });
    });

    describe('mobile mode examples', () => {
        const close = 0;
        const save = 2;
        const cancel = 3;

        it('should be able to close dialog with X button, cancel button, save button', () => {
            openMobileList();
            click(dialogButton, close);
            expect(doesItExist(dialog)).toBe(false, 'dialog is not closed by x button');

            openMobileList();
            click(dialogButton, save);
            expect(doesItExist(dialog)).toBe(false, 'dialog is not closed by save button');

            openMobileList();
            click(dialogButton, cancel);
            expect(doesItExist(dialog)).toBe(false, 'dialog is not closed by cancel button');
        });

        it('should be able to make multiple selections', () => {
            openMobileList();
            selectTwoItems(dialogListItem);
            const selectedItems = getTextArr(selectedDialogItem).sort();
            click(dialogButton, save);
            const tokens = getTextArr(mobileModeExamples + token).sort();

            expect(selectedItems).toEqual(tokens);
        });

        it('should be able to search by text', () => {
            openMobileList();
            click(dialogInput);
            sendKeys(searchValue);
            const searchResults = getTextArr(dialogListItem).sort();

            searchResults.forEach((element) => {
                expect(element.toString().toLowerCase()).toContain(searchValue);
            });
        });

        it('should be able to toggle selected items view', () => {
            const viewToggle = 1;

            openMobileList();
            selectTwoItems(dialogListItem);
            click(dialogButton, viewToggle);
            const selectedViewItemCount = getElementArrayLength(dialogListItem);

            expect(selectedViewItemCount).toBe(2);
        });
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6978
    xit('should check that items not added if you did not click Save button', () => {
        scrollIntoView(mobileModeExamples);
        click(mobileExpandButton);
        click(dialogListItem);
        click(showSelectedItemsBtn);
        expect(doesItExist(mobileModeExamples + token)).toBe(false);
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/7082
    xit('should check that Show selected Items - Show all items works correct', () => {
        scrollIntoView(mobileModeExamples);
        click(mobileExpandButton);
        click(dialogListItem);
        click(showSelectedItemsBtn);
        click(showSelectedItemsBtn);
        expect(getElementClass(dialogListItem)).toContain('is-selected');
    });

    describe('orientation and visual regression checks', () => {
        it('should check orientation', () => {
            multiComboboxPage.checkRtlSwitch();
        });

        xit('should check examples visual regression', () => {
            multiComboboxPage.saveExampleBaselineScreenshot();
            expect(multiComboboxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkInputExpansion(index: number = 0): void {
        scrollIntoView(expandButton, index);
        click(expandButton, index);
        expect(waitForElDisplayed(list)).toBe(true, `list ${index} not opened`);
        click(expandButton, index);
        expect(doesItExist(list)).toBe(false, `list ${index} not closed`);
    }

    function checkListClosedAfterSelection(index: number = 0): void {
        expandList(index);
        click(listItem, 1);
        expect(doesItExist(list)).toBe(false, `list ${index} not closed`);
    }

    function checkMultiSelect(index: number = 0): void {
        expandList(index);
        selectTwoItems(listItemCheckbox);
        const markedItems = getTextArr(selectedListItem).sort();
        click(expandButton, index);
        const tokens = getText(tokenInputField, index);
        const tokensArr = tokens.split('\n').sort();

        expect(markedItems).toEqual(tokensArr, `example set ${index} mismatch`);
    }

    function expandList(index: number = 0): void {
        scrollIntoView(expandButton, index);
        click(expandButton, index);
        waitForElDisplayed(list);
    }

    function selectTwoItems(selector: string): void {
        click(selector);
        click(selector, 1);
    }

    function openMobileList(): void {
        scrollIntoView(mobileModeExamples);
        click(expandButton, mobileExample);
        waitForElDisplayed(dialog);
    }
});
