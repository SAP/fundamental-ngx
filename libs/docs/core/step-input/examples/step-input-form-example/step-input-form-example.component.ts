import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { StepInputModule } from '@fundamental-ngx/core/step-input';

@Component({
    selector: 'fd-step-input-form-example',
    template: `
        <div class="step-input-example-container">
            <div class="step-input-example">
                <label fd-form-label for="reactive-form-input" [required]="true">Reactive forms (min value 0)</label>
                <fd-step-input
                    inputId="reactive-form-input"
                    [required]="true"
                    [min]="0"
                    [formControl]="stepInputFormControl1"
                ></fd-step-input>
                <table [style.fontSize]="'smaller'">
                    <tr>
                        <td>Value:</td>
                        <td>{{ stepInputFormControl1.value }}</td>
                    </tr>
                    <tr>
                        <td>Dirty:</td>
                        <td>{{ stepInputFormControl1.dirty }}</td>
                    </tr>
                    <tr>
                        <td>Touched:</td>
                        <td>{{ stepInputFormControl1.touched }}</td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td>{{ stepInputFormControl1.status }}</td>
                    </tr>
                </table>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="reactive-form-input" [required]="true"
                    >Reactive forms (min value 5, max value 10)</label
                >
                <fd-step-input
                    inputId="reactive-form-input"
                    [required]="true"
                    [min]="5"
                    [max]="10"
                    [formControl]="stepInputFormControl1a"
                ></fd-step-input>
                <table [style.fontSize]="'smaller'">
                    <tr>
                        <td>Value:</td>
                        <td>{{ stepInputFormControl1a.value }}</td>
                    </tr>
                    <tr>
                        <td>Dirty:</td>
                        <td>{{ stepInputFormControl1a.dirty }}</td>
                    </tr>
                    <tr>
                        <td>Touched:</td>
                        <td>{{ stepInputFormControl1a.touched }}</td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td>{{ stepInputFormControl1a.status }}</td>
                    </tr>
                </table>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="template-form-input">Template Driven forms</label>
                <fd-step-input inputId="template-form-input" [(ngModel)]="value1"></fd-step-input>
                <small>Value: {{ value1 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="reactive-form-input">Disabled control</label>
                <fd-step-input inputId="reactive-form-input" [formControl]="stepInputFormControl2"></fd-step-input>
                <table [style.fontSize]="'smaller'">
                    <tr>
                        <td>Value:</td>
                        <td>{{ stepInputFormControl2.value }}</td>
                    </tr>
                    <tr>
                        <td>Dirty:</td>
                        <td>{{ stepInputFormControl2.dirty }}</td>
                    </tr>
                    <tr>
                        <td>Touched:</td>
                        <td>{{ stepInputFormControl2.touched }}</td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td>{{ stepInputFormControl2.status }}</td>
                    </tr>
                </table>
                <button fd-button (click)="toggleDisabledState()" label="Toggle disabled state"></button>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="template-form-input">Readonly control</label>
                <fd-step-input inputId="template-form-input" [(ngModel)]="value2" [readonly]="true"></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>
        </div>
    `,
    imports: [FormLabelComponent, StepInputModule, FormsModule, ReactiveFormsModule, ButtonComponent]
})
export class StepInputFormExampleComponent {
    stepInputFormControl1 = new FormControl(null);
    stepInputFormControl1a = new FormControl(5);
    stepInputFormControl2 = new FormControl({ disabled: true, value: 100 });
    value1: number | null = 100;
    value2: number | null = 100;

    toggleDisabledState(): void {
        this.stepInputFormControl2.enabled ? this.stepInputFormControl2.disable() : this.stepInputFormControl2.enable();
    }
}
