import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from '../calendar/calendar.component';
import { DatePickerComponent } from './date-picker.component';
import { HashService } from '../utils/hash.service';

describe('DatePickerComponent', () => {
    let component: DatePickerComponent;
    let fixture: ComponentFixture<DatePickerComponent>;
    let hashServiceSpy: jasmine.SpyObj<HashService>;

    beforeEach(async(() => {
        const hashSpy = jasmine.createSpyObj('HashService', {
            hash: '1'
        });
        TestBed.configureTestingModule({
            declarations: [CalendarComponent, DatePickerComponent],
            providers: [{ provide: HashService, useValue: hashSpy }]
        }).compileComponents();

        hashServiceSpy = TestBed.get(HashService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the calendar', () => {
        spyOn(component, 'getInputValue');
        component.isOpen = false;
        component.isValidDateInput = true;
        component.openCalendar({});
        expect(component.getInputValue).toHaveBeenCalled();
        expect(component.isOpen).toBeTruthy();
        expect(component.inputFieldDate).toBeNull();
    });

    it('should close the calendar', () => {
        component.isOpen = true;
        component.isValidDateInput = true;
        component.closeCalendar();
        expect(component.inputFieldDate).toBeNull();
        expect(component.isOpen).not.toBeTruthy();
    });

    it('should handle blur', () => {
        component.isOpen = true;
        component.isValidDateInput = true;
        component.onBlurHandler();
        expect(component.inputFieldDate).toBeNull();
    });

    it('should update date picker input handler', () => {
        const dateVal = new Date();
        const firstDateVal = new Date();
        firstDateVal.setTime(firstDateVal.getTime() - 86400000);
        const lastDateVal = new Date();
        lastDateVal.setTime(firstDateVal.getTime() + 86400000);
        const d = {
            selectedDay: {
                id: 1,
                date: dateVal
            },
            selectedFirstDay: {
                id: 2,
                date: firstDateVal
            },
            selectedLastDay: {
                id: 3,
                date: lastDateVal
            }
        };
        component.type = 'single';
        component.updateDatePickerInputHandler(d);
        expect(component.inputFieldDate).toEqual(d.selectedDay.date.toLocaleDateString());
        component.type = 'range';
        component.updateDatePickerInputHandler(d);
        expect(component.inputFieldDate).toEqual(
            d.selectedFirstDay.date.toLocaleDateString() + ' - ' + d.selectedLastDay.date.toLocaleDateString()
        );
    });

    it('should handle escape keydown', () => {
        spyOn(component, 'closeCalendar');
        const keyDownEvent = new KeyboardEvent('keydown', {
            key: 'escape'
        });
        document.dispatchEvent(keyDownEvent);
        expect(component.closeCalendar).toHaveBeenCalled();
    });

    it('should handle document click', () => {
        spyOn(component, 'closeCalendar');
        fixture.nativeElement.click();
        expect(component.closeCalendar).not.toHaveBeenCalled();
        document.dispatchEvent(new MouseEvent('click'));
        expect(component.closeCalendar).toHaveBeenCalled();
    });
});
