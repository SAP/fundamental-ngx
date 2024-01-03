import {
    checkSelectorExists,
    checkSelectorSupported,
    click,
    defaultWaitTime,
    elementArray,
    open,
    pause,
    scrollIntoView,
    waitForPresent
} from './driver/wdio';
import { checkLtrOrientation, checkRtlOrientation } from './helper/assertion-helper';

export class BtpBaseComponentPo {
    title = 'header .header';
    root = '#page-content';
    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    async checkRtlSwitch(
        switchers: string = this.rtlSwitcherArr,
        areas: string = this.exampleAreaContainersArr
    ): Promise<void> {
        const areasArray = await elementArray(areas);
        for (let i = 0; i < areasArray.length; i++) {
            await scrollIntoView(switchers, i);
            await click(switchers, i);
            await checkRtlOrientation(areas, i);
            await scrollIntoView(switchers, i);
            await click(switchers, i);
            await checkLtrOrientation(areas, i);
        }
    }

    async waitForRoot(): Promise<void> {
        try {
            await browser.dismissAlert();
        } catch {}
        await browser.waitUntil(
            async () => {
                const state = await browser.execute(() => document.readyState);
                return state === 'complete';
            },
            {
                timeout: defaultWaitTime(),
                timeoutMsg: 'Oops! Check your internet connection'
            }
        );

        await this.checkPageLoaded();

        await waitForPresent(this.root);
    }

    async checkPageLoaded(iteration = 0): Promise<void> {
        if (!(await checkSelectorSupported(this.root)) && iteration < 2) {
            await pause(500);
            this.checkPageLoaded(iteration++);
        } else if (iteration > 2) {
            await checkSelectorExists(this.root);
        }
    }

    async open(url: string): Promise<void> {
        return open('#/btp' + url);
    }
}
