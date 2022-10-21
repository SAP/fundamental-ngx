import {
    click,
    doesItExist,
    elementDisplayed,
    getAttributeByName,
    getText,
    pause,
    refreshPage,
    scrollIntoView,
    waitForClickable,
    waitForElDisplayed,
    waitForNotDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { DynamicPagePo } from './dynamic-page.po';
import { main_button_title } from './dynamic-page-contents';

describe('Dynamic Page Layout test suite:', () => {
    const dynamicPageLayoutPage = new DynamicPagePo();
    const {
        basicExampleButton,
        dynamicPage,
        dynamicPageCollapsibleHeader,
        dynamicPageCollapseIcon,
        dynamicPageTitle,
        dynamicPageToolBarAccept,
        dynamicPageToolBarReject,
        snapsExampleButton,
        tabbesExampleButton,
        responsiveExampleButton,
        flexibleColumnExampleButton,
        dynamicPageTabs,
        dynamicPageTabsContent,
        disableHeaderCollapseExampleButton,
        dynamicPageContentEnd,
        dynamicPageContentStart,
        openColumnButton,
        columnSectionHeader,
        columnSectionExpandIcon,
        columnSection
    } = dynamicPageLayoutPage;

    beforeAll(async () => {
        await dynamicPageLayoutPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(dynamicPageLayoutPage.root);
        await waitForElDisplayed(dynamicPageLayoutPage.title);
    }, 1);

    it('should check buttons titles', async () => {
        await expect(await getText(basicExampleButton)).toBe(main_button_title);
        await expect(await getText(snapsExampleButton)).toBe(main_button_title);
        await expect(await getText(tabbesExampleButton)).toBe(main_button_title);
        await expect(await getText(responsiveExampleButton)).toBe(main_button_title);
        await expect(await getText(flexibleColumnExampleButton)).toBe(main_button_title);
    });

    describe('Basic', () => {
        it('should verify dynamic page header is collapsible by click on collapse icon', async () => {
            await click(basicExampleButton);
            await waitForElDisplayed(dynamicPage);
            await waitForElDisplayed(dynamicPageCollapsibleHeader);
            await click(dynamicPageCollapseIcon);
            await expect(await waitForNotDisplayed(dynamicPageCollapsibleHeader)).toBe(true);
        });

        it('should verify dynamic page is collapsible by click on header', async () => {
            await click(basicExampleButton);
            await waitForElDisplayed(dynamicPage);
            await waitForElDisplayed(dynamicPageCollapsibleHeader);
            await click(dynamicPageTitle);
            await expect(await elementDisplayed(dynamicPageCollapsibleHeader)).toBe(false);
        });

        it('should verify dynamic page closed on Accept button click', async () => {
            await click(basicExampleButton);
            await waitForElDisplayed(dynamicPage);
            await waitForElDisplayed(dynamicPageCollapsibleHeader);
            await click(dynamicPageToolBarAccept);
            await expect(await doesItExist(dynamicPage)).toBe(false);
        });

        it('should verify dynamic page closed on Reject button click', async () => {
            await click(basicExampleButton);
            await waitForElDisplayed(dynamicPage);
            await waitForElDisplayed(dynamicPageCollapsibleHeader);
            await click(dynamicPageToolBarReject);
            await expect(await doesItExist(dynamicPage)).toBe(false);
        });
    });

    // TODO: Needs to be implemented
    xdescribe('Dynamic Page that snaps on scrolling', () => {
        it('is snaps on scrolling', async () => {
            await click(snapsExampleButton);
            await waitForElDisplayed(dynamicPage);
            await waitForElDisplayed(dynamicPageCollapsibleHeader);

            await expect(await elementDisplayed(dynamicPageCollapsibleHeader)).toBe(false);
            await scrollIntoView(dynamicPageContentStart);
            await expect(await elementDisplayed(dynamicPageCollapsibleHeader)).toBe(true);
            await waitForPresent(dynamicPageContentEnd);
            await scrollIntoView(dynamicPageContentEnd);
            await expect(await elementDisplayed(dynamicPageCollapsibleHeader)).toBe(false);
        });
    });

    describe('Tabbed', () => {
        it('should verify dynamic page is collapsible by click on header', async () => {
            await click(basicExampleButton);
            await waitForElDisplayed(dynamicPage);
            await waitForElDisplayed(dynamicPageCollapsibleHeader);
            await click(dynamicPageTitle);
            await expect(await elementDisplayed(dynamicPageCollapsibleHeader)).toBe(false);
        });

        it('should verify dynamic page header is collapsible by click on collapse icon', async () => {
            await click(tabbesExampleButton);
            await waitForElDisplayed(dynamicPage);
            await waitForElDisplayed(dynamicPageCollapsibleHeader);
            await click(dynamicPageCollapseIcon);
            await expect(await elementDisplayed(dynamicPageCollapsibleHeader)).toBe(false);
        });

        it('should have tab 1 active by default', async () => {
            await click(tabbesExampleButton);
            await waitForElDisplayed(dynamicPage);
            await waitForElDisplayed(dynamicPageTabs);
            const firstTabSelected = await getAttributeByName(dynamicPageTabs, 'aria-selected');
            const secondTabSelected = await getAttributeByName(dynamicPageTabs, 'aria-selected', 1);
            await expect(firstTabSelected).toBe('true');
            await expect(secondTabSelected).toBe('false');
            await expect(await getText(dynamicPageTabsContent)).toContain('tab1');
        });

        it('should switch tab on tab click', async () => {
            await click(tabbesExampleButton);
            await waitForElDisplayed(dynamicPage);
            await waitForElDisplayed(dynamicPageTabs);
            await click(dynamicPageTabs, 1);
            const firstTabSelected = await getAttributeByName(dynamicPageTabs, 'aria-selected');
            const secondTabSelected = await getAttributeByName(dynamicPageTabs, 'aria-selected', 1);

            await expect(firstTabSelected).toBe('false');
            await expect(secondTabSelected).toBe('true');
            await expect(await getText(dynamicPageTabsContent)).toContain('tabs 2');
        });
    });

    describe('Disabled header', () => {
        it('should have no collapse icon present', async () => {
            await click(disableHeaderCollapseExampleButton);
            await waitForElDisplayed(dynamicPage);

            await expect(await doesItExist(dynamicPageCollapseIcon)).toBe(false);
        });

        it('should verify dynamic page is not collapsible by click on header', async () => {
            await click(disableHeaderCollapseExampleButton);
            await waitForElDisplayed(dynamicPage);
            await waitForElDisplayed(dynamicPageCollapsibleHeader);
            await click(dynamicPageTitle);

            await expect(await elementDisplayed(dynamicPageCollapsibleHeader)).toBe(true);
        });
    });

    describe('Flexible Column Layout', () => {
        it('should be able to open the column section', async () => {
            await click(flexibleColumnExampleButton);
            await waitForElDisplayed(openColumnButton);
            await click(openColumnButton);
            await waitForElDisplayed(columnSectionHeader);
        });

        it('should verify dynamic page header is collapsible by click on collapse icon', async () => {
            await click(flexibleColumnExampleButton);
            await waitForElDisplayed(openColumnButton);
            await click(openColumnButton);
            await waitForElDisplayed(columnSectionHeader);
            await pause(500);
            await click(dynamicPageCollapseIcon);
            await pause(500);
            await expect(await waitForNotDisplayed(dynamicPageCollapsibleHeader)).toBe(true);
        });

        // Temporarily disabled. Passes if being run alone, otherwise fails.
        xit('should verify dynamic page is collapsible by click on header', async () => {
            await click(flexibleColumnExampleButton);
            await waitForElDisplayed(openColumnButton);
            await click(openColumnButton);
            await waitForElDisplayed(columnSectionHeader);
            await waitForElDisplayed(dynamicPageTitle);
            await waitForClickable(dynamicPageTitle);
            await waitForElDisplayed(dynamicPageCollapsibleHeader);
            await click(dynamicPageTitle);
            await expect(await elementDisplayed(dynamicPageCollapsibleHeader)).toBe(false);
        });
    });

    describe('Orientation check:', () => {
        it('should check RTL and LTR orientation', async () => {
            await dynamicPageLayoutPage.checkRtlSwitch();
        });
    });
});
