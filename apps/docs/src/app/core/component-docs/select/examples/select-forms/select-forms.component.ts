import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'fd-select-forms',
    templateUrl: './select-forms.component.html',
    styles: ['.flex-form-set{display: flex;justify-content: space-between;}']
})
export class SelectFormsComponent {

    customForm = new FormGroup({
        selectControl: new FormControl('pineapple', Validators.required),
        disabledSelectControl: new FormControl({ value: 'kiwi', disabled: true }, Validators.required)
    });

}
