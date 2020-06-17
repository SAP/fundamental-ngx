import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-checkbox-group-content',
    templateUrl: './platform-checkbox-group-content-checkbox.component.html'
})
export class PlatformCheckboxGroupContentCheckboxComponent {
    hobbies = { hobbies: ['coding', 'gardening'] };

    form1 = new FormGroup({});
    form2 = new FormGroup({});
    form3 = new FormGroup({});

    // Template driven
    subjects = '';
    reptiles = ['Lizards', 'Snakes'];
    disabledCountries = ''
}
