import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fd-input-group-form-example',
    templateUrl: './input-group-form-example.component.html',
    styleUrls: ['input-group-form-example.component.scss']
})
export class InputGroupFormExampleComponent {
    customForm = new FormGroup({
        searchQuery: new FormControl({ value: 'abc', disabled: true }),
        number: new FormControl({ value: '123', disabled: true })
    });
};
