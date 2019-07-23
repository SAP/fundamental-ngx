import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fd-checkbox-form-group',
    templateUrl: './checkbox-form-group-example.component.html',
})
export class CheckboxFormGroupExampleComponent {
    customForm = new FormGroup({
        firstOption: new FormControl(true),
        secondOption: new FormControl(false),
        thirdOption: new FormControl(false)
    });
}
