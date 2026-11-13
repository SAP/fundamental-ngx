import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FD_LANGUAGE_ENGLISH, FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';
import { RadioButtonComponent } from './radio-button.component';

@Component({
    template: `
        <fd-radio-button #radio1 state="success" [(ngModel)]="selectedValue" [value]="1" name="radio"></fd-radio-button>
        <fd-radio-button #radio2 state="error" [(ngModel)]="selectedValue" [value]="2" name="radio"></fd-radio-button>
        <fd-radio-button
            #radio3
            [disabled]="true"
            [(ngModel)]="selectedValue"
            [value]="3"
            name="radio"
        ></fd-radio-button>
        <fd-radio-button
            #radio4
            [readOnly]="true"
            [(ngModel)]="selectedValue"
            [value]="4"
            name="radio"
        ></fd-radio-button>
    `,
    imports: [FormsModule, RadioButtonComponent]
})
class TestRadioButtonComponent {
    @ViewChild('radio1') radioButton1: RadioButtonComponent;
    @ViewChild('radio2') radioButton2: RadioButtonComponent;
    @ViewChild('radio3') radioButton3: RadioButtonComponent;
    @ViewChild('radio4') radioButton4: RadioButtonComponent;

    selectedValue = 1;
}

describe('RadioButtonComponent', () => {
    let component: TestRadioButtonComponent;
    let fixture: ComponentFixture<TestRadioButtonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestRadioButtonComponent],
            providers: [{ provide: FD_LANGUAGE_SIGNAL, useValue: signal(FD_LANGUAGE_ENGLISH) }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestRadioButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.radioButton1.name).toContain('radio');
    });

    it('should have the value', async () => {
        await fixture.whenStable();
        expect(component.radioButton1.value).toEqual(1);
    });

    it('should check second radio', async () => {
        await wait(fixture);
        component.radioButton2.inputElement.nativeElement.click();
        await wait(fixture);
        await wait(fixture);

        expect(component.radioButton2.inputElement.nativeElement.checked).toBeTruthy();
        expect(component.radioButton1.inputElement.nativeElement.checked).toBeFalsy();
    });

    it('should have correct state', async () => {
        await wait(fixture);

        // value is accessed by [] because component doesn't have a getter for state by design
        expect(component.radioButton1.state).toContain('success');
        expect(component.radioButton2.state).toContain('error');
    });

    it('should be disabled', async () => {
        await wait(fixture);

        expect(component.radioButton3.disabled).toBeTruthy();
        expect(component.radioButton3.inputElement.nativeElement.disabled).toBeTruthy();
    });

    it('should have aria-readonly on readonly radio', async () => {
        await wait(fixture);

        expect(component.radioButton4.inputElement.nativeElement.getAttribute('aria-readonly')).toBe('true');
    });

    it('should have aria-description on readonly radio', async () => {
        await wait(fixture);

        expect(component.radioButton4.inputElement.nativeElement.getAttribute('aria-description')).toBeTruthy();
    });

    it('should not have aria-description on non-readonly radio', async () => {
        await wait(fixture);

        expect(component.radioButton1.inputElement.nativeElement.getAttribute('aria-description')).toBeNull();
    });
});

@Component({
    template: `
        <form #form="ngForm">
            @for (option of options; track option) {
                <fd-radio-button
                    [(ngModel)]="selectedValue"
                    [value]="option"
                    [id]="'model-radio-' + option"
                    [readOnly]="readOnly()"
                    [disabled]="disabled()"
                    (ngModelChange)="modelEvents.push($event)"
                    name="model-radio"
                    >Option {{ option }}</fd-radio-button
                >
            }
        </form>
    `,
    imports: [FormsModule, RadioButtonComponent]
})
class ReadOnlyNgModelRadioHostComponent {
    @ViewChild('form') form: NgForm;

    readonly options = [1, 2, 3];
    readonly modelEvents: (number | null)[] = [];
    readonly selectedValue = signal<number | null>(1);
    readonly readOnly = signal(false);
    readonly disabled = signal(false);
}

describe('RadioButtonComponent ngModel group', () => {
    let fixture: ComponentFixture<ReadOnlyNgModelRadioHostComponent>;
    let component: ReadOnlyNgModelRadioHostComponent;
    let inputs: HTMLInputElement[];
    let changes: unknown[];

    async function settle(): Promise<void> {
        fixture.changeDetectorRef.markForCheck();
        fixture.detectChanges();
        await fixture.whenStable();
        // ngModel registration/model writes settle before rendering every sibling.
        fixture.changeDetectorRef.markForCheck();
        fixture.detectChanges();
        await fixture.whenStable();
    }

    function expectSelection(value: number | null): void {
        expect(component.selectedValue()).toBe(value);
        expect(component.form.controls['model-radio'].value).toBe(value);
        expect(inputs.map((input) => input.checked)).toEqual(component.options.map((option) => option === value));
        expect(inputs.map((input) => input.getAttribute('aria-checked'))).toEqual(
            component.options.map((option) => String(option === value))
        );
    }

    function snapshot(): object {
        return {
            value: component.selectedValue(),
            dirty: component.form.dirty,
            changes: [...changes],
            modelEvents: [...component.modelEvents],
            checked: inputs.map((input) => input.checked)
        };
    }

    function clickOption(option: number, target: 'input' | 'label'): void {
        const element: HTMLElement = fixture.nativeElement.querySelector(
            target === 'input' ? '#model-radio-' + option : 'label[for="model-radio-' + option + '"]'
        );
        element.click();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [ReadOnlyNgModelRadioHostComponent] }).compileComponents();
        fixture = TestBed.createComponent(ReadOnlyNgModelRadioHostComponent);
        component = fixture.componentInstance;
        await settle();
        inputs = Array.from(fixture.nativeElement.querySelectorAll('input[type=radio]'));
        changes = [];
        component.form.controls['model-radio'].valueChanges.subscribe((value) => changes.push(value));
    });

    it('initializes a shared ngModel control and every native/ARIA sibling', () => {
        expect(inputs).toHaveLength(3);
        expectSelection(1);
        expect(component.form.pristine).toBe(true);
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
        expect(component.selectedValue()).toBe(1);
        expect(component.form.controls['model-radio'].value).toBe(1);
        expect(component.form.value).toEqual({ 'model-radio': 1 });
        expect(component.form.pristine).toBe(true);
        expect(component.form.dirty).toBe(false);
        expect(component.form.controls['model-radio'].pristine).toBe(true);
        expect(component.form.controls['model-radio'].dirty).toBe(false);
        expect(changes).toEqual([]);
        expect(component.modelEvents).toEqual([]);
        expect(inputs.map((sibling) => sibling.getAttribute('aria-checked'))).toEqual(['true', 'false', 'false']);
        // jsdom 26.1.0 fails to restore the previously selected native sibling after preventDefault.
        // Permanent browser tests cover that restoration; unselected siblings must still remain unchecked here.
        expect(inputs.slice(1).map((sibling) => sibling.checked)).toEqual([false, false]);
    });

    it('read-only option 2 label click preserves model, pristine state and every native/ARIA sibling', async () => {
        component.readOnly.set(true);
        await settle();
        expect(inputs.every((input) => input.readOnly && !input.disabled)).toBe(true);
        expectSelection(1);
        clickOption(2, 'label');
        await settle();
        expect(snapshot()).toEqual({
            value: 1,
            dirty: false,
            changes: [],
            modelEvents: [],
            checked: [true, false, false]
        });
        expectSelection(1);
    });

    it('read-only accepts outer model writes, setValue, patchValue and reset with normal form emissions', async () => {
        component.readOnly.set(true);
        await settle();
        expect(inputs.every((input) => input.readOnly && !input.disabled)).toBe(true);
        component.selectedValue.set(3);
        await settle();
        expectSelection(3);
        expect(component.form.pristine).toBe(true);
        expect(changes.length).toBeGreaterThan(0);
        expect(changes.every((value) => value === 3)).toBe(true);
        expect(component.modelEvents).toEqual([]);
        component.form.controls['model-radio'].setValue(2);
        await settle();
        expectSelection(2);
        expect(component.form.pristine).toBe(true);
        expect(changes).toContain(2);
        component.form.control.patchValue({ 'model-radio': 1 });
        await settle();
        expectSelection(1);
        expect(component.form.pristine).toBe(true);
        expect(changes).toContain(1);
        component.form.resetForm({ 'model-radio': null });
        await settle();
        expectSelection(null);
        expect(component.form.pristine).toBe(true);
        expect(changes).toContain(null);
        // NgModel emits ngModelChange on FormControl writes; it does not on a host model assignment.
        expect(component.form.pristine).toBe(true);
    });

    it('read-only initially empty selection stays empty after label activation', async () => {
        fixture.destroy();
        fixture = TestBed.createComponent(ReadOnlyNgModelRadioHostComponent);
        component = fixture.componentInstance;
        component.selectedValue.set(null);
        component.readOnly.set(true);
        await settle();
        inputs = Array.from(fixture.nativeElement.querySelectorAll('input[type=radio]'));
        changes = [];
        component.form.controls['model-radio'].valueChanges.subscribe((value) => changes.push(value));
        expectSelection(null);
        clickOption(2, 'label');
        await settle();
        expect(snapshot()).toEqual({
            value: null,
            dirty: false,
            changes: [],
            modelEvents: [],
            checked: [false, false, false]
        });
        expectSelection(null);
    });

    it('editable -> read-only -> editable blocks only the middle user change', async () => {
        clickOption(2, 'input');
        await settle();
        expectSelection(2);
        expect(changes.length).toBeGreaterThan(0);
        expect(changes.every((value) => value === 2)).toBe(true);
        component.form.control.markAsPristine();
        changes.length = 0;
        component.modelEvents.length = 0;
        component.readOnly.set(true);
        await settle();
        expect(inputs.every((input) => input.readOnly)).toBe(true);
        clickOption(3, 'label');
        await settle();
        const blockedState = snapshot();
        component.readOnly.set(false);
        await settle();
        changes.length = 0;
        component.modelEvents.length = 0;
        expect(inputs.every((input) => !input.readOnly)).toBe(true);
        clickOption(1, 'input');
        await settle();
        expectSelection(1);
        expect(changes.length).toBeGreaterThan(0);
        expect(changes.every((value) => value === 1)).toBe(true);
        expect(component.modelEvents).toEqual([1]);
        expect(component.form.dirty).toBe(true);
        expect(blockedState).toEqual({
            value: 2,
            dirty: false,
            changes: [],
            modelEvents: [],
            checked: [false, true, false]
        });
    });

    it.each(['input', 'label'] as const)(
        'editable option 2 %s click updates model and every sibling',
        async (target) => {
            clickOption(2, target);
            await settle();
            expectSelection(2);
            expect(changes.length).toBeGreaterThan(0);
            expect(changes.every((value) => value === 2)).toBe(true);
            expect(component.form.dirty).toBe(true);
        }
    );

    it('disabled group blocks native/label activation and resumes after enable', async () => {
        component.disabled.set(true);
        await settle();
        changes.length = 0;
        expect(inputs.every((input) => input.disabled)).toBe(true);
        clickOption(2, 'input');
        clickOption(3, 'label');
        await settle();
        expectSelection(1);
        expect(changes).toEqual([]);
        expect(component.form.pristine).toBe(true);
        component.disabled.set(false);
        await settle();
        changes.length = 0;
        clickOption(2, 'input');
        await settle();
        expectSelection(2);
        expect(changes.length).toBeGreaterThan(0);
        expect(changes.every((value) => value === 2)).toBe(true);
    });
});
