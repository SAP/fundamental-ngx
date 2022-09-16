import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-input-group-form-example',
    templateUrl: './input-group-form-example.component.html'
})
export class InputGroupFormExampleComponent {
    customForm = new FormGroup({
        searchQuery: new FormControl({ value: 'Disabled Value', disabled: true }),
        number: new FormControl({ value: '123', disabled: false })
    });
}
