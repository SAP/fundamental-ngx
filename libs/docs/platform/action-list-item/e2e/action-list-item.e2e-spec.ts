import { ActionListItemPo } from './action-list-item.po';
import {
    acceptAlert,
    checkElementTextValue,
    click,
    getAlertText,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { alertTextArr, btnText } from './action-list-item-contents';

describe('Action List Item Test Suite:', () => {
    const actionListPage = new ActionListItemPo();
    const { actionBtns, actionSections, cozyItem, compactItem } = actionListPage;

    beforeAll(() => {
        actionListPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(actionListPage.root);
        waitForElDisplayed(actionListPage.title);
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
