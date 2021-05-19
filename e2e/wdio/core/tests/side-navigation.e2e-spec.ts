import {
    click,
    getAttributeByName,
    getElementArrayLength,
    isElementDisplayed,
    getElementClass,
    refreshPage,
    waitForPresent,
} from '../../driver/wdio';
import { SideNavigationPo } from '../../core/pages/side-navigation.po';
import { checkRtlOrientation } from '../../helper/assertion-helper';

describe('Side-navigation test suite', () => {

    const sideNavigationPage = new SideNavigationPo();
    const {
        iconsExample, objectExample, CompactExample, TitilesExample, condensedExample,
        NavigationExample, ThreeLevelsExample, pragmaticalyExample, NonSelectableExample,
        condensedObjectExample, MultipleSelectedExample, expandArrow, mainListPoint,
        pointContainsSubList, expandedListPoint, expandListExample, listItem, subListItem,
        subList, expandList, openBtn, selectChildBtn
    } = sideNavigationPage;

    beforeAll(() => {
        sideNavigationPage.open();
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

    it('should check that items in expanded list choosing correct', () => {
        isExpandListWorking(condensedObjectExample);
        isExpandListWorking(condensedExample);

    });
    it('should check that items in multiple levels list choosing correct', () => {
        checkMultipleLevels(ThreeLevelsExample);
        checkMultipleLevels(iconsExample);
        checkMultipleLevels(objectExample);
    });

    it('should check work buttons "select child" & "open"', () => {
        click(selectChildBtn);
        expect(getAttributeByName(pragmaticalyExample + pointContainsSubList, 'ng-reflect-selected')).toEqual('false');
        expect(getAttributeByName(pragmaticalyExample + subListItem, 'ng-reflect-selected')).toEqual('false');
        click(openBtn);
        expect(getAttributeByName(pragmaticalyExample + expandArrow, 'aria-expanded')).toEqual('false');
    });

    it('should check RTL and LTR orientation', () => {
        sideNavigationPage.checkRtlSwitch();
    });

    it('should check examples visual regression', () => {
        sideNavigationPage.saveExampleBaselineScreenshot();
        expect(sideNavigationPage.compareWithBaseline()).toBeLessThan(5);
    });

    function checkIsSelected(section: string, i: number = 0, point: string = section + mainListPoint): void {
        click(point, i);
        expect(getElementClass(point, i)).toContain('is-selected');
    }

    function isExpandListWorking(section: string, point: string = section + mainListPoint,): void {
        click(point, 2);
        expect(isElementDisplayed(expandList)).toBe(true);
        const listLength = getElementArrayLength(expandListExample + listItem);
        for (let i = 0; i < listLength; i++) {
            click(expandListExample + listItem, i);
            expect(getElementClass(expandedListPoint, i)).toContain('is-selected');
        }
    }

    function checkMultipleLevels(section: string): void {
        if (section !== objectExample){
            click(section + expandArrow);
        }
        expect(isElementDisplayed(subList)).toBe(true);
        const listLength = getElementArrayLength(section + subListItem);
        for (let i = 0; i < listLength; i++) {
            click(section + subListItem, i);
            expect(getElementClass(section + subListItem, i)).toContain('is-selected');
            expect(getElementClass(section + pointContainsSubList)).toContain('is-selected');
        }
    }

});