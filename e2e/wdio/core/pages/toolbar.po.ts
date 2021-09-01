import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ToolbarPo extends CoreBaseComponentPo {
    url = '/toolbar';
    root = '#page-content';
    contentPage = '#page-content';

    button = ' .fd-button--standard.fd-button--compact';
    activeInfoToolbar = '.fd-toolbar--active';
    overflowButton = '#background-ex2' + this.button;
    overflowPriorityButton = '#background-ex3' + this.button;
    overflowPriorityExample = 'fd-toolbar-overflow-priority-example';
    overflowGroupingExample = 'fd-toolbar-overflow-grouping-example';
    moreButton = ' [title="More"]';
    overflowBody = '.fd-toolbar__overflow__body';
    alwaysButton = '[label="Always"]';
    overflowGroupingButton = '#background-ex7' + this.button;
    checkbox = '.fd-checkbox__label';
    dropdownMenu = '.fd-select__control.ng-star-inserted';
    dropdownOption = '.fd-list__item.ng-star-inserted';
    inputFieldText  = 'div.fd-select__text-content';
    selectedHours = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[12]';
    selectedMinutes = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[54]';
    navigationUpArrowButton = 'button[glyph="navigation-up-arrow"]';
    navigationDownArrowButton = 'button[glyph="navigation-down-arrow"]';
    timeItem = 'span.fd-time__item';
    period = '//span[contains(text(), " PM ")]/parent::li';
    dateTimeButton = '.fd-button--transparent.fd-button--compact';
    okButton = '[fdtype="emphasized"]';
    dateTimeInput = 'input.fd-input--compact';

    dayInCalendarButtonByValue = (index: string): string => {
        return `//span[contains(.,"${index}")]/ancestor::td[not (contains(@class, 'fd-calendar__item--other-month'))]`;
    };

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.contentPage);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'toolbar'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'toolbar'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
