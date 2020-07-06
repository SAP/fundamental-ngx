import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'fd-step-input-form-example',
    template: `
        <div class="step-input-example-container">

            <div class="step-input-example">
                <label fd-form-label for="reactive-form-input">Reactive forms</label>
                <fd-step-input id="reactive-form-input" [formControl]="stepInputFormControl"></fd-step-input>
                <table [style.fontSize]="'smaller'">
                    <tr>
                        <td>Value:</td>
                        <td>{{ stepInputFormControl.value }}</td>
                    </tr>
                    <tr>
                        <td>Dirty:</td>
                        <td>{{ stepInputFormControl.dirty }}</td>
                    </tr>
                    <tr>
                        <td>Touched:</td>
                        <td>{{ stepInputFormControl.touched }}</td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td>{{ stepInputFormControl.status }}</td>
                    </tr>
                </table>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="template-form-input">Template Driven forms</label>
                <fd-step-input id="template-form-input" [(ngModel)]="value"></fd-step-input>
                <small>Value: {{ value }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="reactive-form-input">Disabled control</label>
                <fd-step-input id="reactive-form-input" [formControl]="stepInputFormControl2"></fd-step-input>
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
            </div>

            <div class="step-input-example">
                <label fd-form-label for="template-form-input">Readonly control</label>
                <fd-step-input id="template-form-input" [(ngModel)]="value2" [readonly]="true"></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>
        </div>
    `
})
export class StepInputFormExampleComponent {
    stepInputFormControl = new FormControl(100);
    stepInputFormControl2 = new FormControl({ disabled: true, value: 100 });
    value = 100;
    value2 = 100;
}
