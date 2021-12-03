import { ActionListItemPo } from '../pages/action-list-item.po';
import { checkAttributeValueTrue, checkElementTextValue } from '../../helper/assertion-helper';
import {
    acceptAlert,
    click,
    getAlertText,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    refreshPage,
    waitForPresent
} from '../../driver/wdio';
import { alertTextArr, btnText } from '../fixtures/appData/action-list-item-contents';

describe('Action List Item Test Suite:', () => {
    const actionListPage = new ActionListItemPo();
    const { actionBtns, actionLists, actionSections, cozyItem, compactItem } = actionListPage;

    beforeAll(() => {
        actionListPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(actionBtns);
    }, 1);

    describe('Main checks:', () => {
        it('should check actions on click', () => {
            const actionBtnCount = getElementArrayLength(actionBtns);
            for (let i = 0; actionBtnCount > i; i++) {
                click(actionBtns, i);
                expect(getAlertText()).toBe(alertTextArr[i]);
                acceptAlert();
            }
        });

        it('should check styles', () => {
            checkAttributeValueTrue(actionLists, 'noBorder');
            checkElementTextValue(actionBtns, btnText);
            expect(getElementClass(actionSections, 0)).not.toContain('compact');
            expect(getElementClass(actionSections, 1)).toContain('compact');
        });

        it('should check the sizes compact and cozy', () => {
            const cozySize = getElementSize(cozyItem);
            const compactSize = getElementSize(compactItem);

            expect(cozySize.height).toBeGreaterThan(compactSize.height);
        });
    });

    describe('Orientation check:', () => {
        it('should check RTL and LTR orientation', () => {
            actionListPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            actionListPage.saveExampleBaselineScreenshot();
            expect(actionListPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
