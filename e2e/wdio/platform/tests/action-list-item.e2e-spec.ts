import { ActionListItemPo } from '../pages/action-list-item.po';
import { checkAttributeValueTrue, checkElementTextValue } from '../../helper/assertion-helper';
import ActionData from '../fixtures/appData/action-list-item-contents';
import { acceptAlert, click, getAttributeByName, getElementArrayLength, refreshPage, waitForPresent } from '../../driver/wdio';

describe('Action List Item Test Suite:', function() {
    const actionListPg = new ActionListItemPo();

    beforeAll(() => {
        actionListPg.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(actionListPg.actionBtns);
    }, 1);

    describe('Main checks:', function() {
        it('should check actions on click', () => {
            const actionBtnCount = getElementArrayLength(actionListPg.actionBtns);
            for (let i = 0; actionBtnCount > i; i++) {
                click(actionListPg.actionBtns, i);
                acceptAlert();
            }
        });

        it('should check styles', () => {
            checkAttributeValueTrue(actionListPg.actionLists, 'noBorder');
            checkElementTextValue(actionListPg.actionBtns, ActionData.btnText);
            expect(getAttributeByName(actionListPg.actionSections, 'ng-reflect-compact', 0)).toBe('false');
            expect(getAttributeByName(actionListPg.actionSections, 'ng-reflect-compact', 1)).toBe('true');
        });
    });

    describe('Orientation check:', function() {
        it('should check RTL and LTR orientation', () => {
            actionListPg.checkRtlSwitch(actionListPg.rtlSwitcherArr, actionListPg.exampleAreaContainersArr);
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            actionListPg.saveExampleBaselineScreenshot('action-list-item');
            expect(actionListPg.compareWithBaseline('action-list-item')).toBeLessThan(1);
        });
    });
});
