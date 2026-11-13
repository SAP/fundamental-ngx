import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';

@Component({
    template: `
        <form [formGroup]="radioForm">
            @for (option of options; track option) {
                <fd-radio-button
                    formControlName="radioInput"
                    [selectedValue]="radioForm.controls.radioInput.value"
                    [value]="option"
                    [id]="'reactive-radio-' + option"
                    [readOnly]="readOnly()"
                    name="reactive-radio"
                    >Option {{ option }}</fd-radio-button
                >
            }
        </form>
    `,
    imports: [ReactiveFormsModule, RadioButtonComponent]
})
class TestRadioButtonComponentReactiveFormsComponent {
    readonly options = [1, 2, 3];
    readonly radioForm = new FormGroup({ radioInput: new FormControl<number | null>(1) });
    readonly readOnly = signal(false);
}

describe('RadioButtonComponent reactive forms', () => {
    let component: TestRadioButtonComponentReactiveFormsComponent;
    let fixture: ComponentFixture<TestRadioButtonComponentReactiveFormsComponent>;

    let inputs: HTMLInputElement[];
    let changes: (number | null)[];

    async function settle(): Promise<void> {
        fixture.changeDetectorRef.markForCheck();
        fixture.detectChanges();
        await fixture.whenStable();
        // Render the shared control's settled selectedValue on every sibling.
        fixture.changeDetectorRef.markForCheck();
        fixture.detectChanges();
        await fixture.whenStable();
    }

    function expectSelection(value: number | null): void {
        expect(component.radioForm.controls.radioInput.value).toBe(value);
        expect(component.radioForm.value).toEqual({ radioInput: value });
        expect(inputs.map((input) => input.checked)).toEqual(component.options.map((option) => option === value));
        expect(inputs.map((input) => input.getAttribute('aria-checked'))).toEqual(
            component.options.map((option) => String(option === value))
        );
    }

    function snapshot(): object {
        return {
            value: component.radioForm.controls.radioInput.value,
            dirty: component.radioForm.controls.radioInput.dirty,
            changes: [...changes],
            checked: inputs.map((input) => input.checked)
        };
    }

    function clickOption(option: number, target: 'input' | 'label'): void {
        const element: HTMLElement = fixture.nativeElement.querySelector(
            target === 'input' ? '#reactive-radio-' + option : 'label[for="reactive-radio-' + option + '"]'
        );
        element.click();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestRadioButtonComponentReactiveFormsComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(TestRadioButtonComponentReactiveFormsComponent);
        component = fixture.componentInstance;
        await settle();
        inputs = Array.from(fixture.nativeElement.querySelectorAll('input[type=radio]'));
        changes = [];
        component.radioForm.controls.radioInput.valueChanges.subscribe((value) => changes.push(value));
    });

    it('initializes one shared control and every native/ARIA sibling', () => {
        expect(inputs).toHaveLength(3);
        expectSelection(1);
        expect(component.radioForm.controls.radioInput.pristine).toBe(true);
    });

    it('read-only option 2 input click is cancelled and preserves the shared model, pristine state, emissions and every ARIA sibling', async () => {
        component.readOnly.set(true);
        await settle();
        expect(inputs.every((input) => input.readOnly && !input.disabled)).toBe(true);
        expectSelection(1);
        const clicks: Event[] = [];
        const clickedInput = inputs[1];
        clickedInput.addEventListener('click', (event) => clicks.push(event), { once: true });
        clickedInput.click();
        expect(clicks).toHaveLength(1);
        expect(clicks[0].cancelable).toBe(true);
        expect(clicks[0].defaultPrevented).toBe(true);
        await settle();
        expect(component.radioForm.controls.radioInput.value).toBe(1);
        expect(component.radioForm.value).toEqual({ radioInput: 1 });
        expect(component.radioForm.controls.radioInput.pristine).toBe(true);
        expect(component.radioForm.controls.radioInput.dirty).toBe(false);
        expect(component.radioForm.pristine).toBe(true);
        expect(component.radioForm.dirty).toBe(false);
        expect(changes).toEqual([]);
        expect(inputs.map((sibling) => sibling.getAttribute('aria-checked'))).toEqual(['true', 'false', 'false']);
        // jsdom 26.1.0 fails to restore the previously selected native sibling after preventDefault.
        // Permanent browser tests cover that restoration; unselected siblings must still remain unchecked here.
        expect(inputs.slice(1).map((sibling) => sibling.checked)).toEqual([false, false]);
    });

    it('read-only option 2 label click preserves value, pristine state and every native/ARIA sibling', async () => {
        component.readOnly.set(true);
        await settle();
        expect(inputs.every((input) => input.readOnly && !input.disabled)).toBe(true);
        expectSelection(1);
        clickOption(2, 'label');
        await settle();
        expect(snapshot()).toEqual({ value: 1, dirty: false, changes: [], checked: [true, false, false] });
        expectSelection(1);
    });

    it('read-only accepts programmatic setValue, patchValue and reset without user emissions', async () => {
        component.readOnly.set(true);
        await settle();
        expect(inputs.every((input) => input.readOnly && !input.disabled)).toBe(true);
        component.radioForm.controls.radioInput.setValue(3);
        await settle();
        expectSelection(3);
        expect(component.radioForm.controls.radioInput.pristine).toBe(true);
        expect(changes).toEqual([3]);
        component.radioForm.patchValue({ radioInput: 2 });
        await settle();
        expectSelection(2);
        expect(component.radioForm.controls.radioInput.pristine).toBe(true);
        expect(changes).toEqual([3, 2]);
        component.radioForm.reset({ radioInput: 1 });
        await settle();
        expectSelection(1);
        expect(component.radioForm.controls.radioInput.pristine).toBe(true);
        expect(changes).toEqual([3, 2, 1]);
        component.radioForm.reset();
        await settle();
        expectSelection(null);
        expect(component.radioForm.controls.radioInput.pristine).toBe(true);
        expect(changes).toEqual([3, 2, 1, null]);
        expect(component.radioForm.controls.radioInput.dirty).toBe(false);
    });

    it('read-only initially empty selection stays empty after label activation', async () => {
        fixture.destroy();
        fixture = TestBed.createComponent(TestRadioButtonComponentReactiveFormsComponent);
        component = fixture.componentInstance;
        component.radioForm.controls.radioInput.setValue(null);
        component.readOnly.set(true);
        await settle();
        inputs = Array.from(fixture.nativeElement.querySelectorAll('input[type=radio]'));
        changes = [];
        component.radioForm.controls.radioInput.valueChanges.subscribe((value) => changes.push(value));
        expectSelection(null);
        clickOption(2, 'label');
        await settle();
        expect(snapshot()).toEqual({ value: null, dirty: false, changes: [], checked: [false, false, false] });
        expectSelection(null);
    });

    it('editable -> read-only -> editable blocks only the middle user change', async () => {
        clickOption(2, 'input');
        await settle();
        expectSelection(2);
        expect(changes).toEqual([2]);
        component.radioForm.controls.radioInput.markAsPristine();
        changes.length = 0;
        component.readOnly.set(true);
        await settle();
        expect(inputs.every((input) => input.readOnly)).toBe(true);
        clickOption(3, 'label');
        await settle();
        const blockedState = snapshot();
        component.readOnly.set(false);
        await settle();
        changes.length = 0;
        expect(inputs.every((input) => !input.readOnly)).toBe(true);
        clickOption(1, 'input');
        await settle();
        expectSelection(1);
        expect(changes).toEqual([1]);
        expect(component.radioForm.controls.radioInput.dirty).toBe(true);
        expect(blockedState).toEqual({ value: 2, dirty: false, changes: [], checked: [false, true, false] });
    });

    it.each(['input', 'label'] as const)(
        'editable option 2 %s click updates the shared control and siblings',
        async (target) => {
            clickOption(2, target);
            await settle();
            expectSelection(2);
            expect(changes).toEqual([2]);
            expect(component.radioForm.controls.radioInput.dirty).toBe(true);
        }
    );

    it('disabled control blocks input and label activation and resumes after enable', async () => {
        component.radioForm.controls.radioInput.disable();
        await settle();
        changes.length = 0;
        expect(inputs.every((input) => input.disabled)).toBe(true);
        clickOption(2, 'input');
        clickOption(3, 'label');
        await settle();
        expectSelection(1);
        expect(changes).toEqual([]);
        expect(component.radioForm.controls.radioInput.dirty).toBe(false);
        component.radioForm.controls.radioInput.enable();
        await settle();
        changes.length = 0;
        clickOption(2, 'input');
        await settle();
        expectSelection(2);
        expect(changes).toEqual([2]);
    });
});
