import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fd-input-group-number-form-example',
    templateUrl: './input-group-number-form-example.component.html'
})
export class InputGroupNumberFormExampleComponent {

    customForm = new FormGroup({
        number: new FormControl('123')
    });
};



