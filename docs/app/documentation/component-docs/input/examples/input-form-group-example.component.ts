import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'fd-input-form-group',
    templateUrl: './input-form-group-example.component.html',
    styleUrls: ['input-form-group-example.component.scss']
})
export class InputFormGroupExampleComponent {
    customForm = new FormGroup({
        inputControl: new FormControl('', Validators.required)
    });
}
