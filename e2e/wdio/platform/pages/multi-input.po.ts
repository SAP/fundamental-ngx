import { BaseComponentPo } from './base-component.po';
import { click, doesItExist, scrollIntoView, sendKeys, waitForElDisplayed, waitForPresent } from '../../driver/wdio';
export class MultiInputPo extends BaseComponentPo {
    private url = '/multi-input';
    root = '#page-content';
    header = 'h2';
    expandedDropdown = '.fd-list';
    activeDropdownButtons = 'button[aria-label="value-help"]';
    activeInputs = '.fd-input-group.fd-input-group--control input';
    mobileInput = 'div[role="dialog"] input';
    filledInput = '.fd-tokenizer__inner';
    approveButton = '[fdtype="emphasized"]';
    groupHeader = '.fd-list__group-header';
    groupDropdown = '#fdp-id-grouped button';
    options = 'fdp-standard-list-item .fd-list__title';
    dropdownOptions = 'ul[role=list] [role="listitem"] li ';
    selectedToken = 'span[role=\'button\']';
    dropdownOptionText = this.dropdownOptions + 'span';
    dropdownOptionTextValueHelp = '[role="option"]';

    crossButton = (option: string) => {
        return `//span[text() = '${option}']/following-sibling::span`;
    };

    selectedDropDownOption = (name: string) => {
        return `//span[text()='${name}']`;
    };

    dropDownOption = (name: string) => {
        return doesItExist('fdp-standard-list-item .fd-list__content') ? `//div[@title="${name}"]/../..` : `//span[@title="${name}"]/..`;
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
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'multi-input'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'multi-input'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
