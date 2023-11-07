import { CalendarPo } from './calendar.po';
// eslint-disable-next-line @nx/enforce-module-boundaries
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
    pause,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed
} from '../../../../../e2e';
import {
    activeClass,
    activeItem,
    calendarDayActiveClass,
    classAttribute,
    compactAttribute,
    currentDayClass,
    currentItem,
    customYearLabel,
    customYearRangeLabel,
    disabledAttribute,
    fridayStartDate,
    landscapeAttribute,
    mondayStartDate,
    otherMonth,
    portraitAttribute,
    tuesdayStartDate
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
        calendarMyItem,
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
        cdkOverlay,
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

    beforeAll(async () => {
        await calendarPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await calendarPage.waitForRoot();
        await waitForElDisplayed(calendarPage.title);
    }, 1);

    xdescribe('standard calendar example', () => {
        it('should check calendar selections', async () => {
            await checkCurrentDayHighlighted(standardCalendar);
            await checkSingleSelection(standardCalendar, calendarItem);
            await checkChangeMonthByNavArrows(standardCalendar);
            await checkChangeDateByCalendarOverview(standardCalendar, monthBtn);
            await checkChangeDateByCalendarOverview(standardCalendar, yearBtn);
            await checkChangeYearByYearRange(standardCalendar);
        });

        it('should check disabling Wednesdays', async () => {
            const wednesdaysLength = await getElementArrayLength(wednesdays);

            await click(standardCalendar + calendarOptionsBtn);
            for (let i = 0; i < wednesdaysLength; i++) {
                await expect(await getAttributeByName(wednesdays, 'aria-disabled', i)).toBe('true');
            }
        });

        it('should check selection output', async () => {
            const startOutput = await getText(standardCalendar + selectionOutput);

            await checkSingleSelection(standardCalendar, calendarItem);

            await expect(await getText(standardCalendar + selectionOutput)).not.toEqual(startOutput);
        });
    });

    xdescribe('mobile calendar examples', () => {
        it('should check landscape mode calendar selections', async () => {
            await click(mobileExamples + button);
            await pause(500);

            await checkCurrentDayHighlighted(mobileCalendar);
            await checkSingleSelection(mobileCalendar, calendarItem);
            await checkChangeMonthByNavArrows(mobileCalendar);
            await checkChangeDateByCalendarOverview(mobileCalendar, monthBtn);
            await checkChangeDateByCalendarOverview(mobileCalendar, yearBtn);
            await checkChangeYearByYearRange(mobileCalendar);
        });

        it('should check landscape mode selection output', async () => {
            const startOutput = await getText(mobileExamples + selectionOutput);
            await click(mobileExamples + button);
            await pause(500);

            await checkSingleSelection(mobileCalendar, calendarItem);
            await click(okBtn);
            await expect(await getText(mobileExamples + selectionOutput)).not.toEqual(startOutput);
        });

        it('should check portrait mode calendar selections', async () => {
            await click(mobileExamples + button, 1);
            await pause(500);

            await checkCurrentDayHighlighted(mobileCalendar);
            await checkSingleSelection(mobileCalendar, calendarItem);
            await checkChangeMonthByNavArrows(mobileCalendar);
            await checkChangeDateByCalendarOverview(mobileCalendar, monthBtn);
            await checkChangeDateByCalendarOverview(mobileCalendar, yearBtn);
            await checkChangeYearByYearRange(mobileCalendar);
        });

        it('should check portrait mode selection output', async () => {
            const startOutput = await getText(mobileExamples + selectionOutput);
            await click(mobileExamples + button, 1);
            await pause(500);

            await checkSingleSelection(mobileCalendar, calendarItem);
            await click(okBtn);
            await expect(await getText(mobileExamples + selectionOutput)).not.toEqual(startOutput);
        });

        it('should check portrait and landscape modes', async () => {
            await click(mobileExamples + button);
            await pause(500);

            await expect(await getAttributeByName(mobileCalendar, classAttribute)).toContain(landscapeAttribute);

            await click(okBtn);
            await pause(500);
            await click(mobileExamples + button, 1);
            await pause(500);

            await expect(await getAttributeByName(mobileCalendar, classAttribute)).toContain(portraitAttribute);
        });
    });

    xdescribe('calendar options example', () => {
        it('should check calendar selections', async () => {
            await checkCurrentDayHighlighted(calendarWithOptions);
            await checkSingleSelection(calendarWithOptions, calendarItem);
            await checkChangeMonthByNavArrows(calendarWithOptions);
            await checkChangeDateByCalendarOverview(calendarWithOptions, monthBtn);
            await checkChangeDateByCalendarOverview(calendarWithOptions, yearBtn);
            await checkChangeYearByYearRange(calendarWithOptions);
        });

        it('should check ability to enable week count', async () => {
            await expect(await doesItExist(calendarWithOptions + weekCount)).toBe(
                false,
                'calendar week count present when it should not be'
            );

            await click(calendarWithOptions + calendarOptions);

            await expect(await isElementDisplayed(calendarWithOptions + weekCount)).toBe(
                true,
                'calendat week count not present when it should be'
            );
        });

        it('should check ability to enable/disable compact mode', async () => {
            await expect(await getAttributeByName(calendarWithOptions + calendarAttributes, classAttribute)).toContain(
                compactAttribute
            );

            await click(calendarWithOptions + calendarOptions, 1);

            await expect(
                await getAttributeByName(calendarWithOptions + calendarAttributes, classAttribute)
            ).not.toContain(compactAttribute);
        });

        it('should check ability to mark weekends', async () => {
            await expect(await doesItExist(calendarWithOptions + markedWeekendDays)).toBe(
                false,
                'weekends marked when they should not be'
            );

            await click(calendarWithOptions + calendarOptions, 2);

            await expect(await isElementDisplayed(calendarWithOptions + markedWeekendDays)).toBe(
                true,
                'weekends not marked when they should be'
            );
        });
    });

    xdescribe('mark range days on hover example', () => {
        it('should check range selection', async () => {
            await checkRangeSelection(rangeHoverCalendar + calendarItem);
        });

        it('should highlight options after marking start day', async () => {
            await scrollIntoView(rangeHoverCalendar);
            await click(rangeHoverCalendar + calendarItem, 3);
            await mouseHoverElement(rangeHoverCalendar + calendarItem, 23);
            await expect(await doesItExist(rangeHoverCalendar + rangeHoverItems)).toBe(
                true,
                'range hover not highlighting days'
            );
        });
    });

    describe('calendar with special days example', () => {
        it('should check ability to mark weekends', async () => {
            await click(specialDaysCalendar + calendarOptions);
            for (let i = 0; i < (await getElementArrayLength(saturdays)); i++) {
                await expect(await getElementClass(saturdays, i)).toContain('-legend-');
                await expect(await getElementClass(sundays, i)).toContain('-legend-');
            }
        });

        it('should check ability to mark next week', async () => {
            const nextMonthButton = specialDaysCalendar + rightArrowBtn;

            await click(specialDaysCalendar + calendarOptions, 1);

            const today = new Date();
            const endDate = new Date(today);
            endDate.setDate(today.getDate() + 7);
            const nextDayAfterEndDate = new Date(endDate);
            nextDayAfterEndDate.setDate(nextDayAfterEndDate.getDate() + 1);

            if (endDate.getDate() < today.getDate()) {
                await click(nextMonthButton);
            }

            expect(
                await (
                    await $(
                        `fd-calendar-special-day-example .fd-calendar__item[data-fd-calendar-date-day="${endDate.getDate()}"]:not(.fd-calendar__item--other)`
                    )
                ).getAttribute('class')
            ).toContain('-legend-');

            expect(
                await (
                    await $(
                        `fd-calendar-special-day-example .fd-calendar__item[data-fd-calendar-date-day="${nextDayAfterEndDate.getDate()}"]:not(.fd-calendar__item--other)`
                    )
                ).getAttribute('class')
            ).not.toContain('-legend-');
        });

        it('should check ability to mark all Mondays', async () => {
            await click(specialDaysCalendar + calendarOptions, 2);
            for (let i = 0; i < (await getElementArrayLength(mondays)); i++) {
                await expect(await getElementClass(mondays, i)).toContain('-legend-');
            }
            await click(specialDaysCalendar + calendarOptions, 2);
            for (let i = 0; i < (await getElementArrayLength(mondays)); i++) {
                await expect(await getElementClass(mondays, i)).not.toContain('-legend-');
            }
        });

        it('should check ability to mark past days', async () => {
            await click(specialDaysCalendar + calendarOptions, 3);
            for (let i = (await getCurrentDayIndex(specialDaysCalendar)) - 1; i !== 0; i--) {
                await expect(await getElementClass(specialDaysCalendar + calendarItem, i)).toContain('-legend-');
            }
        });

        it('should check calendar selections', async () => {
            await checkCurrentDayHighlighted(specialDaysCalendar);
            await checkSingleSelection(specialDaysCalendar, calendarItem);
            await checkChangeMonthByNavArrows(specialDaysCalendar);
            // await pause(20000);
            await checkChangeDateByCalendarOverview(specialDaysCalendar, monthBtn);
            await checkChangeDateByCalendarOverview(specialDaysCalendar, yearBtn);
            await checkChangeYearByYearRange(specialDaysCalendar);
        });
    });

    xdescribe('calendar year grid example', () => {
        it('should check custom year labels', async () => {
            await click(gridCalendar + yearBtn);
            await expect(await getText(gridCalendar + calendarItem)).toContain(customYearLabel);

            await click(gridCalendar + yearRangeBtn);
            await expect(await getText(gridCalendar + calendarItem)).toContain(customYearRangeLabel);
        });

        it('should check calendar selections', async () => {
            await checkCurrentDayHighlighted(gridCalendar);
            await checkSingleSelection(gridCalendar, calendarItem);
            await checkChangeMonthByNavArrows(gridCalendar);
            await checkChangeDateByCalendarOverview(gridCalendar, monthBtn);
            await checkChangeDateByCalendarOverview(gridCalendar, yearBtn);
            await checkChangeYearByYearRange(gridCalendar);
        });
    });

    xdescribe('range selection calendar example', () => {
        it('should check range selection', async () => {
            await scrollIntoView(rangeCalendar);
            await click(rangeCalendar + calendarItem, 3);
            await click(rangeCalendar + calendarItem, 23);

            await expect(await getAttributeByName(rangeCalendar + calendarItem, classAttribute, 3)).toContain(
                activeClass
            );
            await expect(await getAttributeByName(rangeCalendar + calendarItem, classAttribute, 23)).toContain(
                activeClass
            );
        });
    });

    xdescribe('programmatic date change example', () => {
        it('should check calendar selections', async () => {
            await checkCurrentDayHighlighted(programmaticCalendar);
            await checkSingleSelection(programmaticCalendar, calendarItem);
            await checkChangeMonthByNavArrows(programmaticCalendar);
            await checkChangeDateByCalendarOverview(programmaticCalendar, monthBtn);
            await checkChangeDateByCalendarOverview(programmaticCalendar, yearBtn);
            await checkChangeYearByYearRange(programmaticCalendar);
        });

        it('should check ability to change day with button', async () => {
            const startDay = await getText(programmaticCalendar + selectedDays);
            await click(programmaticCalendar + button, 4);

            await expect(await getText(programmaticCalendar + selectedDays)).not.toEqual(startDay);
        });
    });

    xdescribe('monday start calendar example', () => {
        it('should check calendar starts on Monday', async () => {
            await expect(await getText(mondayCalendar + calendarDays)).toEqual(mondayStartDate);
        });

        it('should check calendar after changing starting day', async () => {
            await click(mondayCalendar + ' .fd-select .fd-button');
            await waitForElDisplayed(cdkOverlay + ' li.fd-list__item');
            await click(cdkOverlay + ' li.fd-list__item', 2);
            await expect(await getText(mondayCalendar + calendarDays)).toEqual(tuesdayStartDate);
            await click(mondayCalendar + ' .fd-select .fd-button');
            await waitForElDisplayed(cdkOverlay + ' li.fd-list__item');
            await click(cdkOverlay + ' li.fd-list__item', 5);
            await expect(await getText(mondayCalendar + calendarDays)).toEqual(fridayStartDate);
        });

        it('should check calendar selections', async () => {
            await checkSingleSelection(mondayCalendar, calendarItem);
            await checkChangeMonthByNavArrows(mondayCalendar);
            await checkChangeDateByCalendarOverview(mondayCalendar, monthBtn);
            await checkChangeDateByCalendarOverview(mondayCalendar, yearBtn, 3);
            await checkChangeYearByYearRange(mondayCalendar);
        });
    });

    xdescribe('internationalization example', () => {
        it('should check calendar selection', async () => {
            await checkSingleSelection(internationalCalendar, calendarItem);
            await checkChangeMonthByNavArrows(internationalCalendar);
            await checkChangeDateByCalendarOverview(internationalCalendar, monthBtn);
            await checkChangeDateByCalendarOverview(internationalCalendar, yearBtn, 3);
            await checkChangeYearByYearRange(internationalCalendar);
        });
    });

    xdescribe('calendar in reactive form example', () => {
        it('should check single reactive calendar selections', async () => {
            await checkSingleSelection(singleReactiveCalendar, calendarItem);
        });

        it('should check range reactive calendar selections', async () => {
            await checkRangeSelection(rangeReactiveCalendar + calendarItem);
        });

        it('should check invalid date buttons', async () => {
            await expect(await isElementClickable(reactiveCalendarExamples + button, 4)).toBe(
                true,
                'button not clickable'
            );
            await expect(await isElementClickable(reactiveCalendarExamples + button, 9)).toBe(
                true,
                'button not clickable'
            );
        });
    });

    xdescribe('check orientation', () => {
        it('should check orientation', async () => {
            await calendarPage.checkRtlSwitch();
        });
    });

    async function checkChangeMonthByNavArrows(calendar: string): Promise<void> {
        const startMonth = await getText(calendar + monthBtn);

        await scrollIntoView(calendar + monthBtn);
        await click(calendar + leftArrowBtn);

        await expect(await getText(calendar + monthBtn)).not.toEqual(startMonth);
        await click(calendar + rightArrowBtn);

        await expect(await getText(calendar + monthBtn)).toEqual(startMonth);
    }

    async function checkChangeDateByCalendarOverview(
        calendar: string,
        selector: string,
        itemIndex: number = 0
    ): Promise<void> {
        const startDate = await getText(calendar + selector);

        await scrollIntoView(calendar + selector);
        await click(calendar + selector);
        const calendarItemsClass = await getAttributeByName(calendar + calendarMyItem, classAttribute, itemIndex);

        itemIndex = calendarItemsClass.includes(activeClass) ? itemIndex + 1 : itemIndex;
        await click(calendar + calendarMyItem, itemIndex);

        await expect(await getText(calendar + selector)).not.toEqual(startDate);
    }

    async function checkChangeYearByYearRange(calendar: string): Promise<void> {
        const startYear = await getText(calendar + yearBtn);
        let index = 0;

        await scrollIntoView(calendar + yearBtn);
        await click(calendar + yearBtn);
        await click(calendar + yearRangeBtn);
        await click(calendar + calendarMyItem);
        const calendarItemsClass = await getAttributeByName(calendar + calendarMyItem, classAttribute);

        index = calendarItemsClass.includes(currentDayClass) ? index + 1 : index;
        await click(calendar + calendarMyItem, index);

        await expect(await getText(calendar + yearBtn)).not.toEqual(startYear);
    }

    async function checkSingleSelection(calendar: string, selector: string, index: number = 0): Promise<void> {
        await scrollIntoView(calendar + selector, index);

        while (
            (await getAttributeByName(calendar + selector, disabledAttribute, index)) === 'true' ||
            (await getAttributeByName(calendar + selector, classAttribute, index)).includes(otherMonth) ||
            (await getAttributeByName(calendar + selector, classAttribute, index)).includes(currentItem) ||
            (await getAttributeByName(calendar + selector, classAttribute, index)).includes(activeItem)
        ) {
            index++;
        }

        await click(calendar + selector, index);

        await expect(await getAttributeByName(calendar + selector, classAttribute, index)).toContain(
            calendarDayActiveClass
        );
        await expect(await getElementArrayLength(calendar + selectedDays)).toBe(1);
    }

    async function checkRangeSelection(calendar: string): Promise<void> {
        const startDay = await getText(calendar + selectedDays);
        const endDay = await getText(calendar + selectedDays, 1);

        await setCalendarRange(calendar, 2, 23);

        await expect(await getText(calendar + selectedDays)).not.toEqual(startDay);
        await expect(await getText(calendar + selectedDays, 1)).not.toEqual(endDay);
    }

    async function checkCurrentDayHighlighted(calendar: string): Promise<void> {
        await scrollIntoView(calendar);
        await expect(await doesItExist(calendar + currentDay)).toBe(true);
        await expect(await getElementArrayLength(calendar + currentDay)).toBe(1);
    }

    async function getCurrentDayIndex(selector: string, Class: string = 'today'): Promise<number> {
        for (let i = 0; i < (await getElementArrayLength(selector + calendarItem)); i++) {
            if ((await getElementClass(selector + calendarItem, i)).includes(Class)) {
                return i;
            }
        }
        return -1;
    }
});
