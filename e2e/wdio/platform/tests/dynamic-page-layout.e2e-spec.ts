import {
    click,
    doesItExist,
    elementDisplayed,
    getAttributeByName,
    getCSSPropertyByName,
    getText,
    pause,
    refreshPage,
    scrollIntoView,
    waitForClickable,
    waitForElDisplayed,
    waitForNotDisplayed,
    waitForPresent
} from '../../driver/wdio';
import { DynamicPageLayoutPo } from '../pages/dynamic-page-layout.po';
import { main_button_title } from '../fixtures/appData/dynamic-page-layout-contents';

describe('Dynamic Page Layout test suite:', () => {
    const dynamicPageLayoutPage = new DynamicPageLayoutPo();
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

    beforeAll(() => {
        dynamicPageLayoutPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(dynamicPageLayoutPage.root);
        waitForElDisplayed(dynamicPageLayoutPage.title);
    }, 1);

    it('should check buttons titles', () => {
        expect(getText(basicExampleButton)).toBe(main_button_title);
        expect(getText(snapsExampleButton)).toBe(main_button_title);
        expect(getText(tabbesExampleButton)).toBe(main_button_title);
        expect(getText(responsiveExampleButton)).toBe(main_button_title);
        expect(getText(flexibleColumnExampleButton)).toBe(main_button_title);
    });

    describe('Basic', () => {
        it('should verify dynamic page header is collapsible by click on collapse icon', () => {
            click(basicExampleButton);
            waitForElDisplayed(dynamicPage);
            waitForElDisplayed(dynamicPageCollapsibleHeader);
            click(dynamicPageCollapseIcon);
            expect(waitForNotDisplayed(dynamicPageCollapsibleHeader)).toBe(true);
        });

        it('should verify dynamic page is collapsible by click on header', () => {
            click(basicExampleButton);
            waitForElDisplayed(dynamicPage);
            waitForElDisplayed(dynamicPageCollapsibleHeader);
            click(dynamicPageTitle);
            expect(waitForNotDisplayed(dynamicPageCollapsibleHeader)).toBe(true);
        });

        it('should verify dynamic page closed on Accept button click', () => {
            click(basicExampleButton);
            waitForElDisplayed(dynamicPage);
            waitForElDisplayed(dynamicPageCollapsibleHeader);
            click(dynamicPageToolBarAccept);
            expect(doesItExist(dynamicPage)).toBe(false);
        });

        it('should verify dynamic page closed on Reject button click', () => {
            click(basicExampleButton);
            waitForElDisplayed(dynamicPage);
            waitForElDisplayed(dynamicPageCollapsibleHeader);
            click(dynamicPageToolBarReject);
            expect(doesItExist(dynamicPage)).toBe(false);
        });
    });

    // TODO: Needs to be implemented
    xdescribe('Dynamic Page that snaps on scrolling', () => {
        it('is snaps on scrolling', () => {
            click(snapsExampleButton);
            waitForElDisplayed(dynamicPage);
            waitForElDisplayed(dynamicPageCollapsibleHeader);

            expect(elementDisplayed(dynamicPageCollapsibleHeader)).toBe(false);
            scrollIntoView(dynamicPageContentStart);
            expect(elementDisplayed(dynamicPageCollapsibleHeader)).toBe(true);
            waitForPresent(dynamicPageContentEnd);
            scrollIntoView(dynamicPageContentEnd);
            expect(elementDisplayed(dynamicPageCollapsibleHeader)).toBe(false);
        });
    });

    describe('Tabbed', () => {
        it('should verify dynamic page is collapsible by click on header', () => {
            click(basicExampleButton);
            waitForElDisplayed(dynamicPage);
            waitForElDisplayed(dynamicPageCollapsibleHeader);
            click(dynamicPageTitle);
            expect(elementDisplayed(dynamicPageCollapsibleHeader)).toBe(false);
        });

        it('should verify dynamic page header is collapsible by click on collapse icon', () => {
            click(tabbesExampleButton);
            waitForElDisplayed(dynamicPage);
            waitForElDisplayed(dynamicPageCollapsibleHeader);
            click(dynamicPageCollapseIcon);
            expect(elementDisplayed(dynamicPageCollapsibleHeader)).toBe(false);
        });

        it('should have tab 1 active by default', () => {
            click(tabbesExampleButton);
            waitForElDisplayed(dynamicPage);
            waitForElDisplayed(dynamicPageTabs);
            const firstTabSelected = getAttributeByName(dynamicPageTabs, 'aria-selected');
            const secondTabSelected = getAttributeByName(dynamicPageTabs, 'aria-selected', 1);
            expect(firstTabSelected).toBe('true');
            expect(secondTabSelected).toBe('false');
            expect(getText(dynamicPageTabsContent)).toContain('tab1');
        });

        it('should switch tab on tab click', () => {
            click(tabbesExampleButton);
            waitForElDisplayed(dynamicPage);
            waitForElDisplayed(dynamicPageTabs);
            click(dynamicPageTabs, 1);
            const firstTabSelected = getAttributeByName(dynamicPageTabs, 'aria-selected');
            const secondTabSelected = getAttributeByName(dynamicPageTabs, 'aria-selected', 1);

            expect(firstTabSelected).toBe('false');
            expect(secondTabSelected).toBe('true');
            expect(getText(dynamicPageTabsContent)).toContain('tabs 2');
        });
    });

    describe('Disabled header', () => {
        it('should have no collapse icon present', () => {
            click(disableHeaderCollapseExampleButton);
            waitForElDisplayed(dynamicPage);

            expect(doesItExist(dynamicPageCollapseIcon)).toBe(false);
        });

        it('should verify dynamic page is not collapsible by click on header', () => {
            click(disableHeaderCollapseExampleButton);
            waitForElDisplayed(dynamicPage);
            waitForElDisplayed(dynamicPageCollapsibleHeader);
            click(dynamicPageTitle);

            expect(elementDisplayed(dynamicPageCollapsibleHeader)).toBe(true);
        });
    });

    describe('Flexible Column Layout', () => {
        it('should be able to open the column section', () => {
            click(flexibleColumnExampleButton);
            waitForElDisplayed(openColumnButton);
            click(openColumnButton);
            waitForElDisplayed(columnSectionHeader);
        });

        it('should verify dynamic page header is collapsible by click on collapse icon', () => {
            click(flexibleColumnExampleButton);
            waitForElDisplayed(openColumnButton);
            click(openColumnButton);
            waitForElDisplayed(columnSectionHeader);
            pause(500);
            click(dynamicPageCollapseIcon);
            pause(500);
            expect(waitForNotDisplayed(dynamicPageCollapsibleHeader)).toBe(true);
        });

        it('should verify dynamic page is collapsible by click on header', () => {
            click(flexibleColumnExampleButton);
            waitForElDisplayed(openColumnButton);
            click(openColumnButton);
            waitForElDisplayed(columnSectionHeader);
            waitForElDisplayed(dynamicPageTitle);
            waitForClickable(dynamicPageTitle);
            waitForElDisplayed(dynamicPageCollapsibleHeader);
            click(dynamicPageTitle);
            expect(elementDisplayed(dynamicPageCollapsibleHeader)).toBe(false);
        });

        it('should verify section is expand on expand icon clicks', () => {
            click(flexibleColumnExampleButton);
            waitForElDisplayed(openColumnButton);
            click(openColumnButton);
            waitForElDisplayed(columnSection);
            const sectionWidthBefore = getCSSPropertyByName(columnSection, 'width');
            waitForElDisplayed(columnSectionExpandIcon);
            waitForClickable(columnSectionExpandIcon);
            click(columnSectionExpandIcon);
            const sectionWidthAfter = getCSSPropertyByName(columnSection, 'width');
            expect(sectionWidthBefore > sectionWidthAfter).toBe(false);
        });
    });

    describe('Orientation check:', () => {
        it('should check RTL and LTR orientation', () => {
            dynamicPageLayoutPage.checkRtlSwitch();
        });
    });
});
