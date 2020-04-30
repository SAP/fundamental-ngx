import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-tristate-checkbox',
    templateUrl: 'platform-tristate-checkbox.component.html'
})
export class PlatformChekboxTristateComponent {
    triStateForm = new FormGroup({
        checkbox1: new FormControl(''),
        checkbox2: new FormControl(null),
        checkbox3: new FormControl('Yes'),
        checkbox4: new FormControl(false),
        checkbox5: new FormControl(null),
        checkbox6: new FormControl(true),
        checkbox7: new FormControl(null),
        checkbox8: new FormControl(null)
    });

    checkbox7: string = '';
    checkbox8: string = null;
    checkbox9: string = 'Yes';
    checkbox10: boolean = false;
    checkbox11: boolean = null;
    checkbox12: boolean = true;
    checkbox13: boolean = null;
    checkbox14: boolean = null;
}
