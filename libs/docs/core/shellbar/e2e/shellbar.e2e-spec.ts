import { ShellbarPo } from './shellbar.po';
import {
    click,
    clickAndMoveElement,
    currentBrowserName,
    doesItExist,
    getAlertText,
    getCurrentUrl,
    getElementArrayLength,
    getElementSize,
    getText,
    goBack,
    isAlertOpen,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('shellbar test suite', () => {
    const shellbarPage = new ShellbarPo();
    const {
        basicExample,
        shellbarAvatar,
        popover,
        popoverMenuItem,
        shellbarLogoLink,
        collapsableExample,
        sizeButtons,
        collapsableShellbar,
        searchbarButton,
        searchField,
        collapsableShellbarTitle,
        searchMenuItem,
        actionButton,
        myAppsButton,
        myApps,
        sideNavExample,
        sideNavItems,
        sideNavIcons,
        sideNavText,
        sideNavControlBtn
    } = shellbarPage;

    beforeAll(() => {
        shellbarPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(shellbarPage.root);
        waitForElDisplayed(shellbarPage.title);
    }, 1);

    describe('Basic example', () => {
        it('should open user actions menu on click', () => {
            scrollIntoView(basicExample);
            click(basicExample + shellbarAvatar);
            waitForElDisplayed(popover);

            expect(isElementDisplayed(popover)).toBe(true, 'popover is not displayed');

            click(basicExample + shellbarAvatar);

            expect(doesItExist(popover)).toBe(false, 'popover is displayed');
        });

        it('should check user action menu items are clickable', () => {
            scrollIntoView(basicExample);
            click(basicExample + shellbarAvatar);
            const menuItemCount = getElementArrayLength(popoverMenuItem);

            for (let i = 0; i < menuItemCount; i++) {
                expect(isElementClickable(popoverMenuItem, i)).toBe(true, `menu item ${i} is not clickable`);
            }
        });

        it('should check logo navigation', () => {
            scrollIntoView(basicExample);

            checkLinkTarget(basicExample + shellbarLogoLink, '/core/home', 'input[type="text"]');
            goBack();
            waitForElDisplayed(shellbarPage.title);
        });
    });

    describe('Links with collapsible menu and product switcher example', () => {
        it('should check the sizes', () => {
            scrollIntoView(collapsableExample);
            click(sizeButtons);
            const smallShellbar = getElementSize(collapsableShellbar);
            click(sizeButtons, 1);
            const mediumShellbar = getElementSize(collapsableShellbar);
            click(sizeButtons, 2);
            const largeShellbar = getElementSize(collapsableShellbar);
            click(sizeButtons, 3);
            const xlShellbar = getElementSize(collapsableShellbar);

            expect(smallShellbar.width).toBeLessThan(mediumShellbar.width);
            expect(mediumShellbar.width).toBeLessThan(largeShellbar.width);
            expect(largeShellbar.width).toBeLessThan(xlShellbar.width);
        });

        it('should check the title dropdown menu', () => {
            scrollIntoView(collapsableExample);
            click(collapsableShellbarTitle);
            waitForElDisplayed(popover);

            expect(isElementDisplayed(popover)).toBe(true, 'title popover is not displayed');
            expect(isElementClickable(popoverMenuItem)).toBe(true, 'popover items not clickable');
        });

        it('should check the searchbar dropdown', () => {
            scrollIntoView(collapsableExample);
            click(searchbarButton);
            waitForElDisplayed(popover);

            expect(isElementDisplayed(popover)).toBe(true, 'search popover is not displayed');
            expect(isElementClickable(searchMenuItem)).toBe(true, 'popover items not clickable');
        });

        it('should check search with text', () => {
            scrollIntoView(collapsableExample);
            click(searchField);
            sendKeys('App');

            expect(isElementDisplayed(popover)).toBe(true, 'search popover is not displayed');
            expect(isElementClickable(searchMenuItem)).toBe(true, 'popover items not clickable');
        });

        it('should check actions', () => {
            scrollIntoView(collapsableExample);
            click(actionButton);

            if (currentBrowserName() === 'chrome') {
                expect(isAlertOpen()).toBe(true, 'action not done');
            }

            if (currentBrowserName() !== 'chrome') {
                expect([null, undefined]).not.toContain(getAlertText());
            }
        });

        it('should check notifications', () => {
            scrollIntoView(collapsableExample);
            click(actionButton, 1);

            if (currentBrowserName() === 'chrome') {
                expect(isAlertOpen()).toBe(true, 'action not done');
            }

            if (currentBrowserName() !== 'chrome') {
                expect([null, undefined]).not.toContain(getAlertText());
            }
        });

        it('should check user action menu', () => {
            scrollIntoView(collapsableExample);
            click(collapsableExample + shellbarAvatar);
            waitForElDisplayed(popover);

            expect(isElementDisplayed(popover)).toBe(true, 'popover not displayed');
            expect(isElementClickable(popoverMenuItem)).toBe(true, 'menu item not clickable');
        });

        it('should check apps menu opens on click', () => {
            openMyApps();

            expect(isElementDisplayed(popover)).toBe(true, 'popover not displayed');
        });

        it('should check app menu items clickable', () => {
            openMyApps();
            const appCount = getElementArrayLength(myApps);

            for (let i = 0; i < appCount; i++) {
                expect(isElementClickable(myApps, i)).toBe(true, `app ${i} is not clickable`);
            }
        });

        it('should drag and drop apps', () => {
            openMyApps();
            const originalCardData = getText(myApps, 4);

            clickAndMoveElement(myApps, 150, 0, 4);

            expect(getText(myApps, 4)).not.toEqual(originalCardData);
        });
    });

    describe('shellbar with sidenavigation example', () => {
        it('should check size nav items clickable', () => {
            scrollIntoView(sideNavExample);
            const navItemCount = getElementArrayLength(sideNavItems);

            for (let i = 0; i < navItemCount; i++) {
                expect(isElementClickable(sideNavItems, i)).toBe(true, `nav item ${i} is not clickable`);
            }
        });

        it('should check ability to collapse side nav', () => {
            scrollIntoView(sideNavExample);

            expect(isElementDisplayed(sideNavText)).toBe(true, 'nav text is not displayed');
            expect(isElementDisplayed(sideNavIcons)).toBe(true, 'nav icon is not displayed');

            click(sideNavControlBtn);

            expect(isElementDisplayed(sideNavText)).toBe(false, 'nav text is displayed');
            expect(isElementDisplayed(sideNavIcons)).toBe(true, 'nav icon is not displayed');
        });
    });

    describe('visual regression and orientation', () => {
        it('should check orientation', () => {
            shellbarPage.checkRtlSwitch();
        });

        xit('should check example block visual regression', () => {
            shellbarPage.saveExampleBaselineScreenshot();
            expect(shellbarPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function openMyApps(): void {
        scrollIntoView(collapsableExample);
        click(myAppsButton);
        waitForElDisplayed(popover);
    }

    function checkLinkTarget(element, site: string, newPageElement): void {
        click(element);
        waitForElDisplayed(newPageElement);
        const newUrl = getCurrentUrl();
        expect(newUrl).toContain(site);
    }
});
