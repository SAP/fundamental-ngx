import {
    checkElementScreenshot,
    click,
    elementArray,
    getImageTagBrowserPlatform,
    open,
    saveElementScreenshot,
    scrollIntoView
} from '../../driver/wdio';
import { checkLtrOrientation, checkRtlOrientation } from '../../helper/assertion-helper';
export class CoreBaseComponentPo {

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

    saveExampleBaselineScreenshot(specName: string, areas: string = this.exampleAreaContainersArr, options: object = {}): void {
        const areasArray = elementArray(areas);
        for (let i = 0; i < areasArray.length; i++) {
            scrollIntoView(areas, i);
            saveElementScreenshot(areas, `${specName}-example-${i}-core-${getImageTagBrowserPlatform()}`, options, i);
        }
    }

    compareWithBaseline(specName: string, areas: string = this.exampleAreaContainersArr, options: object = {}): any {
        const areasArray = elementArray(areas);
        let diff = 0;
        for (let i = 0; i < areasArray.length; i++) {
            scrollIntoView(areas, i);
            diff +=  checkElementScreenshot(areas, `${specName}-example-${i}-core-${getImageTagBrowserPlatform()}`, options, i);
        }
        return diff;
    }

    open(url: string): void {
        open('fundamental-ngx#/core' + url);
    }
}
