import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fd-input-group-form-example',
    templateUrl: './input-group-form-example.component.html'
})
export class InputGroupFormExampleComponent {
    customForm = new FormGroup({
        searchQuery: new FormControl('')
    });
};
