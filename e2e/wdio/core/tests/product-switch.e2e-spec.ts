import { ProductSwitchPo } from '../pages/product-switch.po';
import {
    applyState,
    click, clickAndMoveElement,
    getCSSPropertyByName,
    getElementArrayLength, getText,
    isElementDisplayed,
    refreshPage,
    waitForElDisplayed
} from '../../driver/wdio';
import { checkElArrIsClickable } from '../../helper/assertion-helper';
import { emptyDataArr, focusAttribute } from '../fixtures/appData/product-switch-contents';

describe('product switch test suite', function() {
    const productSwitchPage = new ProductSwitchPo();
    const {shellbarButton, shellbarSwitchItems, switchItems} = productSwitchPage;

    beforeAll(() => {
        productSwitchPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForElDisplayed(productSwitchPage.title);
    }, 1);

    describe('shellbar example', function() {
        it('should check ability to open product switch', () => {
            click(shellbarButton);

            expect(isElementDisplayed(shellbarSwitchItems)).toBe(true, 'popover not displayed');
        });

        it('should check items are clickable', () => {
            click(shellbarButton);
            checkElArrIsClickable(shellbarSwitchItems);
        });

        it('should check items are focusable', function() {
            click(shellbarButton);
            const itemCount = getElementArrayLength(shellbarSwitchItems);

            for (let i = 0; i < itemCount; i++) {
                applyState('focus', shellbarSwitchItems, i);
                expect(emptyDataArr).not.toContain(getCSSPropertyByName(shellbarSwitchItems, focusAttribute, i).value);
            }
        });

        it('should drag and drop apps', () => {
            click(shellbarButton);
            const originalCardData = getText(shellbarSwitchItems, 4);

            clickAndMoveElement(shellbarSwitchItems, 50, 0, 4);

            expect(getText(shellbarSwitchItems, 4)).not.toEqual(originalCardData);
        });
    });

    describe('main checks', function() {
        it('should check items are clickable', function() {
            checkElArrIsClickable(switchItems);
        });

        it('should check items are focusable', function() {
            const itemCount = getElementArrayLength(switchItems);

            for (let i = 0; i < itemCount; i++) {
                applyState('focus', switchItems, i);
                expect(emptyDataArr).not.toContain(getCSSPropertyByName(switchItems, focusAttribute, i).value);
            }
        });
    });

    describe('visual regression and orientation', function() {
        it('should check orientation', function() {
            productSwitchPage.checkRtlSwitch();
        });

        it('should check examples visual regression', () => {
            productSwitchPage.saveExampleBaselineScreenshot();
            expect(productSwitchPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
