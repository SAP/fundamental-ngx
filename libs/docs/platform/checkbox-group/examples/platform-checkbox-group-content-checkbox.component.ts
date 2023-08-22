import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/platform/form';
import { CheckboxGroupComponent } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-checkbox-group-content-checkbox',
    templateUrl: './platform-checkbox-group-content-checkbox.component.html',
    standalone: true,
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, CheckboxGroupComponent, CheckboxComponent]
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
