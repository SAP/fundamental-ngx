import { ActionSheetPo } from '../pages/action-sheet.po';
import {
    click,
    getAttributeByName,
    getElementArrayLength,
    getImageTagBrowserPlatform,
    refreshPage,
    saveElementScreenshot,
    waitForElDisplayed,
    checkElementScreenshot,
    scrollIntoView
} from '../../driver/wdio';
import { checkElArrIsClickable } from '../../helper/assertion-helper';
import { classAttribute, compactValue } from '../fixtures/appData/action-sheet-content';

describe('Action sheet test suite', function() {
    const actionSheetPage = new ActionSheetPo();
    const {
        actionSheetMenuButton,
        actionSheetList,
        actionSheetListItemButtons,
        alertMessage
    } = actionSheetPage;

    beforeAll(() => {
        actionSheetPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(actionSheetMenuButton);
    }, 1);

    it('should check action sheet items are clickable', () => {
        const actionSheetCount = getElementArrayLength(actionSheetMenuButton);

        for (let i = 0; actionSheetCount > i; i++) {
            click(actionSheetMenuButton, i);
            checkElArrIsClickable(actionSheetListItemButtons);
        }
    });

    it('should check comfy and cozy properties', () => {
        click(actionSheetMenuButton);
        expect(getAttributeByName(actionSheetList, classAttribute)).toContain(compactValue);
        click(actionSheetMenuButton, 1);
        expect(getAttributeByName(actionSheetList, classAttribute)).not.toContain(compactValue);
    });

    it('should check alert appears after selection', () => {
        click(actionSheetMenuButton);
        click(actionSheetListItemButtons);
        expect(waitForElDisplayed(alertMessage)).toBe(true);
    });

    it('should check orientation', () => {
        actionSheetPage.checkRtlSwitch();
    });

    it('should check basic visual regression', () => {
        actionSheetPage.saveExampleBaselineScreenshot('action-sheet');
        expect(actionSheetPage.compareWithBaseline('action-sheet')).toBeLessThan(1);
    });

    it('should check action sheet items visual regression', () => {
        const actionSheetCount = getElementArrayLength(actionSheetMenuButton);

        for (let i = 0; actionSheetCount > i; i++) {
            click(actionSheetMenuButton, i);
            scrollIntoView(actionSheetList);
            saveElementScreenshot(actionSheetList, `action-sheet-items-example-${i}-core-${getImageTagBrowserPlatform()}`);
            expect(checkElementScreenshot(actionSheetList, `action-sheet-items-example-${i}-core-${getImageTagBrowserPlatform()}`))
                .toBeLessThan(1);
        }
    });
});
