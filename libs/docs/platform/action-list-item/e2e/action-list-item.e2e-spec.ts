import {
    acceptAlert,
    checkElementTextValue,
    click,
    getAlertText,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    refreshPage,
    waitForElDisplayed
} from '../../../../../e2e';
import { alertTextArr, btnText } from './action-list-item-contents';
import { ActionListItemPo } from './action-list-item.po';

describe('Action List Item Test Suite:', () => {
    const actionListPage = new ActionListItemPo();
    const { actionBtns, actionSections, cozyItem, compactItem } = actionListPage;

    beforeAll(async () => {
        await actionListPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await actionListPage.waitForRoot();
        await waitForElDisplayed(actionListPage.title);
    }, 1);

    describe('Main checks:', () => {
        it('should check actions on click', async () => {
            const actionBtnCount = await getElementArrayLength(actionBtns);
            for (let i = 0; actionBtnCount > i; i++) {
                await click(actionBtns, i);
                await expect(await getAlertText()).toBe(alertTextArr[i]);
                await acceptAlert();
            }
        });

        it('should check styles', async () => {
            await checkElementTextValue(actionBtns, btnText);
            await expect(await getElementClass(actionSections, 0)).not.toContain('compact');
            await expect(await getElementClass(actionSections, 1)).toContain('compact');
        });

        it('should check the sizes compact and cozy', async () => {
            const cozySize = await getElementSize(cozyItem);
            const compactSize = await getElementSize(compactItem);

            await expect(cozySize.height).toBeGreaterThan(compactSize.height);
        });
    });

    describe('Orientation check:', () => {
        it('should check RTL and LTR orientation', async () => {
            await actionListPage.checkRtlSwitch();
        });
    });
});
