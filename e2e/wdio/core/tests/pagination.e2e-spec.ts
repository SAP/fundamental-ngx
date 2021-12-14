import { PaginationPo } from '../pages/pagination.po';
import {
    click,
    doesItExist,
    getCurrentUrl,
    getElementArrayLength,
    getText,
    getValue,
    pause,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForPresent
} from '../../driver/wdio';
import {
    basicPaginationTestArr,
    itemPaginationTestArr,
    selectPaginationTestArr1,
    selectPaginationTestArr2,
    selectPaginationTestArr3,
    selectPaginationTestArr4,
    selectPaginationTestArr5,
    selectPaginationTestArr6,
    selectPaginationTestArr7,
    selectPaginationTestText,
    playgroundPaginationItemArr,
    playgroundPaginationItemArr2,
    playgroundPaginationItemArr3,
    playgroundPaginationTestText,
    playgroundLabelArr
} from '../fixtures/appData/pagination-contents';

describe('Pagination test suite:', () => {
    const paginationPage = new PaginationPo();
    const {
        standardButton,
        basicPaginationDiv,
        basicPaginationPages,
        itemPaginationPages,
        totalPagination,
        linkPrevious,
        linkNext,
        selectPaginationPages,
        dropdownButton,
        dropDownOption,
        toggledButton,
        playgroundInputFields,
        playgroundPages,
        playgroundLabel
    } = paginationPage;

    beforeAll(() => {
        paginationPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(standardButton);
    }, 1);

    describe('Check Basic Pagination example', () => {
        it('should check selected pages by clicking each option', () => {
            scrollIntoView(standardButton);
            click(standardButton);
            // pause for the new text to load
            pause(250);
            expect(getText(basicPaginationDiv)).toBe(basicPaginationTestArr[0]);
            const linksLength = getElementArrayLength(basicPaginationPages);
            for (let i = 0; i < linksLength; i++) {
                click(basicPaginationPages, i);
                // pause for the new text to load
                pause(250);
                expect(getText(basicPaginationDiv)).toBe(basicPaginationTestArr[i + 1]);
            }
        });

        it('should check selected pages by clicking previous and next link', () => {
            // skipped due to cannot reproduce failure, needs further investigation
            if (getCurrentUrl().includes('localhost')) {
                return;
            }
            scrollIntoView(linkNext);
            click(standardButton);
            // pause to give browser time to complete action
            pause(250);
            click(linkNext);
            // pause for the new text to load
            pause(250);
            expect(getText(basicPaginationDiv)).toBe(basicPaginationTestArr[1]);

            click(linkPrevious);
            // pause for the new text to load
            pause(250);
            expect(getText(basicPaginationDiv)).toBe(basicPaginationTestArr[0]);
        });
    });

    describe('Check Pagination showing items example', () => {
        it('should check selected pages by clicking each option', () => {
            scrollIntoView(itemPaginationPages);
            expect(getText(totalPagination).trim()).toBe(itemPaginationTestArr[0]);
            const linksLength = getElementArrayLength(itemPaginationPages);
            for (let i = 0; i < linksLength; i++) {
                click(itemPaginationPages, i);
                expect(getText(totalPagination).trim()).toBe(itemPaginationTestArr[i + 1]);
            }
        });

        it('should check selected pages by clicking previous and next link', () => {
            // skipped due to cannot reproduce failure, needs further investigation
            if (getCurrentUrl().includes('localhost')) {
                return;
            }
            scrollIntoView(linkNext, 1);
            click(linkNext, 1);
            expect(getText(totalPagination).trim()).toBe(itemPaginationTestArr[1]);

            click(linkPrevious, 1);
            expect(getText(totalPagination).trim()).toBe(itemPaginationTestArr[0]);
        });
    });

    xdescribe('Check Pagination with per page select example', () => {
        it('should check default property for items per page by clicking each page', () => {
            scrollIntoView(selectPaginationPages);
            const linksLength = getElementArrayLength(selectPaginationPages);
            for (let i = 0; i < linksLength - 9; i++) {
                click(selectPaginationPages, i);
                // pause for the new text to load
                pause(250);
                expect(getText(totalPagination, 1).trim()).toBe(selectPaginationTestArr1[i]);
            }
        });

        it('should check default property for items per page by clicking previous and next link', () => {
            // skipped due to cannot reproduce failure, needs further investigation
            if (getCurrentUrl().includes('localhost')) {
                return;
            }
            scrollIntoView(linkNext, 2);
            click(linkNext, 2);
            // pause for the new text to load
            pause(250);
            expect(getText(totalPagination, 1).trim()).toBe(selectPaginationTestArr1[1]);

            click(linkPrevious, 2);
            // pause for the new text to load
            pause(250);
            expect(getText(totalPagination, 1).trim()).toBe(selectPaginationTestArr1[0]);
        });

        it('should check default select template for items per page(4) options', () => {
            scrollIntoView(selectPaginationPages);
            const linksLength = getElementArrayLength(selectPaginationPages);
            for (let i = 4; i < linksLength - 5; i++) {
                if (i === 6) {
                    continue;
                }
                click(selectPaginationPages, i);
                // pause for the new text to load
                pause(250);
                expect(getText(totalPagination, 2).trim()).toBe(selectPaginationTestArr2[i - 4]);
            }
        });

        it('should check default select template for items per page(8) options', () => {
            scrollIntoView(dropdownButton);
            click(dropdownButton);
            click(dropDownOption, 1);
            const linksLength = getElementArrayLength(selectPaginationPages);
            for (let i = 4; i < linksLength - 5; i++) {
                click(selectPaginationPages, i);
                // pause for the new text to load
                pause(250);
                expect(getText(totalPagination, 2).trim()).toBe(selectPaginationTestArr3[i - 4]);
            }
        });

        it('should check default select template for items per page(16) options', () => {
            scrollIntoView(dropdownButton);
            click(dropdownButton);
            click(dropDownOption, 2);
            const linksLength = getElementArrayLength(selectPaginationPages);
            for (let i = 4; i < linksLength - 5; i++) {
                click(selectPaginationPages, i);
                // pause for the new text to load
                pause(250);
                expect(getText(totalPagination, 2).trim()).toBe(selectPaginationTestArr4[i - 4]);
            }
        });

        it('should check default select template for items per page options by clicking previous and next link', () => {
            // skipped due to cannot reproduce failure, needs further investigation
            if (getCurrentUrl().includes('localhost')) {
                return;
            }
            scrollIntoView(linkNext, 3);
            click(linkNext, 3);
            // pause for the new text to load
            pause(250);
            expect(getText(totalPagination, 2).trim()).toBe(selectPaginationTestArr2[1]);

            click(linkPrevious, 3);
            // pause for the new text to load
            pause(250);
            expect(getText(totalPagination, 2).trim()).toBe(selectPaginationTestArr2[0]);
        });

        it('should check list of buttons by clicking each option', () => {
            scrollIntoView(selectPaginationPages);
            const linksLength = getElementArrayLength(selectPaginationPages);
            for (let i = 8; i < linksLength; i++) {
                click(selectPaginationPages, i);
                // pause for the new text to load
                pause(250);
                expect(getText(totalPagination, 4).trim()).toBe(selectPaginationTestArr5[i - 8]);
            }
        });

        it('should check list of buttons by clicking by clicking previous and next link', () => {
            // skipped due to cannot reproduce failure, needs further investigation
            if (getCurrentUrl().includes('localhost')) {
                return;
            }
            scrollIntoView(linkNext, 4);
            click(linkNext, 4);
            // pause for the new text to load
            pause(250);
            expect(getText(totalPagination, 4).trim()).toBe(selectPaginationTestArr5[1]);

            click(linkPrevious, 4);
            // pause for the new text to load
            pause(250);
            expect(getText(totalPagination, 4).trim()).toBe(selectPaginationTestArr5[0]);
        });

        it('should check list of buttons(2) by clicking each option', () => {
            scrollIntoView(toggledButton);
            click(toggledButton);
            const linksLength = getElementArrayLength(selectPaginationPages);
            for (let i = 8; i < linksLength; i++) {
                if (i === 10) {
                    continue;
                }
                click(selectPaginationPages, i);
                // pause for the new text to load
                pause(250);
                expect(getText(totalPagination, 4).trim()).toBe(selectPaginationTestArr6[i - 8]);
            }
        });

        it('should check list of buttons(5) by clicking each option', () => {
            scrollIntoView(toggledButton);
            click(toggledButton, 1);
            const linksLength = getElementArrayLength(selectPaginationPages);
            for (let i = 8; i < linksLength; i++) {
                if (i === 10) {
                    continue;
                }
                click(selectPaginationPages, i);
                // pause for the new text to load
                pause(250);
                expect(getText(totalPagination, 4).trim()).toBe(selectPaginationTestArr7[i - 8]);
            }
        });

        it('should check list of buttons(100) by clicking each option', () => {
            scrollIntoView(toggledButton);
            click(toggledButton, 2);
            // pause for the new text to load
            pause(250);
            expect(getText(totalPagination, 4).trim()).toBe(selectPaginationTestText);
        });
    });

    xdescribe('Check Playground example', () => {
        it('should check that pages displayed correctly if total items more then 1', () => {
            scrollIntoView(playgroundInputFields);
            setValue(playgroundInputFields, '10');
            const pagesLength = getElementArrayLength(playgroundPages);
            const totalItems = getValue(playgroundInputFields);
            const totalItemsNum = Number(totalItems);
            const itemsPerPage = getValue(playgroundInputFields, 1);
            const itemsPerPageNum = Number(itemsPerPage);
            const actualItems = totalItemsNum / itemsPerPageNum;
            expect(pagesLength).toEqual(actualItems);
        });

        it('should check that each option is displayed on the page', () => {
            scrollIntoView(playgroundInputFields);
            setValue(playgroundInputFields, '5');
            setValue(playgroundInputFields, '1', 1);
            const itemsLength = getElementArrayLength(playgroundPages);
            for (let i = 0; i < itemsLength; i++) {
                setValue(playgroundInputFields, playgroundPaginationItemArr[i], 2);
                expect(getText(totalPagination, 5).trim()).toBe(playgroundPaginationTestText[i]);
            }
        });

        it('should check should check that filling all fields by 1 displayed only 1 page', () => {
            scrollIntoView(playgroundInputFields);
            setValue(playgroundInputFields, '1');
            setValue(playgroundInputFields, '1', 1);
            const pagesLength = getElementArrayLength(playgroundPages);
            const totalItems = getValue(playgroundInputFields);
            const totalItemsNum = Number(totalItems);
            const itemsPerPage = getValue(playgroundInputFields, 1);
            const itemsPerPageNum = Number(itemsPerPage);
            const actualItems = totalItemsNum / itemsPerPageNum;
            expect(pagesLength).toEqual(actualItems);
        });

        it('should check that filling all fields by 0 pages are not displayed', () => {
            scrollIntoView(playgroundInputFields);
            setValue(playgroundInputFields, '0');
            setValue(playgroundInputFields, '0', 1);
            setValue(playgroundInputFields, '0', 2);

            expect(doesItExist(playgroundPages)).toBe(false, 'playground pages still exist');
        });

        it('should check that all text labels are displayed', () => {
            scrollIntoView(playgroundLabel);
            const labelLength = getElementArrayLength(playgroundLabel);
            for (let i = 0; i < labelLength; i++) {
                expect(getText(playgroundLabel, i)).toBe(playgroundLabelArr[i]);
            }
        });

        it('should check pagination looks correct after selecting 3 page', () => {
            // skipped due to cannot reproduce failure, needs further investigation
            if (getCurrentUrl().includes('localhost')) {
                return;
            }
            checkPaginationDisplaying('3', playgroundPaginationItemArr2);
        });

        it('should check pagination looks correct after selecting 7 page', () => {
            // skipped due to cannot reproduce failure, needs further investigation
            if (getCurrentUrl().includes('localhost')) {
                return;
            }
            checkPaginationDisplaying('7', playgroundPaginationItemArr3);
        });
    });

    it('should check orientation', () => {
        paginationPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            paginationPage.saveExampleBaselineScreenshot();
            expect(paginationPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkPaginationDisplaying(currentPage: string, pagesArr: string[]): void {
        setValue(playgroundInputFields, '9');
        setValue(playgroundInputFields, '1', 1);
        setValue(playgroundInputFields, currentPage, 2);
        pause(250);
        const pages = getElementArrayLength(playgroundPages);
        expect(pages).toBe(5);
        for (let i = 0; i < pages; i++) {
            expect(getText(playgroundPages, i)).toEqual(pagesArr[i]);
        }
    }
});
