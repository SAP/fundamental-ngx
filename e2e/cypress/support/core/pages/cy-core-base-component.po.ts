import { checkLTROrientation, checkRTLOrientation } from '../../../helper/assertion-helper';
import { click, currentBrowserName, getElementArrayLength, scrollIntoView } from '../../../cypress-methods/cypress';
import { getImageTagBrowserPlatform, saveElementScreenshot } from '../../../../wdio/driver/wdio';

export class BaseComponent {
    title = 'header .header';
    root = '#page-content';
    coreUrl = '/core';
    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    navigateTo(url: string): void {
        cy.visit(this.coreUrl + url);
    }

    checkVisualRegression(specName: string, areas: string = this.exampleAreaContainersArr, options: object = {}): void {
        const areasLength = getElementArrayLength(areas);
        for (let i = 0; i < areasLength; i++) {
            scrollIntoView(areas, i);
            cy.get(areas).eq(i).screenshot(`${specName}-example-${i}-core-${currentBrowserName()}`, options);
        }
    }



    checkRtlSwitch(switchers: string = this.rtlSwitcherArr, areas: string = this.exampleAreaContainersArr, index?: number): void {
        const areasLength = getElementArrayLength(areas);
        for (let i = 0; i < areasLength; i++) {
            click(switchers, i);
            checkRTLOrientation(areas, i);
            click(switchers, i);
            checkLTROrientation(areas, i);
        }
    }
}
