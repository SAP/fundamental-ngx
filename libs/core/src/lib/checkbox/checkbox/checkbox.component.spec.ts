import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckboxComponent} from './checkbox.component';
import {FormsModule} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';

@Component({
    template: `
        <fd-checkbox [(ngModel)]="value"></fd-checkbox>
    `
})
class TestCheckboxComponent {
    @ViewChild(CheckboxComponent) checkboxRef;
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

    it('should properly bind control value', async () => {
        hostComponent.value = true;
        fixture.detectChanges();

        await fixture.whenStable();
        expect(checkbox.checkboxValue).toBe(true);
    });

    it('should be checked on click', async () => {
        const input = fixture.nativeElement.querySelector('input');
        const checkboxLabel = fixture.nativeElement.querySelector('.fd-checkbox__label');
        fixture.detectChanges();

        await fixture.whenStable();
        checkboxLabel.click();
        expect(input.checked).toBe(true);
        expect(hostComponent.value).toBe(true);
        expect(checkbox.checkboxValue).toBe(true);
    });

    it('should be unchecked on double click', async () => {
        const input = fixture.nativeElement.querySelector('input');
        const checkboxLabel = fixture.nativeElement.querySelector('.fd-checkbox__label');
        fixture.detectChanges();

        await fixture.whenStable();
        spyOn(checkbox, 'nextValue');
        checkboxLabel.click();
        checkboxLabel.click();
        expect(input.checked).toBe(false);
        expect(hostComponent.value).toBe(false);
        expect(checkbox.checkboxValue).toBe(false);
        expect(checkbox.nextValue).toHaveBeenCalledTimes(2);
    });

    it('should add state class', async () => {
        checkbox.state = 'valid';
        fixture.detectChanges();

        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input');
        expect(input).toHaveClass('is-valid')
    });

    it('should display input label', async () => {
        const checkboxLabel = fixture.nativeElement.querySelector('.fd-checkbox__label');
        checkbox.label = 'Option 1';
        fixture.detectChanges();

        await fixture.whenStable();
        expect(checkboxLabel.innerText).toBe('Option 1')
    });

    it('should be disabled', async () => {
        const input = fixture.nativeElement.querySelector('input');
        const checkboxLabel = fixture.nativeElement.querySelector('.fd-checkbox__label');
        checkbox.disabled = true;
        fixture.detectChanges();

        await fixture.whenStable();
        spyOn(checkbox, 'nextValue');
        checkboxLabel.click();
        expect(input.checked).toBe(false);
        expect(input.disabled).toBe(true);
        expect(hostComponent.value).toBe(false);
        expect(checkbox.checkboxValue).toBe(false);
    });

    it('should be compact', async() => {
        checkbox.compact = true;
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        const checkboxLabel = fixture.nativeElement.querySelector('.fd-checkbox__label');

        await fixture.whenStable();
        expect(input).toHaveClass('fd-checkbox--compact');
        expect(checkboxLabel).toHaveClass('fd-checkbox__label--compact');
    });

    it('should use custom values', async () => {
        const checkboxLabel = fixture.nativeElement.querySelector('.fd-checkbox__label');
        checkbox.values = {trueValue: 'Yes', falseValue: 'No'};
        hostComponent.value = 'Yes';
        fixture.detectChanges();

        await fixture.whenStable();
        expect(hostComponent.value).toBe('Yes');
        expect(checkbox.checkboxValue).toBe('Yes');

        checkboxLabel.click();

        expect(hostComponent.value).toBe('No');
        expect(checkbox.checkboxValue).toBe('No');
    });

    it('should use third state', async () => {
        const checkboxLabel = fixture.nativeElement.querySelector('.fd-checkbox__label');
        checkbox.tristate = true;
        fixture.detectChanges();

        await fixture.whenStable();
        expect(hostComponent.value).toBe(false);
        checkboxLabel.click();
        expect(hostComponent.value).toBe(null);
        checkboxLabel.click();
        expect(hostComponent.value).toBe(true);
        checkboxLabel.click();
        expect(hostComponent.value).toBe(false);
    });

    it('should not use third state', async () => {
        const checkboxLabel = fixture.nativeElement.querySelector('.fd-checkbox__label');
        hostComponent.value = null;
        checkbox.tristate = true;
        checkbox.tristateSelectable = false;
        fixture.detectChanges();

        await fixture.whenStable();
        expect(hostComponent.value).toBe(null);
        checkboxLabel.click();
        expect(hostComponent.value).toBe(true);
        checkboxLabel.click();
        expect(hostComponent.value).toBe(false);
        checkboxLabel.click();
        expect(hostComponent.value).toBe(true);
    });

    it('should use custom values for third state', async () => {
        const checkboxLabel = fixture.nativeElement.querySelector('.fd-checkbox__label');
        checkbox.tristate = true;
        checkbox.values = {trueValue: 'Yes', falseValue: 'No', thirdStateValue: 'Maby'};
        hostComponent.value = 'Yes';
        fixture.detectChanges();

        await fixture.whenStable();
        expect(hostComponent.value).toBe('Yes');
        checkboxLabel.click();
        expect(hostComponent.value).toBe('No');
        checkboxLabel.click();
        expect(hostComponent.value).toBe('Maby');
        checkboxLabel.click();
        expect(hostComponent.value).toBe('Yes');
    });
});
