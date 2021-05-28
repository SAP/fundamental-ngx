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

describe('Side-navigation test suite', () => {

    const sideNavigationPage = new SideNavigationPo();
    const {
        iconsExample, objectExample, compactExample, titlesExample, condensedExample,
        navigationExample, threeLevelsExample, pragmaticalyExample, nonSelectableExample,
        condensedObjectExample, multipleSelectedExample, expandArrow, listItemLink,
        pointContainsSubList, expandedListPoint, expandListExample, listItem, subListItem,
        subList, expandList, openBtn, selectChildBtn
    } = sideNavigationPage;

    beforeAll(() => {
        sideNavigationPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(listItemLink);
    }, 1);

    it('should check list item select', () => {
        checkIsSelected(navigationExample);
        checkIsSelected(titlesExample);
        checkIsSelected(compactExample);
        checkIsSelected(threeLevelsExample);
        checkIsSelected(multipleSelectedExample);
        checkIsSelected(iconsExample);
        checkIsSelected(objectExample, 1);
        click(nonSelectableExample + listItemLink);
        expect(getElementClass(nonSelectableExample + listItemLink)).not.toContain('is-selected', 'item is selected');
    });

    it('should check that items in expanded list choosing correct', () => {
        checkExpandListIsWorking(condensedObjectExample);
        checkExpandListIsWorking(condensedExample);

    });
    it('should check that items in multiple levels list choosing correct', () => {
        checkMultipleLevels(threeLevelsExample);
        checkMultipleLevels(iconsExample);
        checkMultipleLevels(objectExample);
    });

    it('should check work buttons "select child" & "open"', () => {
        click(selectChildBtn);
        expect(getAttributeByName(pragmaticalyExample + pointContainsSubList, 'ng-reflect-selected')).toEqual('false', 'element with subitems is selected');
        expect(getAttributeByName(pragmaticalyExample + subListItem, 'ng-reflect-selected')).toEqual('false', 'element is not selected');
        click(openBtn);
        expect(getAttributeByName(pragmaticalyExample + expandArrow, 'aria-expanded')).toEqual('false', 'expanded menu is not closed');
    });

    it('should check RTL and LTR orientation', () => {
        sideNavigationPage.checkRtlSwitch();
    });

    it('should check examples visual regression', () => {
        sideNavigationPage.saveExampleBaselineScreenshot();
        expect(sideNavigationPage.compareWithBaseline()).toBeLessThan(5);
    });

    function checkIsSelected(section: string, i: number = 0, point: string = section + listItemLink): void {
        click(point, i);
        expect(getElementClass(point, i)).toContain('is-selected', 'element is not selected');
    }

    function checkExpandListIsWorking(section: string, point: string = section + listItemLink): void {
        click(point, 2);
        expect(isElementDisplayed(expandList)).toBe(true, 'expanded list is not displayed');
        const listLength = getElementArrayLength(expandListExample + listItem);
        for (let i = 0; i < listLength; i++) {
            click(expandListExample + listItem, i);
            expect(getElementClass(expandedListPoint, i)).toContain('is-selected', 'element is not selected');
        }
    }

    function checkMultipleLevels(section: string): void {
        if (section !== objectExample) {
            click(section + expandArrow);
        }
        expect(isElementDisplayed(subList)).toBe(true, 'expanded list is not displayed');
        const listLength = getElementArrayLength(section + subListItem);
        for (let i = 0; i < listLength; i++) {
            click(section + subListItem, i);
            expect(getElementClass(section + subListItem, i)).toContain('is-selected', 'element is not selected');
            expect(getElementClass(section + pointContainsSubList)).toContain('is-selected', 'element with subitems is not selected');
        }
    }

});
