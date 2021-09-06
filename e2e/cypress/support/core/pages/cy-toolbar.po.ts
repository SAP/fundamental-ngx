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
    inputFieldText = 'div.fd-select__text-content';
    activeInfoToolbar = '.fd-toolbar--active';
    checkbox = '.fd-checkbox__label';
    checkboxValue = '.fd-checkbox.ng-valid';
    overflowPriorityButton = 'fd-toolbar-overflow-priority-example .fd-button--standard.fd-button--compact';
    overflowPriorityExample = 'fd-toolbar-overflow-priority-example';
    overflowGroupingExample = 'fd-toolbar-overflow-grouping-example';
    overflowGroupingButton = 'fd-toolbar-overflow-grouping-example .fd-button--standard.fd-button--compact';
    moreBtn = ' [title="More"]';
    overflowBody = '.fd-toolbar__overflow__body';
    alwaysButton = '[ng-reflect-label="Always"]';

    navigateTo(): void {
        super.navigateTo(this.pageUrl);
    }
}
