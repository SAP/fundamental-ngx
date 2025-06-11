import {
    checkLtrOrientation,
    checkRtlOrientation,
    click,
    getElementArrayLength,
    getElementSize,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { TablePo } from './table.po';

export const runCommonTests = (allInputFields: string, tablePage: TablePo): void => {
    describe('Check input fields', () => {
        xit('should check input fields does not change width', async () => {
            // TODO - review the test
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
        xit('should check RTL and LTR orientation', async () => {
            // TODO - review the test
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
};
