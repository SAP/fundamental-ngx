import { click, scrollIntoView, sendKeys, waitForElDisplayed } from '../../driver/wdio';
import { CoreBaseComponentPo } from './core-base-component.po';

export class MultiInputPo extends CoreBaseComponentPo {
    private url = '/multi-input';
    root = '#page-content';
    activeDropdownButtons = '[ng-reflect-disabled="false"] button[ng-reflect-glyph="value-help"]';
    activeInputs = '.fd-multi-input-field [ng-reflect-disabled="false"] input';
    options = 'li.is-selected';
    expandedDropdown = '.fd-list';
    filledInput = '[ng-reflect-disabled="false"] .fd-tokenizer__inner';



    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.title);
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
