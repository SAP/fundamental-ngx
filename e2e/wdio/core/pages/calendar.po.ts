import { CoreBaseComponentPo } from './core-base-component.po';
import {
    click,
    getElementArrayLength,
    getElementClass,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';

export class CalendarPo extends CoreBaseComponentPo {
    url = '/calendar';
    root = '#page-content';

    // example selectors
    standardCalendar = 'fd-calendar-single-example ';
    mobileExamples = 'fd-calendar-mobile-example ';
    mobileCalendar = 'fd-dialog-body .fd-calendar ';
    calendarWithOptions = 'fd-calendar-options-example ';
    rangeHoverCalendar = 'fd-calendar-mark-hover ';
    specialDaysCalendar = 'fd-calendar-special-day-example ';
    gridCalendar = 'fd-calendar-grid-example ';
    rangeCalendar = 'fd-calendar-range-example ';
    programmaticCalendar = 'fd-calendar-programmatically-change-example ';
    mondayCalendar = 'fd-calendar-monday-start-example ';
    internationalCalendar = 'fd-calendar-i18n-example ';
    reactiveCalendarExamples = 'fd-calendar-form-example ';
    singleReactiveCalendar = 'fd-calendar-form-example [caltype="single"] ';
    rangeReactiveCalendar = 'fd-calendar-form-example [caltype="range"] ';

    // main selectors
    button = ' button';
    calendarOptionsBtn = '.fd-button--standard';
    leftArrowBtn = '.fd-calendar__action--arrow-left' + this.button;
    rightArrowBtn = '.fd-calendar__action--arrow-right' + this.button;
    yearRangeBtn = '.fd-calendar__action.ng-star-inserted' + this.button;
    monthBtn = '.fd-calendar__action.ng-star-inserted:nth-of-type(2)' + this.button;
    yearBtn = '.fd-calendar__action.ng-star-inserted:nth-of-type(3)' + this.button;
    currentDay = '.fd-calendar__item--current';
    selectedDays = '.fd-calendar__item.is-active';
    weekendDays = '.fd-calendar__item--weekend';
    disabledDays = '.fd-calendar__item.is-disabled';
    disabledWeekendDays = this.weekendDays + '.is-disabled';
    calendarItem = ' td.fd-calendar__item';
    selectionOutput = '> div';
    calendarOptions = 'fd-checkbox label';
    okBtn = 'fd-button-bar' + this.button;
    weekCount = 'th[role="rowheader"]';
    calendarAttributes = 'fd-calendar';
    markedWeekendDays = this.weekendDays + ' span';
    markedMondays = 'td:nth-of-type(2) span';
    calendarDays = 'thead .fd-calendar__item';
    markedDays = 'td[class*="fd-calendar__special-day"] span';
    rangeHoverItems = '.fd-calendar__item--range';
    calendarRow = 'tbody .fd-calendar__row';
    mondays = this.specialDaysCalendar + this.calendarRow + this.calendarItem + ':nth-child(2):not(.hidden-day)';
    sundays = this.specialDaysCalendar + this.calendarRow + this.calendarItem + ':nth-child(1):not(.hidden-day)';
    saturdays = this.specialDaysCalendar + this.calendarRow + this.calendarItem + ':nth-child(7):not(.hidden-day)';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    setCalendarRange(selector: string, startDateIndex: number, stopDateIndex: number): void {
        scrollIntoView(selector);
        click(selector, startDateIndex);
        click(selector, stopDateIndex);
    }
}
