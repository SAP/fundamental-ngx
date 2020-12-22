import { BaseComponentPo } from './base-component.po';
import { webDriver } from '../../driver/wdio';
import {compareDropDownOptions, checkNotFocused} from '../../helper/assertion-helper';

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

    getDropdownOptionsText(type: string): string[] {
        this.expandDropdown(type);
        webDriver.waitForDisplayed(this.optionsArray);
        return webDriver.getTextArr(this.optionsArray, 0, -1);
    }

    expandDropdown(type: string): void {
        webDriver.sendKeys(['Escape'])
        webDriver.scrollIntoView(this.comboBoxButtons(type));
        webDriver.pause(200);
        webDriver.click(this.comboBoxButtons(type));
        webDriver.pause(500);
        webDriver.waitForPresent(this.comboBoxExpandedButtons(type));
        webDriver.waitForPresent(this.comboBoxDropdownExpanded);
    }

    verifyDropdownToggle(activeTypes: string[]): void {
        for (let i = 0; i < activeTypes.length; i++) {
            this.expandDropdown(activeTypes[i]);
        }
    }

    selectOption(type: string, option: string): void {
        webDriver.scrollIntoView(this.dropDownOption(option));
        webDriver.click(this.dropDownOption(option));
        webDriver.waitForDisplayed(this.filledComboBoxInputs(type, option));
        webDriver.waitForNotDisplayed(this.comboBoxDropdownExpanded);
    }

    verifyGroupHeadersAreNotInteractive(): void {
        const headersQuantity = webDriver.getElementArrayLength(this.groupHeader);
        this.expandDropdown('group');
        for (let i = 0; i < headersQuantity; i++) {
            webDriver.scrollIntoView(this.groupHeader, i);
            webDriver.click(this.groupHeader, i);
            webDriver.waitForDisplayed(this.comboBoxDropdownExpanded);
        }
    }

    verifyComboBoxComponents(activeTypes: string[], notActiveTypes: string[]): void {
        for (let i = 0; i < activeTypes.length; i++) {
            webDriver.scrollIntoView(this.comboBoxButtons(activeTypes[i]));
            webDriver.waitForDisplayed(this.comboBoxButtons(activeTypes[i]));
            webDriver.scrollIntoView(this.comboBoxInputs(activeTypes[i]));
            webDriver.waitForDisplayed(this.comboBoxInputs(activeTypes[i]));
            webDriver.waitForClickable(this.comboBoxInputs(activeTypes[i]));
        }
        for (let i = 0; i < notActiveTypes.length; i++) {
            webDriver.scrollIntoView(this.comboBoxInputs(notActiveTypes[i]));
            webDriver.waitForDisplayed(this.comboBoxInputs(notActiveTypes[i]));
            webDriver.waitForUnclickable(this.comboBoxInputs(notActiveTypes[i]));
        }
    }

    verifyInputWhileTyping(option: string, activeTypes: string[]): void {
        for (let i = 0; i < activeTypes.length - 1; i++) {
            webDriver.scrollIntoView(this.comboBoxInputs(activeTypes[i]));
            webDriver.clearValue(this.comboBoxInputs(activeTypes[i]));
            webDriver.setValue(this.comboBoxInputs(activeTypes[i]), option.substring(0, 2));
            this.selectOption(activeTypes[i], option);
            webDriver.waitForDisplayed(this.filledComboBoxInputs(activeTypes[i], option));
        }
    }

    verifyOptionHintWhileTyping(option: string, activeTypes: string[]): void {
        for (let i = 0; i < activeTypes.length; i++) {
            const typedCharacters = option.substring(0, 2);
            const restCharacters = option.substring(2);
            webDriver.scrollIntoView(this.comboBoxInputs(activeTypes[i]));
            webDriver.setValue(this.comboBoxInputs(activeTypes[i]), typedCharacters);
            webDriver.waitForDisplayed(this.comboBoxOptionHint(typedCharacters, restCharacters));
        }
    }

    verifyDropdownCollapsedAfterSelectingOption(option: string, activeTypes: string[]): void {
        for (let i = 0; i < activeTypes.length; i++) {
            this.expandDropdown(activeTypes[i]);
            this.selectOption(activeTypes[i], option);
            webDriver.waitForNotDisplayed(this.comboBoxDropdownExpanded);
            checkNotFocused(this.comboBoxInput, i);
        }
    }

    verifySelectedOptionHighlighted(firstOption: string, secondOption: string, activeTypes: string[]): void {
        for (let i = 0; i < activeTypes.length; i++) {
            this.expandDropdown(activeTypes[i]);
            this.selectOption(activeTypes[i], firstOption);
            webDriver.waitForNotDisplayed(this.optionsArray);
            this.expandDropdown(activeTypes[i]);
            webDriver.waitForDisplayed(this.selectedDropDownOption(firstOption));
            this.selectOption(activeTypes[i], secondOption);
            webDriver.waitForNotDisplayed(this.optionsArray);
            this.expandDropdown(activeTypes[i]);
            webDriver.waitForDisplayed(this.selectedDropDownOption(secondOption));
        }
    }

    verifyComboboxWithTwoColumnsWhileTyping(): void {
        webDriver.scrollIntoView(this.comboboxTwoColumns);
        webDriver.setValue(this.comboboxTwoColumns, 'Frui');
        this.selectOption('columns', 'Banana');
    }

    verifyNavigationByArrowButtons(activeTypes: string[]): void {
        for (let i = 0; i < activeTypes.length; i++) {
            this.expandDropdown(activeTypes[i]);
            const firstOptionText = webDriver.getText(this.optionsArray, 0);
            const secondOptionText = webDriver.getText(this.optionsArray, 1);
            webDriver.sendKeys(['ArrowDown']);
            webDriver.sendKeys(['Enter']);
            let inputText = webDriver.getText(this.comboBoxInput, i);
            compareDropDownOptions(firstOptionText, inputText);
            this.expandDropdown(activeTypes[i]);
            webDriver.sendKeys(['ArrowDown', 'ArrowDown']);
            webDriver.sendKeys(['Enter']);
            inputText = webDriver.getText(this.comboBoxInput, i);
            compareDropDownOptions(secondOptionText, inputText);
        }
    }

    open(): void {
        super.open(this.url);
        webDriver.waitForDisplayed(this.root);
    }
}
