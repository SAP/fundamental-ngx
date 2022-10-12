import { ActionBarPo } from './action-bar.po';
import {
    acceptAlert,
    checkElArrIsClickable,
    checkElementTextValue,
    click,
    getAlertText,
    scrollIntoView,
    waitForElDisplayed
} from '../../../../../e2e';
import { actionBarDescriptions, actionBarTitles, alertMsg } from './action-bar-contents';

describe('Action Bar Test Suite', () => {
    const actionBarPage = new ActionBarPo();
    const { menuItems, actionBtnArr, backBtnArr, descriptions, titles } = new ActionBarPo();

    beforeAll(async () => {
        await actionBarPage.open();
    }, 1);

    describe('Main checks', () => {
        it('should check action buttons', async () => {
            await checkElArrIsClickable(actionBtnArr);
            await click(actionBtnArr, 8);
            await checkElArrIsClickable(menuItems);
        });

        it('should check back buttons', async () => {
            await checkElArrIsClickable(backBtnArr);
            await click(backBtnArr);
            await expect(await getAlertText()).toBe(alertMsg);
            await acceptAlert();
        });

        it('should check titles and descriptions', async () => {
            await checkElementTextValue(titles, actionBarTitles);
            await checkElementTextValue(descriptions, actionBarDescriptions);
        });

        it('should check overflow menu btn', async () => {
            await scrollIntoView(actionBtnArr, 8);
            await click(actionBtnArr, 8);
            await waitForElDisplayed(menuItems);
            await click(actionBtnArr, 8);
            let isDisplayed = await $(menuItems).isDisplayed();
            await expect(isDisplayed).toBeFalsy();
            await click(actionBtnArr, 8);
            await click(menuItems);
            isDisplayed = await $(menuItems).isDisplayed();
            await expect(isDisplayed).toBeFalsy();
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await actionBarPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await actionBarPage.saveExampleBaselineScreenshot();
            await expect(await actionBarPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
