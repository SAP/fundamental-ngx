import { PaginationPo } from '../pages/pagination.po';
import {
    click,
    doesItExist,
    getAttributeByName,
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
    playgroundLabelArr,
    resultsArr,
    ResultsArr2
} from '../fixtures/appData/pagination-contents';

describe('Pagination test suite:', () => {
    const paginationPage = new PaginationPo();
    const {
        basicPaginationExample,
        standardButton,
        pages,
        basicPaginationText,
        showingItemsPaginationExample,
        showingItemsPaginationText,
        linkPrevious,
        linkNext,
        itemsPerPageProperty,
        input,
        itemsPerPageTemplate,
        dropdownPopoverOption,
        selectControl,
        itemsPerPageList,
        segmentButton,
        mobilePaginationExample,
        mobileButton,
        playgroundExample,
        dropdownButton,
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
        it('should check selected pages by clicking options', () => {
            scrollIntoView(basicPaginationExample);
            click(basicPaginationExample + standardButton);
            // pause for the new text to load
            pause(250);
            expect(getText(basicPaginationText)).toBe(basicPaginationTestArr[0]);

            click(basicPaginationExample + pages);
            // pause for the new text to load
            pause(250);
            expect(getText(basicPaginationText)).toBe(basicPaginationTestArr[1]);
            click(basicPaginationExample + pages, 3);
            // pause for the new text to load
            pause(250);
            expect(getText(basicPaginationText)).toBe(basicPaginationTestArr[2]);
        });

        it('should check selected pages by clicking previous and next link', () => {
            // // skipped due to cannot reproduce failure, needs further investigation
            // if (getCurrentUrl().includes('localhost')) {
            //     return;
            // }
            scrollIntoView(basicPaginationExample);
            click(basicPaginationExample + standardButton);
            // pause to give browser time to complete action
            pause(250);
            click(basicPaginationExample + linkNext);
            // pause for the new text to load
            pause(250);
            expect(getText(basicPaginationText)).toBe(basicPaginationTestArr[1]);

            click(basicPaginationExample + linkPrevious);
            // pause for the new text to load
            pause(250);
            expect(getText(basicPaginationText)).toBe(basicPaginationTestArr[0]);
        });

        it('should check disabled previous and next links', () => {
            scrollIntoView(basicPaginationExample);
            click(basicPaginationExample + standardButton);
            // pause for the new text to load
            pause(250);
            expect(getAttributeByName(linkPrevious, 'aria-disabled')).toBe('true');

            click(basicPaginationExample + pages, 3);
            // pause for the new text to load
            pause(250);
            expect(getAttributeByName(linkNext, 'aria-disabled')).toBe('true');
        });
    });

    describe('Check Pagination showing items example', () => {
        it('should check selected pages by clicking options', () => {
            scrollIntoView(showingItemsPaginationExample);
            click(showingItemsPaginationExample + pages);
            expect(getText(showingItemsPaginationExample + showingItemsPaginationText)).toBe(itemPaginationTestArr[1]);

            click(showingItemsPaginationExample + pages, 1);
            expect(getText(showingItemsPaginationExample + showingItemsPaginationText)).toBe(itemPaginationTestArr[2]);
        });

        it('should check selected pages by clicking previous and next link', () => {
            scrollIntoView(showingItemsPaginationExample);
            click(showingItemsPaginationExample + linkNext);
            expect(getText(showingItemsPaginationExample + showingItemsPaginationText)).toBe(itemPaginationTestArr[1]);

            click(showingItemsPaginationExample + linkPrevious);
            expect(getText(showingItemsPaginationExample + showingItemsPaginationText)).toBe(itemPaginationTestArr[0]);
        });

        it('should check disabled previous and next links', () => {
            checkArrowButtons(showingItemsPaginationExample, 3);
        });
    });

    describe('Check Pagination with per page select example', () => {
        it('verify default property for items per page basic checks', () => {
            checkPages(itemsPerPageProperty);
            checkPreviousNextLink(itemsPerPageProperty);
            checkArrowButtons(itemsPerPageProperty, 2);
        });

        it('verify default select template for items per page options basic checks', () => {
            checkPages(itemsPerPageTemplate);
            checkPreviousNextLink(itemsPerPageTemplate);
            checkArrowButtons(itemsPerPageTemplate, 2);
        });

        it('verify default select template for items per page results per page', () => {
            scrollIntoView(itemsPerPageTemplate);
            click(dropdownButton);
            const optionLength = getElementArrayLength(dropdownPopoverOption);
            for (let i = 0; i < optionLength; i++) {
                click(dropdownPopoverOption, i);
                expect(getAttributeByName(selectControl, 'title')).toBe(resultsArr[i]);
                if (i !== 2) {
                    click(dropdownButton);
                }
            }
        });

        it('verify Custom items per page - list of buttons basic checks', () => {
            checkPages(itemsPerPageList);
            checkPreviousNextLink(itemsPerPageList);
            checkArrowButtons(itemsPerPageList, 3);
        });

        it('verify Custom items per page - list of buttons max pages', () => {
            scrollIntoView(itemsPerPageList);
            const buttonLength = getElementArrayLength(itemsPerPageList + segmentButton);
            for (let i = 0; i < buttonLength; i++) {
                click(segmentButton, i);
                expect(getAttributeByName(itemsPerPageList + input, 'max')).toBe(ResultsArr2[i]);
            }
        });
    });

    describe('Check Mobile example', () => {
        it('should check selected pages by clicking next and previous link', () => {
            checkPreviousNextLink(mobilePaginationExample);
        });

        it('should check results per page', () => {
            scrollIntoView(mobilePaginationExample);
            click(mobilePaginationExample + dropdownButton);
            const optionLength = getElementArrayLength(dropdownPopoverOption);
            for (let i = 0; i < optionLength; i++) {
                click(dropdownPopoverOption, i);
                expect(getAttributeByName(selectControl, 'title', 1)).toBe(resultsArr[i]);
                if (i !== 2) {
                    click(mobilePaginationExample + dropdownButton);
                }
            }
        });

        it('should check disabled previous and next links', () => {
            scrollIntoView(mobilePaginationExample);
            click(mobilePaginationExample + mobileButton, 1);
            expect(getValue(mobilePaginationExample + input)).toBe('13');
            expect(getAttributeByName(mobilePaginationExample + linkNext, 'aria-disabled')).toBe('true');
            expect(getAttributeByName(mobilePaginationExample + mobileButton, 'aria-disabled', 1)).toBe('true');

            click(mobilePaginationExample + mobileButton);
            expect(getValue(mobilePaginationExample + input)).toBe('1');
            expect(getAttributeByName(mobilePaginationExample + linkPrevious, 'aria-disabled')).toBe('true');
            expect(getAttributeByName(mobilePaginationExample + mobileButton, 'aria-disabled')).toBe('true');
        });
    });

    describe('Check Playground example', () => {
        it('should check that pages displayed correctly if total items more then 1', () => {
            scrollIntoView(playgroundInputFields);
            setValue(playgroundInputFields, '10');
            const pagesLength = getElementArrayLength(playgroundPages);
            const totalItems = getValue(playgroundInputFields);
            const totalItemsNum = Number(totalItems);
            const itemsPerPage = getValue(playgroundInputFields, 1);
            const itemsPerPageNum = Number(itemsPerPage);
            const actualItems = totalItemsNum / itemsPerPageNum;
            expect(pagesLength + 1).toEqual(actualItems);
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
            expect(pagesLength + 1).toEqual(actualItems);
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

        it('should check pagination looks correct after selecting specific page', () => {
            setValue(playgroundInputFields, '9');
            setValue(playgroundInputFields, '1', 1);
            setValue(playgroundInputFields, '3', 2);
            pause(250);
            const playgroundLink = getElementArrayLength(playgroundPages);
            expect(playgroundLink + 1).toBe(5);
            expect(getValue(playgroundExample + input)).toBe('3');
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

    function checkArrowButtons(example: string, index: number = 0): void {
        scrollIntoView(example);
        expect(getAttributeByName(example + linkPrevious, 'aria-disabled')).toBe('true');
        click(example + pages, index);
        expect(getAttributeByName(example + linkNext, 'aria-disabled')).toBe('true');
        refreshPage();
    }

    function checkPages(example: string): void {
        scrollIntoView(example);
        click(example + pages);
        expect(getValue(example + input)).toBe('2');

        click(example + pages);
        expect(getValue(example + input)).toBe('1');
        refreshPage();
    }

    function checkPreviousNextLink(example: string): void {
        scrollIntoView(example);
        click(example + linkNext);
        expect(getValue(example + input)).toBe('2');

        click(example + linkPrevious);
        expect(getValue(example + input)).toBe('1');
        refreshPage();
    }
});
