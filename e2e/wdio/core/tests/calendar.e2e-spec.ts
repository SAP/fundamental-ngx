import { CalendarPo } from '../pages/calendar.po';
import {
    browserIsFirefox,
    click,
    doesItExist,
    executeScriptAfterTagAttr,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    isElementClickable,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed
} from '../../driver/wdio';
import {
    activeClass,
    borderAttribute,
    borderAttributeFF,
    classAttribute,
    compactAttribute,
    currentDayBorderColor,
    currentDayBorderColorFF,
    currentDayClass,
    customYearLabel,
    customYearRangeLabel,
    disabledAttribute,
    landscapeAttribute,
    markedBox,
    markedMondayColor,
    markedPastDaysColor,
    markedWeekColor,
    markedWeekendColor,
    mondayStartDate,
    portraitAttribute
} from '../fixtures/appData/calendar-contents';

describe('calendar test suite', function() {
    const calendarPage = new CalendarPo();
    const {
        standardCalendar, selectedDays, currentDay, disabledDays, button, calendarOptionsBtn, mobileExamples,
        mobileCalendar, selectionOutput, calendarWithOptions, monthBtn, leftArrowBtn, rightArrowBtn,
        calendarItem, yearBtn, yearRangeBtn, okBtn, calendarOptions, weekCount, calendarAttributes, rangeHoverCalendar,
        specialDaysCalendar, markedWeekendDays, markedMondays, gridCalendar, rangeCalendar,
        programmaticCalendar, mondayCalendar, calendarDays, internationalCalendar, singleReactiveCalendar,
        rangeReactiveCalendar, reactiveCalendarExamples, markedDays, rangeHoverItems
    } = calendarPage;

    beforeAll(() => {
        calendarPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 1);

    describe('standard calendar example', function() {
        it('should check calendar selections', () => {
            checkCurrentDayHighlighted(standardCalendar + currentDay);
            checkSingleSelection(standardCalendar, calendarItem);
            checkChangeMonthByNavArrows(standardCalendar);
            checkChangeDateByCalendarOverview(standardCalendar, monthBtn);
            checkChangeDateByCalendarOverview(standardCalendar, yearBtn);
            checkChangeYearByYearRange(standardCalendar);
        });

        it('should check disabling Wednesdays', () => {
            const startingDisabledDaysCount = getElementArrayLength(standardCalendar + disabledDays);

            click(standardCalendar + calendarOptionsBtn);
            expect(getElementArrayLength(standardCalendar + disabledDays)).not.toEqual(startingDisabledDaysCount);
        });

        it('should check selection output', () => {
            const startOutput = getText(standardCalendar + selectionOutput);

            checkSingleSelection(standardCalendar, calendarItem);
            expect(getText(standardCalendar + selectionOutput)).not.toEqual(startOutput);
        });
    });

    describe('mobile calendar examples', function() {
        it('should check landscape mode calendar selections', () => {
            click(mobileExamples + button);
            waitForElDisplayed(mobileCalendar);

            checkCurrentDayHighlighted(mobileCalendar + currentDay);
            checkSingleSelection(mobileCalendar, calendarItem);
            checkChangeMonthByNavArrows(mobileCalendar);
            checkChangeDateByCalendarOverview(mobileCalendar, monthBtn);
            checkChangeDateByCalendarOverview(mobileCalendar, yearBtn);
            checkChangeYearByYearRange(mobileCalendar);
        });

        it('should check landscape mode selection output', () => {
            const startOutput = getText(mobileExamples + selectionOutput);
            click(mobileExamples + button);
            waitForElDisplayed(mobileCalendar);

            checkSingleSelection(mobileCalendar, calendarItem);
            click(okBtn);
            expect(getText(mobileExamples + selectionOutput)).not.toEqual(startOutput);
        });

        it('should check portrait mode calendar selections', () => {
            click(mobileExamples + button, 1);
            waitForElDisplayed(mobileCalendar);

            checkCurrentDayHighlighted(mobileCalendar + currentDay);
            checkSingleSelection(mobileCalendar, calendarItem);
            checkChangeMonthByNavArrows(mobileCalendar);
            checkChangeDateByCalendarOverview(mobileCalendar, monthBtn);
            checkChangeDateByCalendarOverview(mobileCalendar, yearBtn);
            checkChangeYearByYearRange(mobileCalendar);
        });

        it('should check portrait mode selection output', () => {
            const startOutput = getText(mobileExamples + selectionOutput);
            click(mobileExamples + button, 1);
            waitForElDisplayed(mobileCalendar);

            checkSingleSelection(mobileCalendar, calendarItem);
            click(okBtn);
            expect(getText(mobileExamples + selectionOutput)).not.toEqual(startOutput);
        });

        it('should check portrait and landscape modes', () => {
            click(mobileExamples + button);
            waitForElDisplayed(mobileCalendar);

            expect(getAttributeByName(mobileCalendar, classAttribute)).toContain(landscapeAttribute);

            click(okBtn);
            click(mobileExamples + button, 1);
            waitForElDisplayed(mobileCalendar);

            expect(getAttributeByName(mobileCalendar, classAttribute)).toContain(portraitAttribute);
        });
    });

    describe('calendar options example', function() {
        it('should check calendar selections', () => {
            checkCurrentDayHighlighted(calendarWithOptions + currentDay);
            checkSingleSelection(calendarWithOptions, calendarItem);
            checkChangeMonthByNavArrows(calendarWithOptions);
            checkChangeDateByCalendarOverview(calendarWithOptions, monthBtn);
            checkChangeDateByCalendarOverview(calendarWithOptions, yearBtn);
            checkChangeYearByYearRange(calendarWithOptions);
        });

        it('should check ability to enable week count', () => {
            click(calendarWithOptions + calendarOptions);
            expect(isElementDisplayed(calendarWithOptions + weekCount)).toBe(true);
        });

        it('should check ability to enable compact mode', () => {
            click(calendarWithOptions + calendarOptions, 1);
            expect(getAttributeByName(calendarWithOptions + calendarAttributes, classAttribute)).toContain(compactAttribute);
        });

        it('should check ability to mark weekends', () => {
            click(calendarWithOptions + calendarOptions, 2);
            expect(isElementDisplayed(calendarWithOptions + markedWeekendDays)).toBe(true);
        });
    });

    describe('mark range days on hover example', function() {
        it('should check range selection', () => {
            checkRangeSelection(rangeHoverCalendar);
        });

        it('should highlight options after marking start day', () => {
            scrollIntoView(rangeHoverCalendar);
            click(rangeHoverCalendar + calendarItem, 3);
            mouseHoverElement(rangeHoverCalendar + calendarItem, 23);
            expect(doesItExist(rangeHoverCalendar + rangeHoverItems)).toBe(true);
        });
    });

    describe('calendar with special days example', function() {
        it('should check ability to mark weekends', () => {
            click(specialDaysCalendar + calendarOptions);
            expect(executeScriptAfterTagAttr(specialDaysCalendar + markedWeekendDays, markedBox))
                .toContain(markedWeekendColor);
        });

        it('should check ability to mark next week', () => {
            click(specialDaysCalendar + calendarOptions, 1);
            expect(executeScriptAfterTagAttr(specialDaysCalendar + markedDays, markedBox))
                .toContain(markedWeekColor);
        });

        it('should check ability to mark all Mondays', () => {
            click(specialDaysCalendar + calendarOptions, 2);
            expect(executeScriptAfterTagAttr(specialDaysCalendar + markedMondays, markedBox))
                .toContain(markedMondayColor);
        });

        it('should check ability to mark past days', () => {
            click(specialDaysCalendar + calendarOptions, 3);
            expect(executeScriptAfterTagAttr(specialDaysCalendar + markedDays, markedBox))
                .toContain(markedPastDaysColor);
        });

        it('should check calendar selections', () => {
            checkCurrentDayHighlighted(specialDaysCalendar + currentDay);
            checkSingleSelection(specialDaysCalendar, calendarItem);
            checkChangeMonthByNavArrows(specialDaysCalendar);
            checkChangeDateByCalendarOverview(specialDaysCalendar, monthBtn);
            checkChangeDateByCalendarOverview(specialDaysCalendar, yearBtn);
            checkChangeYearByYearRange(specialDaysCalendar);
        });
    });

    describe('calendar year grid example', function() {
        it('should check custom year labels', () => {
            click(gridCalendar + yearBtn);
            expect(getText(gridCalendar + calendarItem)).toContain(customYearLabel);

            click(gridCalendar + yearRangeBtn);
            expect(getText(gridCalendar + calendarItem)).toContain(customYearRangeLabel);
        });

        it('should check calendar selections', () => {
            checkCurrentDayHighlighted(gridCalendar + currentDay);
            checkSingleSelection(gridCalendar, calendarItem);
            checkChangeMonthByNavArrows(gridCalendar);
            checkChangeDateByCalendarOverview(gridCalendar, monthBtn);
            checkChangeDateByCalendarOverview(gridCalendar, yearBtn);
            checkChangeYearByYearRange(gridCalendar);
        });
    });

    describe('range selection calendar example', function() {
        it('should check range selection', () => {
            scrollIntoView(rangeCalendar);
            click(rangeCalendar + calendarItem, 3);
            click(rangeCalendar + calendarItem, 23);

            expect(getAttributeByName(rangeCalendar + calendarItem, classAttribute, 3)).toContain(activeClass);
            expect(getAttributeByName(rangeCalendar + calendarItem, classAttribute, 23)).toContain(activeClass);
        });
    });

    describe('programmatic date change example', function() {
        it('should check calendar selections', () => {
            checkCurrentDayHighlighted(programmaticCalendar + currentDay);
            checkSingleSelection(programmaticCalendar, calendarItem);
            checkChangeMonthByNavArrows(programmaticCalendar);
            checkChangeDateByCalendarOverview(programmaticCalendar, monthBtn);
            checkChangeDateByCalendarOverview(programmaticCalendar, yearBtn);
            checkChangeYearByYearRange(programmaticCalendar);
        });

        it('should check ability to change day with button', () => {
            const startDay = getText(programmaticCalendar + selectedDays);
            click(programmaticCalendar + button, 4);

            expect(getText(programmaticCalendar + selectedDays)).not.toEqual(startDay);
        });
    });

    describe('monday start calendar example', function() {
        it('should check calendar starts on Monday', () => {
            expect(getText(mondayCalendar + calendarDays)).toEqual(mondayStartDate);
        });

        it('should check calendar selections', () => {
            checkSingleSelection(mondayCalendar, calendarItem);
            checkChangeMonthByNavArrows(mondayCalendar);
            checkChangeDateByCalendarOverview(mondayCalendar, monthBtn);
            checkChangeDateByCalendarOverview(mondayCalendar, yearBtn, 3);
            checkChangeYearByYearRange(mondayCalendar);
        });
    });

    describe('internationalization example', function() {
        it('should check calendar selection', () => {
            checkSingleSelection(internationalCalendar, calendarItem);
            checkChangeMonthByNavArrows(internationalCalendar);
            checkChangeDateByCalendarOverview(internationalCalendar, monthBtn);
            checkChangeDateByCalendarOverview(internationalCalendar, yearBtn, 3);
            checkChangeYearByYearRange(internationalCalendar);
        });
    });

    describe('calendar in reactive form example', function() {
        it('should check single reactive calendar selections', () => {
            checkSingleSelection(singleReactiveCalendar, calendarItem);
        });

        it('should check range reactive calendar selections', () => {
            checkRangeSelection(rangeReactiveCalendar);
        });

        it('should check invalid date buttons', () => {
            expect(isElementClickable(reactiveCalendarExamples + button, 4)).toBe(true);
            expect(isElementClickable(reactiveCalendarExamples + button, 9)).toBe(true);
        });
    });

    describe('check orientation', function() {
        it('should check orientation', () => {
            calendarPage.checkRtlSwitch();
        });
    });

    function checkChangeMonthByNavArrows(calendar: string): void {
        const startMonth = getText(calendar + monthBtn);

        scrollIntoView(calendar + monthBtn);
        click(calendar + leftArrowBtn);

        expect(getText(calendar + monthBtn)).not.toEqual(startMonth);
        click(calendar + rightArrowBtn);

        expect(getText(calendar + monthBtn)).toEqual(startMonth);
        click(calendar + rightArrowBtn);

        expect(getText(calendar + monthBtn)).not.toEqual(startMonth);
    }

    function checkChangeDateByCalendarOverview(calendar: string, selector: string, itemIndex: number = 0): void {
        const startDate = getText(calendar + selector);

        scrollIntoView(calendar + selector);
        click(calendar + selector);
        const calendarItemsClass = getAttributeByName(calendar + calendarItem, classAttribute, itemIndex);

        if (!calendarItemsClass.includes(currentDayClass)) {
            click(calendar + calendarItem, itemIndex);
        }
        if (calendarItemsClass.includes(currentDayClass)) {
            click(calendar + calendarItem, itemIndex + 1);
        }

        expect(getText(calendar + selector)).not.toEqual(startDate);
    }

    function checkChangeYearByYearRange(calendar: string): void {
        const startYear = getText(calendar + yearBtn);

        scrollIntoView(calendar + yearBtn);
        click(calendar + yearBtn);
        click(calendar + yearRangeBtn);
        click(calendar + calendarItem);
        const calendarItemsClass = getAttributeByName(calendar + calendarItem, classAttribute);

        if (!calendarItemsClass.includes(currentDayClass)) {
            click(calendar + calendarItem);
        }
        if (calendarItemsClass.includes(currentDayClass)) {
            click(calendar + calendarItem, 1);
        }

        expect(getText(calendar + yearBtn)).not.toEqual(startYear);
    }

    function checkSingleSelection(calendar: string, selector: string, index: number = 0): void {
        const startDay = getText(calendar + selectedDays, index);

        scrollIntoView(calendar + selector, index);

        if (getAttributeByName(calendar + selector, disabledAttribute, index) === 'true') {
            click(calendar + selector, index + 2);
            expect(getAttributeByName(calendar + selector, classAttribute, index + 2)).toContain(activeClass);
        }
        if (getAttributeByName(calendar + selector, disabledAttribute, index) === 'false') {
            click(calendar + selector, index);
            expect(getAttributeByName(calendar + selector, classAttribute, index)).toContain(activeClass);
        }

        expect(getElementArrayLength(calendar + selectedDays)).toBe(1);
        expect(getText(calendar + selectedDays, index)).not.toEqual(startDay);
    }

    function checkRangeSelection(calendar: string): void {
        const startDay = getText(calendar + selectedDays);
        const endDay = getText(calendar + selectedDays, 1);

        scrollIntoView(calendar);
        click(calendar + calendarItem, 3);
        click(calendar + calendarItem, 23);

        expect(getText(calendar + selectedDays)).not.toEqual(startDay);
        expect(getText(calendar + selectedDays, 1)).not.toEqual(endDay);
    }
});

function checkCurrentDayHighlighted(selector: string): void {
    scrollIntoView(selector);
    expect(getCSSPropertyByName(selector, browserBorder()).value).toContain(browserBorderColor());
}

function browserBorder(): string {
    return (browserIsFirefox() ? borderAttributeFF : borderAttribute);
}

function browserBorderColor(): string {
    return (browserIsFirefox() ? currentDayBorderColorFF : currentDayBorderColor);
}
