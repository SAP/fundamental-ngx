import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'fdp-binary-checkbox',
    templateUrl: 'platform-binary-checkbox.component.html'
})
export class PlatformCompactChekboxExampleComponent {
    customForm = new FormGroup({
        checkbox1: new FormControl(false),
        checkbox2: new FormControl(true),
        checkbox3: new FormControl('')
    });

    checkbox1: boolean = false;
    checkbox2: boolean = true;
    checkbox3: boolean;
}
