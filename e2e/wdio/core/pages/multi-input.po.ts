import { waitForElDisplayed } from '../../driver/wdio';
import { CoreBaseComponentPo } from './core-base-component.po';

export class MultiInputPo extends CoreBaseComponentPo {
    private url = '/multi-input';
    root = '#page-content';

    activeDropdownButtons = '[ng-reflect-disabled="false"] button[ng-reflect-glyph="value-help"]';
    activeInputs = '.fd-multi-input-field [ng-reflect-disabled="false"] input';
    disableInputs = 'div.is-disabled';
    options = 'fd-checkbox.ng-untouched';
    expandedDropdown = '.fd-list';
    multiInputOptions = 'fd-multi-input[inputid="multiInput"] .fd-token__text span';
    buttonShowAll = 'a.fd-link';
    hiddenAddonButtonInputOptions = 'fd-multi-input[inputid="noAddonMultiInput1"] .fd-token__text span';
    compactMultiInputOptions = 'div#rtl-ex1 .fd-token__text span';
    approveButton = '.fd-button--emphasized';
    multiSelectButton = 'button[ng-reflect-glyph="multiselect-all"]';
    mobileInputOptions = 'fd-multi-input-mobile-example .fd-token__text span';
    displayObjectOptions = 'div#background-ex3 .fd-token__text span';
    searchTermOptions = 'div#background-ex4 .fd-token__text span';
    customFilterOptions = 'div#background-ex5 .fd-token__text span';
    asyncExampleOptions = 'div#rtl-ex6 .fd-token__text span';
    tokenOptions = 'div#background-ex8 .fd-token__text span';
    templateOptions = 'div#background-ex9 .fd-token__text span';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.title);
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
