import { ProductSwitchPo } from './product-switch.po';
import {
    applyState,
    click,
    clickAndMoveElement,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    isElementDisplayed,
    refreshPage,
    waitForElDisplayed,
    waitForPresent,
    checkElArrIsClickable
} from '../../../../../e2e';
import { emptyDataArr, focusAttribute } from './product-switch-contents';

describe('product switch test suite', () => {
    const productSwitchPage = new ProductSwitchPo();
    const { shellbarButton, shellbarSwitchItems, switchItems } = productSwitchPage;

    beforeAll(() => {
        productSwitchPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(productSwitchPage.root);
        waitForElDisplayed(productSwitchPage.title);
    }, 1);

    describe('shellbar example', () => {
        it('should check ability to open product switch', () => {
            click(shellbarButton);

            expect(isElementDisplayed(shellbarSwitchItems)).toBe(true, 'popover not displayed');
        });

        it('should check items are clickable', () => {
            click(shellbarButton);
            checkElArrIsClickable(shellbarSwitchItems);
        });

        it('should check items are focusable', () => {
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

            clickAndMoveElement(shellbarSwitchItems, 150, 0, 4);

            expect(getText(shellbarSwitchItems, 4)).not.toEqual(originalCardData);
        });
    });

    describe('main checks', () => {
        it('should check items are clickable', () => {
            checkElArrIsClickable(switchItems);
        });

        it('should check items are focusable', () => {
            const itemCount = getElementArrayLength(switchItems);

            for (let i = 0; i < itemCount; i++) {
                applyState('focus', switchItems, i);
                expect(emptyDataArr).not.toContain(getCSSPropertyByName(switchItems, focusAttribute, i).value);
            }
        });
    });

    describe('visual regression and orientation', () => {
        it('should check orientation', () => {
            productSwitchPage.checkRtlSwitch();
        });

        xit('should check examples visual regression', () => {
            productSwitchPage.saveExampleBaselineScreenshot();
            expect(productSwitchPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
