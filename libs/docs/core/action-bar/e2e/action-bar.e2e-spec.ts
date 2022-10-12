import { ActionBarPo } from './action-bar.po';
import { backButton } from './action-bar-contents';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    checkElArrIsClickable,
    click,
    doesItExist,
    isElementDisplayed,
    refreshPage,
    waitForElDisplayed
} from '../../../../../e2e';

describe('Action Bar Test Suite', () => {
    const actionBarPage = new ActionBarPo();

    beforeAll(async () => {
        await actionBarPage.open();
        await waitForElDisplayed(actionBarPage.actionBarBackButtonBackButton);
    }, 1);

    describe('Action bar back example', () => {
        it('should check that all buttons are clickable', async () => {
            await checkElArrIsClickable(actionBarPage.actionBarBackButton + actionBarPage.button);
        });
    });

    describe('Action bar long page title example', () => {
        it('should check that all buttons are clickable', async () => {
            await checkElArrIsClickable(actionBarPage.actionBarLongPageTitle + actionBarPage.button);
        });
    });

    describe('Action bar no back button example', () => {
        it('should check that all buttons are clickable', async () => {
            await checkElArrIsClickable(actionBarPage.actionBarContextualMenu + actionBarPage.button);
        });

        it('should check that no back button in example', async () => {
            await expect(await doesItExist(actionBarPage.actionBarNoBackButton + backButton)).toBe(false);
        });
    });

    describe('Action bar contextual menu example', () => {
        it('should check that all buttons are clickable', async () => {
            await checkElArrIsClickable(actionBarPage.actionBarNoBackButton + actionBarPage.button);
        });

        it('should check expanding menu', async () => {
            await click(actionBarPage.actionBarContextualMenuButton);
            await expect(await isElementDisplayed(actionBarPage.actionBarContextualMenuOptionList)).toBe(true);
        });

        xit('should check closing expanded menu', async () => {
            await refreshPage();
            await waitForElDisplayed(actionBarPage.title);
            await click(actionBarPage.actionBarContextualMenuButton);
            // click second time to close menu
            await click(actionBarPage.actionBarContextualMenuButton);
            await expect(await doesItExist(actionBarPage.actionBarContextualMenuOptionList)).toBe(false);
        });

        it('should check that list items are clickable', async () => {
            await click(actionBarPage.actionBarContextualMenuButton);
            await checkElArrIsClickable(actionBarPage.actionBarContextualMenuOptionListItem);
        });
    });

    xdescribe('Action bar mobile view example', () => {
        it('should check that all buttons are clickable', async () => {
            await checkElArrIsClickable(actionBarPage.actionBarMobileView + actionBarPage.button);
        });

        it('should check expanding menu', async () => {
            await refreshPage();
            await waitForElDisplayed(actionBarPage.title);
            await click(actionBarPage.actionBarMobileViewMenuButton);
            await expect(await isElementDisplayed(actionBarPage.actionBarMobileViewOptionList)).toBe(true);
        });

        it('should check closing expanded menu', async () => {
            await refreshPage();
            await waitForElDisplayed(actionBarPage.title);
            await click(actionBarPage.actionBarMobileViewMenuButton);
            // click second time to close menu
            await click(actionBarPage.actionBarMobileViewMenuButton);
            await expect(await doesItExist(actionBarPage.actionBarMobileViewOptionList)).toBe(false);
        });

        it('should check that list items are clickable', async () => {
            await click(actionBarPage.actionBarMobileViewMenuButton);
            await checkElArrIsClickable(actionBarPage.actionBarMobileViewOptionListItem);
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await actionBarPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression basic', () => {
        it('should check examples visual regression', async () => {
            await actionBarPage.saveExampleBaselineScreenshot();
            await expect(await actionBarPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
