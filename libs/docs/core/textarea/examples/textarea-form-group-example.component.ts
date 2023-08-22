import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { FieldSetModule } from '@fundamental-ngx/core/form';

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
