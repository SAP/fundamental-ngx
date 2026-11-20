import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { FormHeaderComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-checkbox-readonly-example',
    template: `
        <h4 fd-form-header>Read-only Checkbox (ngModel)</h4>
        <fd-checkbox
            [inputId]="ngModelInputId"
            [(ngModel)]="ngModelValue"
            [readonly]="true"
            label="Read-only checkbox"
        ></fd-checkbox>
        <small> Model value: {{ ngModelValue }} </small>
        <br />
        <button fd-button fdType="emphasized" (click)="simulateNativeClick(ngModelInputId)">
            Simulate native input.click()
        </button>
        <small>
            Native input.checked: {{ readState(ngModelInputId).checked }}<br />
            Native aria-checked: {{ readState(ngModelInputId).ariaChecked }}
        </small>

        <h4 fd-form-header>Read-only Checkbox (Reactive Forms)</h4>
        <form [formGroup]="readonlyForm">
            <fd-checkbox
                [inputId]="reactiveInputId"
                formControlName="accepted"
                [readonly]="true"
                label="Read-only checkbox"
            ></fd-checkbox>
        </form>
        <small>
            Form value: {{ readonlyForm.getRawValue() | json }}<br />
            Form Dirty: {{ readonlyForm.dirty }}
        </small>
        <br />
        <button fd-button fdType="emphasized" (click)="simulateNativeClick(reactiveInputId)">
            Simulate native input.click()
        </button>
        <small>
            Native input.checked: {{ readState(reactiveInputId).checked }}<br />
            Native aria-checked: {{ readState(reactiveInputId).ariaChecked }}
        </small>

        <p class="hint">
            <strong>What to look for:</strong> the button calls <code>.click()</code> directly on the underlying native
            checkbox input — the same path a script or assistive tool could take. On a read-only checkbox this currently
            flips the native <code>checked</code> state (and leaves <code>aria-checked</code> stale) while the model
            value and form dirty state above do <em>not</em> change. Normal pointer, label and Space interaction are
            correctly blocked. Re-read the native values after clicking the button (they are shown as of the last change
            detection pass — interact once more to refresh).
        </p>
    `,
    styles: [
        `
            :host {
                display: block;
            }
            small {
                display: block;
                margin: 0.25rem 0;
            }
            button {
                margin: 0.5rem 0;
            }
            .hint {
                margin-top: 1.5rem;
                max-width: 40rem;
            }
        `
    ],
    imports: [FormsModule, ReactiveFormsModule, CheckboxComponent, FormHeaderComponent, ButtonComponent, JsonPipe]
})
export class CheckboxReadonlyExampleComponent {
    ngModelValue = true;

    readonlyForm = new FormGroup({
        accepted: new FormControl(true)
    });

    readonly ngModelInputId = 'readonly-checkbox-ngmodel';
    readonly reactiveInputId = 'readonly-checkbox-reactive';

    /** Directly invoke the native input's click() — the unprotected activation path. */
    simulateNativeClick(inputId: string): void {
        const input = document.getElementById(inputId) as HTMLInputElement | null;
        input?.click();
    }

    /** Read the live native checked / aria-checked state for display. */
    readState(inputId: string): { checked: boolean | null; ariaChecked: string | null } {
        const input = document.getElementById(inputId) as HTMLInputElement | null;
        return {
            checked: input ? input.checked : null,
            ariaChecked: input ? input.getAttribute('aria-checked') : null
        };
    }
}
