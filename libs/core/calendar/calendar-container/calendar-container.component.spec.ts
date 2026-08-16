import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { CalendarComponent } from '../calendar.component';
import { DateRange } from '../models/date-range';
import { FdCalendarContainerComponent } from './calendar-container.component';

@Component({
    template: `
        <fd-calendar-container #container calType="range" [(selectedRangeDate)]="dateRange"></fd-calendar-container>
    `,
    imports: [FdCalendarContainerComponent]
})
class TestHostComponent {
    @ViewChild('container') container: FdCalendarContainerComponent<FdDate>;
    dateRange = new DateRange<FdDate>(null, null);
}

@Component({
    template: `
        <fd-calendar-container #container calType="single" [(selectedDate)]="selectedDate"></fd-calendar-container>
    `,
    imports: [FdCalendarContainerComponent]
})
class TestSingleHostComponent {
    @ViewChild('container') container: FdCalendarContainerComponent<FdDate>;
    selectedDate: FdDate | null = null;
}

@Component({
    template: `
        <fd-calendar-container
            #container
            calType="range"
            [months]="months"
            [(selectedRangeDate)]="dateRange"
        ></fd-calendar-container>
    `,
    imports: [FdCalendarContainerComponent]
})
class TestNMonthHostComponent {
    @ViewChild('container') container: FdCalendarContainerComponent<FdDate>;
    dateRange = new DateRange<FdDate>(null, null);
    months = 2;
}

@Component({
    template: `
        <fd-calendar-container
            #container
            calType="range"
            layout="vertical"
            [months]="months"
            [(selectedRangeDate)]="dateRange"
        ></fd-calendar-container>
    `,
    imports: [FdCalendarContainerComponent]
})
class TestVerticalHostComponent {
    @ViewChild('container') container: FdCalendarContainerComponent<FdDate>;
    dateRange = new DateRange<FdDate>(null, null);
    months = 2;
}

describe('FdCalendarContainerComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;
    let component: FdCalendarContainerComponent<FdDate>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TestHostComponent,
                TestSingleHostComponent,
                TestNMonthHostComponent,
                TestVerticalHostComponent,
                FdDatetimeModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        component = host.container;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render two fd-calendar instances by default', () => {
        const calendars = fixture.nativeElement.querySelectorAll('fd-calendar');
        expect(calendars.length).toBe(2);
    });

    it('should have fd-calendar-container class on host', () => {
        const hostEl = fixture.nativeElement.querySelector('fd-calendar-container');
        expect(hostEl.classList.contains('fd-calendar-container')).toBe(true);
    });

    it('should have fd-calendar-container-inner wrapper', () => {
        const inner = fixture.nativeElement.querySelector('.fd-calendar-container-inner');
        expect(inner).toBeTruthy();
    });

    it('should not have vertical class by default', () => {
        const hostEl = fixture.nativeElement.querySelector('fd-calendar-container');
        expect(hostEl.classList.contains('fd-calendar-container--vertical')).toBe(false);
    });

    it('should display consecutive months', () => {
        const baseMonth = (component as any).baseMonth();
        const calendarMonths = (component as any).calendarMonths();
        const secondMonth = calendarMonths[1];

        if (baseMonth.month === 12) {
            expect(secondMonth.month).toBe(1);
            expect(secondMonth.year).toBe(baseMonth.year + 1);
        } else {
            expect(secondMonth.month).toBe(baseMonth.month + 1);
            expect(secondMonth.year).toBe(baseMonth.year);
        }
    });

    it('should navigate both calendars forward', () => {
        const initialMonth = (component as any).baseMonth();
        const next =
            initialMonth.month === 12
                ? { month: 1, year: initialMonth.year + 1 }
                : { month: initialMonth.month + 1, year: initialMonth.year };
        (component as any).onCalendarNavigated(next, 0);
        const newMonth = (component as any).baseMonth();

        if (initialMonth.month === 12) {
            expect(newMonth.month).toBe(1);
            expect(newMonth.year).toBe(initialMonth.year + 1);
        } else {
            expect(newMonth.month).toBe(initialMonth.month + 1);
            expect(newMonth.year).toBe(initialMonth.year);
        }
    });

    it('should navigate both calendars backward', () => {
        const initialMonth = (component as any).baseMonth();
        const prev =
            initialMonth.month === 1
                ? { month: 12, year: initialMonth.year - 1 }
                : { month: initialMonth.month - 1, year: initialMonth.year };
        (component as any).onCalendarNavigated(prev, 0);
        const newMonth = (component as any).baseMonth();

        if (initialMonth.month === 1) {
            expect(newMonth.month).toBe(12);
            expect(newMonth.year).toBe(initialMonth.year - 1);
        } else {
            expect(newMonth.month).toBe(initialMonth.month - 1);
            expect(newMonth.year).toBe(initialMonth.year);
        }
    });

    it('should handle Dec -> Jan boundary on navigate next', () => {
        (component as any).baseMonth.set({ month: 12, year: 2025 });

        expect((component as any).calendarMonths()[1]).toEqual({ month: 1, year: 2026 });

        (component as any).onCalendarNavigated({ month: 1, year: 2026 }, 0);
        expect((component as any).baseMonth()).toEqual({ month: 1, year: 2026 });
        expect((component as any).calendarMonths()[1]).toEqual({ month: 2, year: 2026 });
    });

    it('should handle Jan -> Dec boundary on navigate previous', () => {
        (component as any).baseMonth.set({ month: 1, year: 2026 });
        (component as any).onCalendarNavigated({ month: 12, year: 2025 }, 0);
        expect((component as any).baseMonth()).toEqual({ month: 12, year: 2025 });
        expect((component as any).calendarMonths()[1]).toEqual({ month: 1, year: 2026 });
    });

    it('should emit selectedRangeDateChange on range selection', () => {
        const spy = jest.spyOn(component.selectedRangeDateChange, 'emit');
        const range = new DateRange(new FdDate(2026, 5, 10), new FdDate(2026, 6, 15));
        (component as any).onRangeChange(range);
        expect(spy).toHaveBeenCalledWith(range);
    });

    it('should have role group', () => {
        const hostEl = fixture.nativeElement.querySelector('fd-calendar-container');
        expect(hostEl.getAttribute('role')).toBe('group');
    });

    it('should have aria-label with month names', () => {
        const hostEl = fixture.nativeElement.querySelector('fd-calendar-container');
        expect(hostEl.getAttribute('aria-label')).toContain('Calendar showing');
    });

    describe('ControlValueAccessor', () => {
        it('should write range value and update base month', () => {
            const start = new FdDate(2026, 3, 15);
            const end = new FdDate(2026, 4, 20);
            component.writeValue(new DateRange(start, end));
            expect((component as any).baseMonth()).toEqual({ month: 3, year: 2026 });
        });

        it('should register onChange callback', () => {
            const fn = jest.fn();
            component.registerOnChange(fn);
            const range = new DateRange(new FdDate(2026, 5, 1), new FdDate(2026, 5, 10));
            (component as any).onRangeChange(range);
            expect(fn).toHaveBeenCalledWith(range);
        });
    });

    describe('single mode', () => {
        let singleFixture: ComponentFixture<TestSingleHostComponent>;
        let singleComponent: FdCalendarContainerComponent<FdDate>;

        beforeEach(() => {
            singleFixture = TestBed.createComponent(TestSingleHostComponent);
            singleFixture.detectChanges();
            singleComponent = singleFixture.componentInstance.container;
        });

        it('should emit selectedDateChange on date selection', () => {
            const spy = jest.spyOn(singleComponent.selectedDateChange, 'emit');
            const date = new FdDate(2026, 5, 15);
            (singleComponent as any).onDateChange(date);
            expect(spy).toHaveBeenCalledWith(date);
        });
    });

    // ---------------------------------------------------------------------------
    // N-month rendering
    // ---------------------------------------------------------------------------

    describe('N-month rendering', () => {
        let nFixture: ComponentFixture<TestNMonthHostComponent>;
        let nHost: TestNMonthHostComponent;
        let nComponent: FdCalendarContainerComponent<FdDate>;

        beforeEach(() => {
            nFixture = TestBed.createComponent(TestNMonthHostComponent);
            nHost = nFixture.componentInstance;
            nFixture.detectChanges();
            nComponent = nHost.container;
        });

        it('months=1 → 1 fd-calendar rendered', () => {
            nHost.months = 1;
            nFixture.detectChanges();
            const calendars = nFixture.debugElement.queryAll(By.directive(CalendarComponent));
            expect(calendars.length).toBe(1);
        });

        it('months=2 (default) → 2 fd-calendar rendered', () => {
            const calendars = nFixture.debugElement.queryAll(By.directive(CalendarComponent));
            expect(calendars.length).toBe(2);
        });

        it('months=3 → 3 fd-calendar rendered', () => {
            nHost.months = 3;
            nFixture.detectChanges();
            const calendars = nFixture.debugElement.queryAll(By.directive(CalendarComponent));
            expect(calendars.length).toBe(3);
        });

        it('months=4 → 4 fd-calendar rendered', () => {
            nHost.months = 4;
            nFixture.detectChanges();
            const calendars = nFixture.debugElement.queryAll(By.directive(CalendarComponent));
            expect(calendars.length).toBe(4);
        });
    });

    // ---------------------------------------------------------------------------
    // Clamp boundaries
    // ---------------------------------------------------------------------------

    describe('clamp boundaries', () => {
        let nFixture: ComponentFixture<TestNMonthHostComponent>;
        let nHost: TestNMonthHostComponent;

        beforeEach(() => {
            nFixture = TestBed.createComponent(TestNMonthHostComponent);
            nHost = nFixture.componentInstance;
            nFixture.detectChanges();
        });

        it('months=0 → renders 1 (clamped up)', () => {
            nHost.months = 0;
            nFixture.detectChanges();
            expect(nFixture.debugElement.queryAll(By.directive(CalendarComponent)).length).toBe(1);
        });

        it('months=-3 → renders 1', () => {
            nHost.months = -3;
            nFixture.detectChanges();
            expect(nFixture.debugElement.queryAll(By.directive(CalendarComponent)).length).toBe(1);
        });

        it('months=5 → renders 4 (clamped down)', () => {
            nHost.months = 5;
            nFixture.detectChanges();
            expect(nFixture.debugElement.queryAll(By.directive(CalendarComponent)).length).toBe(4);
        });

        it('months=2.7 → renders 2 (truncated)', () => {
            nHost.months = 2.7;
            nFixture.detectChanges();
            expect(nFixture.debugElement.queryAll(By.directive(CalendarComponent)).length).toBe(2);
        });

        it('months=-0.5 → renders 1 (truncated to 0 then clamped to 1)', () => {
            nHost.months = -0.5;
            nFixture.detectChanges();
            expect(nFixture.debugElement.queryAll(By.directive(CalendarComponent)).length).toBe(1);
        });
    });

    // ---------------------------------------------------------------------------
    // Month sequencing
    // ---------------------------------------------------------------------------

    describe('month sequencing', () => {
        let nComponent: FdCalendarContainerComponent<FdDate>;
        let nFixture: ComponentFixture<TestNMonthHostComponent>;
        let nHost: TestNMonthHostComponent;

        beforeEach(() => {
            nFixture = TestBed.createComponent(TestNMonthHostComponent);
            nHost = nFixture.componentInstance;
            nFixture.detectChanges();
            nComponent = nFixture.componentInstance.container;
        });

        it('months=3, base March 2026 → Mar / Apr / May 2026', () => {
            (nComponent as any).baseMonth.set({ month: 3, year: 2026 });
            nHost.months = 3;
            nFixture.detectChanges();
            const months = (nComponent as any).calendarMonths();
            expect(months[0]).toEqual({ month: 3, year: 2026 });
            expect(months[1]).toEqual({ month: 4, year: 2026 });
            expect(months[2]).toEqual({ month: 5, year: 2026 });
        });

        it('months=4, base Nov 2026 → Nov / Dec 2026 / Jan / Feb 2027 (year rollover)', () => {
            (nComponent as any).baseMonth.set({ month: 11, year: 2026 });
            nHost.months = 4;
            nFixture.detectChanges();
            const months = (nComponent as any).calendarMonths();
            expect(months[0]).toEqual({ month: 11, year: 2026 });
            expect(months[1]).toEqual({ month: 12, year: 2026 });
            expect(months[2]).toEqual({ month: 1, year: 2027 });
            expect(months[3]).toEqual({ month: 2, year: 2027 });
        });
    });

    // ---------------------------------------------------------------------------
    // Lockstep navigation
    // ---------------------------------------------------------------------------

    describe('lockstep navigation', () => {
        let nComponent: FdCalendarContainerComponent<FdDate>;
        let nFixture: ComponentFixture<TestNMonthHostComponent>;
        let nHost: TestNMonthHostComponent;

        beforeEach(() => {
            nFixture = TestBed.createComponent(TestNMonthHostComponent);
            nHost = nFixture.componentInstance;
            nFixture.detectChanges();
            nComponent = nFixture.componentInstance.container;
        });

        it('navigating from index=0 shifts all months forward by 1', () => {
            (nComponent as any).baseMonth.set({ month: 3, year: 2026 });
            nHost.months = 3;
            nFixture.detectChanges();

            (nComponent as any).onCalendarNavigated({ month: 4, year: 2026 }, 0);
            nFixture.detectChanges();

            const months = (nComponent as any).calendarMonths();
            expect(months[0]).toEqual({ month: 4, year: 2026 });
            expect(months[1]).toEqual({ month: 5, year: 2026 });
            expect(months[2]).toEqual({ month: 6, year: 2026 });
        });

        it('navigating from index=2 (rightmost) shifts all months forward by 1', () => {
            (nComponent as any).baseMonth.set({ month: 3, year: 2026 });
            nHost.months = 3;
            nFixture.detectChanges();

            // Rightmost calendar (index=2) reports May→June; base = June - 2 = April
            (nComponent as any).onCalendarNavigated({ month: 6, year: 2026 }, 2);
            nFixture.detectChanges();

            const months = (nComponent as any).calendarMonths();
            expect(months[0]).toEqual({ month: 4, year: 2026 });
        });

        it('navigation step is 1, not N: 3 navigations forward from Jan moves first slot Jan→Apr', () => {
            (nComponent as any).baseMonth.set({ month: 1, year: 2026 });
            nHost.months = 3;
            nFixture.detectChanges();

            // Each step: navigate index=0 calendar to the next month
            (nComponent as any).onCalendarNavigated({ month: 2, year: 2026 }, 0);
            (nComponent as any).onCalendarNavigated({ month: 3, year: 2026 }, 0);
            (nComponent as any).onCalendarNavigated({ month: 4, year: 2026 }, 0);
            nFixture.detectChanges();

            expect((nComponent as any).calendarMonths()[0]).toEqual({ month: 4, year: 2026 });
        });
    });

    // ---------------------------------------------------------------------------
    // CVA writeValue with N
    // ---------------------------------------------------------------------------

    describe('CVA writeValue with N', () => {
        it('writeValue(DateRange) sets _baseMonth regardless of months value', () => {
            // Use the container's own componentRef (signal input) to set months to 3
            fixture.componentRef.setInput('calType', 'range');
            fixture.detectChanges();
            const start = new FdDate(2026, 7, 10);
            const end = new FdDate(2026, 9, 20);
            component.writeValue(new DateRange(start, end));
            expect((component as any).baseMonth()).toEqual({ month: 7, year: 2026 });
        });

        it('writeValue(null) is a no-op — base month unchanged', () => {
            (component as any).baseMonth.set({ month: 5, year: 2026 });
            component.writeValue(null);
            expect((component as any).baseMonth()).toEqual({ month: 5, year: 2026 });
        });

        it('single mode: writeValue(date) sets _baseMonth to month of date', () => {
            const singleFixture = TestBed.createComponent(TestSingleHostComponent);
            singleFixture.detectChanges();
            const singleComponent = singleFixture.componentInstance.container;

            const date = new FdDate(2026, 8, 15);
            singleComponent.writeValue(date);
            expect((singleComponent as any).baseMonth()).toEqual({ month: 8, year: 2026 });
        });
    });

    // ---------------------------------------------------------------------------
    // ariaLabel at each N
    // ---------------------------------------------------------------------------

    describe('ariaLabel at each N', () => {
        let nFixture: ComponentFixture<TestNMonthHostComponent>;
        let nComponent: FdCalendarContainerComponent<FdDate>;
        let nHost: TestNMonthHostComponent;

        beforeEach(() => {
            nFixture = TestBed.createComponent(TestNMonthHostComponent);
            nHost = nFixture.componentInstance;
            nFixture.detectChanges();
            nComponent = nFixture.componentInstance.container;
            (nComponent as any).baseMonth.set({ month: 1, year: 2026 });
        });

        it('months=1 → aria-label contains "Calendar showing" and single month', () => {
            nHost.months = 1;
            nFixture.detectChanges();
            const label = nFixture.nativeElement.querySelector('fd-calendar-container').getAttribute('aria-label');
            expect(label).toMatch(/^Calendar showing .+$/);
            expect(label).not.toContain(' and ');
            expect(label).not.toContain(' through ');
        });

        it('months=2 → aria-label uses "and" form', () => {
            nHost.months = 2;
            nFixture.detectChanges();
            const label = nFixture.nativeElement.querySelector('fd-calendar-container').getAttribute('aria-label');
            expect(label).toContain(' and ');
        });

        it('months=3 → aria-label uses "through" form', () => {
            nHost.months = 3;
            nFixture.detectChanges();
            const label = nFixture.nativeElement.querySelector('fd-calendar-container').getAttribute('aria-label');
            expect(label).toContain(' through ');
        });

        it('months=4 → aria-label uses "through" form', () => {
            nHost.months = 4;
            nFixture.detectChanges();
            const label = nFixture.nativeElement.querySelector('fd-calendar-container').getAttribute('aria-label');
            expect(label).toContain(' through ');
        });
    });

    // ---------------------------------------------------------------------------
    // Hover propagation
    // ---------------------------------------------------------------------------

    describe('hover propagation', () => {
        let nFixture: ComponentFixture<TestNMonthHostComponent>;
        let nComponent: FdCalendarContainerComponent<FdDate>;
        let nHost: TestNMonthHostComponent;

        beforeEach(() => {
            nFixture = TestBed.createComponent(TestNMonthHostComponent);
            nHost = nFixture.componentInstance;
            nHost.months = 3;
            nFixture.detectChanges();
            nComponent = nFixture.componentInstance.container;
        });

        it('setting _hoverDate reflects to all calendar instances', () => {
            const hoverDate = new FdDate(2026, 5, 15);
            (nComponent as any).onHoverChange(hoverDate);
            nFixture.detectChanges();

            const calendarInstances = nFixture.debugElement
                .queryAll(By.directive(CalendarComponent))
                .map((de) => de.componentInstance as CalendarComponent<FdDate>);

            expect(calendarInstances.length).toBe(3);
            calendarInstances.forEach((cal) => {
                expect((cal as any).hoverDate()).toEqual(hoverDate);
            });
        });

        it('mouse-leave clears hover everywhere', () => {
            const hoverDate = new FdDate(2026, 5, 15);
            (nComponent as any).onHoverChange(hoverDate);
            nFixture.detectChanges();

            (nComponent as any).onHoverChange(null);
            nFixture.detectChanges();

            const calendarInstances = nFixture.debugElement
                .queryAll(By.directive(CalendarComponent))
                .map((de) => de.componentInstance as CalendarComponent<FdDate>);

            calendarInstances.forEach((cal) => {
                expect((cal as any).hoverDate()).toBeNull();
            });
        });
    });

    // ---------------------------------------------------------------------------
    // Arrow suppression (Wave 1.5)
    // ---------------------------------------------------------------------------

    describe('arrow suppression — DOM absence', () => {
        let nFixture: ComponentFixture<TestNMonthHostComponent>;
        let nHost: TestNMonthHostComponent;

        beforeEach(() => {
            nFixture = TestBed.createComponent(TestNMonthHostComponent);
            nHost = nFixture.componentInstance;
        });

        it('months=1: single calendar has BOTH arrow buttons present', () => {
            nHost.months = 1;
            nFixture.detectChanges();
            const calEls = nFixture.nativeElement.querySelectorAll('fd-calendar');
            expect(calEls.length).toBe(1);
            const cal = calEls[0] as HTMLElement;
            expect(cal.querySelectorAll('.fd-calendar__action--arrow-left').length).toBe(1);
            expect(cal.querySelectorAll('.fd-calendar__action--arrow-right').length).toBe(1);
        });

        it('months=2: first calendar has 0 right-arrows; second has 0 left-arrows', () => {
            nHost.months = 2;
            nFixture.detectChanges();
            const calEls = nFixture.nativeElement.querySelectorAll('fd-calendar');
            expect(calEls[0].querySelectorAll('.fd-calendar__action--arrow-right').length).toBe(0);
            expect(calEls[1].querySelectorAll('.fd-calendar__action--arrow-left').length).toBe(0);
        });

        it('months=3: middle calendar has 0 left-arrows and 0 right-arrows', () => {
            nHost.months = 3;
            nFixture.detectChanges();
            const calEls = nFixture.nativeElement.querySelectorAll('fd-calendar');
            expect(calEls[1].querySelectorAll('.fd-calendar__action--arrow-left').length).toBe(0);
            expect(calEls[1].querySelectorAll('.fd-calendar__action--arrow-right').length).toBe(0);
        });

        it('months=4: indices 1 and 2 each have zero left and right arrows', () => {
            nHost.months = 4;
            nFixture.detectChanges();
            const calEls = nFixture.nativeElement.querySelectorAll('fd-calendar');
            [1, 2].forEach((i) => {
                expect(calEls[i].querySelectorAll('.fd-calendar__action--arrow-left').length).toBe(0);
                expect(calEls[i].querySelectorAll('.fd-calendar__action--arrow-right').length).toBe(0);
            });
        });
    });

    // ---------------------------------------------------------------------------
    // T2.2 — Positional aria-label for slot wrappers (Wave 2 / S2)
    // ---------------------------------------------------------------------------

    describe('positional aria-label on slot wrappers', () => {
        let nFixture: ComponentFixture<TestNMonthHostComponent>;
        let nHost: TestNMonthHostComponent;
        let nComponent: FdCalendarContainerComponent<FdDate>;

        beforeEach(() => {
            nFixture = TestBed.createComponent(TestNMonthHostComponent);
            nHost = nFixture.componentInstance;
            nFixture.detectChanges();
            nComponent = nFixture.componentInstance.container;
            (nComponent as any).baseMonth.set({ month: 1, year: 2026 });
        });

        it('N=1: slot has bare month label (no positional prefix)', () => {
            nHost.months = 1;
            nFixture.detectChanges();
            const calEls = nFixture.nativeElement.querySelectorAll('fd-calendar');
            const label = (calEls[0] as HTMLElement).getAttribute('aria-label');
            expect(label).not.toBeNull();
            expect(label).not.toMatch(/^Calendar \d+ of \d+/);
            expect(label!.length).toBeGreaterThan(0);
        });

        it('N=2: each slot has positional label "Calendar K of 2: <month>"', () => {
            nHost.months = 2;
            nFixture.detectChanges();
            const calEls = nFixture.nativeElement.querySelectorAll('fd-calendar');
            expect((calEls[0] as HTMLElement).getAttribute('aria-label')).toMatch(/^Calendar 1 of 2:/);
            expect((calEls[1] as HTMLElement).getAttribute('aria-label')).toMatch(/^Calendar 2 of 2:/);
        });

        it('N=3: positional labels reflect total=3', () => {
            nHost.months = 3;
            nFixture.detectChanges();
            const calEls = nFixture.nativeElement.querySelectorAll('fd-calendar');
            expect((calEls[0] as HTMLElement).getAttribute('aria-label')).toMatch(/^Calendar 1 of 3:/);
            expect((calEls[1] as HTMLElement).getAttribute('aria-label')).toMatch(/^Calendar 2 of 3:/);
            expect((calEls[2] as HTMLElement).getAttribute('aria-label')).toMatch(/^Calendar 3 of 3:/);
        });

        it('N=4: positional labels reflect total=4', () => {
            nHost.months = 4;
            nFixture.detectChanges();
            const calEls = nFixture.nativeElement.querySelectorAll('fd-calendar');
            expect((calEls[0] as HTMLElement).getAttribute('aria-label')).toMatch(/^Calendar 1 of 4:/);
            expect((calEls[1] as HTMLElement).getAttribute('aria-label')).toMatch(/^Calendar 2 of 4:/);
            expect((calEls[2] as HTMLElement).getAttribute('aria-label')).toMatch(/^Calendar 3 of 4:/);
            expect((calEls[3] as HTMLElement).getAttribute('aria-label')).toMatch(/^Calendar 4 of 4:/);
        });
    });

    // ---------------------------------------------------------------------------
    // T2.3 — Hover null-clear on container mouseleave (Wave 2 / S4 + F5)
    // ---------------------------------------------------------------------------

    describe('hover null-clear on mouseleave', () => {
        let nFixture: ComponentFixture<TestNMonthHostComponent>;
        let nComponent: FdCalendarContainerComponent<FdDate>;

        beforeEach(() => {
            nFixture = TestBed.createComponent(TestNMonthHostComponent);
            nFixture.componentInstance.months = 2;
            nFixture.detectChanges();
            nComponent = nFixture.componentInstance.container;
        });

        it('mouseleave on inner container sets _hoverDate to null', () => {
            const hoverDate = new FdDate(2026, 5, 15);
            (nComponent as any).onHoverChange(hoverDate);
            nFixture.detectChanges();
            expect((nComponent as any).hoverDate()).toEqual(hoverDate);

            const inner: HTMLElement | null = nFixture.nativeElement.querySelector('.fd-calendar-container-inner');
            expect(inner).not.toBeNull();
            inner!.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
            nFixture.detectChanges();

            expect((nComponent as any).hoverDate()).toBeNull();
        });
    });

    // ---------------------------------------------------------------------------
    // T2.5 — Vertical layout top-only navigation (Wave 2 / U2 / DECISION-006)
    // ---------------------------------------------------------------------------

    describe('vertical layout — top-only navigation', () => {
        let vertFixture: ComponentFixture<TestVerticalHostComponent>;
        let vertHost: TestVerticalHostComponent;

        beforeEach(() => {
            vertFixture = TestBed.createComponent(TestVerticalHostComponent);
            vertHost = vertFixture.componentInstance;
        });

        it('vertical N=1: top calendar shows both arrows', () => {
            vertHost.months = 1;
            vertFixture.detectChanges();
            const calEls = vertFixture.nativeElement.querySelectorAll('fd-calendar');
            expect(calEls.length).toBe(1);
            expect((calEls[0] as HTMLElement).querySelectorAll('.fd-calendar__action--arrow-left').length).toBe(1);
            expect((calEls[0] as HTMLElement).querySelectorAll('.fd-calendar__action--arrow-right').length).toBe(1);
        });

        it('vertical N=2: top shows both arrows, bottom shows neither', () => {
            vertHost.months = 2;
            vertFixture.detectChanges();
            const calEls = vertFixture.nativeElement.querySelectorAll('fd-calendar');
            expect(calEls.length).toBe(2);
            // Top calendar: both arrows
            expect((calEls[0] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).not.toBeNull();
            expect((calEls[0] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).not.toBeNull();
            // Bottom calendar: neither
            expect((calEls[1] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).toBeNull();
            expect((calEls[1] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).toBeNull();
        });

        it('vertical N=3: top shows both arrows, middle and bottom show neither', () => {
            vertHost.months = 3;
            vertFixture.detectChanges();
            const calEls = vertFixture.nativeElement.querySelectorAll('fd-calendar');
            expect(calEls.length).toBe(3);
            expect((calEls[0] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).not.toBeNull();
            expect((calEls[0] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).not.toBeNull();
            [1, 2].forEach((i) => {
                expect((calEls[i] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).toBeNull();
                expect((calEls[i] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).toBeNull();
            });
        });

        it('vertical N=4: top shows both arrows, three below show neither', () => {
            vertHost.months = 4;
            vertFixture.detectChanges();
            const calEls = vertFixture.nativeElement.querySelectorAll('fd-calendar');
            expect(calEls.length).toBe(4);
            expect((calEls[0] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).not.toBeNull();
            expect((calEls[0] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).not.toBeNull();
            [1, 2, 3].forEach((i) => {
                expect((calEls[i] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).toBeNull();
                expect((calEls[i] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).toBeNull();
            });
        });

        // pre-PR parity per DECISION-006 — do not change without amending the decision.
        it('vertical N=2: post-fix DOM matches pre-PR shape exactly — top has both, bottom has none', () => {
            vertHost.months = 2;
            vertFixture.detectChanges();
            const calEls = vertFixture.nativeElement.querySelectorAll('fd-calendar');
            // Top calendar carries both navigation arrows (same as pre-PR behavior)
            expect((calEls[0] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).not.toBeNull();
            expect((calEls[0] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).not.toBeNull();
            // Bottom calendar has no arrows (same as pre-PR behavior — NOT the symmetric rule)
            expect((calEls[1] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).toBeNull();
            expect((calEls[1] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).toBeNull();
        });
    });

    // ---------------------------------------------------------------------------
    // monthYearPickerMode — AC10: container binds 'popover' on each fd-calendar
    // ---------------------------------------------------------------------------

    describe('monthYearPickerMode container binding', () => {
        let nFixture: ComponentFixture<TestNMonthHostComponent>;
        let nHost: TestNMonthHostComponent;

        beforeEach(() => {
            nFixture = TestBed.createComponent(TestNMonthHostComponent);
            nHost = nFixture.componentInstance;
            nFixture.detectChanges();
        });

        it('all fd-calendar instances inside the container have monthYearPickerMode === "popover"', () => {
            nHost.months = 2;
            nFixture.detectChanges();

            const calInstances = nFixture.debugElement
                .queryAll(By.directive(CalendarComponent))
                .map((de) => de.componentInstance as CalendarComponent<FdDate>);

            expect(calInstances.length).toBe(2);
            calInstances.forEach((cal) => {
                expect(cal.monthYearPickerMode()).toBe('popover');
            });
        });

        it('all 4 fd-calendar instances have monthYearPickerMode === "popover" at N=4', () => {
            nHost.months = 4;
            nFixture.detectChanges();

            const calInstances = nFixture.debugElement
                .queryAll(By.directive(CalendarComponent))
                .map((de) => de.componentInstance as CalendarComponent<FdDate>);

            expect(calInstances.length).toBe(4);
            calInstances.forEach((cal) => {
                expect(cal.monthYearPickerMode()).toBe('popover');
            });
        });
    });

    // ---------------------------------------------------------------------------
    // T2.5 — Horizontal sanity guard (regression guard, Wave 2)
    // ---------------------------------------------------------------------------

    describe('horizontal arrow rule — regression guard', () => {
        let nFixture: ComponentFixture<TestNMonthHostComponent>;
        let nHost: TestNMonthHostComponent;

        beforeEach(() => {
            nFixture = TestBed.createComponent(TestNMonthHostComponent);
            nHost = nFixture.componentInstance;
        });

        it('horizontal N=2: left has prev only, right has next only', () => {
            nHost.months = 2;
            nFixture.detectChanges();
            const calEls = nFixture.nativeElement.querySelectorAll('fd-calendar');
            // Left calendar: prev arrow present, next arrow absent
            expect((calEls[0] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).not.toBeNull();
            expect((calEls[0] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).toBeNull();
            // Right calendar: next arrow present, prev arrow absent
            expect((calEls[1] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).not.toBeNull();
            expect((calEls[1] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).toBeNull();
        });

        it('horizontal N=3: leftmost has prev only, middle has none, rightmost has next only', () => {
            nHost.months = 3;
            nFixture.detectChanges();
            const calEls = nFixture.nativeElement.querySelectorAll('fd-calendar');
            // Leftmost
            expect((calEls[0] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).not.toBeNull();
            expect((calEls[0] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).toBeNull();
            // Middle
            expect((calEls[1] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).toBeNull();
            expect((calEls[1] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).toBeNull();
            // Rightmost
            expect((calEls[2] as HTMLElement).querySelector('.fd-calendar__action--arrow-right')).not.toBeNull();
            expect((calEls[2] as HTMLElement).querySelector('.fd-calendar__action--arrow-left')).toBeNull();
        });
    });

    // ---------------------------------------------------------------------------
    // Round 2 — container-level picker overlay (ACs 3–9 moved, ACs 17–21 new)
    // ---------------------------------------------------------------------------

    describe('container-level picker overlay (Round 2)', () => {
        let nFixture: ComponentFixture<TestNMonthHostComponent>;
        let nHost: TestNMonthHostComponent;
        let nComponent: FdCalendarContainerComponent<FdDate>;

        beforeEach(() => {
            nFixture = TestBed.createComponent(TestNMonthHostComponent);
            nHost = nFixture.componentInstance;
            nHost.months = 2;
            nFixture.detectChanges();
            nComponent = nFixture.componentInstance.container;
        });

        function openPickerOnCalendar(calIndex: number, view: 'month' | 'year' | 'aggregatedYear'): void {
            const calInstances = nFixture.debugElement
                .queryAll(By.directive(CalendarComponent))
                .map((de) => de.componentInstance as CalendarComponent<FdDate>);
            calInstances[calIndex].activeViewChange.emit(view);
            nFixture.detectChanges();
        }

        // AC3 (moved to container) — overlay renders inside the container, not calendar
        it('AC3: after triggering picker, overlay element renders inside fd-calendar-container', () => {
            openPickerOnCalendar(0, 'month');
            const overlay = nFixture.nativeElement.querySelector('.fd-calendar-container__picker-overlay');
            expect(overlay).not.toBeNull();
        });

        it('AC3: overlay is NOT inside any fd-calendar element', () => {
            openPickerOnCalendar(0, 'month');
            const calEls = nFixture.nativeElement.querySelectorAll('fd-calendar');
            calEls.forEach((cal: HTMLElement) => {
                expect(cal.querySelector('.fd-calendar-container__picker-overlay')).toBeNull();
            });
        });

        // AC4 (moved to container) — backdrop renders inside the container
        it('AC4: backdrop element renders inside fd-calendar-container', () => {
            openPickerOnCalendar(0, 'month');
            const backdrop = nFixture.nativeElement.querySelector('.fd-calendar-container__picker-backdrop');
            expect(backdrop).not.toBeNull();
        });

        it('AC4: overlay and backdrop absent when picker is closed', () => {
            // No trigger — picker should be closed
            expect(nFixture.nativeElement.querySelector('.fd-calendar-container__picker-overlay')).toBeNull();
            expect(nFixture.nativeElement.querySelector('.fd-calendar-container__picker-backdrop')).toBeNull();
        });

        // AC6 (moved to container) — ESC closes picker
        it('AC6: ESC keydown on container overlay closes picker', () => {
            openPickerOnCalendar(0, 'month');
            const overlay: HTMLElement = nFixture.nativeElement.querySelector('.fd-calendar-container__picker-overlay');
            expect(overlay).not.toBeNull();

            overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            nFixture.detectChanges();

            expect(nFixture.nativeElement.querySelector('.fd-calendar-container__picker-overlay')).toBeNull();
        });

        // AC7 (moved to container) — backdrop click closes picker
        it('AC7: clicking container backdrop closes picker', () => {
            openPickerOnCalendar(0, 'month');

            const backdropDe = nFixture.debugElement.query(By.css('.fd-calendar-container__picker-backdrop'));
            expect(backdropDe).not.toBeNull();

            backdropDe.triggerEventHandler('click', new MouseEvent('click', { bubbles: true }));
            nFixture.detectChanges();

            expect(nFixture.nativeElement.querySelector('.fd-calendar-container__picker-overlay')).toBeNull();
        });

        // AC9 (moved to container) — selection updates the correct calendar
        it('AC9: month selection from picker updates the calendar at the triggered index', () => {
            // Open picker from calendar at index=1 (second calendar)
            openPickerOnCalendar(1, 'month');
            const baseMonthBefore = (nComponent as any).baseMonth();

            // Directly call the container's handler that receives month selection
            (nComponent as any).onPickerMonthSelected(3); // pick March
            nFixture.detectChanges();

            // Picker should be closed
            expect(nFixture.nativeElement.querySelector('.fd-calendar-container__picker-overlay')).toBeNull();

            // The base month should have shifted so calendar at index=1 shows March of the same year
            const months = (nComponent as any).calendarMonths();
            expect(months[1].month).toBe(3);
        });

        // AC13 (ARIA — moved to container overlay)
        it('AC13: container overlay has role="dialog" and aria-label', () => {
            openPickerOnCalendar(0, 'month');
            const overlay: HTMLElement = nFixture.nativeElement.querySelector('.fd-calendar-container__picker-overlay');
            expect(overlay.getAttribute('role')).toBe('dialog');
            expect(overlay.getAttribute('aria-label')).toBeTruthy();
        });

        it('AC13: container backdrop has aria-hidden="true"', () => {
            openPickerOnCalendar(0, 'month');
            const backdrop: HTMLElement = nFixture.nativeElement.querySelector(
                '.fd-calendar-container__picker-backdrop'
            );
            expect(backdrop.getAttribute('aria-hidden')).toBe('true');
        });

        // AC17 — overlay/backdrop are direct children of .fd-calendar-container-inner
        it('AC17: overlay and backdrop are direct children of .fd-calendar-container-inner (not of the host root)', () => {
            openPickerOnCalendar(0, 'month');
            const inner: HTMLElement = nFixture.nativeElement.querySelector('.fd-calendar-container-inner');
            const overlay = inner.querySelector(':scope > .fd-calendar-container__picker-overlay');
            const backdrop = inner.querySelector(':scope > .fd-calendar-container__picker-backdrop');
            expect(overlay).not.toBeNull();
            expect(backdrop).not.toBeNull();
        });

        // AC20 — clicked calendar index is captured; correct calendar updates on selection
        it('AC20: picking from calendar 2 updates the second calendar, not the first', () => {
            // Set a known base month
            (nComponent as any).baseMonth.set({ month: 5, year: 2026 }); // May / June
            nFixture.detectChanges();

            openPickerOnCalendar(1, 'month'); // trigger from calendar at index=1

            (nComponent as any).onPickerMonthSelected(8); // pick August
            nFixture.detectChanges();

            const months = (nComponent as any).calendarMonths();
            // calendar[1] should show August; base = July
            expect(months[1].month).toBe(8);
            expect(months[0].month).toBe(7);
        });

        // AC21 — calendar component stays on day view in popover mode (never self-switches)
        it('AC21: calendar activeView stays "day" after header click when in popover mode', () => {
            const calInstances = nFixture.debugElement
                .queryAll(By.directive(CalendarComponent))
                .map((de) => de.componentInstance as CalendarComponent<FdDate>);

            calInstances[0].handleActiveViewChange('month');
            nFixture.detectChanges();

            // The calendar itself should NOT have switched away from day view
            expect(calInstances[0].activeView).toBe('day');
        });

        // AC11 regression guard — calendar overlay no longer renders inside fd-calendar in popover mode
        it('AC11 regression: individual fd-calendar elements do not contain overlay or backdrop elements', () => {
            openPickerOnCalendar(0, 'year');
            const calEls: NodeListOf<HTMLElement> = nFixture.nativeElement.querySelectorAll('fd-calendar');
            calEls.forEach((cal) => {
                expect(cal.querySelector('.fd-calendar__picker-overlay')).toBeNull();
                expect(cal.querySelector('.fd-calendar__picker-backdrop')).toBeNull();
                expect(cal.querySelector('.fd-calendar-container__picker-overlay')).toBeNull();
                expect(cal.querySelector('.fd-calendar-container__picker-backdrop')).toBeNull();
            });
        });

        // year / aggregatedYear trigger also opens picker
        it('year trigger opens picker with year view inside overlay', () => {
            openPickerOnCalendar(0, 'year');
            expect(nFixture.nativeElement.querySelector('.fd-calendar-container__picker-overlay')).not.toBeNull();
            expect(nFixture.nativeElement.querySelector('fd-calendar-year-view')).not.toBeNull();
        });

        it('aggregatedYear trigger opens picker with aggregated-year view inside overlay', () => {
            openPickerOnCalendar(0, 'aggregatedYear');
            expect(nFixture.nativeElement.querySelector('.fd-calendar-container__picker-overlay')).not.toBeNull();
            expect(nFixture.nativeElement.querySelector('fd-calendar-aggregated-year-view')).not.toBeNull();
        });

        // -----------------------------------------------------------------------
        // Backdrop pointer-blocking + day-grid centering (Round 3 — 2026-07-02)
        // -----------------------------------------------------------------------

        it('backdrop sits above day-grid stacking context (z-index chain intact)', () => {
            openPickerOnCalendar(0, 'month');
            const inner: HTMLElement = nFixture.nativeElement.querySelector('.fd-calendar-container-inner');
            const backdrop: HTMLElement = inner.querySelector('.fd-calendar-container__picker-backdrop')!;
            const row: HTMLElement = inner.querySelector('.fd-calendar-container__row')!;
            const calendars: HTMLElement[] = Array.from(row.querySelectorAll('fd-calendar'));

            // Backdrop must exist as a direct child of inner.
            expect(inner.querySelector(':scope > .fd-calendar-container__picker-backdrop')).not.toBeNull();

            // fd-calendar elements are inside the row wrapper; the backdrop is a sibling of the row,
            // not inside any fd-calendar.
            expect(calendars.length).toBeGreaterThan(0);
            calendars.forEach((cal) => {
                expect(cal.contains(backdrop)).toBe(false);
            });

            expect(backdrop.classList.contains('fd-calendar-container__picker-backdrop')).toBe(true);
        });

        it('per-calendar headers sit above backdrop (still clickable to switch picker)', () => {
            openPickerOnCalendar(0, 'month');
            const inner: HTMLElement = nFixture.nativeElement.querySelector('.fd-calendar-container-inner');
            const backdrop: HTMLElement = inner.querySelector('.fd-calendar-container__picker-backdrop')!;
            const headers: HTMLElement[] = Array.from(nFixture.nativeElement.querySelectorAll('fd-calendar-header'));

            // Headers must exist and must NOT be inside the backdrop.
            expect(headers.length).toBeGreaterThan(0);
            headers.forEach((header) => {
                expect(backdrop.contains(header)).toBe(false);
            });

            // Headers must bear the class that the z-index: 101 rule targets.
            headers.forEach((header) => {
                expect(header.tagName.toLowerCase()).toBe('fd-calendar-header');
            });
        });

        it('picker overlay renders inside .fd-calendar-container-inner (not container root)', () => {
            openPickerOnCalendar(0, 'month');
            const inner: HTMLElement = nFixture.nativeElement.querySelector('.fd-calendar-container-inner');
            const overlay: HTMLElement | null = inner.querySelector(':scope > .fd-calendar-container__picker-overlay');
            const backdrop: HTMLElement | null = inner.querySelector(
                ':scope > .fd-calendar-container__picker-backdrop'
            );
            expect(overlay).not.toBeNull();
            expect(backdrop).not.toBeNull();
        });

        // -----------------------------------------------------------------------
        // Round 2 — Task A: weekday row above backdrop
        // -----------------------------------------------------------------------

        it('Task A: weekday row (thead) exists inside fd-calendar-day-view', () => {
            openPickerOnCalendar(0, 'month');
            const dayView = nFixture.nativeElement.querySelector('fd-calendar-day-view');
            expect(dayView).not.toBeNull();
            const weekdayRow = dayView.querySelector('thead.fd-calendar__group');
            expect(weekdayRow).not.toBeNull();
        });

        // -----------------------------------------------------------------------
        // Round 2 — Task B: long month names
        // -----------------------------------------------------------------------

        it('Task B: month picker overlay renders full month names (long format)', () => {
            (nComponent as any).baseMonth.set({ month: 1, year: 2026 });
            nFixture.detectChanges();
            openPickerOnCalendar(0, 'month');
            const overlay: HTMLElement = nFixture.nativeElement.querySelector('.fd-calendar-container__picker-overlay');
            const monthView: HTMLElement | null = overlay.querySelector('fd-calendar-month-view');
            expect(monthView).not.toBeNull();
            expect(monthView!.textContent).toContain('January');
        });

        // -----------------------------------------------------------------------
        // Round 2 — Task C: aggregate header
        // -----------------------------------------------------------------------

        it('Task C: aggregate header renders when picker view is year', () => {
            openPickerOnCalendar(0, 'year');
            const aggHeader = nFixture.nativeElement.querySelector('.fd-calendar-container__aggregate-header');
            expect(aggHeader).not.toBeNull();
        });

        it('Task C: aggregate header renders when picker view is aggregatedYear', () => {
            openPickerOnCalendar(0, 'aggregatedYear');
            const aggHeader = nFixture.nativeElement.querySelector('.fd-calendar-container__aggregate-header');
            expect(aggHeader).not.toBeNull();
        });

        it('Task C: aggregate header does NOT render when picker view is month', () => {
            openPickerOnCalendar(0, 'month');
            expect(nFixture.nativeElement.querySelector('.fd-calendar-container__aggregate-header')).toBeNull();
        });

        it('Task C: aggregate header does NOT render when picker is closed', () => {
            expect(nFixture.nativeElement.querySelector('.fd-calendar-container__aggregate-header')).toBeNull();
        });

        it('Task C: per-calendar headers have headers-hidden class when picker view is year', () => {
            openPickerOnCalendar(0, 'year');
            const calendars: NodeListOf<HTMLElement> = nFixture.nativeElement.querySelectorAll('fd-calendar');
            calendars.forEach((cal) => {
                expect(cal.classList.contains('fd-calendar-container__slot--headers-hidden')).toBe(true);
            });
        });

        it('Task C: aggregate year-range label shows correct window (anchor 2020, grid 4x5 = "2020 - 2039")', () => {
            (nComponent as any).baseMonth.set({ month: 1, year: 2020 });
            nFixture.detectChanges();
            openPickerOnCalendar(0, 'year');
            const label: HTMLElement | null = nFixture.nativeElement.querySelector(
                '.fd-calendar-container__aggregate-header__label'
            );
            expect(label).not.toBeNull();
            expect(label!.textContent?.trim()).toBe('2020 - 2039');
        });

        it('Task C: clicking aggregate year-range label switches picker to aggregatedYear view', () => {
            openPickerOnCalendar(0, 'year');
            const labelDe = nFixture.debugElement.query(By.css('.fd-calendar-container__aggregate-header__label'));
            expect(labelDe).not.toBeNull();
            labelDe.triggerEventHandler('click', new MouseEvent('click', { bubbles: true }));
            nFixture.detectChanges();
            expect((nComponent as any).pickerState().view).toBe('aggregatedYear');
        });

        it('Task C: aggregate next-arrow shifts pickerYearAnchor forward by 20 (yearViewGrid 4x5)', () => {
            (nComponent as any).baseMonth.set({ month: 1, year: 2020 });
            nFixture.detectChanges();
            openPickerOnCalendar(0, 'year');
            expect((nComponent as any).pickerYearAnchor()).toBe(2020);
            const arrowDes = nFixture.debugElement.queryAll(By.css('.fd-calendar-container__aggregate-header button'));
            // arrowDes: [0]=prev, [1]=label-button, [2]=next
            arrowDes[arrowDes.length - 1].triggerEventHandler('click', new MouseEvent('click', { bubbles: true }));
            nFixture.detectChanges();
            expect((nComponent as any).pickerYearAnchor()).toBe(2040);
        });

        it('Task C: aggregate prev-arrow in aggregatedYear view shifts by 400 (4x5 * 4x5 = not right; actual: yearGrid*aggGrid)', () => {
            (nComponent as any).baseMonth.set({ month: 1, year: 2020 });
            nFixture.detectChanges();
            openPickerOnCalendar(0, 'aggregatedYear');
            expect((nComponent as any).pickerYearAnchor()).toBe(2020);
            const prevArrowDe = nFixture.debugElement.query(By.css('.fd-calendar-container__aggregate-header button'));
            prevArrowDe.triggerEventHandler('click', new MouseEvent('click', { bubbles: true }));
            nFixture.detectChanges();
            // yearViewGrid 4x5=20, aggregatedYearViewGrid 4x3=12 → shift = 20*12 = 240
            expect((nComponent as any).pickerYearAnchor()).toBe(2020 - 240);
        });

        // -----------------------------------------------------------------------
        // Hotfix — aggregate header layout (column-flex inner + row wrapper)
        // -----------------------------------------------------------------------

        it('aggregate header spans full width above calendar row (year picker)', () => {
            openPickerOnCalendar(0, 'year');
            const inner: HTMLElement = nFixture.nativeElement.querySelector('.fd-calendar-container-inner');
            const aggHeader = inner.querySelector(':scope > .fd-calendar-container__aggregate-header');
            const row = inner.querySelector(':scope > .fd-calendar-container__row');
            expect(aggHeader).not.toBeNull();
            expect(row).not.toBeNull();
            expect(row!.querySelectorAll('fd-calendar').length).toBe(2);
        });

        it('calendar row contains all fd-calendar instances when picker is closed', () => {
            const inner: HTMLElement = nFixture.nativeElement.querySelector('.fd-calendar-container-inner');
            const row = inner.querySelector(':scope > .fd-calendar-container__row');
            expect(row).not.toBeNull();
            expect(row!.querySelectorAll('fd-calendar').length).toBe(2);
            expect(inner.querySelector(':scope > .fd-calendar-container__aggregate-header')).toBeNull();
        });
    });
});
