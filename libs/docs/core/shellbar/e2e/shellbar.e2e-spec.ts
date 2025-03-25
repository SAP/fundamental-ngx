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
    waitForElDisplayed
} from '../../../../../e2e';
import { ShellbarPo } from './shellbar.po';

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
        collapsableShellbarTitle,
        actionButton,
        myAppsButton,
        myApps
    } = shellbarPage;

    beforeAll(async () => {
        await shellbarPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await shellbarPage.waitForRoot();
        await waitForElDisplayed(shellbarPage.title);
    }, 1);

    describe('Basic example', () => {
        it('should open user actions menu on click', async () => {
            await scrollIntoView(basicExample);
            await click(basicExample + shellbarAvatar);
            await waitForElDisplayed(popover);

            await expect(await isElementDisplayed(popover)).toBe(true, 'popover is not displayed');

            await click(basicExample + shellbarAvatar);

            await expect(await doesItExist(popover)).toBe(false, 'popover is displayed');
        });

        it('should check user action menu items are clickable', async () => {
            await scrollIntoView(basicExample);
            await click(basicExample + shellbarAvatar);
            const menuItemCount = await getElementArrayLength(popoverMenuItem);

            for (let i = 0; i < menuItemCount; i++) {
                await expect(await isElementClickable(popoverMenuItem, i)).toBe(
                    true,
                    `menu item ${i} is not clickable`
                );
            }
        });

        it('should check logo navigation', async () => {
            await scrollIntoView(basicExample);

            await checkLinkTarget(basicExample + shellbarLogoLink, '/core/home', 'input[type="text"]');
            await goBack();
            await waitForElDisplayed(shellbarPage.title);
        });
    });

    describe('Links with collapsible menu and product switcher example', () => {
        it('should check the sizes', async () => {
            await scrollIntoView(collapsableExample);
            await click(sizeButtons);
            const smallShellbar = await getElementSize(collapsableShellbar);
            await click(sizeButtons, 1);
            const mediumShellbar = await getElementSize(collapsableShellbar);
            await click(sizeButtons, 2);
            const largeShellbar = await getElementSize(collapsableShellbar);
            await click(sizeButtons, 3);
            const xlShellbar = await getElementSize(collapsableShellbar);

            await expect(smallShellbar.width).toBeLessThan(mediumShellbar.width);
            await expect(mediumShellbar.width).toBeLessThan(largeShellbar.width);
            await expect(largeShellbar.width).toBeLessThan(xlShellbar.width);
        });

        it('should check the title dropdown menu', async () => {
            await scrollIntoView(collapsableExample);
            await click(collapsableShellbarTitle);
            await waitForElDisplayed(popover);

            await expect(await isElementDisplayed(popover)).toBe(true, 'title popover is not displayed');
            await expect(await isElementClickable(popoverMenuItem)).toBe(true, 'popover items not clickable');
        });

        it('should check actions', async () => {
            await scrollIntoView(collapsableExample);
            await click(actionButton);

            if ((await currentBrowserName()) === 'chrome') {
                await expect(await isAlertOpen()).toBe(true, 'action not done');
            }

            if ((await currentBrowserName()) !== 'chrome') {
                await expect([null, undefined]).not.toContain((await getAlertText()) as any);
            }
        });

        it('should check notifications', async () => {
            await scrollIntoView(collapsableExample);
            await click(actionButton, 1);

            if ((await currentBrowserName()) === 'chrome') {
                await expect(await isAlertOpen()).toBe(true, 'action not done');
            }

            if ((await currentBrowserName()) !== 'chrome') {
                await expect([null, undefined]).not.toContain((await getAlertText()) as any);
            }
        });

        it('should check user action menu', async () => {
            await scrollIntoView(collapsableExample);
            await click(collapsableExample + shellbarAvatar);
            await waitForElDisplayed(popover);

            await expect(await isElementDisplayed(popover)).toBe(true, 'popover not displayed');
            await expect(await isElementClickable(popoverMenuItem)).toBe(true, 'menu item not clickable');
        });

        it('should check apps menu opens on click', async () => {
            await openMyApps();

            await expect(await isElementDisplayed(popover)).toBe(true, 'popover not displayed');
        });

        it('should check app menu items clickable', async () => {
            await openMyApps();
            const appCount = await getElementArrayLength(myApps);

            for (let i = 0; i < appCount; i++) {
                await expect(await isElementClickable(myApps, i)).toBe(true, `app ${i} is not clickable`);
            }
        });

        it('should drag and drop apps', async () => {
            await openMyApps();
            const originalCardData = await getText(myApps, 4);

            await clickAndMoveElement(myApps, 150, 0, 4);

            await expect(await getText(myApps, 4)).not.toEqual(originalCardData);
        });
    });

    describe('visual regression and orientation', () => {
        it('should check orientation', async () => {
            await shellbarPage.checkRtlSwitch();
        });
    });

    async function openMyApps(): Promise<void> {
        await scrollIntoView(collapsableExample);
        await click(myAppsButton);
        await waitForElDisplayed(popover);
    }

    async function checkLinkTarget(element, site: string, newPageElement): Promise<void> {
        await click(element);
        await waitForElDisplayed(newPageElement);
        const newUrl = await getCurrentUrl();
        await expect(newUrl).toContain(site);
    }
});
