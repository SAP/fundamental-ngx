import {
    click,
    getAttributeByName,
    getElementArrayLength,
    isElementDisplayed,
    getElementClass,
    refreshPage,
    waitForPresent,
    acceptAlert,
    doesItExist
} from '../../driver/wdio';
import { sideNavigation } from '../../core/pages/side-navigation.po';

describe('Side-navigation test suite', () => {

    const snPage = new sideNavigation();
    const {
        iconsExample, objectExample, CompactExample, TitilesExample, condensedExample,
        NavigationExample, ThreeLevelsExample, pragmaticalyExample, NonSelectableExample,
        condensedObjectExample, MultipleSelectedExample, expandArrow, mainListPoint,
        pointContainsSubList, expandedListPoint, expandListExample, listItem, subListItem,
        subList, expandList, openBtn, selectChildBtn
    } = snPage;

    beforeAll(() => {
        snPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(mainListPoint);
    }, 1);

    it('should check list item select', () => {
        checkIsSelected(NavigationExample);
        checkIsSelected(TitilesExample);
        checkIsSelected(CompactExample);
        checkIsSelected(ThreeLevelsExample);
        checkIsSelected(MultipleSelectedExample);
        checkIsSelected(iconsExample);
        checkIsSelected(objectExample, 1);
        click(NonSelectableExample + mainListPoint);
        expect(getElementClass(NonSelectableExample + mainListPoint)).not.toContain('is-selected');
    });

    xit('sublist working check', () => {
        isExpandListWorking(condensedObjectExample);
        isExpandListWorking(condensedExample);

    });
    xit('multiple levels check', () => {
        checkMultipleLevels(ThreeLevelsExample);
        checkMultipleLevels(iconsExample);
        checkMultipleLevels(objectExample);
    });

    xit('should check work buttons "select child" & "open"', () => {
        click(selectChildBtn);
        expect(getAttributeByName(pragmaticalyExample + pointContainsSubList, 'ng-reflect-selected')).toEqual('false');
        expect(getAttributeByName(pragmaticalyExample + subListItem, 'ng-reflect-selected')).toEqual('false');
        click(openBtn);
        expect(getAttributeByName(pragmaticalyExample + expandArrow, 'aria-expanded')).toEqual('false');
    });

    function checkIsSelected(section: string, i: number = 0, point: string = section + mainListPoint): void {
        click(point, i);
        expect(getElementClass(point, i)).toContain('is-selected');
    }

    function isExpandListWorking(section: string, point: string = section + mainListPoint,): void {
        click(point, 2);
        expect(isElementDisplayed(expandList)).toBe(true);
        const length = getElementArrayLength(expandListExample + listItem);
        for (let i = 0; i < length; i++) {
            click(expandListExample + listItem, i);
            expect(getElementClass(expandedListPoint, i)).toContain('is-selected');
        }
    }

    function checkMultipleLevels(section: string): void {
        if (section != objectExample)
            click(section + expandArrow);
        expect(isElementDisplayed(subList)).toBe(true);
        const length = getElementArrayLength(section + subListItem);
        for (let i = 0; i < length; i++) {
            click(section + subListItem, i);
            expect(getElementClass(section + subListItem, i)).toContain('is-selected');
            expect(getElementClass(section + pointContainsSubList)).toContain('is-selected');
        }
    }

});