import {
    click,
    getElementArrayLength,
    getElementClass,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { SideNavigationPo } from './side-navigation.po';
import { blockExamples } from './side-navigation-content';

describe('Side-navigation test suite', () => {
    const sideNavigationPage = new SideNavigationPo();
    const {
        iconsExample,
        objectExample,
        condensedExample,
        threeLevelsExample,
        pragmaticalyExample,
        nonSelectableExample,
        condensedObjectExample,
        expandArrow,
        listItemLink,
        pointContainsSubList,
        expandedListPoint,
        expandListExample,
        listItem,
        subListItem,
        subList,
        expandList,
        openBtn,
        selectChildBtn
    } = sideNavigationPage;

    beforeAll(() => {
        sideNavigationPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(sideNavigationPage.root);
        waitForElDisplayed(sideNavigationPage.title);
    }, 1);

    it('should check list item select', () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== objectExample) {
                checkIsSelected(blockExamples[i]);
                continue;
            }
            checkIsSelected(blockExamples[i], 3);
        }

        scrollIntoView(nonSelectableExample + listItemLink);
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
        expect(getElementClass(pragmaticalyExample + pointContainsSubList)).toContain(
            'is-selected',
            'element with subitems is selected'
        );
        expect(getElementClass(pragmaticalyExample + subListItem)).toContain('is-selected', 'element is not selected');
        expect(getElementClass(pragmaticalyExample + expandArrow)).not.toContain(
            'is-selected',
            'expanded menu is not closed'
        );
        click(selectChildBtn);
        expect(getElementClass(pragmaticalyExample + pointContainsSubList)).not.toContain(
            'is-selected',
            'element with subitems is selected'
        );
        expect(getElementClass(pragmaticalyExample + subListItem)).not.toContain(
            'is-selected',
            'element is not selected'
        );
        click(openBtn);
        expect(getElementClass(pragmaticalyExample + expandArrow)).not.toContain(
            'is-selected',
            'expanded menu is not closed'
        );
    });

    it('should check RTL and LTR orientation', () => {
        sideNavigationPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', () => {
        sideNavigationPage.saveExampleBaselineScreenshot();
        expect(sideNavigationPage.compareWithBaseline()).toBeLessThan(5);
    });

    function checkIsSelected(section: string, i: number = 0, point: string = section + listItemLink): void {
        scrollIntoView(point, i);
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
            expect(getElementClass(section + pointContainsSubList)).toContain(
                'is-selected',
                'element with subitems is not selected'
            );
        }
    }
});
