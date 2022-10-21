import { ProductSwitchPo } from './product-switch.po';
import {
    applyState,
    click,
    clickAndMoveElement,
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

    beforeAll(async () => {
        await productSwitchPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(productSwitchPage.root);
        await waitForElDisplayed(productSwitchPage.title);
    }, 1);

    describe('shellbar example', () => {
        it('should check ability to open product switch', async () => {
            await click(shellbarButton);

            await expect(await isElementDisplayed(shellbarSwitchItems)).toBe(true, 'popover not displayed');
        });

        it('should check items are clickable', async () => {
            await click(shellbarButton);
            await checkElArrIsClickable(shellbarSwitchItems);
        });

        it('should drag and drop apps', async () => {
            await click(shellbarButton);
            const originalCardData = await getText(shellbarSwitchItems, 4);

            await clickAndMoveElement(shellbarSwitchItems, 150, 0, 4);

            await expect(await getText(shellbarSwitchItems, 4)).not.toEqual(originalCardData);
        });
    });

    describe('main checks', () => {
        it('should check items are clickable', async () => {
            await checkElArrIsClickable(switchItems);
        });
    });

    describe('visual regression and orientation', () => {
        it('should check orientation', async () => {
            await productSwitchPage.checkRtlSwitch();
        });

        xit('should check examples visual regression', async () => {
            await productSwitchPage.saveExampleBaselineScreenshot();
            await expect(await productSwitchPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
