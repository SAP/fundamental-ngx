import { webDriver } from '../../driver/wdio';
import { checkLtrOrientation, checkRtlOrientation } from '../../helper/assertion-helper';

export class BaseComponentPo {

    title = 'header .header';

    checkRtlSwitch(switchers: string, areas: string): void {
        const areasArray = webDriver.elementArray(areas);
        for (let i = 0; i < areasArray.length; i++) {
            webDriver.click(switchers, i);
            checkRtlOrientation(areas, i);
            webDriver.click(switchers, i);
            checkLtrOrientation(areas, i);
        }
    }

    open(url: string): void {
        webDriver.open('fundamental-ngx#/platform' + url);
    };
}
