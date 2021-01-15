import { ActionBarPo } from '../pages/action-bar.po';
import { checkElArrIsClickable, checkElementTextValue } from '../../helper/assertion-helper';
import {
    acceptAlert,
    click,
    getAlertText,
    getCSSPropertyByName,
    mouseHoverElement,
    scrollIntoView,
    waitForElDisplayed
} from '../../driver/wdio';
import ActionBarContent from '../fixtures/appData/action-bar-contents';

describe('Action Bar Test Suite', function() {
    const actionBarPage = new ActionBarPo();

    beforeAll(() => {
        actionBarPage.open();
    }, 1);

    describe('Main checks', function() {
        it('should check action buttons', ()  => {
            mouseHoverElement(actionBarPage.actionBtnArr);
            expect(getCSSPropertyByName(actionBarPage.actionBtnArr, ActionBarContent.hoverColorAttr).value)
                .toContain(ActionBarContent.saveBtnHvrColor);
            mouseHoverElement(actionBarPage.actionBtnArr, 1);
            expect(getCSSPropertyByName(actionBarPage.actionBtnArr, ActionBarContent.hoverColorAttr, 1).value)
                .toContain(ActionBarContent.defaultBtnHvrColor);
            scrollIntoView(actionBarPage.actionBtnArr, 10);
            mouseHoverElement(actionBarPage.actionBtnArr, 10);
            expect(getCSSPropertyByName(actionBarPage.actionBtnArr, ActionBarContent.hoverColorAttr, 10).value)
                .toContain(ActionBarContent.negCancelBtnHvrColor);
            checkElArrIsClickable(actionBarPage.actionBtnArr);
            click(actionBarPage.actionBtnArr, 8);
            checkElArrIsClickable(actionBarPage.menuItems);
        });

        it('should check back buttons', () => {
            checkElArrIsClickable(actionBarPage.backBtnArr);
            click(actionBarPage.backBtnArr);
            expect(getAlertText()).toBe(ActionBarContent.alertMsg);
            acceptAlert();
        });

        it('should check titles and descriptions', () => {
            checkElementTextValue(actionBarPage.titles, ActionBarContent.actionBarTitles);
            checkElementTextValue(actionBarPage.descriptions, ActionBarContent.actionBarDescriptions);
        });

        it('should check overflow menu btn', () => {
            scrollIntoView(actionBarPage.actionBtnArr, 8);
            click(actionBarPage.actionBtnArr, 8);
            waitForElDisplayed(actionBarPage.menuItems);
            click(actionBarPage.actionBtnArr, 8);
            expect(actionBarPage.menuItems).not.toBeDisplayed();
            click(actionBarPage.actionBtnArr, 8);
            click(actionBarPage.menuItems);
            expect(actionBarPage.menuItems).not.toBeDisplayed();
        });
    });

    describe('Check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            actionBarPage.checkRtlSwitch();
        });
    });
});
