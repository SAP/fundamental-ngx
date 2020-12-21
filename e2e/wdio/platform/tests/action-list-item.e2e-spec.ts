import { webDriver } from '../../driver/wdio';
import { ActionListItemPo } from '../pages/action-list-item.po';
import { checkAttributeValueTrue, checkElementTextValue } from '../../helper/assertion-helper';
import ActionData from '../fixtures/appData/action-list-item-contents'

describe('Action List Item Test Suite:', function() {
    const actionListPg = new ActionListItemPo();

    beforeAll(() => {
        actionListPg.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    describe('Main checks:', function() {
        it('should check actions on click', () => {
            const actionBtnCount = webDriver.getElementArrayLength(actionListPg.actionBtns);
            for (let i = 0; actionBtnCount > i; i++) {
                webDriver.click(actionListPg.actionBtns, i);
                webDriver.acceptAlert();
            }
        });

        it('should check styles', () => {
            checkAttributeValueTrue(actionListPg.actionLists, 'noBorder');
            checkElementTextValue(actionListPg.actionBtns, ActionData.btnText);
            expect(webDriver.getAttributeByName(actionListPg.actionSections, 'ng-reflect-compact', 0)).toBe('false');
            expect(webDriver.getAttributeByName(actionListPg.actionSections, 'ng-reflect-compact', 1)).toBe('true');
        });
    });

    describe('Orientation check:', function() {
        it('should check RTL and LTR orientation', () => {
            actionListPg.checkRtlSwitch(actionListPg.rtlSwitcherArr, actionListPg.exampleAreaContainersArr);
        });
    });
});
