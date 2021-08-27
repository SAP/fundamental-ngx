export class BaseComponent {
    title = 'header .header';
    root = '#page-content';
    coreUrl = '/core';
    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    navigateTo(url: string): void {
        cy.visit(this.coreUrl + url);
    }

    getTexts(selector: string, expectedValue: string, index?: number): void {
        cy.get(selector).eq(index ? index : 0).contains(expectedValue);
    }

    clickOnElement(selector: string, index?: number): void {
        cy.get(selector).eq(index ? index : 0).click();
    }

    checkRTLOrientation(element: string, index?: number): void {
        cy.get(element).eq(index ? index : 0).invoke('attr', 'dir').should('contain', 'rtl');
        cy.get(element).eq(index ? index : 0).invoke('css', 'direction').should('contain', 'rtl');
    }

    checkLTROrientation(element: string, index?: number): void {
        cy.get(element).eq(index ? index : 0).invoke('attr', 'dir').should('contain', 'ltr');
        cy.get(element).eq(index ? index : 0).invoke('css', 'direction').should('contain', 'ltr');
    }

     getElementArrayLength(selector: string): number {
        return Cypress.$(selector).length;
    };

    checkRtlSwitch(switchers: string = this.rtlSwitcherArr, areas: string = this.exampleAreaContainersArr, index?: number): void {
        const areasLength = this.getElementArrayLength(areas);
        for (let i = 0; i < areasLength; i++) {
            this.clickOnElement(switchers, i);
            this.checkRTLOrientation(areas, i);
            this.clickOnElement(switchers, i);
            this.checkLTROrientation(areas, i);
        }
    }
}


