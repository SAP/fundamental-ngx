import {
    click,
    elementArray,
    scrollIntoView,
    open,
    saveElement,
    getImageTagBrowserPlatform,
    checkElement, waitForElDisplayed
} from '../../driver/wdio';
import { checkLtrOrientation, checkRtlOrientation } from '../../helper/assertion-helper';

export class BaseComponentPo {

    title = 'header .header';
    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    checkRtlSwitch(switchers: string = this.rtlSwitcherArr, areas: string = this.exampleAreaContainersArr): void {
        const areasArray = elementArray(areas);
        for (let i = 0; i < areasArray.length; i++) {
            scrollIntoView(switchers, i);
            click(switchers, i);
            checkRtlOrientation(areas, i);
            scrollIntoView(switchers, i);
            click(switchers, i);
            checkLtrOrientation(areas, i);
        }
    }

    saveExampleBaselineScreenshot(specName: string, options: object = {}, areas: string = this.exampleAreaContainersArr): void {
        const areasArray = elementArray(areas);
        for (let i = 0; i < areasArray.length; i++) {
            waitForElDisplayed(areas, i);
            scrollIntoView(areas, i);
            saveElement(areas, `${specName}-example-${i}-platform-${getImageTagBrowserPlatform()}`, options, i);
        }
    }

    compareWithBaseline(specName: string, options: object = {}, areas: string = this.exampleAreaContainersArr): any {
        const areasArray = elementArray(areas);
        let diff = 0;
        for (let i = 0; i < areasArray.length; i++) {
            waitForElDisplayed(areas, i);
            scrollIntoView(areas, i);
            diff +=  checkElement(areas, `${specName}-example-${i}-platform-${getImageTagBrowserPlatform()}`, options, i);
        }
        return diff;
    }

    open(url: string): void {
        open('fundamental-ngx#/platform' + url);
    };
}
