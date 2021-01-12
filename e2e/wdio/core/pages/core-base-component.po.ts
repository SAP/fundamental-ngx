import { click, elementArray, open, scrollIntoView } from '../../driver/wdio';
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

    open(url: string): void {
        open('fundamental-ngx#/core' + url);
    };
}
