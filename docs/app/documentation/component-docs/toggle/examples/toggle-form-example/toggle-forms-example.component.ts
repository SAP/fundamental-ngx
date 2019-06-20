import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-toggle-forms-example',
    templateUrl: './toggle-forms-example.component.html'
})
export class ToggleFormsExampleComponent {
    customForm = new FormGroup({
        toggle1: new FormControl(false),
        toggle2: new FormControl(false),
        toggle3: new FormControl(false)
    });
};
