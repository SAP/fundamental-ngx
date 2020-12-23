import { webDriver } from '../../driver/wdio';
import { checkLtrOrientation, checkRtlOrientation } from '../../helper/assertion-helper';

export class BaseComponentPo {

    title = 'header .header';
    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    checkRtlSwitch(switchers: string = this.rtlSwitcherArr, areas: string = this.exampleAreaContainersArr): void {
        const areasArray = webDriver.elementArray(areas);
        for (let i = 0; i < areasArray.length; i++) {
            webDriver.scrollIntoView(switchers, i);
            webDriver.click(switchers, i);
            checkRtlOrientation(areas, i);
            webDriver.scrollIntoView(switchers, i);
            webDriver.click(switchers, i);
            checkLtrOrientation(areas, i);
        }
    }

    open(url: string): void {
        webDriver.open('fundamental-ngx#/platform' + url);
    };
}
