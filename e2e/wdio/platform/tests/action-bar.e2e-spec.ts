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
import { saveBtnHvrColor,
    defaultBtnHvrColor,
    negCancelBtnHvrColor,
    hoverColorAttr,
    alertMsg,
    actionBarTitles,
    actionBarDescriptions} from '../fixtures/appData/action-bar-contents';

describe('Action Bar Test Suite', function() {
    const actionBarPage = new ActionBarPo();
    const {
        menuItems,
        actionBtnArr,
        backBtnArr,
        descriptions,
        titles
    } = new ActionBarPo();

    beforeAll(() => {
        actionBarPage.open();
    }, 1);

    describe('Main checks', function() {
        it('should check action buttons', ()  => {
            mouseHoverElement(actionBtnArr);
            expect(getCSSPropertyByName(actionBtnArr, hoverColorAttr).value).toContain(saveBtnHvrColor);
            mouseHoverElement(actionBtnArr, 1);
            expect(getCSSPropertyByName(actionBtnArr, hoverColorAttr, 1).value).toContain(defaultBtnHvrColor);
            scrollIntoView(actionBtnArr, 10);
            mouseHoverElement(actionBtnArr, 10);
            expect(getCSSPropertyByName(actionBtnArr, hoverColorAttr, 10).value).toContain(negCancelBtnHvrColor);
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

    describe('Check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            actionBarPage.checkRtlSwitch();
        });
    });
});
