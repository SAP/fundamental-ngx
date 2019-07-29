import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarYearViewComponent } from './calendar-year-view.component';
import { CalendarService } from '../../calendar.service';

describe('Calendar2YearViewComponent', () => {
    let component: CalendarYearViewComponent;
    let fixture: ComponentFixture<CalendarYearViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalendarYearViewComponent],
            providers: [CalendarService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarYearViewComponent);
        component = fixture.componentInstance;
        component.yearSelected = 2019;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should focus on the year below when on ArrowDown', () => {
        const focusSpy = spyOn(component, 'focusElement');
        const event = {
            code: 'ArrowDown', preventDefault: () => {}
        };
        component.id = 'fd-calendar-0';
        component.onKeydownYearHandler(event, 6);
        expect(focusSpy).toHaveBeenCalledWith('fd-calendar-0-fd-year-10');
    });

    it('Should focus on the year below when on ArrowUp', () => {
        const focusSpy = spyOn(component, 'focusElement');
        const event = {
            code: 'ArrowUp', preventDefault: () => {}
        };
        component.id = 'fd-calendar-0';
        component.onKeydownYearHandler(event, 6);
        expect(focusSpy).toHaveBeenCalledWith('fd-calendar-0-fd-year-2');
    });

    it('Should focus on the year below when on ArrowRight', () => {
        const focusSpy = spyOn(component, 'focusElement');
        const event = {
            code: 'ArrowRight', preventDefault: () => {}
        };
        component.id = 'fd-calendar-0';
        component.onKeydownYearHandler(event, 6);
        expect(focusSpy).toHaveBeenCalledWith('fd-calendar-0-fd-year-7');
    });

    it('Should focus on the year below when on ArrowLeft', () => {
        const focusSpy = spyOn(component, 'focusElement');
        const event = {
            code: 'ArrowLeft', preventDefault: () => {}
        };
        component.id = 'fd-calendar-0';
        component.onKeydownYearHandler(event, 6);
        expect(focusSpy).toHaveBeenCalledWith('fd-calendar-0-fd-year-5');
    });

    it('Should select the year when Enter key is clicked', () => {
        let event: { code: string; preventDefault: () => void };
        event = {
            code: 'Enter', preventDefault: () => {}
        };
        component.onKeydownYearHandler(event, 6);
        expect(component.yearSelected).toEqual(2025);
    });

    it('Should select the year when Space key is clicked', () => {
        const event = {
            code: 'Space', preventDefault: () => {}
        };
        component.onKeydownYearHandler(event, 6);
        expect(component.yearSelected).toEqual(2025);
    });
});
