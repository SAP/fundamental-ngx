import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';

@Component({
    template: `
        <form [formGroup]="radioForm" [attr.dir]="direction()">
            @for (option of options; track option) {
                <fieldset [disabled]="fieldsetDisabled().includes(option)">
                    <fd-radio-button
                        formControlName="radioInput"
                        [selectedValue]="radioForm.controls.radioInput.value"
                        [value]="option"
                        [id]="'reactive-radio-' + option"
                        [readOnly]="readOnly()"
                        [disabled]="disabledOptions().includes(option)"
                        [name]="radioName()"
                        >Option {{ option }}</fd-radio-button
                    >
                </fieldset>
            }
            @if (isolationPeers()) {
                <input type="radio" name="unrelated-group" id="reactive-radio-unrelated" />
                <input
                    type="radio"
                    [name]="radioName()"
                    form="reactive-radio-other-form"
                    id="reactive-radio-other-owner"
                />
            }
        </form>
        @if (isolationPeers()) {
            <form id="reactive-radio-other-form"></form>
        }
    `,
    imports: [ReactiveFormsModule, RadioButtonComponent]
})
class TestRadioButtonComponentReactiveFormsComponent {
    readonly options = [1, 2, 3];
    readonly radioForm = new FormGroup({ radioInput: new FormControl<number | null>(1) });
    readonly readOnly = signal(false);
    readonly radioName = signal('reactive-radio');
    readonly direction = signal('ltr');
    readonly disabledOptions = signal<number[]>([]);
    readonly fieldsetDisabled = signal<number[]>([]);
    readonly isolationPeers = signal(false);
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

    // jsdom dispatches component handlers and explicit focus(), but does not perform native arrow/Tab defaults.
    function pressArrow(key: string, input = document.activeElement as HTMLInputElement): KeyboardEvent {
        const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
        input.dispatchEvent(event);
        return event;
    }

    async function expectNavigationUnchanged(): Promise<void> {
        await settle();
        expectSelection(1);
        expect(component.radioForm.controls.radioInput.pristine).toBe(true);
        expect(changes).toEqual([]);
    }

    it.each([
        ['ArrowRight', 1],
        ['ArrowDown', 1],
        ['ArrowLeft', -1],
        ['ArrowUp', -1]
    ] as const)('read-only %s focuses exact consecutive peers and wraps without user changes', async (key, step) => {
        component.readOnly.set(true);
        await settle();
        let destination = 0;
        inputs[destination].focus();
        for (let count = 0; count < inputs.length + 1; count++) {
            expect(pressArrow(key).defaultPrevented).toBe(true);
            destination = (destination + step + inputs.length) % inputs.length;
            expect(document.activeElement).toBe(inputs[destination]);
            await expectNavigationUnchanged();
        }
        expect(component.radioForm.controls.radioInput.touched).toBe(true);
    });

    it.each([
        ['ArrowRight', 2],
        ['ArrowLeft', 1],
        ['ArrowDown', 1],
        ['ArrowUp', 2]
    ] as const)('read-only RTL %s follows effective input direction', async (key, destination) => {
        component.readOnly.set(true);
        component.direction.set('rtl');
        await settle();
        // jsdom does not inherit direction; apply the same real CSS direction on each native input.
        inputs.forEach((input) => (input.style.direction = 'rtl'));
        inputs[0].focus();
        pressArrow(key);
        expect(document.activeElement).toBe(inputs[destination]);
        await expectNavigationUnchanged();
    });

    it.each(['component', 'fieldset'] as const)(
        'read-only arrows skip a peer disabled by %s and wrap',
        async (source) => {
            component.readOnly.set(true);
            (source === 'component' ? component.disabledOptions : component.fieldsetDisabled).set([2]);
            await settle();
            expect(inputs[1].matches(':disabled')).toBe(true);
            inputs[0].focus();
            pressArrow('ArrowDown');
            expect(document.activeElement).toBe(inputs[2]);
            pressArrow('ArrowDown');
            expect(document.activeElement).toBe(inputs[0]);
            pressArrow('ArrowUp');
            expect(document.activeElement).toBe(inputs[2]);
            await expectNavigationUnchanged();
        }
    );

    it('read-only wraps within the native group across fieldsets without entering another group or form owner', async () => {
        component.readOnly.set(true);
        component.isolationPeers.set(true);
        await settle();
        const otherOwner: HTMLInputElement = fixture.nativeElement.querySelector('#reactive-radio-other-owner');
        expect(otherOwner.name).toBe(inputs[0].name);
        expect(otherOwner.form).not.toBe(inputs[0].form);
        inputs[2].focus();
        pressArrow('ArrowDown');
        expect(document.activeElement).toBe(inputs[0]);
        pressArrow('ArrowUp');
        expect(document.activeElement).toBe(inputs[2]);
        await expectNavigationUnchanged();
    });

    it('read-only navigation cannot escape to a same-name peer in another tree root', async () => {
        component.readOnly.set(true);
        await settle();
        const shadowHost = document.createElement('div');
        fixture.nativeElement.append(shadowHost);
        const shadow = shadowHost.attachShadow({ mode: 'open' });
        shadow.append(inputs[2].closest('fd-radio-button') as HTMLElement);
        inputs.slice(0, 2).forEach((input) => input.setAttribute('form', 'missing-form-owner'));
        expect(inputs.map((input) => input.form)).toEqual([null, null, null]);
        expect(inputs[2].getRootNode()).toBe(shadow);
        inputs[1].focus();
        pressArrow('ArrowDown');
        expect(document.activeElement).toBe(inputs[0]);
        expect(shadow.activeElement).toBeNull();
        pressArrow('ArrowUp');
        expect(document.activeElement).toBe(inputs[1]);
        await expectNavigationUnchanged();
    });

    it('read-only arrows retain focus when every other peer is disabled', async () => {
        component.readOnly.set(true);
        component.disabledOptions.set([2, 3]);
        await settle();
        inputs[0].focus();
        for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) {
            pressArrow(key);
            expect(document.activeElement).toBe(inputs[0]);
        }
        await expectNavigationUnchanged();
    });

    it('read-only singleton retains focus for all arrows', async () => {
        component.readOnly.set(true);
        await settle();
        // The native name defines membership independently of the shared Angular control.
        inputs.slice(1).forEach((input, index) => (input.name = 'other-' + index));
        inputs[0].focus();
        for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) {
            pressArrow(key);
            expect(document.activeElement).toBe(inputs[0]);
        }
        await expectNavigationUnchanged();
    });

    it('unnamed read-only radios do not become a navigation group', async () => {
        component.readOnly.set(true);
        await settle();
        inputs.forEach((input) => input.removeAttribute('name'));
        inputs[0].focus();
        for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) {
            pressArrow(key);
            expect(document.activeElement).toBe(inputs[0]);
        }
        await expectNavigationUnchanged();
    });

    it('read-only Space stays cancelled without moving focus or selecting', async () => {
        component.readOnly.set(true);
        await settle();
        inputs[1].focus();
        expect(pressArrow(' ').defaultPrevented).toBe(true);
        expect(document.activeElement).toBe(inputs[1]);
        await expectNavigationUnchanged();
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
