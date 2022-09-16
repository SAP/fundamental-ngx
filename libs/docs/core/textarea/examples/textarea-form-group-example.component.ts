import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'fd-textarea-form-group-example',
    templateUrl: './textarea-form-group-example.component.html',
    styleUrls: ['textarea-form-group-example.component.scss']
})
export class TextareaFormGroupExampleComponent {
    customForm = new FormGroup({
        textAreaControl: new FormControl('', Validators.required),
        disabledTextAreaControl: new FormControl({ value: 'Some text...', disabled: true }, Validators.required)
    });
}
