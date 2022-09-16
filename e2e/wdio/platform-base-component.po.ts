import {
    checkElementScreenshot,
    click,
    elementArray,
    getImageTagBrowserPlatform,
    open,
    saveElementScreenshot,
    scrollIntoView,
    waitForElDisplayed
} from './driver/wdio';
import { checkLtrOrientation, checkRtlOrientation } from './helper/assertion-helper';

export class PlatformBaseComponentPo {
    title = 'header .header';
    root = '#page-content';
    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';
    defaultScreenshotFolder = '/e2e/wdio/baselineScreenshot/platform';

    checkRtlSwitch(switchers: string = this.rtlSwitcherArr, areas: string = this.exampleAreaContainersArr): void {
        const areasArray = elementArray(areas);
        for (let i = 0; i < areasArray.length; i++) {
            scrollIntoView(switchers, i);
            click(switchers, i);
            checkRtlOrientation(areas, i);
            scrollIntoView(switchers, i);
            click(switchers, i);
            waitForElDisplayed(areas, i);
            checkLtrOrientation(areas, i);
        }
    }

    saveExampleBaselineScreenshot(specName: string, options: Record<string, any> = {}): void {
        const areasArray = elementArray(this.exampleAreaContainersArr);
        for (let i = 0; i < areasArray.length; i++) {
            waitForElDisplayed(this.exampleAreaContainersArr, i);
            scrollIntoView(this.exampleAreaContainersArr, i);
            saveElementScreenshot(
                this.exampleAreaContainersArr,
                `${specName}-example-${i}-platform-${getImageTagBrowserPlatform()}`,
                options,
                i
            );
        }
    }

    compareWithBaseline(specName: string, options: Record<string, any> = {}): any {
        const areasArray = elementArray(this.exampleAreaContainersArr);
        let diff = 0;
        for (let i = 0; i < areasArray.length; i++) {
            waitForElDisplayed(this.exampleAreaContainersArr, i);
            scrollIntoView(this.exampleAreaContainersArr, i);
            diff += checkElementScreenshot(
                this.exampleAreaContainersArr,
                `${specName}-example-${i}-platform-${getImageTagBrowserPlatform()}`,
                options,
                i
            );
        }
        return diff;
    }

    getScreenshotFolder(componentFolder: string): Record<string, any> {
        return { baselineFolder: `${process.cwd()}${this.defaultScreenshotFolder}${componentFolder}` };
    }

    open(url: string): void {
        return open('fundamental-ngx#/platform' + url);
    }
}
