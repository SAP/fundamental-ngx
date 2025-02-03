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
        })
    });
}
