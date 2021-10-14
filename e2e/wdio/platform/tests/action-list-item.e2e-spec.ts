import { ActionListItemPo } from '../pages/action-list-item.po';
import { checkAttributeValueTrue, checkElementTextValue } from '../../helper/assertion-helper';
import { acceptAlert, click, getElementArrayLength, getElementClass, refreshPage, waitForPresent } from '../../driver/wdio';
import {btnText} from '../fixtures/appData/action-list-item-contents';

describe('Action List Item Test Suite:', function() {
    const actionListPage = new ActionListItemPo();
    const {
        actionBtns,
        actionLists,
        actionSections
    } = actionListPage;

    beforeAll(() => {
        actionListPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(actionBtns);
    }, 1);

    describe('Main checks:', function() {
        it('should check actions on click', () => {
            const actionBtnCount = getElementArrayLength(actionBtns);
            for (let i = 0; actionBtnCount > i; i++) {
                click(actionBtns, i);
                acceptAlert();
            }
        });

        it('should check styles', () => {
            checkAttributeValueTrue(actionLists, 'noBorder');
            checkElementTextValue(actionBtns, btnText);
            expect(getElementClass(actionSections, 0)).not.toContain('compact');
            expect(getElementClass(actionSections, 1)).toContain('compact');
        });
    });

    describe('Orientation check:', function() {
        it('should check RTL and LTR orientation', () => {
            actionListPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            actionListPage.saveExampleBaselineScreenshot();
            expect(actionListPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
