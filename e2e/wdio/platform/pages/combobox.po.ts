import { BaseComponentPo } from './base-component.po';
import { webDriver } from '../../driver/wdio';
import {checkTextValueContain, checkNotFocused} from '../../helper/assertion-helper';

export class ComboBoxPo extends BaseComponentPo {
    private url = '/combobox';
    root = '#page-content';

    comboBoxRoot = '.fdp-combobox';
    comboBoxDropdownExpanded = '.fd-list';
    groupHeader = '.fd-list__group-header';
    comboboxWithGroup = 'input[ng-reflect-name="group"]';
    comboboxTwoColumns = '[name="columns"] input';
    optionsArray = '.fd-list li';
    comboBoxInput = this.comboBoxRoot + ' input';

    selectedDropDownOption = (name: string) => {
        return `//span[contains(.,'${name}')]//ancestor::li[@role="listitem" and contains(@class, "is-selected")]`;
    };

    dropDownOption = (name: string) => {
        return `//span[contains(.,'${name}')]//ancestor::li[@role="listitem"]`;
    };

    comboBoxOptionHint = (typedCharacters: string, restCharacters: string) => {
        return `//span[text()='${restCharacters}']//strong[text() = '${typedCharacters}']`;
    };

    comboBoxButtons = (name: string) => {
        return `//label[@for='${name}']/following-sibling::fdp-input-message-group//button`;
    };

    comboBoxExpandedButtons = (name: string) => {
        return `//label[@for='${name}']/following-sibling::fdp-input-message-group//button[contains (@class,"is-expanded")]`;
    };

    comboBoxInputs = (name: string) => {
        return `//label[@for='${name}']/following-sibling::fdp-input-message-group//input`;
    };

    filledComboBoxInputs = (name: string, option: string) => {
        return `//label[@for='${name}']/following-sibling::fdp-input-message-group//input[@ng-reflect-model='${option}']`;
    };

    expandDropdown(type: string): void {
        webDriver.sendKeys(['Escape'])
        webDriver.scrollIntoView(this.comboBoxButtons(type));
        webDriver.pause(200);
        webDriver.click(this.comboBoxButtons(type));
        webDriver.pause(500);
        webDriver.waitForPresent(this.comboBoxExpandedButtons(type));
        webDriver.waitForPresent(this.comboBoxDropdownExpanded);
    }

    selectOption(type: string, option: string): void {
        webDriver.scrollIntoView(this.dropDownOption(option));
        webDriver.click(this.dropDownOption(option));
        webDriver.waitForDisplayed(this.filledComboBoxInputs(type, option));
    }

    open(): void {
        super.open(this.url);
        webDriver.waitForDisplayed(this.root);
    }
}
