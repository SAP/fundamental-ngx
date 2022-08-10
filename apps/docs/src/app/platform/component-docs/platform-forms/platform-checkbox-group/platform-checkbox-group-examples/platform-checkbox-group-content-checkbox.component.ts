import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-checkbox-group-content-checkbox',
    templateUrl: './platform-checkbox-group-content-checkbox.component.html'
})
export class PlatformCheckboxGroupContentCheckboxComponent {
    hobbies = { hobbies: ['coding', 'gardening'] };

    form1 = new FormGroup({
        fruits: new FormControl()
    });
    form2 = new FormGroup({
        hobbies: new FormControl()
    });
    form3 = new FormGroup({
        visited: new FormControl(['Italy', 'France']),
        visited_countries: new FormControl()
    });

    // Template driven
    subjects = '';
    reptiles = ['Lizards', 'Snakes'];
}
