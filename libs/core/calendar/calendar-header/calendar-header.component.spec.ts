import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { CalendarService } from '../calendar.service';
import { CalendarHeaderComponent } from './calendar-header.component';

describe('Calendar2HeaderComponent', () => {
    let component: CalendarHeaderComponent<FdDate>;
    let fixture: ComponentFixture<CalendarHeaderComponent<FdDate>>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdDatetimeModule, CalendarHeaderComponent],
            providers: [CalendarService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent<CalendarHeaderComponent<FdDate>>(CalendarHeaderComponent);
        component = fixture.componentInstance;
        component.currentlyDisplayed = { month: 10, year: 2018 };
        fixture.detectChanges();
    });

    it('Should switch to year view, when changed to year and not no year view', () => {
        jest.spyOn(component.activeViewChange, 'emit');
        component.activeView = 'day';
        component._processViewChange('year');
        expect(component.activeViewChange.emit).toHaveBeenCalledWith('year');
        expect(component.activeView).toBe('year');
        expect(component.isOnYearView).toBeTruthy();
    });

    it('Should switch to day view, when changed to year and on year view', () => {
        jest.spyOn(component.activeViewChange, 'emit');
        component.activeView = 'year';
        component._processViewChange('year');
        expect(component.activeViewChange.emit).toHaveBeenCalledWith('day');
        expect(component.activeView).toBe('day');
    });

    it('Should switch to month view, changed to month and not no month view', () => {
        jest.spyOn(component.activeViewChange, 'emit');
        component.activeView = 'day';
        component._processViewChange('month');
        expect(component.activeViewChange.emit).toHaveBeenCalledWith('month');
        expect(component.activeView).toBe('month');
        expect(component.isOnMonthView).toBeTruthy();
    });

    // ---------------------------------------------------------------------------
    // Arrow suppression passthrough (Wave 1.5)
    // ---------------------------------------------------------------------------

    describe('arrow suppression passthrough', () => {
        it('default state: both arrows present', () => {
            expect(fixture.nativeElement.querySelector('.fd-calendar__action--arrow-left')).not.toBeNull();
            expect(fixture.nativeElement.querySelector('.fd-calendar__action--arrow-right')).not.toBeNull();
        });

        it('hidePreviousArrow=true removes left-arrow div from rendered header', () => {
            fixture.componentRef.setInput('hidePreviousArrow', true);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.fd-calendar__action--arrow-left')).toBeNull();
        });

        it('hideNextArrow=true removes right-arrow div from rendered header', () => {
            fixture.componentRef.setInput('hideNextArrow', true);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.fd-calendar__action--arrow-right')).toBeNull();
        });
    });

    // ---------------------------------------------------------------------------
    // T2.1 — focus() crash fix when hidePreviousArrow=true (Wave 2 / S1 BLOCKER)
    // ---------------------------------------------------------------------------

    describe('focus() with arrow suppression', () => {
        beforeEach(() => {
            component.activeView = 'day';
            fixture.detectChanges();
        });

        it('does not throw when hidePreviousArrow=true', () => {
            fixture.componentRef.setInput('hidePreviousArrow', true);
            fixture.detectChanges();
            expect(() => component.focus()).not.toThrow();
        });

        it('falls back to currentMonthButton when prev is hidden — prev absent, month button present', () => {
            fixture.componentRef.setInput('hidePreviousArrow', true);
            fixture.detectChanges();
            // Confirm prev is absent (so the fallback chain is exercised)
            expect(fixture.nativeElement.querySelector('.fd-calendar__action--arrow-left')).toBeNull();
            // _currentMonthButton is the fallback — must be present so focus() can land somewhere
            expect(component._currentMonthButton?.nativeElement).toBeTruthy();
            expect(() => component.focus()).not.toThrow();
        });

        it('does not throw when both arrows suppressed (falls through to currentMonthButton)', () => {
            fixture.componentRef.setInput('hidePreviousArrow', true);
            fixture.componentRef.setInput('hideNextArrow', true);
            fixture.detectChanges();
            expect(() => component.focus()).not.toThrow();
        });

        it('does not throw when only nextArrow is visible (hidePreviousArrow=true, hideNextArrow=false)', () => {
            fixture.componentRef.setInput('hidePreviousArrow', true);
            fixture.componentRef.setInput('hideNextArrow', false);
            fixture.detectChanges();
            expect(() => component.focus()).not.toThrow();
        });
    });

    // ---------------------------------------------------------------------------
    // T2.4 — Both arrows absent simultaneously (Wave 2 / S5)
    // ---------------------------------------------------------------------------

    describe('both arrows suppressed simultaneously', () => {
        beforeEach(() => {
            component.activeView = 'day';
            fixture.componentRef.setInput('hidePreviousArrow', true);
            fixture.componentRef.setInput('hideNextArrow', true);
            fixture.detectChanges();
        });

        it('prev div absent from DOM', () => {
            expect(fixture.nativeElement.querySelector('.fd-calendar__action--arrow-left')).toBeNull();
        });

        it('next div absent from DOM', () => {
            expect(fixture.nativeElement.querySelector('.fd-calendar__action--arrow-right')).toBeNull();
        });

        it('focus() still works — falls through to currentMonthButton', () => {
            // Both arrows absent; currentMonthButton is rendered because activeView='day'
            expect(component._currentMonthButton?.nativeElement).toBeTruthy();
            expect(() => component.focus()).not.toThrow();
        });

        it('keydown ArrowLeft on header does not throw', () => {
            const hostEl: HTMLElement = fixture.nativeElement;
            expect(() =>
                hostEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
            ).not.toThrow();
        });

        it('keydown ArrowRight on header does not throw', () => {
            const hostEl: HTMLElement = fixture.nativeElement;
            expect(() =>
                hostEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
            ).not.toThrow();
        });
    });
});
