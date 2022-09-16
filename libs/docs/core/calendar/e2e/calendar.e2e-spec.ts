import { CalendarPo } from './calendar.po';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    isElementClickable,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    activeClass,
    activeItem,
    classAttribute,
    compactAttribute,
    currentDayClass,
    currentItem,
    customYearLabel,
    customYearRangeLabel,
    disabledAttribute,
    landscapeAttribute,
    mondayStartDate,
    otherMonth,
    portraitAttribute
} from './calendar-contents';

describe('calendar test suite', () => {
    const calendarPage = new CalendarPo();
    const {
        standardCalendar,
        selectedDays,
        currentDay,
        button,
        calendarOptionsBtn,
        mobileExamples,
        mobileCalendar,
        selectionOutput,
        calendarWithOptions,
        monthBtn,
        leftArrowBtn,
        rightArrowBtn,
        calendarItem,
        yearBtn,
        yearRangeBtn,
        okBtn,
        calendarOptions,
        weekCount,
        calendarAttributes,
        rangeHoverCalendar,
        specialDaysCalendar,
        markedWeekendDays,
        gridCalendar,
        rangeCalendar,
        programmaticCalendar,
        mondayCalendar,
        calendarDays,
        internationalCalendar,
        singleReactiveCalendar,
        rangeReactiveCalendar,
        reactiveCalendarExamples,
        rangeHoverItems,
        setCalendarRange,
        mondays,
        sundays,
        saturdays,
        wednesdays
    } = calendarPage;

    beforeAll(() => {
        calendarPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(calendarPage.root);
        waitForElDisplayed(calendarPage.title);
    }, 1);

    describe('standard calendar example', () => {
        it('should check calendar selections', () => {
            checkCurrentDayHighlighted(standardCalendar);
            checkSingleSelection(standardCalendar, calendarItem);
            checkChangeMonthByNavArrows(standardCalendar);
            checkChangeDateByCalendarOverview(standardCalendar, monthBtn);
            checkChangeDateByCalendarOverview(standardCalendar, yearBtn);
            checkChangeYearByYearRange(standardCalendar);
        });

        it('should check disabling Wednesdays', () => {
            const wednesdaysLength = getElementArrayLength(wednesdays);

            click(standardCalendar + calendarOptionsBtn);
            for (let i = 0; i < wednesdaysLength; i++) {
                expect(getAttributeByName(wednesdays, 'aria-disabled', i)).toBe('true');
            }
        });

        it('should check selection output', () => {
            const startOutput = getText(standardCalendar + selectionOutput);

            checkSingleSelection(standardCalendar, calendarItem);

            expect(getText(standardCalendar + selectionOutput)).not.toEqual(startOutput);
        });
    });

    describe('mobile calendar examples', () => {
        it('should check landscape mode calendar selections', () => {
            click(mobileExamples + button);
            waitForElDisplayed(mobileCalendar);

            checkCurrentDayHighlighted(mobileCalendar);
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

            checkCurrentDayHighlighted(mobileCalendar);
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

    describe('calendar options example', () => {
        it('should check calendar selections', () => {
            checkCurrentDayHighlighted(calendarWithOptions);
            checkSingleSelection(calendarWithOptions, calendarItem);
            checkChangeMonthByNavArrows(calendarWithOptions);
            checkChangeDateByCalendarOverview(calendarWithOptions, monthBtn);
            checkChangeDateByCalendarOverview(calendarWithOptions, yearBtn);
            checkChangeYearByYearRange(calendarWithOptions);
        });

        it('should check ability to enable week count', () => {
            expect(doesItExist(calendarWithOptions + weekCount)).toBe(
                false,
                'calendar week count present when it should not be'
            );

            click(calendarWithOptions + calendarOptions);

            expect(isElementDisplayed(calendarWithOptions + weekCount)).toBe(
                true,
                'calendat week count not present when it should be'
            );
        });

        it('should check ability to enable/disable compact mode', () => {
            expect(getAttributeByName(calendarWithOptions + calendarAttributes, classAttribute)).toContain(
                compactAttribute
            );

            click(calendarWithOptions + calendarOptions, 1);

            expect(getAttributeByName(calendarWithOptions + calendarAttributes, classAttribute)).not.toContain(
                compactAttribute
            );
        });

        it('should check ability to mark weekends', () => {
            expect(doesItExist(calendarWithOptions + markedWeekendDays)).toBe(
                false,
                'weekends marked when they should not be'
            );

            click(calendarWithOptions + calendarOptions, 2);

            expect(isElementDisplayed(calendarWithOptions + markedWeekendDays)).toBe(
                true,
                'weekends not marked when they should be'
            );
        });
    });

    describe('mark range days on hover example', () => {
        it('should check range selection', () => {
            checkRangeSelection(rangeHoverCalendar + calendarItem);
        });

        it('should highlight options after marking start day', () => {
            scrollIntoView(rangeHoverCalendar);
            click(rangeHoverCalendar + calendarItem, 3);
            mouseHoverElement(rangeHoverCalendar + calendarItem, 23);
            expect(doesItExist(rangeHoverCalendar + rangeHoverItems)).toBe(true, 'range hover not highlighting days');
        });
    });

    describe('calendar with special days example', () => {
        it('should check ability to mark weekends', () => {
            click(specialDaysCalendar + calendarOptions);
            for (let i = 0; i < getElementArrayLength(saturdays); i++) {
                expect(getElementClass(saturdays, i)).toContain('special-day');
                expect(getElementClass(sundays, i)).toContain('special-day');
            }
        });

        it('should check ability to mark next week', () => {
            click(specialDaysCalendar + calendarOptions, 1);
            let tomorrowsDayIndex = getCurrentDayIndex(specialDaysCalendar) + 1;
            if (tomorrowsDayIndex + 7 > getElementArrayLength(specialDaysCalendar + calendarItem)) {
                click(specialDaysCalendar + rightArrowBtn);
                tomorrowsDayIndex = getCurrentDayIndex(specialDaysCalendar, 'is-active') + 1;
            }
            for (let i = tomorrowsDayIndex; i < tomorrowsDayIndex + 7; i++) {
                expect(getElementClass(specialDaysCalendar + calendarItem, i)).toContain('special-day');
            }
            click(specialDaysCalendar + calendarOptions, 1);
            for (let i = tomorrowsDayIndex; i < tomorrowsDayIndex + 7; i++) {
                expect(getElementClass(specialDaysCalendar + calendarItem, i)).not.toContain('special-day');
            }
        });

        it('should check ability to mark all Mondays', () => {
            click(specialDaysCalendar + calendarOptions, 2);
            for (let i = 0; i < getElementArrayLength(mondays); i++) {
                expect(getElementClass(mondays, i)).toContain('special-day');
            }
            click(specialDaysCalendar + calendarOptions, 2);
            for (let i = 0; i < getElementArrayLength(mondays); i++) {
                expect(getElementClass(mondays, i)).not.toContain('special-day');
            }
        });

        it('should check ability to mark past days', () => {
            click(specialDaysCalendar + calendarOptions, 3);
            for (let i = getCurrentDayIndex(specialDaysCalendar) - 1; i !== 0; i--) {
                expect(getElementClass(specialDaysCalendar + calendarItem, i)).toContain('special-day');
            }
        });

        it('should check calendar selections', () => {
            checkCurrentDayHighlighted(specialDaysCalendar);
            checkSingleSelection(specialDaysCalendar, calendarItem);
            checkChangeMonthByNavArrows(specialDaysCalendar);
            checkChangeDateByCalendarOverview(specialDaysCalendar, monthBtn);
            checkChangeDateByCalendarOverview(specialDaysCalendar, yearBtn);
            checkChangeYearByYearRange(specialDaysCalendar);
        });
    });

    describe('calendar year grid example', () => {
        it('should check custom year labels', () => {
            click(gridCalendar + yearBtn);
            expect(getText(gridCalendar + calendarItem)).toContain(customYearLabel);

            click(gridCalendar + yearRangeBtn);
            expect(getText(gridCalendar + calendarItem)).toContain(customYearRangeLabel);
        });

        it('should check calendar selections', () => {
            checkCurrentDayHighlighted(gridCalendar);
            checkSingleSelection(gridCalendar, calendarItem);
            checkChangeMonthByNavArrows(gridCalendar);
            checkChangeDateByCalendarOverview(gridCalendar, monthBtn);
            checkChangeDateByCalendarOverview(gridCalendar, yearBtn);
            checkChangeYearByYearRange(gridCalendar);
        });
    });

    describe('range selection calendar example', () => {
        it('should check range selection', () => {
            scrollIntoView(rangeCalendar);
            click(rangeCalendar + calendarItem, 3);
            click(rangeCalendar + calendarItem, 23);

            expect(getAttributeByName(rangeCalendar + calendarItem, classAttribute, 3)).toContain(activeClass);
            expect(getAttributeByName(rangeCalendar + calendarItem, classAttribute, 23)).toContain(activeClass);
        });
    });

    describe('programmatic date change example', () => {
        it('should check calendar selections', () => {
            checkCurrentDayHighlighted(programmaticCalendar);
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

    describe('monday start calendar example', () => {
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

    describe('internationalization example', () => {
        it('should check calendar selection', () => {
            checkSingleSelection(internationalCalendar, calendarItem);
            checkChangeMonthByNavArrows(internationalCalendar);
            checkChangeDateByCalendarOverview(internationalCalendar, monthBtn);
            checkChangeDateByCalendarOverview(internationalCalendar, yearBtn, 3);
            checkChangeYearByYearRange(internationalCalendar);
        });
    });

    describe('calendar in reactive form example', () => {
        it('should check single reactive calendar selections', () => {
            checkSingleSelection(singleReactiveCalendar, calendarItem);
        });

        it('should check range reactive calendar selections', () => {
            checkRangeSelection(rangeReactiveCalendar + calendarItem);
        });

        it('should check invalid date buttons', () => {
            expect(isElementClickable(reactiveCalendarExamples + button, 4)).toBe(true, 'button not clickable');
            expect(isElementClickable(reactiveCalendarExamples + button, 9)).toBe(true, 'button not clickable');
        });
    });

    describe('check orientation', () => {
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
    }

    function checkChangeDateByCalendarOverview(calendar: string, selector: string, itemIndex: number = 0): void {
        const startDate = getText(calendar + selector);

        scrollIntoView(calendar + selector);
        click(calendar + selector);
        const calendarItemsClass = getAttributeByName(calendar + calendarItem, classAttribute, itemIndex);

        itemIndex = calendarItemsClass.includes(currentDayClass) ? itemIndex + 1 : itemIndex;
        click(calendar + calendarItem, itemIndex);

        expect(getText(calendar + selector)).not.toEqual(startDate);
    }

    function checkChangeYearByYearRange(calendar: string): void {
        const startYear = getText(calendar + yearBtn);
        let index = 0;

        scrollIntoView(calendar + yearBtn);
        click(calendar + yearBtn);
        click(calendar + yearRangeBtn);
        click(calendar + calendarItem);
        const calendarItemsClass = getAttributeByName(calendar + calendarItem, classAttribute);

        index = calendarItemsClass.includes(currentDayClass) ? index + 1 : index;
        click(calendar + calendarItem, index);

        expect(getText(calendar + yearBtn)).not.toEqual(startYear);
    }

    function checkSingleSelection(calendar: string, selector: string, index: number = 0): void {
        scrollIntoView(calendar + selector, index);

        while (
            getAttributeByName(calendar + selector, disabledAttribute, index) === 'true' ||
            getAttributeByName(calendar + selector, classAttribute, index).includes(otherMonth) ||
            getAttributeByName(calendar + selector, classAttribute, index).includes(currentItem) ||
            getAttributeByName(calendar + selector, classAttribute, index).includes(activeItem)
        ) {
            index++;
        }

        click(calendar + selector, index);

        expect(getAttributeByName(calendar + selector, classAttribute, index)).toContain(activeClass);
        expect(getElementArrayLength(calendar + selectedDays)).toBe(1);
    }

    function checkRangeSelection(calendar: string): void {
        const startDay = getText(calendar + selectedDays);
        const endDay = getText(calendar + selectedDays, 1);

        setCalendarRange(calendar, 2, 23);

        expect(getText(calendar + selectedDays)).not.toEqual(startDay);
        expect(getText(calendar + selectedDays, 1)).not.toEqual(endDay);
    }

    function checkCurrentDayHighlighted(calendar: string): void {
        scrollIntoView(calendar);
        expect(doesItExist(calendar + currentDay)).toBe(true);
        expect(getElementArrayLength(calendar + currentDay)).toBe(1);
    }

    function getCurrentDayIndex(selector: string, Class: string = 'current'): number {
        for (let i = 0; i < getElementArrayLength(selector + calendarItem); i++) {
            if (getElementClass(selector + calendarItem, i).includes(Class)) {
                return i;
            }
        }
        return -1;
    }
});
