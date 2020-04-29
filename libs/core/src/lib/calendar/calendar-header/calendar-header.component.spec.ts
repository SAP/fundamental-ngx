import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHeaderComponent } from './calendar-header.component';
import { ButtonModule } from '../../button/button.module';
import { CalendarService } from '../calendar.service';

describe('Calendar2HeaderComponent', () => {
    let component: CalendarHeaderComponent;
    let fixture: ComponentFixture<CalendarHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalendarHeaderComponent],
            imports: [ButtonModule],
            providers: [CalendarService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarHeaderComponent);
        component = fixture.componentInstance;
        component.currentlyDisplayed = { month: 10, year: 2018 };
        fixture.detectChanges();
    });

    it('Should switch to year view, when changed to year and not no year view', () => {
        spyOn(component.activeViewChange, 'emit');
        component.activeView = 'day';
        component.processViewChange('year');
        expect(component.activeViewChange.emit).toHaveBeenCalledWith('year');
        expect(component.activeView).toBe('year');
        expect(component.isOnYearView()).toBeTruthy();
    });

    it('Should switch to day view, when changed to year and on year view', () => {
        spyOn(component.activeViewChange, 'emit');
        component.activeView = 'year';
        component.processViewChange('year');
        expect(component.activeViewChange.emit).toHaveBeenCalledWith('day');
        expect(component.activeView).toBe('day');
    });

    it('Should switch to month view, changed to month and not no month view', () => {
        spyOn(component.activeViewChange, 'emit');
        component.activeView = 'day';
        component.processViewChange('month');
        expect(component.activeViewChange.emit).toHaveBeenCalledWith('month');
        expect(component.activeView).toBe('month');
        expect(component.isOnMonthView()).toBeTruthy();
    });
});
