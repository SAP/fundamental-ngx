import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

import { CheckboxComponent } from './checkbox.component';
import { whenStable } from '../../utils/tests/when-stable';

function getCheckboxInput(fixture: ComponentFixture<any>): any {
    return fixture.nativeElement.querySelector('input');
}

function getCheckboxLabel(fixture: ComponentFixture<any>): any {
    return fixture.nativeElement.querySelector('.fd-checkbox__label');
}

function checkboxDetectChanges(checkbox: CheckboxComponent) {
    checkbox['_changeDetectorRef'].detectChanges();
}

@Component({
    template: ` <fd-checkbox [(ngModel)]="value"></fd-checkbox> `
})
class TestCheckboxComponent {
    @ViewChild(CheckboxComponent) checkboxRef: CheckboxComponent;
    value: any = false;
}

describe('CheckboxComponent', () => {
    let checkbox: CheckboxComponent;
    let hostComponent: TestCheckboxComponent;
    let fixture: ComponentFixture<TestCheckboxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CheckboxComponent, TestCheckboxComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestCheckboxComponent);
        await whenStable(fixture);

        hostComponent = fixture.componentInstance;
        checkbox = fixture.componentInstance.checkboxRef;

        await whenStable(fixture);
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
        const checkboxLabel = getCheckboxLabel(fixture);
        checkboxLabel.click();

        await whenStable(fixture);

        const input = getCheckboxInput(fixture);

        expect(input.checked).toBe(true);
        expect(checkbox.checkboxState).toBe('checked');
        expect(hostComponent.value).toBe(true);
        expect(checkbox.checkboxValue).toBe(true);
    });

    it('should be unchecked on double click', async () => {
        const checkboxLabel = getCheckboxLabel(fixture);
        fixture.detectChanges();

        await fixture.whenStable();
        spyOn(checkbox, 'nextValue');
        checkboxLabel.click();
        checkboxLabel.click();
        expect(getCheckboxInput(fixture).checked).toBe(false);
        expect(hostComponent.value).toBe(false);
        expect(checkbox.checkboxValue).toBe(false);
        expect(checkbox.nextValue).toHaveBeenCalledTimes(2);
    });

    it('should add state class', async () => {
        checkbox.state = 'success';

        checkboxDetectChanges(checkbox);
        await whenStable(fixture);

        const input = getCheckboxInput(fixture);
        expect(input).toHaveClass('is-success');
    });

    it('should display input label', async () => {
        checkbox.label = 'Option 1';

        checkboxDetectChanges(checkbox);
        await whenStable(fixture);

        const checkboxLabel = getCheckboxLabel(fixture);

        expect(checkboxLabel.innerText).toBe('Option 1');
    });

    it('should be disabled', async () => {
        checkbox.setDisabledState(true);

        await whenStable(fixture);

        const input = getCheckboxInput(fixture);
        const checkboxLabel = getCheckboxLabel(fixture);

        spyOn(checkbox, 'nextValue');
        checkboxLabel.click();
        expect(input.checked).toBe(false);
        expect(input.disabled).toBe(true);
        expect(hostComponent.value).toBe(false);
        expect(checkbox.checkboxValue).toBe(false);
    });

    it('should be compact', async () => {
        checkbox.compact = true;

        checkboxDetectChanges(checkbox);
        await whenStable(fixture);

        const input = getCheckboxInput(fixture);
        const checkboxLabel = getCheckboxLabel(fixture);

        expect(input).toHaveClass('fd-checkbox--compact');
        expect(checkboxLabel).toHaveClass('fd-checkbox__label--compact');
    });

    it('should use custom values', async () => {
        const checkboxLabel = getCheckboxLabel(fixture);
        checkbox.values = { trueValue: 'Yes', falseValue: 'No' };
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
        const checkboxLabel = getCheckboxLabel(fixture);
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
        const checkboxLabel = getCheckboxLabel(fixture);
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
        const checkboxLabel = getCheckboxLabel(fixture);
        checkbox.tristate = true;
        checkbox.values = { trueValue: 'Yes', falseValue: 'No', thirdStateValue: 'Maby' };
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
