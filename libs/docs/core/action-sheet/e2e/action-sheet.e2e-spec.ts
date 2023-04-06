import { ActionSheetPo } from './action-sheet.po';
import { alertMessages, compactValue } from './action-sheet-content';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    checkElArrIsClickable,
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
    waitForNotDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Action sheet test suite', () => {
    const actionSheetPage = new ActionSheetPo();
    const {
        actionSheetMenuButton,
        actionSheetList,
        actionSheetListItems,
        actionSheetListItemButtons,
        alertMessage,
        actionSheetBodyContainer
    } = actionSheetPage;

    beforeAll(async () => {
        await actionSheetPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(actionSheetPage.root);
        await waitForElDisplayed(actionSheetPage.title);
    }, 1);

    it('should check action sheet items are clickable', async () => {
        const actionSheetCount = await getElementArrayLength(actionSheetMenuButton);

        for (let i = 0; actionSheetCount > i; i++) {
            await click(actionSheetMenuButton, i);
            await checkElArrIsClickable(actionSheetListItemButtons);
        }
    });

    it('should check compact', async () => {
        await click(actionSheetMenuButton, 1);
        await expect(await getElementClass(actionSheetBodyContainer)).toContain(compactValue);
    });

    it('should check alert appears after selection for default action sheet', async () => {
        await checkAlertItems(0);
    });

    it('should check alert appears after selection for compact action sheet', async () => {
        await checkAlertItems(1);
    });
    it('should check alert appears after selection for mobile action sheet', async () => {
        await click(actionSheetMenuButton, 2);
        const actionSheetItemCount = await getElementArrayLength(actionSheetListItems);
        for (let j = 0; actionSheetItemCount > j; j++) {
            if (j > 3) {
                await click(actionSheetListItemButtons, j);
                await click(actionSheetMenuButton, 2);
                continue;
            }
            await click(actionSheetListItemButtons, j);
            await expect(await getText(alertMessage)).toEqual(alertMessages[j]);
            await waitForNotDisplayed(alertMessage);
            await click(actionSheetMenuButton, 2);
        }
    });

    describe('Check orientation', () => {
        it('should check orientation', async () => {
            await actionSheetPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check basic visual regression', async () => {
            await actionSheetPage.saveExampleBaselineScreenshot();
            await expect(await actionSheetPage.compareWithBaseline()).toBeLessThan(5);
        });

        it('should check action sheet items visual regression', async () => {
            const actionSheetCount = await getElementArrayLength(actionSheetMenuButton);

            for (let i = 0; actionSheetCount > i; i++) {
                await click(actionSheetMenuButton, i);
                await scrollIntoView(actionSheetList);
                await saveElementScreenshot(
                    actionSheetList,
                    `action-sheet-items-example-${i}-core-${await getImageTagBrowserPlatform()}`,
                    await actionSheetPage.getScreenshotFolder()
                );
                await expect(
                    await checkElementScreenshot(
                        actionSheetList,
                        `action-sheet-items-example-${i}-core-${await getImageTagBrowserPlatform()}`,
                        await actionSheetPage.getScreenshotFolder()
                    )
                ).toBeLessThan(5);
            }
        });
    });

    async function checkAlertItems(i: number): Promise<void> {
        await click(actionSheetMenuButton, i);
        const actionSheetItemCount = await getElementArrayLength(actionSheetListItems);
        for (let j = 0; actionSheetItemCount > j; j++) {
            if (j === 4) {
                await click(actionSheetListItemButtons, j);
                await click(actionSheetMenuButton, i);
                continue;
            }
            await click(actionSheetListItemButtons, j);
            await expect(await getText(alertMessage)).toEqual(alertMessages[j]);
            await waitForNotDisplayed(alertMessage);
            await click(actionSheetMenuButton, i);
        }
    }
});
