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
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { SearchFieldPo } from './search-field.po';
import { expected_category, search_placeholder } from './search-field-content';
import { checkElArrIsClickable } from '../../helper/assertion-helper';

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

    beforeAll(() => {
        searchPage.open();
    });

    afterEach(() => {
        refreshPage();
        waitForPresent(searchPage.root);
        waitForElDisplayed(searchPage.title);
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
            if (i !== 6) {
                setValue(searchFields, 'test', i);
                click(searchIcons, 0);
            }
            if (i === 6) {
                click(searchFields, i);
                setValue(searchFields, 'test', 7);
                click(okButton);
            }
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

        expect(getText(mobileExampleSearch)).toContain('test');
        expect(getText(mobileExampleSearch, 1)).toContain('test');
    });

    it('should clear search by click on click icon ', () => {
        const arrLength = getElementArrayLength(searchFields);
        for (let i = 0; arrLength > i; i++) {
            // value without suggestion
            if (i !== 6) {
                setValue(searchFields, 'test', i);
                waitForElDisplayed(clearSearchIcon);
                click(clearSearchIcon);
            }
            if (i === 6) {
                click(searchFields, i);
                setValue(searchFields, 'test', 7);
                waitForElDisplayed(clearSearchIcon, 1);
                click(clearSearchIcon, 1);
                click(okButton);
            }
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
            if (i !== 2 && i !== 6) {
                // value without suggestion
                setValue(searchFields, 'ea', i);
                waitForElDisplayed(autosuggestionItems);
                getTextArr(autosuggestionItems).forEach((suggestionItemText) => {
                    expect(suggestionItemText).toContain('ea');
                });
                click(clearSearchIcon);
            }
            if (i === 6) {
                click(searchFields, i);
                setValue(searchFields, 'ea', 7);
                waitForElDisplayed(autosuggestionItems);
                getTextArr(autosuggestionItems).forEach((suggestionItemText) => {
                    expect(suggestionItemText).toContain('ea');
                });
            }
        }
    });

    it('should compact be smaller than cozy', () => {
        const defaultCozySize = getElementSize(searchFields, 0, 'height');
        const defaultCompactSize = getElementSize(searchFields, 1, 'height');
        const withCategoryCozySize = getElementSize(searchFields, 3, 'height');
        const withCategoryCompactSize = getElementSize(searchFields, 4, 'height');

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
            click(categoryOption);
            click(searchIcons, i + 3);
        }
        expect(getText(cozyWithCategoriesSearch, 1)).toContain(expected_category);
        expect(getText(cozyWithCategoriesSearch, 3)).toContain(expected_category);

        expect(getText(compactWithCategoriesSearch, 1)).toContain(expected_category);
        expect(getText(compactWithCategoriesSearch, 3)).toContain(expected_category);

        expect(getText(cozyWithDataSourceSearch, 1)).toContain(expected_category);
        expect(getText(cozyWithDataSourceSearch, 3)).toContain(expected_category);
    });

    it('should check clickability synchronize button', () => {
        checkElArrIsClickable(synchronizeButton);
    });

    it('should check rtl switch', () => {
        searchPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            searchPage.saveExampleBaselineScreenshot();
            expect(searchPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
