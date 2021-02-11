import { ActionListItemPo } from '../pages/action-list-item.po';
import { checkAttributeValueTrue, checkElementTextValue } from '../../helper/assertion-helper';
import { acceptAlert, click, getAttributeByName, getElementArrayLength, refreshPage, waitForPresent } from '../../driver/wdio';
import {btnText} from '../fixtures/appData/action-list-item-contents';

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
            checkElementTextValue(actionListPg.actionBtns, btnText);
            expect(getAttributeByName(actionListPg.actionSections, 'ng-reflect-compact', 0)).toBe('false');
            expect(getAttributeByName(actionListPg.actionSections, 'ng-reflect-compact', 1)).toBe('true');
        });
    });

    describe('Orientation check:', function() {
        it('should check RTL and LTR orientation', () => {
            actionListPg.checkRtlSwitch(actionListPg.rtlSwitcherArr, actionListPg.exampleAreaContainersArr);
        });
    });
});
