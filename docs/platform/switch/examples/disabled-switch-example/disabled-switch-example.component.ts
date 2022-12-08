import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-disabled-switch-example',
    templateUrl: './disabled-switch-example.component.html'
})
export class DisabledSwitchExampleComponent {
    customForm = new FormGroup({
        fieldDisable: new FormControl({ value: true, disabled: true })
    });
}
