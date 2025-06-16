import {
    checkElArrIsClickable,
    click,
    getElementArrayLength,
    getElementClass,
    getText,
    refreshPage,
    waitForElDisplayed,
    waitForNotDisplayed
} from '@fundamental-ngx/e2e';
import { alertMessages, compactValue } from './action-sheet-content';
import { ActionSheetPo } from './action-sheet.po';

describe('Action sheet test suite', () => {
    const actionSheetPage = new ActionSheetPo();
    const {
        actionSheetMenuButton,
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
        await actionSheetPage.waitForRoot();
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
});
