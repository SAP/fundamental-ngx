import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { CalendarService } from '../../calendar.service';
import { CalendarMonth } from '../../models/calendar-month';
import { CalendarMonthViewComponent } from './calendar-month-view.component';

describe('CalendarMonthViewComponent', () => {
    let component: CalendarMonthViewComponent<FdDate>;
    let fixture: ComponentFixture<CalendarMonthViewComponent<FdDate>>;
    const testMonth = 5;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdDatetimeModule],
            declarations: [CalendarMonthViewComponent],
            providers: [CalendarService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent<CalendarMonthViewComponent<FdDate>>(CalendarMonthViewComponent);
        component = fixture.componentInstance;
        component.id = 'test';
        component.year = 2020;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should have 12 months', () => {
        expect(component._calendarMonthListGrid).toBeDefined();
        const monthList = ([] as CalendarMonth[]).concat(...component._calendarMonthListGrid);
        expect(monthList.length).toBe(12);
    });

    it('Should trigger a click event', () => {
        jest.spyOn(component, 'selectMonth');
        fixture.debugElement.query(By.css('td')).nativeElement.click();
        expect(component.selectMonth).toHaveBeenCalled();
    });

    it('Should have is-active class when the month is selected', () => {
        const element = fixture.debugElement.query(By.css('td')).nativeElement;

        expect(element.classList.contains('is-active')).toBe(false);

        component.selectMonth(component._calendarMonthListGrid[0][0]);
        (component as any)._constructMonthGrid();
        fixture.detectChanges();

        const selectedElement = fixture.debugElement.query(By.css('td')).nativeElement;

        expect(selectedElement.classList.contains('is-active')).toBe(true);
    });

    it('Should focus the month below with ArrowDown', () => {
        const focusSpy = jest.spyOn(component, '_focusElementBySelector');
        const event = {
            key: 'ArrowDown',
            preventDefault: () => {}
        } as KeyboardEvent;
        component._onKeydownMonthHandler(event, testMonth);
        expect(focusSpy).toHaveBeenCalledWith('#test-month-view-month-8');
    });

    it('Should focus the month above with ArrowUp', () => {
        const focusSpy = jest.spyOn(component, '_focusElementBySelector');
        const event = {
            key: 'ArrowUp',
            preventDefault: () => {}
        } as KeyboardEvent;
        component._onKeydownMonthHandler(event, testMonth);
        expect(focusSpy).toHaveBeenCalledWith('#test-month-view-month-2');
    });

    it('Should focus the month to the left with ArrowLeft', () => {
        const focusSpy = jest.spyOn(component, '_focusElementBySelector');
        const event = {
            key: 'ArrowLeft',
            preventDefault: () => {}
        } as KeyboardEvent;
        component._onKeydownMonthHandler(event, testMonth);
        expect(focusSpy).toHaveBeenCalledWith('#test-month-view-month-4');
    });

    it('Should focus the month to the right with ArrowRight', () => {
        const focusSpy = jest.spyOn(component, '_focusElementBySelector');
        const event = {
            key: 'ArrowRight',
            preventDefault: () => {}
        } as KeyboardEvent;
        component._onKeydownMonthHandler(event, testMonth);
        expect(focusSpy).toHaveBeenCalledWith('#test-month-view-month-6');
    });

    it('Should select a month with Enter', () => {
        const event = {
            key: 'Enter',
            preventDefault: () => {}
        } as KeyboardEvent;
        component._onKeydownMonthHandler(event, testMonth);
        expect(component.monthSelected).toEqual(6);
    });

    it('Should select a month with Space', () => {
        const event = {
            key: ' ',
            preventDefault: () => {}
        } as KeyboardEvent;
        component._onKeydownMonthHandler(event, testMonth);
        expect(component.monthSelected).toEqual(6);
    });

    it('Should generate grid', () => {
        expect(component._calendarMonthListGrid).toBeDefined();

        const sizes: number[] = component._calendarMonthListGrid.map((list) => list.length);

        expect(sizes).toEqual([3, 3, 3, 3]);
    });
});
