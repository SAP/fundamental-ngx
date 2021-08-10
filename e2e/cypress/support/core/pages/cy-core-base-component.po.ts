export class BaseComponent {
    title = 'header .header';
    root = '#page-content';
    coreUrl = '/core';
    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    navigateTo(url: string): void {
        cy.visit(this.coreUrl + url);
    }

    getText(selector: string, expectedValue: string, index?: number): void {
        cy.get(selector).eq(index ? index : 0).contains(expectedValue);
    }

    clickOnElement(selector: string, index?: number): void {
        cy.get(selector).eq(index ? index : 0).click();
    }

    checkRTLOrientation(element: string, index: number): void {
        cy.get(element).eq(index).invoke('attr', 'dir').should('contain', 'rtl');
    }

    checkLTROrientation(element: string): void {
        cy.get(element).invoke('attr', 'dir').should('contain', 'ltr');
    }
}


