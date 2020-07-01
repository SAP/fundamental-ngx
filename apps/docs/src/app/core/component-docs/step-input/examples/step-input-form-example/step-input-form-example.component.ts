import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'fd-step-input-form-example',
    template: `
        <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;">

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
        </div>
    `
})
export class StepInputFormExampleComponent {
    stepInputFormControl = new FormControl(100);
    value = 100;
}
