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

    async expandDropdown(type: string): Promise<void> {
        await sendKeys(['Escape']);
        await scrollIntoView(await this.comboBoxButtons(type));
        await pause(200);
        await click(await this.comboBoxButtons(type));
        await pause(500);
        await waitForPresent(await this.comboBoxExpandedButtons(type));
        await waitForPresent(this.comboBoxDropdownExpanded);
    }

    async selectOption(type: string, option: string): Promise<void> {
        await waitForPresent(await this.dropDownOption(option));
        await scrollIntoView(await this.dropDownOption(option));
        await click(await this.dropDownOption(option));
        await expect(await getValue(await this.filledComboBoxInputs(type))).toBe(option);
    }

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.pageTitle);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'combobox'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'combobox'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
