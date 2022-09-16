import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-switch-forms-example',
    templateUrl: './switch-forms-example.component.html',
    styleUrls: ['./switch-forms-example.component.scss']
})
export class SwitchFormsExampleComponent {
    customForm = new FormGroup({
        switch1: new FormControl({ value: false, disabled: false }),
        switch2: new FormControl({ value: true, disabled: false }),
        switch3: new FormControl({ value: false, disabled: true }),
        switch4: new FormControl({ value: true, disabled: true })
    });
}
