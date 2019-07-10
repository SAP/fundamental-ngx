import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Calendar2YearViewComponent } from './calendar2-year-view.component';
import { By } from '@angular/platform-browser';
import { CalendarComponent } from '../../../calendar.component';

describe('Calendar2YearViewComponent', () => {
    let component: Calendar2YearViewComponent;
    let fixture: ComponentFixture<Calendar2YearViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [Calendar2YearViewComponent]
        })
          .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Calendar2YearViewComponent);
        component = fixture.componentInstance;
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
        component.onKeydownYearHandler(event, 2025, 6);
        expect(focusSpy).toHaveBeenCalledWith('fd-calendar-0-fd-year-10');
    });

    it('Should focus on the year below when on ArrowUp', () => {
        const focusSpy = spyOn(component, 'focusElement');
        const event = {
            code: 'ArrowUp', preventDefault: () => {}
        };
        component.id = 'fd-calendar-0';
        component.onKeydownYearHandler(event, 2025, 6);
        expect(focusSpy).toHaveBeenCalledWith('fd-calendar-0-fd-year-2');
    });

    it('Should focus on the year below when on ArrowRight', () => {
        const focusSpy = spyOn(component, 'focusElement');
        const event = {
            code: 'ArrowRight', preventDefault: () => {}
        };
        component.id = 'fd-calendar-0';
        component.onKeydownYearHandler(event, 2025, 6);
        expect(focusSpy).toHaveBeenCalledWith('fd-calendar-0-fd-year-7');
    });

    it('Should focus on the year below when on ArrowLeft', () => {
        const focusSpy = spyOn(component, 'focusElement');
        const event = {
            code: 'ArrowLeft', preventDefault: () => {}
        };
        component.id = 'fd-calendar-0';
        component.onKeydownYearHandler(event, 2025, 6);
        expect(focusSpy).toHaveBeenCalledWith('fd-calendar-0-fd-year-5');
    });

    it('Should select the year when Enter key is clicked', () => {
        let event: { code: string; preventDefault: () => void };
        event = {
            code: 'Enter', preventDefault: () => {
            }
        };
        component.onKeydownYearHandler(event, 2025, 6);
        expect(component.yearSelected).toEqual(2025);
    });

    it('Should select the year when Space key is clicked', () => {
        const event = {
            code: 'Space', preventDefault: () => {}
        }
        component.onKeydownYearHandler(event, 2025, 6);
        expect(component.yearSelected).toEqual(2025);
    });
});
