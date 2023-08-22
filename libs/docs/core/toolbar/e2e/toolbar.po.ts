import { click, CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

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
    dateTimeButton = 'fd-toolbar-overflow-example .fd-button--transparent.fd-input-group__button';
    okButton = '[fdtype="emphasized"]';
    dateTimeInput = 'fd-datetime-picker input.fd-input';
    toolbarOverflowExample = 'fd-toolbar-overflow-example';
    popoverInput = 'fd-popover-body input';
    popoverButton = '.fd-toolbar__overflow-button';
    popoverToggledButton = 'fd-popover-body button:not(.fd-toolbar__overflow-button, fd-split-button button)';
    popoverSplitButton = 'fd-split-button button';
    popoverDropDown = '.fd-button-split';
    overflowInput = 'fd-toolbar-overflow-example .fd-input';

    clickDayInCalendarButtonByValue = async (dayNumber: number): Promise<void> => {
        await click('.fd-calendar__content td.fd-calendar__item:not(.fd-calendar__item--other)', dayNumber - 1);
    };

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'toolbar'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'toolbar'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
