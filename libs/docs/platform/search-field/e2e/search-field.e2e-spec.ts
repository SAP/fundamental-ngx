import {
    browserIsIE,
    click,
    getAttributeByNameArr,
    getElementArrayLength,
    getElementSize,
    getText,
    getTextArr,
    isEnabled,
    refreshPage,
    setValue,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { checkElArrIsClickable } from 'e2e/wdio/helper/assertion-helper';
import { expected_category, search_placeholder } from './search-field-content';
import { SearchFieldPo } from './search-field.po';

describe('Search field', () => {
    const {
        searchFields,
        searchIcons,
        clearSearchIcon,
        searchCategoryBtn,
        autosuggestionItems,
        cozySearchResult,
        compactSearchResult,
        cozyWithCategoriesSearch,
        compactWithCategoriesSearch,
        cozyWithDataSourceSearch,
        okButton,
        mobileExampleSearch,
        categoryOption,
        synchronizeButton
    } = new SearchFieldPo();
    const searchPage = new SearchFieldPo();

    beforeAll(async () => {
        await searchPage.open();
    });

    afterEach(async () => {
        await refreshPage();
        await searchPage.waitForRoot();
        await waitForElDisplayed(searchPage.title);
    });

    it('should be present and enabled', async () => {
        const arrLength = await getElementArrayLength(searchFields);
        for (let i = 0; arrLength > i; i++) {
            await waitForElDisplayed(searchFields, i);
            await expect(await isEnabled(searchFields, i)).toBe(true);
        }
    });

    it('should have search icon present and enabled', async () => {
        const arrLength = await getElementArrayLength(searchIcons);
        for (let i = 0; arrLength > i; i++) {
            await waitForElDisplayed(searchIcons, i);
            await expect(await isEnabled(searchIcons, i)).toBe(true);
        }
    });

    it('should have placeholder text', async () => {
        const arrLength = await getElementArrayLength(searchFields);
        const actualPlaceholders = await getAttributeByNameArr(searchFields, 'placeholder');
        for (let i = 0; arrLength > i; i++) {
            await waitForElDisplayed(searchFields, i);
            await expect(actualPlaceholders[i]).toBe(search_placeholder);
        }
    });

    it('should submit term by click on search icon ', async () => {
        const arrLength = await getElementArrayLength(searchFields);
        for (let i = 0; arrLength > i; i++) {
            if (i !== 6) {
                await setValue(searchFields, 'test', i);
                await click(searchIcons, 0);
            }
            if (i === 6) {
                await click(searchFields, i);
                await setValue(searchFields, 'test', 7);
                await click(okButton);
            }
        }
        await expect(await getText(cozySearchResult)).toContain('test');
        await expect(await getText(compactSearchResult)).toContain('test');
        await expect(await getText(cozyWithCategoriesSearch)).toContain('test');
        await expect(await getText(compactWithCategoriesSearch)).toContain('test');
        await expect(await getText(cozyWithDataSourceSearch)).toContain('test');

        await expect(await getText(cozySearchResult, 1)).toContain('test');
        await expect(await getText(compactSearchResult, 1)).toContain('test');
        await expect(await getText(cozyWithCategoriesSearch, 2)).toContain('test');
        await expect(await getText(compactWithCategoriesSearch, 2)).toContain('test');
        await expect(await getText(cozyWithDataSourceSearch, 2)).toContain('test');

        await expect(await getText(mobileExampleSearch)).toContain('test');
        await expect(await getText(mobileExampleSearch, 1)).toContain('test');
    });

    it('should clear search by click on click icon ', async () => {
        const arrLength = await getElementArrayLength(searchFields);
        for (let i = 0; arrLength > i; i++) {
            // value without suggestion
            if (i !== 6) {
                await setValue(searchFields, 'test', i);
                await waitForElDisplayed(clearSearchIcon);
                await click(clearSearchIcon);
            }
            if (i === 6) {
                await click(searchFields, i);
                await setValue(searchFields, 'test', 7);
                await waitForElDisplayed(clearSearchIcon, 1);
                await click(clearSearchIcon, 1);
                await click(okButton);
            }
        }
        await expect(await getText(cozySearchResult)).not.toContain('test');
        await expect(await getText(compactSearchResult)).not.toContain('test');
        await expect(await getText(cozyWithCategoriesSearch)).not.toContain('test');
        await expect(await getText(compactWithCategoriesSearch)).not.toContain('test');
        await expect(await getText(cozyWithDataSourceSearch)).not.toContain('test');

        await expect(await getText(cozySearchResult, 1)).not.toContain('test');
        await expect(await getText(compactSearchResult, 1)).not.toContain('test');
        await expect(await getText(cozyWithCategoriesSearch, 3)).not.toContain('test');
        await expect(await getText(compactWithCategoriesSearch, 3)).not.toContain('test');
        await expect(await getText(cozyWithDataSourceSearch, 3)).not.toContain('test');
    });

    it('should have autosuggestion after one letter', async () => {
        const arrLength = await getElementArrayLength(searchFields);
        for (let i = 0; arrLength > i; i++) {
            if (i === 0 || i === 1) {
                await setValue(searchFields, 'li', i);
                await waitForElDisplayed(autosuggestionItems);

                const codemod_placeholder_6978 = await getTextArr(autosuggestionItems);

                for (const suggestionItemText of codemod_placeholder_6978) {
                    await expect(suggestionItemText).toContain('List Item 1');
                }

                await click(clearSearchIcon);
            }
        }
    });

    it('should compact be smaller than cozy', async () => {
        const defaultCozySize = (await getElementSize(searchFields, 0)).height;
        const defaultCompactSize = (await getElementSize(searchFields, 1)).height;
        const withCategoryCozySize = (await getElementSize(searchFields, 3)).height;
        const withCategoryCompactSize = (await getElementSize(searchFields, 4)).height;

        await expect(defaultCozySize).toBeGreaterThan(defaultCompactSize);
        await expect(withCategoryCozySize).toBeGreaterThan(withCategoryCompactSize);
    });

    it('should be able to set category if this option enabled', async () => {
        // TODO: Unskip after fix #4317
        if (await browserIsIE()) {
            console.log('Skip for IE');
            return;
        }
        const arrLength = await getElementArrayLength(searchCategoryBtn);
        for (let i = 0; arrLength > i; i++) {
            await click(searchCategoryBtn, i);
            await click(categoryOption);
            await click(searchIcons, i + 3);
        }
        await expect(await getText(cozyWithCategoriesSearch, 1)).toContain(expected_category);
        await expect(await getText(cozyWithCategoriesSearch, 3)).toContain(expected_category);

        await expect(await getText(compactWithCategoriesSearch, 1)).toContain(expected_category);
        await expect(await getText(compactWithCategoriesSearch, 3)).toContain(expected_category);

        await expect(await getText(cozyWithDataSourceSearch, 1)).toContain(expected_category);
        await expect(await getText(cozyWithDataSourceSearch, 3)).toContain(expected_category);
    });

    it('should check clickability synchronize button', async () => {
        await checkElArrIsClickable(synchronizeButton);
    });

    it('should check rtl switch', async () => {
        await searchPage.checkRtlSwitch();
    });
});
