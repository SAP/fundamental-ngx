import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fd-input-form-example',
    templateUrl: './input-form-example.component.html'
})
export class InputFormExampleComponent {
    customForm = new FormGroup({
        formInput: new FormControl({ value: 'Disabled Form Input', disabled: true })
    });
}
