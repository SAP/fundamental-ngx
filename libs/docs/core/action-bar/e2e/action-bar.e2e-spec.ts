import { checkElArrIsClickable, click, doesItExist, isElementDisplayed, waitForElDisplayed } from '../../../../../e2e';
import { backButton } from './action-bar-contents';
import { ActionBarPo } from './action-bar.po';

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

        it('should check that list items are clickable', async () => {
            await click(actionBarPage.actionBarContextualMenuButton);
            await checkElArrIsClickable(actionBarPage.actionBarContextualMenuOptionListItem);
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await actionBarPage.checkRtlSwitch();
        });
    });
});
