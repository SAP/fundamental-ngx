import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormLabelComponent } from './form-label.component';

@Component({
    template: `
        <label
            #componentElement
            fd-form-label
            [required]="required"
            [colon]="colon"
            [disabled]="disabled"
            [unitDescription]="unitDescription"
            [independent]="independent"
            >Test Text</label
        >
    `,
    imports: [FormLabelComponent]
})
class FormLabelTestComponent {
    @ViewChild(FormLabelComponent)
    ref: FormLabelComponent;

    required = false;
    colon = false;
    disabled = false;
    unitDescription = false;
    independent = false;

    getLabelElement(): Element {
        return document.getElementsByClassName('fd-form-label')[0];
    }
}

describe('FormLabelComponent', () => {
    let component: FormLabelTestComponent;
    let fixture: ComponentFixture<FormLabelTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormLabelTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormLabelTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.getLabelElement().className.includes('fd-form-label')).toBe(true);
    });

    it('should apply fd-form-label--disabled when disabled', () => {
        component.disabled = true;
        fixture.detectChanges();
        const labelEl = fixture.nativeElement.querySelector('[fd-form-label]');
        expect(labelEl.classList.contains('fd-form-label--disabled')).toBe(true);
    });

    it('should set aria-disabled on inner label span when disabled', () => {
        component.disabled = true;
        fixture.detectChanges();
        expect(component.getLabelElement().getAttribute('aria-disabled')).toBe('true');
    });

    it('should not set aria-disabled when not disabled', () => {
        expect(component.getLabelElement().getAttribute('aria-disabled')).toBeNull();
    });

    it('should apply fd-form-label--unit-description when unitDescription is true', () => {
        component.unitDescription = true;
        fixture.detectChanges();
        expect(component.getLabelElement().classList.contains('fd-form-label--unit-description')).toBe(true);
    });

    it('should apply fd-form-label--stand-alone when independent is true', () => {
        component.independent = true;
        fixture.detectChanges();
        expect(component.getLabelElement().classList.contains('fd-form-label--stand-alone')).toBe(true);
    });

    it('should apply fd-form-label--required when required', () => {
        component.required = true;
        fixture.detectChanges();
        expect(component.getLabelElement().classList.contains('fd-form-label--required')).toBe(true);
    });

    it('should apply fd-form-label--colon when colon is true', () => {
        component.colon = true;
        fixture.detectChanges();
        expect(component.getLabelElement().classList.contains('fd-form-label--colon')).toBe(true);
    });
});
