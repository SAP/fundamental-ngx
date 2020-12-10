import { webDriver } from '../../driver/wdio';
import { AssertionHelper } from '../../helper/assertion-helper';
const assertionHelper = new AssertionHelper();

export class BaseComponentPo {

    title = 'header .header';

    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    checkRtlSwitch(): void {
        const areasArray = webDriver.elementArray(this.exampleAreaContainersArr);
        for (let i = 0; i < areasArray.length; i++) {
            webDriver.click(this.rtlSwitcherArr, i);
            assertionHelper.checkRtlOrientation(this.exampleAreaContainersArr, i);
            webDriver.click(this.rtlSwitcherArr, i);
            assertionHelper.checkLtrOrientation(this.exampleAreaContainersArr, i);
        }
    }

    open(url: string): void {
        webDriver.open('fundamental-ngx#/platform' + url);
    };
}
