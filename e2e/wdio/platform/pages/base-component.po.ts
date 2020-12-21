import { webDriver } from '../../driver/wdio';
import { checkRtlOrientation, checkLtrOrientation } from '../../helper/assertion-helper';

export class BaseComponentPo {

    title = 'header .header';

    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    checkRtlSwitch(): void {
        const areasArray = webDriver.elementArray(this.exampleAreaContainersArr);
        for (let i = 0; i < areasArray.length; i++) {
            webDriver.scrollIntoView(this.rtlSwitcherArr, i);
            webDriver.click(this.rtlSwitcherArr, i);
            checkRtlOrientation(this.exampleAreaContainersArr, i);
            webDriver.scrollIntoView(this.rtlSwitcherArr, i);
            webDriver.click(this.rtlSwitcherArr, i);
            checkLtrOrientation(this.exampleAreaContainersArr, i);
        }
    }

    open(url: string): void {
        webDriver.open('fundamental-ngx#/platform' + url);
    };
}
