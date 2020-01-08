import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import {CheckboxComponent} from './checkbox.component';
import {FormsModule} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';

@Component({
    template: `
        <fd-checkbox [(ngModel)]="value"></fd-checkbox>`
})
class TestCheckboxComponent {
    @ViewChild(CheckboxComponent, {static: false}) checkboxRef;
    value: any = false;
}

describe('CheckboxComponent', () => {
    let checkbox: CheckboxComponent;
    let hostComponent: TestCheckboxComponent;
    let fixture: ComponentFixture<TestCheckboxComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CheckboxComponent, TestCheckboxComponent]
        });

        fixture = TestBed.createComponent(TestCheckboxComponent);
        hostComponent = fixture.componentInstance;
        fixture.detectChanges();
        checkbox = fixture.componentInstance.checkboxRef;
    });

    it('should create', () => {
        expect(hostComponent).toBeTruthy();
        expect(checkbox).toBeTruthy();
    });

    it('should properly bind control value', () => {
        fixture.detectChanges();

        spyOn(checkbox, 'writeValue');

        hostComponent.value = true;
        fixture.detectChanges();

        hostComponent.value = false;
        fixture.detectChanges();

        expect(checkbox.writeValue).toHaveBeenCalledTimes(3);
        expect(checkbox.checkboxValue).toBe(false);
    });

    // it('should be unchecked on double click', () => {
    //     const checkboxLabel = fixture.nativeElement.querySelector('.fd-checkbox__label');
    //     checkboxLabel.click();
    //     checkboxLabel.click();
    //     fixture.detectChanges();
    //
    //     const input = fixture.nativeElement.querySelector('input');
    //     expect(input.checked).toBe(false);
    //     expect(hostComponent.value).toBe(false);
    //     expect(checkbox.checkboxValue).toBe(false);
    // });
    //
    // it('should add state class', () => {
    //     checkbox.state = 'valid';
    //     fixture.detectChanges();
    //
    //     const input = fixture.nativeElement.querySelector('input');
    //     expect(input).toHaveClass('is-valid')
    // });
    //
    // it('should display input label', () => {
    //     const checkboxLabel = fixture.nativeElement.querySelector('.fd-checkbox__label');
    //     checkbox.label = 'Option 1';
    //     fixture.detectChanges();
    //
    //     expect(checkboxLabel.innerText).toBe('Option 1')
    // });
    //
    // it('should be disabled', () => {
    //     const input = fixture.nativeElement.querySelector('input');
    //     hostComponent.value = true;
    //     fixture.detectChanges();
    //
    //     checkbox.disabled = true;
    //     fixture.detectChanges();
    //
    //     expect(input.disabled).toBe(true);
    //     expect(input.checked).toBe(false);
    //     expect(hostComponent.value).toBe(false);
    //     expect(checkbox.checkboxValue).toBe(false);

    // checkboxLabel.click();
    // fixture.detectChanges();
    //
    // expect(input.disabled).toBe(true);
    // expect(input.checked).toBe(false);
    // expect(hostComponent.value).toBe(false);
    // expect(checkbox.checkboxValue).toBe(false);
    // });
    //
    // it('should be compact', () => {
    //     checkbox.compact = true;
    //     fixture.detectChanges();
    //
    //     const input = fixture.nativeElement.querySelector('input');
    //     expect(input).toHaveClass('fd-checkbox--compact');
    // });
    //
    // it('should use custom values', () => {
    //     hostComponent.value = 'Yes';
    //     checkbox.values = {trueValue: 'Yes', falseValue: 'No'};
    //     fixture.detectChanges();
    //
    //     expect(hostComponent.value).toBe('Yes');
    //
    //     checkboxLabel.click();
    //     fixture.detectChanges();
    //
    //     expect(hostComponent.value).toBe('No');
    // });
    //
    // it('should not use third state', () => {
    //     checkboxLabel.click();
    //     checkboxLabel.click();
    //     fixture.detectChanges();
    //
    //     expect(hostComponent.value).toBe(false);
    // });
    //
    // it('should use third state', () => {
    //     checkbox.tristate = true;
    //     checkboxLabel.click();
    //     checkboxLabel.click();
    //     fixture.detectChanges();
    //
    //     expect(checkbox.tristate).toBe(true);
    //     expect(hostComponent.value).toBe(null);
    // });
    //
    // it('should use custom values for third state', () => {
    //     const input = fixture.nativeElement.querySelector('input');
    //
    //     checkbox.tristate = true;
    //     checkbox.values = {trueValue: 'Yes', falseValue: 'No', thirdStateValue: 'Maby'};
    //     fixture.detectChanges();
    //
    //     hostComponent.value = 'Yes';
    //     fixture.detectChanges();
    //
    //     console.log(checkbox);
    //     console.log(hostComponent);
    //
    //     checkboxLabel.click();
    //     fixture.detectChanges();
    //
    //     expect(hostComponent.value).toBe('Yes');
    //     expect(input.checked).toBe(true);
    //     expect(input.indeterminate).toBe(false);
    //
    //     // checkboxLabel.click();
    //     // fixture.detectChanges();
    //     // expect(hostComponent.value).toBe('No');
    //     // expect(input.checked).toBe(false);
    //     // expect(input.indeterminate).toBe(false);
    //     //
    //     // checkboxLabel.click();
    //     // fixture.detectChanges();
    //     // expect(hostComponent.value).toBe('Maby');
    //     // expect(input.checked).toBe(false);
    //     // expect(input.indeterminate).toBe(true);
    // });
    //
    // it('should use not select enabled third state', () => {
    //     const input = fixture.nativeElement.querySelector('input');
    //
    //     checkbox.tristate = true;
    //     hostComponent.value = null;
    //
    //     fixture.detectChanges();
    //     expect(hostComponent.value).toBe(null);
    //     expect(input.checked).toBe(false);
    //     expect(input.indeterminate).toBe(true);
    //
    //     // checkboxLabel.click();
    //     // fixture.detectChanges();
    //     // expect(hostComponent.value).toBe(true);
    //     // expect(input.checked).toBe(true);
    //     // expect(input.indeterminate).toBe(false);
    //     //
    //     // checkboxLabel.click();
    //     // fixture.detectChanges();
    //     // expect(hostComponent.value).toBe(false);
    //     // expect(input.checked).toBe(false);
    //     // expect(input.indeterminate).toBe(false);
    // });
});
