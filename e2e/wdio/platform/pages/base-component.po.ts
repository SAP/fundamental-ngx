import { webDriver } from '../../driver/wdio';

export class BaseComponentPo {

    title = 'header .header';

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
        webDriver.open('fundamental-ngx#/platform' + url);
    };
}
