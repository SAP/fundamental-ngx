import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonthViewComponent } from './calendar-month-view.component';
import { By } from '@angular/platform-browser';
import { CalendarService } from '../../calendar.service';


describe('Calendar2MonthViewComponent', () => {
    let component: CalendarMonthViewComponent;
    let fixture: ComponentFixture<CalendarMonthViewComponent>;
    const testMonth: number = 5;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalendarMonthViewComponent],
            providers: [CalendarService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarMonthViewComponent);
        component = fixture.componentInstance;
        component.id = 'test';
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should have 12 months', () => {
        expect(component.shortMonthNames).toBeDefined();
        expect(component.shortMonthNames.length).toBe(12);
    });

    it('Should trigger a click event', () => {
        spyOn(component, 'selectMonth');
        fixture.debugElement.query(By.css('li')).nativeElement.click();
        expect(component.selectMonth).toHaveBeenCalled();
    });

    it('Should have is-selected class when the month is selected', () => {
        const element = fixture.debugElement.query(By.css('li')).nativeElement;
        expect(element.classList.contains('is-selected')).toBe(false);

        component.selectMonth(0);
        fixture.detectChanges();
        const selectedElement = fixture.debugElement.query(By.css('li')).nativeElement;
        expect(selectedElement.classList.contains('is-selected')).toBe(true);
    });


    it('Should focus the month below with ArrowDown', () => {
        const focusSpy = spyOn(component, 'focusElement');
        const event = {
            code: 'ArrowDown', preventDefault: () => {}
        };
        component.onKeydownMonthHandler(event, testMonth);
        expect(focusSpy).toHaveBeenCalledWith('#test-fd-month-9');
    });

    it('Should focus the month above with ArrowUp', () => {
        const focusSpy = spyOn(component, 'focusElement');
        const event = {
            code: 'ArrowUp', preventDefault: () => {}
        };
        component.onKeydownMonthHandler(event, testMonth);
        expect(focusSpy).toHaveBeenCalledWith('#test-fd-month-1');
    });

    it('Should focus the month to the left with ArrowLeft', () => {
        const focusSpy = spyOn(component, 'focusElement');
        const event = {
            code: 'ArrowLeft', preventDefault: () => {}
        };
        component.onKeydownMonthHandler(event, testMonth);
        expect(focusSpy).toHaveBeenCalledWith('#test-fd-month-4');
    });

    it('Should focus the month to the right with ArrowRight', () => {
        const focusSpy = spyOn(component, 'focusElement');
        const event = {
            code: 'ArrowRight', preventDefault: () => {}
        };
        component.onKeydownMonthHandler(event, testMonth);
        expect(focusSpy).toHaveBeenCalledWith('#test-fd-month-6');
    });

    it('Should select a month with Enter', () => {
        const event = {
            code: 'Enter', preventDefault: () => {}
        };
        component.onKeydownMonthHandler(event, testMonth);
        expect(component.monthSelected).toEqual(6);
    });

    it('Should select a month with Space', () => {

        const event = {
            code: 'Space', preventDefault: () => {}
        };
        component.onKeydownMonthHandler(event, testMonth);
        expect(component.monthSelected).toEqual(6);
    });
});
