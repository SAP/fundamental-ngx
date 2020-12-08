import { webDriver } from '../../driver/wdio';
import { ActionListItemPo } from '../pages/action-list-item.po';
import { checkAttributeValueTrue } from '../../helper/assertion-helper';

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
                webDriver.click(actionListPg.actionBtns, 5000, i);
                webDriver.acceptAlert();
            }
        });

        it('should check styles', () => {
            checkAttributeValueTrue(actionListPg.actionLists, 'noBorder');
            expect(webDriver.getAttributeByName(actionListPg.actionSections, 'ng-reflect-compact', 0)).toBe('false');
            expect(webDriver.getAttributeByName(actionListPg.actionSections, 'ng-reflect-compact', 1)).toBe('true');
        });
    });

    describe('Orientation check:', function() {
        it('should check RTL and LTR orientation', () => {
            const areas = webDriver.elementArray(actionListPg.exampleAreaContainersArr);
            const switchers = webDriver.elementArray(actionListPg.rtlSwitcherArr);
            for (let i = 0; i < areas.length; i++) {
                switchers[i].click();
                expect(webDriver.getAttributeByName(actionListPg.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
                expect(webDriver.getCSSPropertyByName(actionListPg.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
                switchers[i].click();
                expect(webDriver.getAttributeByName(actionListPg.exampleAreaContainersArr, 'dir', i)).toBe('ltr');
                expect(webDriver.getCSSPropertyByName(actionListPg.exampleAreaContainersArr, 'direction', i).value).toBe('ltr');
            }
        });
    });
});
