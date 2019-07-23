import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fd-radio-form-group',
    templateUrl: './radio-form-group-example.component.html'
})
export class RadioFormGroupExampleComponent {
    customForm = new FormGroup({
        radioInput: new FormControl('')
    });
}
