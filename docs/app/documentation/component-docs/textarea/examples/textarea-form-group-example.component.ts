import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'fd-textarea-form-group',
    templateUrl: './textarea-form-group-example.component.html',
    styleUrls: ['textarea-form-group-example.component.scss']
})
export class TextareaFormGroupExampleComponent {
    customForm = new FormGroup({
        inputControl: new FormControl('', Validators.required)
    });
}
