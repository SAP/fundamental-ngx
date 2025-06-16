import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fd-segmented-button-form-example',
    templateUrl: './segmented-button-form-example.component.html',
    imports: [FormsModule, ReactiveFormsModule, SegmentedButtonModule, ButtonComponent, FocusableItemDirective]
})
export class SegmentedButtonFormExampleComponent {
    customForm = new FormGroup({
        basic: new FormControl('first'),
        disabled: new FormControl({
            value: 'first',
            disabled: true
        }),
        toggled: new FormControl('third'),
        toggledDisabled: new FormControl({
            value: 'second',
            disabled: true
        })
    });

    constructor() {
        setTimeout(() => {
            this.customForm.controls['basic'].disable();
        }, 1000);
        setTimeout(() => {
            this.customForm.controls['basic'].enable();
        }, 2000);
        setTimeout(() => {
            this.customForm.controls['toggled'].disable();
        }, 1500);
        setTimeout(() => {
            this.customForm.controls['toggled'].enable();
        }, 2700);
    }
}
