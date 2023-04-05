import {
    checkLtrOrientation,
    checkRtlOrientation,
    click,
    getElementArrayLength,
    getElementSize,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed
} from '../../../../../e2e';
import { TablePo } from './table.po';

export const runCommonTests = (allInputFields: string, tablePage: TablePo) => {
    describe('Check input fields', () => {
        it('should check input fields does not change width', async () => {
            const inputFieldLength = await getElementArrayLength(allInputFields);
            for (let i = 0; i < inputFieldLength; i++) {
                if (i === 13) {
                    continue;
                }
                const beforeSize = await getElementSize(allInputFields, i);
                await scrollIntoView(allInputFields, i);
                await click(allInputFields, i);
                await sendKeys('test');
                const afterSize = await getElementSize(allInputFields, i);
                await expect(beforeSize).toEqual(afterSize);
            }
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            const exampleAreaContainersArr = '.fd-doc-component';
            const rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

            const switcherLength = await getElementArrayLength(exampleAreaContainersArr);
            for (let i = 0; i < switcherLength; i++) {
                if (i === 13) {
                    continue;
                }
                await scrollIntoView(rtlSwitcherArr, i);
                await click(rtlSwitcherArr, i);
                await checkRtlOrientation(exampleAreaContainersArr, i);
                await scrollIntoView(rtlSwitcherArr, i);
                await click(rtlSwitcherArr, i);
                await waitForElDisplayed(exampleAreaContainersArr, i);
                await checkLtrOrientation(exampleAreaContainersArr, i);
            }
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await tablePage.saveExampleBaselineScreenshot();
            await expect(await tablePage.compareWithBaseline()).toBeLessThan(5);
        });
    });
};
