import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LegendItemComponent } from './calendar-legend-item.component';

describe('LegendItemComponent', () => {
    let component: LegendItemComponent;
    let fixture: ComponentFixture<LegendItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LegendItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LegendItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit focusedElementEvent with the correct id on focus', () => {
        const spy = spyOn(component.focusedElementEvent, 'emit');
        component.onFocus();
        expect(spy).toHaveBeenCalledWith(component.id);
    });

    it('should apply the correct CSS classes when inputs change', () => {
        component.type = 'appointment';
        component.circle = true;
        component.color = 'blue';

        // Trigger ngOnChanges to rebuild the CSS classes
        component.ngOnChanges();

        const cssClasses = component.buildComponentCssClass();
        expect(cssClasses).toContain('fd-calendar-legend__item');
        expect(cssClasses).toContain('fd-calendar-legend__item--appointment');
        expect(cssClasses).toContain('fd-calendar-legend__item--blue');
    });

    it('should update CSS classes dynamically when input signals change', () => {
        component.type = 'appointment';
        fixture.detectChanges();

        let cssClasses = component.buildComponentCssClass();
        expect(cssClasses).toContain('fd-calendar-legend__item--appointment');

        // Update inputSignal value
        component.type = '';
        fixture.detectChanges();

        cssClasses = component.buildComponentCssClass();
        expect(cssClasses).not.toContain('fd-calendar-legend__item--appointment');
    });

    it('should handle color input dynamically via inputSignals', () => {
        component.color = 'red';
        fixture.detectChanges();

        const cssClasses = component.buildComponentCssClass();
        expect(cssClasses).toContain('fd-calendar-legend__item--red');

        // Update inputSignal for color
        component.color = 'green';
        fixture.detectChanges();

        const updatedCssClasses = component.buildComponentCssClass();
        expect(updatedCssClasses).toContain('fd-calendar-legend__item--green');
        expect(updatedCssClasses).not.toContain('fd-calendar-legend__item--red');
    });

    it('should update text dynamically', () => {
        component.text = 'Initial Text';
        fixture.detectChanges();

        let textElement = fixture.nativeElement.querySelector('.fd-calendar-legend__text');
        expect(textElement.textContent.trim()).toBe('Initial Text');

        // Update text dynamically
        component.text = 'Updated Text';
        fixture.detectChanges();

        textElement = fixture.nativeElement.querySelector('.fd-calendar-legend__text');
        expect(textElement.textContent.trim()).toBe('Updated Text');
    });

    it('should add appointment class when circle input is true', () => {
        component.circle = true;
        fixture.detectChanges();

        const appointmentClass = component.getAppointmentClass();
        expect(appointmentClass).toBe('fd-calendar-legend__item--appointment');
    });

    it('should not add appointment class when circle is false and type is not appointment', () => {
        component.circle = false;
        component.type = '';
        fixture.detectChanges();

        const appointmentClass = component.getAppointmentClass();
        expect(appointmentClass).toBe('');
    });
});
