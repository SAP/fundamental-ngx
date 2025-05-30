import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { FormStates } from '@fundamental-ngx/cdk/forms';
import { whenStable } from '@fundamental-ngx/core/tests';
import { CheckboxModule } from '../checkbox.module';
import { CheckboxComponent } from './checkbox.component';

function getCheckboxInput(fixture: ComponentFixture<any>): HTMLInputElement {
    return fixture.nativeElement.querySelector('input');
}

function getCheckboxLabel(fixture: ComponentFixture<any>): any {
    return fixture.nativeElement.querySelector('.fd-checkbox__label');
}

function checkboxDetectChanges(checkbox: CheckboxComponent): void {
    checkbox['_changeDetectorRef'].detectChanges();
}

@Component({
    template: ` <fd-checkbox [(ngModel)]="value" [displayOnly]="displayOnly"></fd-checkbox> `,
    standalone: true,
    imports: [FormsModule, CheckboxComponent]
})
class TestCheckboxWrapperComponent {
    @ViewChild(CheckboxComponent) checkboxRef: CheckboxComponent;
    value: any = false;
    displayOnly = false;
}

describe('CheckboxComponent', () => {
    let checkbox: CheckboxComponent;
    let hostComponent: TestCheckboxWrapperComponent;
    let fixture: ComponentFixture<TestCheckboxWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestCheckboxWrapperComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestCheckboxWrapperComponent);
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

    it('should be unchecked on null', async () => {
        hostComponent.value = null;
        fixture.detectChanges();

        await fixture.whenStable();
        expect(checkbox.isChecked).toBe(false);
    });

    it('should be unchecked on undefined', async () => {
        hostComponent.value = undefined;
        fixture.detectChanges();

        await fixture.whenStable();
        expect(checkbox.isChecked).toBe(false);
    });

    it('should be checked on click', async () => {
        checkbox.nextValue();

        await whenStable(fixture);

        expect(checkbox.checkboxState).toBe('checked');
        expect(hostComponent.value).toBe(true);
        expect(checkbox.checkboxValue).toBe(true);
    });

    it('should be unchecked on double click', fakeAsync(() => {
        jest.spyOn(checkbox, 'nextValue');
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
        expect(input.classList.contains('is-success')).toBe(true);
    });

    it('should display input label', async () => {
        checkbox.label = 'Option 1';

        checkboxDetectChanges(checkbox);
        await whenStable(fixture);

        const checkboxLabel = getCheckboxLabel(fixture)?.querySelector('.fd-checkbox__text');

        expect(checkboxLabel.innerHTML).toContain('Option 1');
    });

    it('should check states', async () => {
        const states = ['information', 'success', 'error', 'warning'];

        for (let i = 0; i < states.length; i++) {
            checkbox.setStyleState(states[i] as FormStates);
            checkboxDetectChanges(checkbox);

            await whenStable(fixture);

            const input = getCheckboxInput(fixture);
            expect(input.classList.contains(`is-${states[i]}`)).toBe(true);
        }
    });

    it('should be disabled', async () => {
        checkbox.setDisabledState(true);

        await whenStable(fixture);

        const input = getCheckboxInput(fixture);
        const checkboxLabel = getCheckboxLabel(fixture);

        jest.spyOn(checkbox, 'nextValue');
        checkboxLabel.click();
        expect(input.checked).toBe(false);
        expect(input.disabled).toBe(true);
        expect(hostComponent.value).toBe(false);
        expect(checkbox.checkboxValue).toBe(false);
    });

    it('should focus on readonly checkbox', async () => {
        checkbox.setReadOnlyState(true);
        await whenStable(fixture);

        const input = getCheckboxInput(fixture);

        // Check if the checkbox can be focused
        input.focus();
        expect(document.activeElement).toBe(input);

        // Ensuring that it maintains its readonly nature
        expect(input.getAttribute('readonly')).not.toBeNull();
    });

    it('should not toggle state on click when readonly', async () => {
        checkbox.setReadOnlyState(true);
        hostComponent.value = false;
        await whenStable(fixture);

        const input = getCheckboxInput(fixture);

        // Spy on the nextValue method to ensure it is not being called
        jest.spyOn(checkbox, 'nextValue');

        // Click the input and check that the value does not change
        input.click();
        expect(checkbox.nextValue).not.toHaveBeenCalled();
        expect(checkbox.checkboxValue).toBe(false);
        expect(hostComponent.value).toBe(false);
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

    it('should use third state', fakeAsync(() => {
        checkbox.tristate = true;
        checkbox.tristateSelectable = true;
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
        checkbox.tristateSelectable = false; // "false" value is default
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
        checkbox.tristateSelectable = true;
        checkbox.values = { trueValue: 'Yes', falseValue: 'No', thirdStateValue: 'Maybe' };
        hostComponent.value = 'Yes';
        fixture.detectChanges();

        await fixture.whenStable();
        expect(hostComponent.value).toBe('Yes');
        checkbox.nextValue();
        expect(hostComponent.value).toBe('No');
        checkbox.nextValue();
        expect(hostComponent.value).toBe('Maybe');
        checkbox.nextValue();
        expect(hostComponent.value).toBe('Yes');
    });

    it('should render display-only mode', async () => {
        hostComponent.displayOnly = true;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(getCheckboxInput(fixture).classList).toContain('is-display');
    });

    it('should ignore user interactions when rendered in display-only mode', async () => {
        // Check usual interaction
        const oldValue = hostComponent.value;
        const checkboxInput = getCheckboxInput(fixture);
        checkboxInput.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        await fixture.whenStable();

        // Toggle happened
        expect(hostComponent.value).not.toEqual(oldValue);

        checkbox.displayOnly = true;
        fixture.detectChanges();
        await fixture.whenStable();
        checkboxInput.dispatchEvent(new Event('click'));

        fixture.detectChanges();
        await fixture.whenStable();

        // Toggle didn't happen
        expect(hostComponent.value).not.toEqual(oldValue);
    });
});

@Component({
    template: ` <fd-checkbox [value]="checked" (click)="onClicked()"></fd-checkbox> `,
    standalone: true,
    imports: [FormsModule, CheckboxModule]
})
class TestCheckboxWrapper2Component {
    @ViewChild(CheckboxComponent) checkboxRef: CheckboxComponent;
    checked = false;

    onClicked(): void {
        this.checked = !this.checked;
    }
}

describe('CheckboxComponent with external listeners', () => {
    let hostComponent: TestCheckboxWrapper2Component;
    let fixture: ComponentFixture<TestCheckboxWrapper2Component>;
    let labelElement: HTMLLabelElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestCheckboxWrapper2Component]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestCheckboxWrapper2Component);
        await whenStable(fixture);

        hostComponent = fixture.componentInstance;
        labelElement = <HTMLLabelElement>fixture.nativeElement.querySelector('label');
    });

    it('should propagate the click event to the host component and reflect value properly', () => {
        const spy = jest.spyOn(hostComponent, 'onClicked');

        labelElement.click();
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
