import { BaseComponentPo } from './base-component.po';
import {
    click,
    pause,
    scrollIntoView,
    sendKeys,
    waitForPresent,
    waitForElDisplayed
} from '../../driver/wdio';

export class ComboBoxPo extends BaseComponentPo {
    private url = '/combobox';
    root = '#page-content';
    pageTitle = 'fd-platform-combobox-header h1';

    comboBoxRoot = '.fdp-combobox';
    comboBoxDropdownExpanded = '.fd-list';
    groupHeader = '.fd-list__group-header';
    comboboxWithGroup = 'input[ng-reflect-name="group"]';
    comboboxTwoColumns = '[name="columns"] input';
    optionsArray = '.fd-list li';
    comboBoxInput = this.comboBoxRoot + ' input';

    selectedDropDownOption = (name: string) => {
        return `//span[contains(.,'${name}')]//ancestor::li[contains(@class, "is-selected")]`;
    };

    dropDownOption = (name: string) => {
        return `//span[contains(.,'${name}')]//ancestor::li`;
    };

    comboBoxOptionHint = (typedCharacters: string, restCharacters: string) => {
        return `//span[text()='${restCharacters}']//strong[text() = '${typedCharacters}']`;
    };

    comboBoxButtons = (name: string) => {
        return `//label[@id='fdp-form-label-${name}']/../../fdp-input-message-group//button`;
    };

    comboBoxExpandedButtons = (name: string) => {
        return `//label[@id='fdp-form-label-${name}']/../../fdp-input-message-group//button[contains (@class,"is-expanded")]`;
    };

    comboBoxInputs = (name: string) => {
        return `//label[@id='fdp-form-label-${name}']/../../fdp-input-message-group//input`;
    };

    filledComboBoxInputs = (name: string, option: string) => {
        return `//label[@id='fdp-form-label-${name}']/../../fdp-input-message-group//input[@ng-reflect-model='${option}']`;
    };

    expandDropdown(type: string): void {
        sendKeys(['Escape']);
        scrollIntoView(this.comboBoxButtons(type));
        pause(200);
        click(this.comboBoxButtons(type));
        pause(500);
        waitForPresent(this.comboBoxExpandedButtons(type));
        waitForPresent(this.comboBoxDropdownExpanded);
    }

    selectOption(type: string, option: string): void {
        waitForPresent(this.dropDownOption(option));
        scrollIntoView(this.dropDownOption(option));
        click(this.dropDownOption(option));
        waitForElDisplayed(this.filledComboBoxInputs(type, option));
    }

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.pageTitle);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'combobox'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'combobox'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
