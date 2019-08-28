import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

    disabledCustomForm = new FormGroup({
        disabledFirstOption: new FormControl({value: false, disabled: true}, Validators.required),
        disabledSecondOption: new FormControl({value: false, disabled: true}, Validators.required),
        disabledThirdOption: new FormControl({value: true, disabled: true }, Validators.required),
    });
}
