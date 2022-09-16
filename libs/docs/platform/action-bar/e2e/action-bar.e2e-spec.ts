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

    beforeAll(() => {
        actionBarPage.open();
    }, 1);

    describe('Main checks', () => {
        it('should check action buttons', () => {
            checkElArrIsClickable(actionBtnArr);
            click(actionBtnArr, 8);
            checkElArrIsClickable(menuItems);
        });

        it('should check back buttons', () => {
            checkElArrIsClickable(backBtnArr);
            click(backBtnArr);
            expect(getAlertText()).toBe(alertMsg);
            acceptAlert();
        });

        it('should check titles and descriptions', () => {
            checkElementTextValue(titles, actionBarTitles);
            checkElementTextValue(descriptions, actionBarDescriptions);
        });

        it('should check overflow menu btn', () => {
            scrollIntoView(actionBtnArr, 8);
            click(actionBtnArr, 8);
            waitForElDisplayed(menuItems);
            click(actionBtnArr, 8);
            expect(menuItems).not.toBeDisplayed();
            click(actionBtnArr, 8);
            click(menuItems);
            expect(menuItems).not.toBeDisplayed();
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', () => {
            actionBarPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            actionBarPage.saveExampleBaselineScreenshot();
            expect(actionBarPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
