import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FocusableListModule } from '@fundamental-ngx/cdk';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fd-segmented-button-form-example',
    templateUrl: './segmented-button-form-example.component.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, SegmentedButtonModule, ButtonComponent, FocusableListModule]
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
