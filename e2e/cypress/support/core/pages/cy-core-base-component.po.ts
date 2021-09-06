import { checkLTROrientation, checkRTLOrientation } from '../../../helper/assertion-helper';
import { click, getElementArrayLength } from '../../../cypress-methods/cypressio';

export class BaseComponent {
    title = 'header .header';
    root = '#page-content';
    coreUrl = '/core';
    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    navigateTo(url: string): void {
        cy.visit(this.coreUrl + url);
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
