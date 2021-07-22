import { BaseComponent } from './cy-core-base-component.po';

export class ToolbarPo extends BaseComponent {
    pageUrl = '/toolbar';

    toolbarTitleHeader = '.fd-toolbar--cozy h4';
    toolbarTypeExampleLabel = 'fd-toolbar-type-example .fd-label';
    overFlowButton = 'fd-toolbar-overflow-example .fd-button--compact';
    moreButton = 'fd-toolbar-overflow-example [title="More"]';
    okButton = '.fd-button--emphasized.fd-button--compact';
    inputField = 'input.fd-input--compact';
    dropdownMenu = '.fd-select__control.ng-star-inserted';
    dropdownOption = '.fd-list__item.ng-star-inserted';
    inputFieldText  = 'div.fd-select__text-content';

    navigateTo(): void {
        cy.visit(this.baseUrl + this.pageUrl);
    }
}
