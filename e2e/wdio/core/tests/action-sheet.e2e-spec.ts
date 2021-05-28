import { ActionSheetPo } from '../pages/action-sheet.po';
import {
    addIsActiveClass,
    checkElementScreenshot,
    click,
    getAttributeByName,
    getElementArrayLength, getElementClass,
    getImageTagBrowserPlatform,
    getText,
    mouseHoverElement,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForNotDisplayed
} from '../../driver/wdio';
import { checkElArrIsClickable } from '../../helper/assertion-helper';
import { alertMessages, compactValue } from '../fixtures/appData/action-sheet-content';

describe('Action sheet test suite', function() {
    const actionSheetPage = new ActionSheetPo();
    const {
        actionSheetMenuButton,
        actionSheetList,
        actionSheetListItems,
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
    describe('Check orientation', function() {
        it('should check orientation', () => {
            actionSheetPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check basic visual regression', () => {
            actionSheetPage.saveExampleBaselineScreenshot();
            expect(actionSheetPage.compareWithBaseline()).toBeLessThan(5);
        });

        it('should check action sheet items visual regression', () => {
            const actionSheetCount = getElementArrayLength(actionSheetMenuButton);

            for (let i = 0; actionSheetCount > i; i++) {
                click(actionSheetMenuButton, i);
                scrollIntoView(actionSheetList);
                saveElementScreenshot(actionSheetList,
                    `action-sheet-items-example-${i}-core-${getImageTagBrowserPlatform()}`, actionSheetPage.getScreenshotFolder());
                expect(checkElementScreenshot(actionSheetList,
                    `action-sheet-items-example-${i}-core-${getImageTagBrowserPlatform()}`, actionSheetPage.getScreenshotFolder()))
                    .toBeLessThan(5);
            }
        });

        xit('should check action sheet item focus state', () => {
            const actionSheetCount = getElementArrayLength(actionSheetMenuButton);

            for (let i = 0; actionSheetCount > i; i++) {
                click(actionSheetMenuButton, i);
                const actionSheetItemCount = getElementArrayLength(actionSheetListItems);

                for (let j = 0; actionSheetItemCount > j; j++) {
                    if (i === 2) {
                        sendKeys('Tab');
                        saveElementScreenshot(actionSheetListItems, `action-sheet-item-example-${i}-focus-item-${j}-core-${getImageTagBrowserPlatform()}`, actionSheetPage.getScreenshotFolder(), j);
                        expect(checkElementScreenshot(actionSheetListItems, `action-sheet-item-example-${i}-focus-item-${j}-core-${getImageTagBrowserPlatform()}`, actionSheetPage.getScreenshotFolder(), j))
                            .toBeLessThan(1);
                        continue;
                    }
                    saveElementScreenshot(actionSheetListItems, `action-sheet-item-example-${i}-focus-item-${j}-core-${getImageTagBrowserPlatform()}`, actionSheetPage.getScreenshotFolder(), j);
                    expect(checkElementScreenshot(actionSheetListItems, `action-sheet-item-example-${i}-focus-item-${j}-core-${getImageTagBrowserPlatform()}`, actionSheetPage.getScreenshotFolder(), j))
                        .toBeLessThan(1);
                    sendKeys('Tab');
                }
            }
        });

        xit('should check action sheet item hover state', () => {
            const actionSheetCount = getElementArrayLength(actionSheetMenuButton);

            for (let i = 0; actionSheetCount > i; i++) {
                click(actionSheetMenuButton, i);
                const actionSheetItemCount = getElementArrayLength(actionSheetListItems);

                for (let j = 0; actionSheetItemCount > j; j++) {
                    mouseHoverElement(actionSheetListItems, j);
                    saveElementScreenshot(actionSheetListItems, `action-sheet-item-example-${i}-hover-item-${j}-core-${getImageTagBrowserPlatform()}`, actionSheetPage.getScreenshotFolder(), j);
                    expect(checkElementScreenshot(actionSheetListItems, `action-sheet-item-example-${i}-hover-item-${j}-core-${getImageTagBrowserPlatform()}`, actionSheetPage.getScreenshotFolder(), j))
                        .toBeLessThan(1);
                }
            }
        });

        xit('should check action sheet item active state', () => {
            const actionSheetCount = getElementArrayLength(actionSheetMenuButton);

            for (let i = 0; actionSheetCount > i; i++) {
                click(actionSheetMenuButton, i);
                const actionSheetItemCount = getElementArrayLength(actionSheetListItems);

                for (let j = 0; actionSheetItemCount > j; j++) {
                    addIsActiveClass(actionSheetListItemButtons, j);
                    saveElementScreenshot(actionSheetListItems, `action-sheet-item-example-${i}-active-item-${j}-core-${getImageTagBrowserPlatform()}`, actionSheetPage.getScreenshotFolder(), j);
                    expect(checkElementScreenshot(actionSheetListItems, `action-sheet-item-example-${i}-active-item-${j}-core-${getImageTagBrowserPlatform()}`, actionSheetPage.getScreenshotFolder(), j))
                        .toBeLessThan(1);
                }
            }
        });
    });
});
