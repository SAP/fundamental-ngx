import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldSetModule, FormControlModule, FormItemModule, FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-textarea-form-group-example',
    templateUrl: './textarea-form-group-example.component.html',
    styleUrls: ['textarea-form-group-example.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FieldSetModule,
        FormItemModule,
        FormLabelModule,
        FormControlModule,
        JsonPipe
    ]
})
export class TextareaFormGroupExampleComponent {
    customForm = new FormGroup({
        textAreaControl: new FormControl('', Validators.required),
        disabledTextAreaControl: new FormControl({ value: 'Some text...', disabled: true }, Validators.required)
    });
}
