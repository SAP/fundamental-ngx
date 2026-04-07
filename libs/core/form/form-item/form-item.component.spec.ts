import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControlComponent } from '../form-control/form-control.component';
import { FormLabelComponent } from '../form-label/form-label.component';
import { FormItemComponent } from './form-item.component';

@Component({
    selector: 'fd-test-component',
    template: '<div #componentElement fd-form-item [horizontal]="horizontal" [isInline]="inline">FormItem</div>',
    imports: [FormItemComponent],
    standalone: true
})
export class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;

    horizontal = false;

    inline = false;
}

@Component({
    selector: 'fd-test-form-item-with-label',
    template: `
        <div fd-form-item>
            <label fd-form-label for="test-input">Test Label</label>
            <input fd-form-control type="text" id="test-input" #inputEl />
        </div>
    `,
    imports: [FormItemComponent, FormLabelComponent, FormControlComponent],
    standalone: true
})
class TestFormItemWithLabelComponent {
    @ViewChild('inputEl', { read: ElementRef })
    inputRef: ElementRef;

    @ViewChild(FormLabelComponent)
    formLabel: FormLabelComponent;
}

describe('FormItemComponent', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign item class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-form-item');
    });

    it('should support horizontal', () => {
        component.horizontal = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('fd-form-item--horizontal');
    });

    it('should support isInline', () => {
        component.inline = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('fd-form-item--inline');
    });
});

describe('FormItemComponent aria-labelledby', () => {
    let fixture: ComponentFixture<TestFormItemWithLabelComponent>;
    let component: TestFormItemWithLabelComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestFormItemWithLabelComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestFormItemWithLabelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should set aria-labelledby on the input from the form label', () => {
        const inputEl: HTMLInputElement = component.inputRef.nativeElement;
        const labelId = component.formLabel.formLabelId;

        expect(inputEl.getAttribute('aria-labelledby')).toBe(labelId);
    });

    it('should not cause ExpressionChangedAfterItHasBeenCheckedError', () => {
        // If this test runs without error, the NG0100 is fixed.
        // The bug was caused by using afterNextRender to set ariaLabelledBy,
        // which fires after the render but before dev-mode's expression check.
        expect(() => {
            fixture.detectChanges();
        }).not.toThrow();
    });
});
