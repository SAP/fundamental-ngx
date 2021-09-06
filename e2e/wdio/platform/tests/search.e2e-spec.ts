import {
    browserIsIE,
    click,
    getAttributeByNameArr,
    getElementArrayLength, getElementSize,
    getText,
    getTextArr,
    isEnabled,
    refreshPage,
    setValue,
    waitForElDisplayed
} from '../../driver/wdio';
import { SearchPo } from '../pages/search.po';
import {expected_category, search_placeholder} from '../fixtures/appData/search-page-content';

describe('Search field', function() {
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
        cozyWithDataSourceSearch
    } = new SearchPo();
    const searchPage = new SearchPo();

    beforeAll(() => {
        searchPage.open();
    });

    afterEach(() => {
        refreshPage();
    });

    it('should be present and enabled', () => {
        const arrLength = getElementArrayLength(searchFields);
        for (let i = 0; arrLength > i; i++) {
            waitForElDisplayed(searchFields, i);
            expect(isEnabled(searchFields, i)).toBe(true);
        }
    });

    it('should have search icon present and enabled', () => {
        const arrLength = getElementArrayLength(searchIcons);
        for (let i = 0; arrLength > i; i++) {
            waitForElDisplayed(searchIcons, i);
            expect(isEnabled(searchIcons, i)).toBe(true);
        }
    });

    it('should have placeholder text', () => {
        const arrLength = getElementArrayLength(searchFields);
        const actualPlaceholders = getAttributeByNameArr(searchFields, 'placeholder');
        for (let i = 0; arrLength > i; i++) {
            waitForElDisplayed(searchFields, i);
            expect(actualPlaceholders[i]).toBe(search_placeholder);
        }
    });

    it('should submit term by click on search icon ', () => {
        const arrLength = getElementArrayLength(searchFields);
        for (let i = 0; arrLength > i; i++) {
            // value without suggestion
            setValue(searchFields, 'test', i);
            click(searchIcons, i);
        }
        expect(getText(cozySearchResult)).toContain('test');
        expect(getText(compactSearchResult)).toContain('test');
        expect(getText(cozyWithCategoriesSearch)).toContain('test');
        expect(getText(compactWithCategoriesSearch)).toContain('test');
        expect(getText(cozyWithDataSourceSearch)).toContain('test');

        expect(getText(cozySearchResult, 1)).toContain('test');
        expect(getText(compactSearchResult, 1)).toContain('test');
        expect(getText(cozyWithCategoriesSearch, 2)).toContain('test');
        expect(getText(compactWithCategoriesSearch, 2)).toContain('test');
        expect(getText(cozyWithDataSourceSearch, 2)).toContain('test');
    });

    it('should clear search by click on click icon ', () => {
        const arrLength = getElementArrayLength(searchFields);
        for (let i = 0; arrLength > i; i++) {
            // value without suggestion
            setValue(searchFields, 'test', i);
            waitForElDisplayed(clearSearchIcon);
            click(clearSearchIcon);
        }
        expect(getText(cozySearchResult)).not.toContain('test');
        expect(getText(compactSearchResult)).not.toContain('test');
        expect(getText(cozyWithCategoriesSearch)).not.toContain('test');
        expect(getText(compactWithCategoriesSearch)).not.toContain('test');
        expect(getText(cozyWithDataSourceSearch)).not.toContain('test');

        expect(getText(cozySearchResult, 1)).not.toContain('test');
        expect(getText(compactSearchResult, 1)).not.toContain('test');
        expect(getText(cozyWithCategoriesSearch, 3)).not.toContain('test');
        expect(getText(compactWithCategoriesSearch, 3)).not.toContain('test');
        expect(getText(cozyWithDataSourceSearch, 3)).not.toContain('test');
    });


    it('should have autosuggestion after one latter', () => {
        const arrLength = getElementArrayLength(searchFields);
        for (let i = 0; arrLength > i; i++) {
            // value without suggestion
            setValue(searchFields, 'ea', i);
            waitForElDisplayed(autosuggestionItems);
            getTextArr(autosuggestionItems).forEach((suggestionItemText) => {
                expect(suggestionItemText).toContain('ea');
            });
            click(clearSearchIcon);
        }
    });

    it('should compact be smaller than cozy', () => {
        const defaultCozySize = getElementSize(searchFields, 0, 'height');
        const defaultCompactSize = getElementSize(searchFields, 1, 'height');
        const withCategoryCozySize = getElementSize(searchFields, 2, 'height');
        const withCategoryCompactSize = getElementSize(searchFields, 3, 'height');

        expect(defaultCozySize).toBeGreaterThan(defaultCompactSize);
        expect(withCategoryCozySize).toBeGreaterThan(withCategoryCompactSize);
    });

    it('should be able to set category if this option enabled', () => {
        // TODO: Unskip after fix #4317
        if (browserIsIE()) {
            console.log('Skip for IE');
            return;
        }
        const arrLength = getElementArrayLength(searchCategoryBtn);
        for (let i = 0; arrLength > i; i++) {
            click(searchCategoryBtn, i);
            click(autosuggestionItems);
            click(searchIcons, i + 2);
        }
        expect(getText(cozyWithCategoriesSearch, 1)).toContain(expected_category);
        expect(getText(cozyWithCategoriesSearch, 3)).toContain(expected_category);

        expect(getText(compactWithCategoriesSearch, 1)).toContain(expected_category);
        expect(getText(compactWithCategoriesSearch, 3)).toContain(expected_category);

        expect(getText(cozyWithDataSourceSearch, 1)).toContain(expected_category);
        expect(getText(cozyWithDataSourceSearch, 3)).toContain(expected_category);
    });

    it('should check rtl switch', () => {
        searchPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            searchPage.saveExampleBaselineScreenshot();
            expect(searchPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
