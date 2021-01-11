import { BaseComponentPo } from './base-component.po';
import { click, scrollIntoView, sendKeys, waitForElDisplayed } from '../../driver/wdio';

export class MultiInputPo extends BaseComponentPo {
    private url = '/multi-input';
    root = '#page-content';
    expandedDropdown = '.fd-list'
    activeDropdownButtons = '[ng-reflect-disabled="false"] button[ng-reflect-glyph="value-help"]'
    allDropdownButtons = 'button[ng-reflect-glyph="value-help"]';
    disabledDropdownButtons = '[ng-reflect-disabled="true"] button[ng-reflect-glyph="value-help"]'
    activeInputs = '.fd-multi-input-field [ng-reflect-disabled="false"] input';
    mobileInput = 'div[role="dialog"] input'
    disabledInputs = '.fdp-multi-input [ng-reflect-disabled="true"] input';
    filledInput = '[ng-reflect-disabled="false"] .fd-tokenizer__inner';
    approveButton = '[fdtype="emphasized"]';
    groupHeader = '.fd-list__group-header';
    groupDropdown = '#fdp-id-grouped button';
    options = 'fdp-standard-list-item';
    dropdownOption = 'ul[role=list] [role="listitem"] li ';
    selectedToken = 'span[role=\'button\']'
    dropdownOptionText = this.dropdownOption + 'span';
    dropdownOptionTextValueHelp = this.dropdownOption + 'div[class="fd-list__title ng-star-inserted"]';


    crossButton = (option: string) => {
        return `//span[text() = '${option}']/following-sibling::span`;
    }

    selectedDropDownOption = (name: string) => {
        return `//span[text()='${name}']`;
    };

    dropDownOption = (name: string) => {
        return `[ng-reflect-title="${name}"] li`;
    };

    expandDropdown(dropDownSelector: string, index: number = 0): void {
        sendKeys(['Escape']);
        scrollIntoView(dropDownSelector, index);
        click(dropDownSelector, index);
        waitForElDisplayed(this.expandedDropdown);
    }

    selectOption(option: string): void {
        waitForElDisplayed(this.dropDownOption(option));
        scrollIntoView(this.dropDownOption(option));
        click(this.dropDownOption(option));
    }

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }
}
