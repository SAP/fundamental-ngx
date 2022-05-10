import { CoreBaseComponentPo } from './core-base-component.po';
import { click, waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ToolbarPo extends CoreBaseComponentPo {
    url = '/toolbar';

    button = ' .fd-button--standard.fd-button--compact';
    activeInfoToolbar = '.fd-toolbar--active';
    overflowButton = 'fd-toolbar-overflow-example' + this.button;
    overflowPriorityButton = 'fd-toolbar-overflow-priority-example' + this.button;
    overflowPriorityExample = 'fd-toolbar-overflow-priority-example';
    overflowGroupingExample = 'fd-toolbar-overflow-grouping-example';
    moreButton = ' [title="More"]';
    overflowBody = '.fd-toolbar__overflow';
    alwaysButton = '[label="Always"]';
    overflowGroupingButton = 'fd-toolbar-separator-example' + this.button;
    checkbox = '.fd-checkbox__label';
    dropdownMenu = '.fd-select__control.ng-star-inserted';
    dropdownOption = '.fd-list__item.ng-star-inserted';
    inputFieldText = 'div.fd-select__text-content';
    selectedHours = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[12]';
    selectedMinutes = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[54]';
    navigationUpArrowButton = 'button[glyph="navigation-up-arrow"]';
    navigationDownArrowButton = 'button[glyph="navigation-down-arrow"]';
    timeColumn = 'fd-time-column';
    period = '//span[contains(text(), " PM ")]/parent::li';
    dateTimeButton = '.fd-button--transparent.fd-button--compact';
    okButton = '[fdtype="emphasized"]';
    dateTimeInput = 'input.fd-input--compact';
    toolbarOverflowExample = 'fd-toolbar-overflow-example';
    popoverInput = 'fd-popover-body input';
    popoverButton = '.fd-toolbar__overflow-button';
    popoverToggledButton = 'fd-popover-body button:not(.fd-toolbar__overflow-button, fd-split-button button)';
    popoverSplitButton = 'fd-split-button button';
    popoverDropDown = '.fd-button-split';
    overflowInput = 'fd-toolbar-overflow-example .fd-input';

    clickDayInCalendarButtonByValue = (dayNumber: number): void => {
        click('.fd-calendar__table td.fd-calendar__item:not(.fd-calendar__item--other-month)', dayNumber - 1);
    };

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'toolbar'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'toolbar'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
