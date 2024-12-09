import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsetComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

@Component({
    selector: 'fd-input-group-form-example',
    templateUrl: './input-group-form-example.component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FieldsetComponent,
        FormItemComponent,
        FormLabelComponent,
        InputGroupModule
    ]
})
export class InputGroupFormExampleComponent {
    customForm = new FormGroup({
        disabledInput: new FormControl({ value: 'Disabled Value', disabled: true }),
        enabledInput: new FormControl({ value: '123', disabled: false })
    });
}
