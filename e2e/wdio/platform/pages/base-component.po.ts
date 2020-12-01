import { click, elementArray, scrollIntoView, open } from '../../driver/wdio';
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

    checkRtlSwitch(switchers: string, areas: string): void {
        const areasArray = $$(areas);
        const switchersArray = $$(switchers);
        for (let i = 0; i < areasArray.length; i++) {
            switchersArray[i].click();
            expect(webDriver.getAttributeByName(areas, 'dir', i)).toBe('rtl');
            expect(webDriver.getCSSPropertyByName(areas, 'direction', i).value).toBe('rtl');
            switchersArray[i].click();
            expect(webDriver.getAttributeByName(areas, 'dir', i)).toBe('ltr');
            expect(webDriver.getCSSPropertyByName(areas, 'direction', i).value).toBe('ltr');
        }
    }

    open(url: string): void {
        open('fundamental-ngx#/platform' + url);
    };
}
