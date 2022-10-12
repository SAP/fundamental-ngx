import {
    click,
    doesItExist,
    pause,
    PlatformBaseComponentPo,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

export class MultiInputPo extends PlatformBaseComponentPo {
    private url = '/multi-input';
    root = '#page-content';
    header = 'h2';
    expandedDropdown = 'fdp-list .fd-list';
    activeDropdownButtons = 'button[aria-label="value-help"]';
    activeInputs = '.fd-input-group.fd-input-group--control input';
    mobileInput = 'div[role="dialog"] input';
    filledInput = '.fd-tokenizer__inner';
    approveButton = '[fdtype="emphasized"]';
    groupHeader = '.fd-list__group-header';
    groupDropdown = '#fdp-id-grouped button';
    options = 'fdp-standard-list-item .fd-list__title';
    dropdownOptions = 'ul[role=list] [role="listitem"] li ';
    selectedToken = "span[role='button']";
    dropdownOptionText = this.dropdownOptions + 'span';
    dropdownOptionTextValueHelp = '[role="option"]';
    validationPopover = '.fd-popover__popper .fd-form-message';
    compactExampleTokens = 'fdp-platform-multi-input-compact-example fd-token';
    errorMessage = '.fd-form-message--error span';
    declineButton = '.fd-button[glyph=decline]';
    listitems = 'ul[role=list] [role="listitem"] li';
    reactiveExample = 'fdp-platform-multi-input-reactive-example';

    crossButton = (option: string): string => `//span[text() = '${option}']/../following-sibling::span`;

    selectedDropDownOption = (name: string): string => `//span[text()='${name}']`;

    dropDownOption = async (name: string): Promise<string> =>
        (await doesItExist('fdp-standard-list-item .fd-list__content'))
            ? `//div[@title="${name}"]/../..`
            : `//span[@title="${name}"]/..`;

    async expandDropdown(dropDownSelector: string, index: number = 0, usePause = false): Promise<void> {
        await sendKeys(['Escape']);
        usePause && (await pause(300));
        await scrollIntoView(dropDownSelector, index);
        await click(dropDownSelector, index);
        await waitForElDisplayed(this.expandedDropdown);
    }

    async selectOption(option: string): Promise<void> {
        await waitForElDisplayed(await this.dropDownOption(option));
        await scrollIntoView(await this.dropDownOption(option));
        await click(await this.dropDownOption(option));
    }

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'multi-input'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'multi-input'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
