import { ActionSheetPo } from '../pages/action-sheet.po';
import {
    checkElementScreenshot,
    click,
    getElementArrayLength,
    getElementClass,
    getImageTagBrowserPlatform,
    getText,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    waitForElDisplayed,
    waitForNotDisplayed
} from '../../driver/wdio';
import { checkElArrIsClickable } from '../../helper/assertion-helper';
import { alertMessages, compactValue } from '../fixtures/appData/action-sheet-content';

describe('Action sheet test suite', () => {
    const actionSheetPage = new ActionSheetPo();
    const { actionSheetMenuButton, actionSheetList, actionSheetListItems, actionSheetListItemButtons, alertMessage } =
        actionSheetPage;

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

    it('should check compact', () => {
        click(actionSheetMenuButton, 1);
        expect(getElementClass(actionSheetListItemButtons)).toContain(compactValue);
    });

    it('should check alert appears after selection', () => {
        const actionSheetCount = getElementArrayLength(actionSheetMenuButton);

        for (let i = 0; actionSheetCount > i; i++) {
            click(actionSheetMenuButton, i);
            const actionSheetItemCount = getElementArrayLength(actionSheetListItems);

            if (i === 2) {
                for (let j = 0; actionSheetItemCount > j; j++) {
                    if (j > 3) {
                        click(actionSheetListItemButtons, j);
                        click(actionSheetMenuButton, i);
                        continue;
                    }
                    click(actionSheetListItemButtons, j);
                    expect(getText(alertMessage)).toEqual(alertMessages[j]);
                    waitForNotDisplayed(alertMessage);
                    click(actionSheetMenuButton, i);
                }
                continue;
            }

            for (let j = 0; actionSheetItemCount > j; j++) {
                if (j === 4) {
                    click(actionSheetListItemButtons, j);
                    click(actionSheetMenuButton, i);
                    continue;
                }
                click(actionSheetListItemButtons, j);
                expect(getText(alertMessage)).toEqual(alertMessages[j]);
                waitForNotDisplayed(alertMessage);
                click(actionSheetMenuButton, i);
            }
        }
    });
    describe('Check orientation', () => {
        it('should check orientation', () => {
            actionSheetPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check basic visual regression', () => {
            actionSheetPage.saveExampleBaselineScreenshot();
            expect(actionSheetPage.compareWithBaseline()).toBeLessThan(5);
        });

        it('should check action sheet items visual regression', () => {
            const actionSheetCount = getElementArrayLength(actionSheetMenuButton);

            for (let i = 0; actionSheetCount > i; i++) {
                click(actionSheetMenuButton, i);
                scrollIntoView(actionSheetList);
                saveElementScreenshot(
                    actionSheetList,
                    `action-sheet-items-example-${i}-core-${getImageTagBrowserPlatform()}`,
                    actionSheetPage.getScreenshotFolder()
                );
                expect(
                    checkElementScreenshot(
                        actionSheetList,
                        `action-sheet-items-example-${i}-core-${getImageTagBrowserPlatform()}`,
                        actionSheetPage.getScreenshotFolder()
                    )
                ).toBeLessThan(5);
            }
        });
    });
});
