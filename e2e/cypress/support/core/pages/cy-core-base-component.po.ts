import { checkLTROrientation, checkRTLOrientation } from '../../../helper/assertion-helper';
import { click, currentBrowserName, getElementArrayLength, scrollIntoView } from '../../../cypress-methods/cypress';

export class BaseComponent {
    title = 'header .header';
    root = '#page-content';
    coreUrl = '/core';
    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    navigateTo(url: string): void {
        cy.visit(this.coreUrl + url);
    }

    checkVisualRegression(areas: string = this.exampleAreaContainersArr): void {
        const areasLength = getElementArrayLength(areas);
        for (let i = 0; i < areasLength; i++) {
            scrollIntoView(areas, i);
            cy.get(areas).eq(i).matchImageSnapshot('action-bar-example-' + i + '-' + currentBrowserName());
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
