import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'fd-checkbox-form-group-example',
    templateUrl: './checkbox-form-group-example.component.html',
})
export class CheckboxFormGroupExampleComponent {
    customForm = new FormGroup({
        firstOption: new FormControl({value: true, disabled: false}, Validators.required),
        secondOption: new FormControl({value: false, disabled: false}, Validators.required),
        thirdOption: new FormControl({value: false, disabled: true }, Validators.required)
    });
}
