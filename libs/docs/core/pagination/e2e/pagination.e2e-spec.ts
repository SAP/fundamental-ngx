import { PaginationPo } from './pagination.po';
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
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    basicPaginationTestArr,
    itemPaginationTestArr,
    playgroundLabelArr,
    resultsArr,
    ResultsArr2
} from './pagination-contents';

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

    beforeAll(async () => {
        await paginationPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(paginationPage.root);
        await waitForElDisplayed(paginationPage.title);
    }, 1);

    describe('Check Basic Pagination example', () => {
        it('should check selected pages by clicking options', async () => {
            await scrollIntoView(basicPaginationExample);
            await click(basicPaginationExample + standardButton);
            // pause for the new text to load
            await pause(2000);
            await expect((await getText(basicPaginationText)).trim()).toBe(basicPaginationTestArr[0]);

            await click(basicPaginationExample + pages, 1);
            // pause for the new text to load
            await pause(2000);
            await expect((await getText(basicPaginationText)).trim()).toBe(basicPaginationTestArr[1]);

            await click(basicPaginationExample + pages, 4);
            // pause for the new text to load
            await pause(2000);
            await expect((await getText(basicPaginationText)).trim()).toBe(basicPaginationTestArr[2]);
        });

        it('should check selected pages by clicking previous and next link', async () => {
            // // skipped due to cannot reproduce failure, needs further investigation
            // if (getCurrentUrl().includes('localhost')) {
            //     return;
            // }
            await scrollIntoView(basicPaginationExample);
            await click(basicPaginationExample + standardButton);
            // pause to give browser time to complete action
            await pause(2000);
            await click(basicPaginationExample + linkNext);
            // pause for the new text to load
            await pause(2000);
            await expect((await getText(basicPaginationText)).trim()).toBe(basicPaginationTestArr[1]);

            await click(basicPaginationExample + linkPrevious);
            // pause for the new text to load
            await pause(2000);
            await expect((await getText(basicPaginationText)).trim()).toBe(basicPaginationTestArr[0]);
        });

        it('should check disabled previous and next links', async () => {
            await scrollIntoView(basicPaginationExample);

            await click(basicPaginationExample + standardButton);
            // pause for the new text to load
            await pause(2000);
            await expect(await getAttributeByName(linkPrevious, 'aria-disabled')).toBe('true');

            await click(basicPaginationExample + pages, 4);
            // pause for the new text to load
            await pause(2000);
            await expect(await getAttributeByName(linkNext, 'aria-disabled')).toBe('true');
        });
    });

    describe('Check Pagination showing items example', () => {
        it('should check selected pages by clicking options', async () => {
            await scrollIntoView(showingItemsPaginationExample);

            await click(showingItemsPaginationExample + pages, 1);
            await expect((await getText(showingItemsPaginationExample + showingItemsPaginationText)).trim()).toBe(
                itemPaginationTestArr[1]
            );

            await click(showingItemsPaginationExample + pages, 2);
            await expect((await getText(showingItemsPaginationExample + showingItemsPaginationText)).trim()).toBe(
                itemPaginationTestArr[2]
            );
        });

        it('should check selected pages by clicking previous and next link', async () => {
            await scrollIntoView(showingItemsPaginationExample);
            await click(showingItemsPaginationExample + linkNext);
            await expect((await getText(showingItemsPaginationExample + showingItemsPaginationText)).trim()).toBe(
                itemPaginationTestArr[1]
            );

            await click(showingItemsPaginationExample + linkPrevious);
            await expect((await getText(showingItemsPaginationExample + showingItemsPaginationText)).trim()).toBe(
                itemPaginationTestArr[0]
            );
        });

        it('should check disabled previous and next links', async () => {
            await checkArrowButtons(showingItemsPaginationExample, 4);
        });
    });

    describe('Check Pagination with per page select example', () => {
        it('verify default property for items per page basic checks', async () => {
            await checkPages(itemsPerPageProperty);
            await checkPreviousNextLink(itemsPerPageProperty);
            await checkArrowButtons(itemsPerPageProperty, 7);
        });

        it('verify default select template for items per page options basic checks', async () => {
            await checkPages(itemsPerPageTemplate);
            await checkPreviousNextLink(itemsPerPageTemplate);
            await checkArrowButtons(itemsPerPageTemplate, 7);
        });

        it('verify default select template for items per page results per page', async () => {
            await scrollIntoView(itemsPerPageTemplate);
            await click(dropdownButton);
            const optionLength = await getElementArrayLength(dropdownPopoverOption);
            for (let i = 0; i < optionLength; i++) {
                await click(dropdownPopoverOption, i);
                await expect(await getAttributeByName(selectControl, 'title')).toBe(resultsArr[i]);
                if (i !== 2) {
                    await click(dropdownButton);
                }
            }
        });

        it('verify Custom items per page - list of buttons basic checks', async () => {
            await checkPages(itemsPerPageList);
            await checkPreviousNextLink(itemsPerPageList);
            await checkArrowButtons(itemsPerPageList, 7);
        });

        it('verify Custom items per page - list of buttons max pages', async () => {
            await scrollIntoView(itemsPerPageList);
            const buttonLength = await getElementArrayLength(itemsPerPageList + segmentButton);
            for (let i = 0; i < buttonLength; i++) {
                await click(segmentButton, i);
                await expect(await getAttributeByName(itemsPerPageList + input, 'max')).toBe(ResultsArr2[i]);
            }
        });
    });

    describe('Check Mobile example', () => {
        it('should check selected pages by clicking next and previous link', async () => {
            await checkPreviousNextLink(mobilePaginationExample);
        });

        it('should check results per page', async () => {
            await scrollIntoView(mobilePaginationExample);
            await click(mobilePaginationExample + dropdownButton);
            const optionLength = await getElementArrayLength(dropdownPopoverOption);
            for (let i = 0; i < optionLength; i++) {
                await click(dropdownPopoverOption, i);
                await expect(await getAttributeByName(selectControl, 'title', 1)).toBe(resultsArr[i]);
                if (i !== 2) {
                    await click(mobilePaginationExample + dropdownButton);
                }
            }
        });

        it('should check disabled previous and next links', async () => {
            await scrollIntoView(mobilePaginationExample);
            await click(mobilePaginationExample + mobileButton, 1);
            await expect(await getValue(mobilePaginationExample + input)).toBe('13');
            await expect(await getAttributeByName(mobilePaginationExample + linkNext, 'aria-disabled')).toBe('true');
            await expect(await getAttributeByName(mobilePaginationExample + mobileButton, 'aria-disabled', 1)).toBe(
                'true'
            );

            await click(mobilePaginationExample + mobileButton);
            await expect(await getValue(mobilePaginationExample + input)).toBe('1');
            await expect(await getAttributeByName(mobilePaginationExample + linkPrevious, 'aria-disabled')).toBe(
                'true'
            );
            await expect(await getAttributeByName(mobilePaginationExample + mobileButton, 'aria-disabled')).toBe(
                'true'
            );
        });
    });

    describe('Check Playground example', () => {
        it('should check that pages displayed correctly if total items more then 1', async () => {
            await scrollIntoView(playgroundInputFields);
            await setValue(playgroundInputFields, '10');
            const pagesLength = await getElementArrayLength(playgroundPages);
            const totalItems = await getValue(playgroundInputFields);
            const totalItemsNum = Number(totalItems);
            const itemsPerPage = await getValue(playgroundInputFields, 1);
            const itemsPerPageNum = Number(itemsPerPage);
            const actualItems = totalItemsNum / itemsPerPageNum;
            await expect(pagesLength).toEqual(actualItems);
        });

        it('should check should check that filling all fields by 1 displayed only 1 page', async () => {
            await scrollIntoView(playgroundInputFields);
            await setValue(playgroundInputFields, '1');
            await setValue(playgroundInputFields, '1', 1);
            const pagesLength = await getElementArrayLength(playgroundPages);
            const totalItems = await getValue(playgroundInputFields);
            const totalItemsNum = Number(totalItems);
            const itemsPerPage = await getValue(playgroundInputFields, 1);
            const itemsPerPageNum = Number(itemsPerPage);
            const actualItems = totalItemsNum / itemsPerPageNum;
            await expect(pagesLength).toEqual(actualItems);
        });

        it('should check that filling all fields by 0 pages are not displayed', async () => {
            await scrollIntoView(playgroundInputFields);
            await setValue(playgroundInputFields, '0');
            await setValue(playgroundInputFields, '0', 1);
            await setValue(playgroundInputFields, '0', 2);

            await expect(await doesItExist(playgroundPages)).toBe(false, 'playground pages still exist');
        });

        it('should check that all text labels are displayed', async () => {
            await scrollIntoView(playgroundLabel);
            const labelLength = await getElementArrayLength(playgroundLabel);
            for (let i = 0; i < labelLength; i++) {
                await expect((await getText(playgroundLabel, i)).trim()).toBe(playgroundLabelArr[i]);
            }
        });

        it('should check pagination looks correct after selecting specific page', async () => {
            await setValue(playgroundInputFields, '10');
            await setValue(playgroundInputFields, '1', 1);
            await setValue(playgroundInputFields, '3', 2);
            await pause(250);
            const playgroundLink = await getElementArrayLength(playgroundPages);
            await expect(playgroundLink).toBe(8);
            await expect(await getValue(playgroundExample + input)).toBe('3');
        });
    });

    it('should check orientation', async () => {
        await paginationPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await paginationPage.saveExampleBaselineScreenshot();
            await expect(await paginationPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    async function checkArrowButtons(example: string, index: number = 0): Promise<void> {
        await scrollIntoView(example);

        await click(example + pages);
        await expect(await getAttributeByName(example + linkPrevious, 'aria-disabled')).toBe('true');

        await click(example + pages, index);
        await expect(await getAttributeByName(example + linkNext, 'aria-disabled')).toBe('true');

        await refreshPage();
    }

    async function checkPages(example: string): Promise<void> {
        await scrollIntoView(example);
        await click(example + pages);
        await expect(await getValue(example + input)).toBe('1');

        await click(example + pages, 1);
        await expect(await getValue(example + input)).toBe('2');
        await refreshPage();
    }

    async function checkPreviousNextLink(example: string): Promise<void> {
        await scrollIntoView(example);
        await click(example + linkNext);
        await expect(await getValue(example + input)).toBe('3');

        await click(example + linkPrevious);
        await expect(await getValue(example + input)).toBe('2');
        await refreshPage();
    }
});
