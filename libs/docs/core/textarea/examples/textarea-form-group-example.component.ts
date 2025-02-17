import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    FieldsetComponent,
    FormControlComponent,
    FormItemComponent,
    FormLabelComponent
} from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-textarea-form-group-example',
    templateUrl: './textarea-form-group-example.component.html',
    styleUrls: ['textarea-form-group-example.component.scss'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FieldsetComponent,
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent,
        JsonPipe
    ]
})
export class TextareaFormGroupExampleComponent {
    customForm = new FormGroup({
        textAreaControl: new FormControl('', Validators.required),
        disabledTextAreaControl: new FormControl({ value: 'Some text...', disabled: true }, Validators.required)
    });
}
