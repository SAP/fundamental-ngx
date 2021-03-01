import { ComponentFixture, TestBed, tick, fakeAsync, waitForAsync } from '@angular/core/testing';
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

function checkboxDetectChanges(checkbox: CheckboxComponent): void {
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

    beforeEach(waitForAsync(() => {
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
        checkbox.nextValue();

        await whenStable(fixture);

        expect(checkbox.checkboxState).toBe('checked');
        expect(hostComponent.value).toBe(true);
        expect(checkbox.checkboxValue).toBe(true);
    });

    it('should be unchecked on double click', fakeAsync (() => {
        spyOn(checkbox, 'nextValue');
        checkbox.nextValue();
        tick(15);
        checkbox.nextValue();
        expect(getCheckboxInput(fixture).checked).toBe(false);
        expect(hostComponent.value).toBe(false);
        expect(checkbox.checkboxValue).toBe(false);
        expect(checkbox.nextValue).toHaveBeenCalledTimes(2);
    }));

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
        checkbox.values = { trueValue: 'Yes', falseValue: 'No' };
        hostComponent.value = 'Yes';
        fixture.detectChanges();

        await fixture.whenStable();
        expect(hostComponent.value).toBe('Yes');
        expect(checkbox.checkboxValue).toBe('Yes');

        checkbox.nextValue();


        expect(hostComponent.value).toBe('No');
        expect(checkbox.checkboxValue).toBe('No');
    });

    it('should use third state', fakeAsync (() => {
        checkbox.tristate = true;
        fixture.detectChanges();

        expect(hostComponent.value).toBe(false);
        checkbox.nextValue();
        tick(10);
        expect(hostComponent.value).toBe(null);
        checkbox.nextValue();
        tick(10);
        expect(hostComponent.value).toBe(true);
        checkbox.nextValue();
        tick(10);
        expect(hostComponent.value).toBe(false);
    }));

    it('should not use third state', async () => {
        hostComponent.value = null;
        checkbox.tristate = true;
        checkbox.tristateSelectable = false;
        fixture.detectChanges();

        await fixture.whenStable();
        expect(hostComponent.value).toBe(null);
        checkbox.nextValue();
        expect(hostComponent.value).toBe(true);
        checkbox.nextValue();
        expect(hostComponent.value).toBe(false);
        checkbox.nextValue();
        expect(hostComponent.value).toBe(true);
    });

    it('should use custom values for third state', async () => {
        checkbox.tristate = true;
        checkbox.values = { trueValue: 'Yes', falseValue: 'No', thirdStateValue: 'Maby' };
        hostComponent.value = 'Yes';
        fixture.detectChanges();

        await fixture.whenStable();
        expect(hostComponent.value).toBe('Yes');
        checkbox.nextValue();
        expect(hostComponent.value).toBe('No');
        checkbox.nextValue();
        expect(hostComponent.value).toBe('Maby');
        checkbox.nextValue();
        expect(hostComponent.value).toBe('Yes');
    });
});
