import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'fd-form-group-input',
    templateUrl: './form-group-input-example.component.html',
    styleUrls: ['form-group-input-example.component.scss']
})
export class FormGroupInputExampleComponent {
    customForm = new FormGroup({
        inputControl: new FormControl('', Validators.required)
    });
}
