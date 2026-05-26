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
        const baseMonth = (component as any)._baseMonth();
        const calendarMonths = (component as any)._calendarMonths();
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
        const initialMonth = (component as any)._baseMonth();
        (component as any)._navigateNext();
        const newMonth = (component as any)._baseMonth();

        if (initialMonth.month === 12) {
            expect(newMonth.month).toBe(1);
            expect(newMonth.year).toBe(initialMonth.year + 1);
        } else {
            expect(newMonth.month).toBe(initialMonth.month + 1);
            expect(newMonth.year).toBe(initialMonth.year);
        }
    });

    it('should navigate both calendars backward', () => {
        const initialMonth = (component as any)._baseMonth();
        (component as any)._navigatePrevious();
        const newMonth = (component as any)._baseMonth();

        if (initialMonth.month === 1) {
            expect(newMonth.month).toBe(12);
            expect(newMonth.year).toBe(initialMonth.year - 1);
        } else {
            expect(newMonth.month).toBe(initialMonth.month - 1);
            expect(newMonth.year).toBe(initialMonth.year);
        }
    });

    it('should handle Dec -> Jan boundary on navigate next', () => {
        (component as any)._baseMonth.set({ month: 12, year: 2025 });

        expect((component as any)._calendarMonths()[1]).toEqual({ month: 1, year: 2026 });

        (component as any)._navigateNext();
        expect((component as any)._baseMonth()).toEqual({ month: 1, year: 2026 });
        expect((component as any)._calendarMonths()[1]).toEqual({ month: 2, year: 2026 });
    });

    it('should handle Jan -> Dec boundary on navigate previous', () => {
        (component as any)._baseMonth.set({ month: 1, year: 2026 });
        (component as any)._navigatePrevious();
        expect((component as any)._baseMonth()).toEqual({ month: 12, year: 2025 });
        expect((component as any)._calendarMonths()[1]).toEqual({ month: 1, year: 2026 });
    });

    it('should emit selectedRangeDateChange on range selection', () => {
        const spy = jest.spyOn(component.selectedRangeDateChange, 'emit');
        const range = new DateRange(new FdDate(2026, 5, 10), new FdDate(2026, 6, 15));
        (component as any)._onRangeChange(range);
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
            expect((component as any)._baseMonth()).toEqual({ month: 3, year: 2026 });
        });

        it('should register onChange callback', () => {
            const fn = jest.fn();
            component.registerOnChange(fn);
            const range = new DateRange(new FdDate(2026, 5, 1), new FdDate(2026, 5, 10));
            (component as any)._onRangeChange(range);
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
            (singleComponent as any)._onDateChange(date);
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
            (nComponent as any)._baseMonth.set({ month: 3, year: 2026 });
            nHost.months = 3;
            nFixture.detectChanges();
            const months = (nComponent as any)._calendarMonths();
            expect(months[0]).toEqual({ month: 3, year: 2026 });
            expect(months[1]).toEqual({ month: 4, year: 2026 });
            expect(months[2]).toEqual({ month: 5, year: 2026 });
        });

        it('months=4, base Nov 2026 → Nov / Dec 2026 / Jan / Feb 2027 (year rollover)', () => {
            (nComponent as any)._baseMonth.set({ month: 11, year: 2026 });
            nHost.months = 4;
            nFixture.detectChanges();
            const months = (nComponent as any)._calendarMonths();
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
            (nComponent as any)._baseMonth.set({ month: 3, year: 2026 });
            nHost.months = 3;
            nFixture.detectChanges();

            (nComponent as any)._onCalendarNavigated({ month: 4, year: 2026 }, 0);
            nFixture.detectChanges();

            const months = (nComponent as any)._calendarMonths();
            expect(months[0]).toEqual({ month: 4, year: 2026 });
            expect(months[1]).toEqual({ month: 5, year: 2026 });
            expect(months[2]).toEqual({ month: 6, year: 2026 });
        });

        it('navigating from index=2 (rightmost) shifts all months forward by 1', () => {
            (nComponent as any)._baseMonth.set({ month: 3, year: 2026 });
            nHost.months = 3;
            nFixture.detectChanges();

            // Rightmost calendar (index=2) reports May→June; base = June - 2 = April
            (nComponent as any)._onCalendarNavigated({ month: 6, year: 2026 }, 2);
            nFixture.detectChanges();

            const months = (nComponent as any)._calendarMonths();
            expect(months[0]).toEqual({ month: 4, year: 2026 });
        });

        it('navigation step is 1, not N: 3 navigations forward from Jan moves first slot Jan→Apr', () => {
            (nComponent as any)._baseMonth.set({ month: 1, year: 2026 });
            nHost.months = 3;
            nFixture.detectChanges();

            (nComponent as any)._navigateNext();
            (nComponent as any)._navigateNext();
            (nComponent as any)._navigateNext();
            nFixture.detectChanges();

            expect((nComponent as any)._calendarMonths()[0]).toEqual({ month: 4, year: 2026 });
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
            expect((component as any)._baseMonth()).toEqual({ month: 7, year: 2026 });
        });

        it('writeValue(null) is a no-op — base month unchanged', () => {
            (component as any)._baseMonth.set({ month: 5, year: 2026 });
            component.writeValue(null);
            expect((component as any)._baseMonth()).toEqual({ month: 5, year: 2026 });
        });

        it('single mode: writeValue(date) sets _baseMonth to month of date', () => {
            const singleFixture = TestBed.createComponent(TestSingleHostComponent);
            singleFixture.detectChanges();
            const singleComponent = singleFixture.componentInstance.container;

            const date = new FdDate(2026, 8, 15);
            singleComponent.writeValue(date);
            expect((singleComponent as any)._baseMonth()).toEqual({ month: 8, year: 2026 });
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
            (nComponent as any)._baseMonth.set({ month: 1, year: 2026 });
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
            (nComponent as any)._onHoverChange(hoverDate);
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
            (nComponent as any)._onHoverChange(hoverDate);
            nFixture.detectChanges();

            (nComponent as any)._onHoverChange(null);
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
            (nComponent as any)._baseMonth.set({ month: 1, year: 2026 });
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
            (nComponent as any)._onHoverChange(hoverDate);
            nFixture.detectChanges();
            expect((nComponent as any)._hoverDate()).toEqual(hoverDate);

            const inner: HTMLElement | null = nFixture.nativeElement.querySelector('.fd-calendar-container-inner');
            expect(inner).not.toBeNull();
            inner!.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
            nFixture.detectChanges();

            expect((nComponent as any)._hoverDate()).toBeNull();
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
});
