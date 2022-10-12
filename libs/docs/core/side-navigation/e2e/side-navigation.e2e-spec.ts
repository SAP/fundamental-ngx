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

    beforeAll(async () => {
        await sideNavigationPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(sideNavigationPage.root);
        await waitForElDisplayed(sideNavigationPage.title);
    }, 1);

    it('should check list item select', async () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== objectExample) {
                await checkIsSelected(blockExamples[i]);
                continue;
            }
            await checkIsSelected(blockExamples[i], 3);
        }

        await scrollIntoView(nonSelectableExample + listItemLink);
        await click(nonSelectableExample + listItemLink);
        await expect(await getElementClass(nonSelectableExample + listItemLink)).not.toContain(
            'is-selected',
            'item is selected'
        );
    });

    it('should check that items in expanded list choosing correct', async () => {
        await checkExpandListIsWorking(condensedObjectExample);
        await checkExpandListIsWorking(condensedExample);
    });
    it('should check that items in multiple levels list choosing correct', async () => {
        await checkMultipleLevels(threeLevelsExample);
        await checkMultipleLevels(iconsExample);
        await checkMultipleLevels(objectExample);
    });

    it('should check work buttons "select child" & "open"', async () => {
        await expect(await getElementClass(pragmaticalyExample + pointContainsSubList)).toContain(
            'is-selected',
            'element with subitems is selected'
        );
        await expect(await getElementClass(pragmaticalyExample + subListItem)).toContain(
            'is-selected',
            'element is not selected'
        );
        await expect(await getElementClass(pragmaticalyExample + expandArrow)).not.toContain(
            'is-selected',
            'expanded menu is not closed'
        );
        await click(selectChildBtn);
        await expect(await getElementClass(pragmaticalyExample + pointContainsSubList)).not.toContain(
            'is-selected',
            'element with subitems is selected'
        );
        await expect(await getElementClass(pragmaticalyExample + subListItem)).not.toContain(
            'is-selected',
            'element is not selected'
        );
        await click(openBtn);
        await expect(await getElementClass(pragmaticalyExample + expandArrow)).not.toContain(
            'is-selected',
            'expanded menu is not closed'
        );
    });

    it('should check RTL and LTR orientation', async () => {
        await sideNavigationPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', async () => {
        await sideNavigationPage.saveExampleBaselineScreenshot();
        await expect(await sideNavigationPage.compareWithBaseline()).toBeLessThan(5);
    });

    async function checkIsSelected(
        section: string,
        i: number = 0,
        point: string = section + listItemLink
    ): Promise<void> {
        await scrollIntoView(point, i);
        await click(point, i);
        await expect(await getElementClass(point, i)).toContain('is-selected', 'element is not selected');
    }

    async function checkExpandListIsWorking(section: string, point: string = section + listItemLink): Promise<void> {
        await click(point, 2);
        await expect(await isElementDisplayed(expandList)).toBe(true, 'expanded list is not displayed');
        const listLength = await getElementArrayLength(expandListExample + listItem);
        for (let i = 0; i < listLength; i++) {
            await click(expandListExample + listItem, i);
            await expect(await getElementClass(expandedListPoint, i)).toContain(
                'is-selected',
                'element is not selected'
            );
        }
    }

    async function checkMultipleLevels(section: string): Promise<void> {
        if (section !== objectExample) {
            await click(section + expandArrow);
        }
        await expect(await isElementDisplayed(subList)).toBe(true, 'expanded list is not displayed');
        const listLength = await getElementArrayLength(section + subListItem);
        for (let i = 0; i < listLength; i++) {
            await click(section + subListItem, i);
            await expect(await getElementClass(section + subListItem, i)).toContain(
                'is-selected',
                'element is not selected'
            );
            await expect(await getElementClass(section + pointContainsSubList)).toContain(
                'is-selected',
                'element with subitems is not selected'
            );
        }
    }
});
