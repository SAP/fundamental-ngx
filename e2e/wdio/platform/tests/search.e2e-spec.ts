import {
    click,
    getAttributeByNameArr,
    getElementArrayLength,
    getElementSize,
    getText,
    getTextArr,
    isEnabled,
    refreshPage,
    setValue,
    waitElementToBePresentInDOM,
    waitForElDisplayed
} from '../../driver/wdio';
import { SearchPo } from '../pages/search.po';
import searchPageContent from '../fixtures/appData/search-page-content';

describe('Search field', () => {
    const searchPo = new SearchPo();

    beforeAll(() => {
        searchPo.open();
    });

    afterEach(() => {
        refreshPage();
    });

    it('should be present and enabled', () => {
        const arrLength = getElementArrayLength(searchPo.searchFields);
        for (let i = 0; arrLength > i; i++) {
            waitElementToBePresentInDOM(searchPo.searchFields, i);
            waitForElDisplayed(searchPo.searchFields, i);
            expect(isEnabled(searchPo.searchFields, i)).toBe(true);
        }
    });

    it('should have search icon present and enabled', () => {
        const arrLength = getElementArrayLength(searchPo.searchIcons);
        for (let i = 0; arrLength > i; i++) {
            waitElementToBePresentInDOM(searchPo.searchIcons, i);
            waitForElDisplayed(searchPo.searchIcons, i);
            expect(isEnabled(searchPo.searchIcons, i)).toBe(true);
        }
    });

    it('should have placeholder text', async () => {
        const arrLength = getElementArrayLength(searchPo.searchFields);
        const actualPlaceholders = getAttributeByNameArr(searchPo.searchFields, 'placeholder');
        for (let i = 0; arrLength > i; i++) {
            waitElementToBePresentInDOM(searchPo.searchFields, i);
            waitForElDisplayed(searchPo.searchFields, i);
            expect(actualPlaceholders[i]).toBe(searchPageContent.search_placeholder);
        }
    });

    it('should submit term by click on search icon ', async () => {
        const arrLength = getElementArrayLength(searchPo.searchFields);
        for (let i = 0; arrLength > i; i++) {
            // value without suggestion
            setValue(searchPo.searchFields, 'test', i);
            click(searchPo.searchIcons, i);
        }
        expect(getText(searchPo.cozySearchResult, 0)).toContain('test');
        expect(getText(searchPo.compactSearchResult, 0)).toContain('test');
        expect(getText(searchPo.cozyWithCategoriesSearch, 0)).toContain('test');
        expect(getText(searchPo.compactWithCategoriesSearch, 0)).toContain('test');
        expect(getText(searchPo.cozyWithDataSourceSearch, 0)).toContain('test');

        expect(getText(searchPo.cozySearchResult, 1)).toContain('test');
        expect(getText(searchPo.compactSearchResult, 1)).toContain('test');
        expect(getText(searchPo.cozyWithCategoriesSearch, 2)).toContain('test');
        expect(getText(searchPo.compactWithCategoriesSearch, 2)).toContain('test');
        expect(getText(searchPo.cozyWithDataSourceSearch, 2)).toContain('test');
    });

    it('should clear search by click on click icon ', async () => {
        const arrLength = getElementArrayLength(searchPo.searchFields);
        for (let i = 0; arrLength > i; i++) {
            // value without suggestion
            setValue(searchPo.searchFields, 'test', i);
            waitElementToBePresentInDOM(searchPo.clearSearchIcon);
            waitForElDisplayed(searchPo.clearSearchIcon);
            click(searchPo.clearSearchIcon);
        }
        expect(getText(searchPo.cozySearchResult, 0)).not.toContain('test');
        expect(getText(searchPo.compactSearchResult, 0)).not.toContain('test');
        expect(getText(searchPo.cozyWithCategoriesSearch, 0)).not.toContain('test');
        expect(getText(searchPo.compactWithCategoriesSearch, 0)).not.toContain('test');
        expect(getText(searchPo.cozyWithDataSourceSearch, 0)).not.toContain('test');

        expect(getText(searchPo.cozySearchResult, 1)).not.toContain('test');
        expect(getText(searchPo.compactSearchResult, 1)).not.toContain('test');
        expect(getText(searchPo.cozyWithCategoriesSearch, 3)).not.toContain('test');
        expect(getText(searchPo.compactWithCategoriesSearch, 3)).not.toContain('test');
        expect(getText(searchPo.cozyWithDataSourceSearch, 3)).not.toContain('test');
    });


    it('should have autosuggestion after one latter', () => {
        const arrLength = getElementArrayLength(searchPo.searchFields);
        for (let i = 0; arrLength > i; i++) {
            // value without suggestion
            setValue(searchPo.searchFields, 'ea', i);
            waitElementToBePresentInDOM(searchPo.autosuggestionItems);
            waitForElDisplayed(searchPo.autosuggestionItems);
            getTextArr(searchPo.autosuggestionItems).forEach((suggestionItemText) => {
                expect(suggestionItemText).toContain('ea');
            });
            click(searchPo.clearSearchIcon);
        }
    });

    it('should compact be smaller than cozy', () => {
        const defaultCozySize = getElementSize(searchPo.searchFields, 0, 'height');
        const defaultCompactSize = getElementSize(searchPo.searchFields, 1, 'height');
        const withCategoryCozySize = getElementSize(searchPo.searchFields, 2, 'height');
        const withCategoryCompactSize = getElementSize(searchPo.searchFields, 3, 'height');

        expect(defaultCozySize).toBeGreaterThan(defaultCompactSize);
        expect(withCategoryCozySize).toBeGreaterThan(withCategoryCompactSize);
    });

    it('should be able so set category if this option enabled', () => {
        const arrLength = getElementArrayLength(searchPo.searchCategoryBtn);
        for (let i = 0; arrLength > i; i++) {
            click(searchPo.searchCategoryBtn, i);
            click(searchPo.autosuggestionItems);
            click(searchPo.searchIcons, i + 2);
        }
        expect(getText(searchPo.cozyWithCategoriesSearch, 1)).toContain('red');
        expect(getText(searchPo.cozyWithCategoriesSearch, 3)).toContain('red');

        expect(getText(searchPo.compactWithCategoriesSearch, 1)).toContain('red');
        expect(getText(searchPo.compactWithCategoriesSearch, 3)).toContain('red');

        expect(getText(searchPo.cozyWithDataSourceSearch, 1)).toContain('red');
        expect(getText(searchPo.cozyWithDataSourceSearch, 3)).toContain('red');
    });

    it('should check rtl switch', () => {
        searchPo.checkRtlSwitch();
    });
});
