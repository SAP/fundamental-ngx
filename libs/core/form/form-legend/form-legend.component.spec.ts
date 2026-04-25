import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormLegendDirective } from './form-legend.directive';

@Component({
    template: ` <legend #directiveElement fd-form-legend [disabled]="disabled">Test Text</legend> `,
    imports: [FormLegendDirective],
    standalone: true
})
class FormLegendTestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;

    disabled = false;
}

describe('FormLegendDirective', () => {
    let component: FormLegendTestComponent;
    let fixture: ComponentFixture<FormLegendTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormLegendTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormLegendTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toContain('fd-fieldset__legend');
    });

    it('should not have is-disabled class by default', () => {
        expect(component.ref.nativeElement.classList.contains('is-disabled')).toBe(false);
    });

    it('should add is-disabled class when disabled', () => {
        component.disabled = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList.contains('is-disabled')).toBe(true);
    });
});
