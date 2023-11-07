import {
    checkElementScreenshot,
    checkSelectorExists,
    checkSelectorSupported,
    click,
    defaultWaitTime,
    elementArray,
    getImageTagBrowserPlatform,
    open,
    pause,
    saveElementScreenshot,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from './driver/wdio';
import { checkLtrOrientation, checkRtlOrientation } from './helper/assertion-helper';

export class PlatformBaseComponentPo {
    title = 'header .header';
    root = '#page-content';
    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';
    defaultScreenshotFolder = '/e2e/wdio/baselineScreenshot/platform';

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
            await waitForElDisplayed(areas, i);
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

    async saveExampleBaselineScreenshot(specName: string, options: Record<string, any> = {}): Promise<void> {
        const areasArray = await elementArray(this.exampleAreaContainersArr);
        for (let i = 0; i < areasArray.length; i++) {
            await waitForElDisplayed(this.exampleAreaContainersArr, i);
            await scrollIntoView(this.exampleAreaContainersArr, i);
            await saveElementScreenshot(
                this.exampleAreaContainersArr,
                `${specName}-example-${i}-platform-${await getImageTagBrowserPlatform()}`,
                options,
                i
            );
        }
    }

    async compareWithBaseline(specName: string, options: Record<string, any> = {}): Promise<any> {
        const areasArray = await elementArray(this.exampleAreaContainersArr);
        let diff = 0;
        for (let i = 0; i < areasArray.length; i++) {
            await waitForElDisplayed(this.exampleAreaContainersArr, i);
            await scrollIntoView(this.exampleAreaContainersArr, i);
            diff += await checkElementScreenshot(
                this.exampleAreaContainersArr,
                `${specName}-example-${i}-platform-${await getImageTagBrowserPlatform()}`,
                options,
                i
            );
        }
        return diff;
    }

    async getScreenshotFolder(componentFolder: string): Promise<Record<string, any>> {
        return { baselineFolder: `${process.cwd()}${this.defaultScreenshotFolder}${componentFolder}` };
    }

    async open(url: string): Promise<void> {
        return open('#/platform' + url);
    }
}
