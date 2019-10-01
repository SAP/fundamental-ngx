import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-toggle-forms-example',
    templateUrl: './toggle-forms-example.component.html',
    styleUrls: ['./toggle-forms-example.component.scss']
})
export class ToggleFormsExampleComponent {
    customForm = new FormGroup({
        toggle1: new FormControl({ value: false, disabled: false }),
        toggle2: new FormControl({ value: true, disabled: false, }),
        toggle3: new FormControl({ value: false, disabled: true }),
        toggle4: new FormControl({ value: true, disabled: true })
    });
};
