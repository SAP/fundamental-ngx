import {
    click,
    getValue,
    pause,
    PlatformBaseComponentPo,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

export class ComboBoxPo extends PlatformBaseComponentPo {
    private url = '/combobox';
    root = '#page-content';
    pageTitle = 'fd-platform-combobox-header h1';

    comboBoxRoot = 'fdp-combobox';
    comboBoxDropdownExpanded = '.fd-list';
    groupHeader = '.fd-list__group-header';
    comboboxWithGroup = 'input[ng-reflect-name="group"]';
    comboboxTwoColumns = '[name="columns"] input';
    optionsArray = '.fdp-combobox__popover .fd-list__item';
    comboBoxInput = 'fdp-combobox input:not([id*="mobile"])';
    mobileComboBoxInput = 'fdp-combobox input[id*=mobile]';

    selectedDropDownOption = (name: string): string =>
        `//span[contains(.,'${name}')]//ancestor::li[contains(@class, "is-selected")]`;

    dropDownOption = (name: string): string => `//span[contains(.,'${name}')]//ancestor::li`;

    comboBoxOptionHint = (typedCharacters: string, restCharacters: string): string =>
        `//span[text()='${restCharacters}']//strong[text() = '${typedCharacters}']`;

    comboBoxButtons = (name: string): string =>
        `//label[@id='fdp-form-label-${name}']/../../fdp-input-message-group//button`;

    comboBoxExpandedButtons = (name: string): string =>
        `//label[@id='fdp-form-label-${name}']/../../fdp-input-message-group//button[contains (@class,"is-expanded")]`;

    comboBoxInputs = (name: string): string =>
        `//label[@id='fdp-form-label-${name}']/../../fdp-input-message-group//input`;

    filledComboBoxInputs = (name: string): string =>
        `//label[@id='fdp-form-label-${name}']/../../fdp-input-message-group//input`;

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
        expect(getValue(this.filledComboBoxInputs(type))).toBe(option);
    }

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.pageTitle);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'combobox'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'combobox'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
