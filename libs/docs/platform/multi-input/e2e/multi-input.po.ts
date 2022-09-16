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

    dropDownOption = (name: string): string =>
        doesItExist('fdp-standard-list-item .fd-list__content')
            ? `//div[@title="${name}"]/../..`
            : `//span[@title="${name}"]/..`;

    expandDropdown(dropDownSelector: string, index: number = 0, usePause = false): void {
        sendKeys(['Escape']);
        usePause && pause(300);
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
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'multi-input'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'multi-input'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
