import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ButtonComponent } from '@fundamental-ngx/platform/button';
import { CheckboxGroupComponent, FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-checkbox-group-list',
    templateUrl: './platform-checkbox-group-list.component.html',
    imports: [
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        CheckboxGroupComponent,
        ButtonComponent,
        ContentDensityDirective
    ]
})
export class PlatformCheckboxGroupListComponent {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
    dishes: string[] = ['Italian', 'Chinese', 'Indian', 'Japanese'];
    sports: string[] = ['cycling', 'running', 'visit gym', 'swimming'];
    phonesList: string[] = ['Samsung', 'Apple', 'OnePlus', 'Redmi'];
    frameworks: string[] = ['Angular', 'React', 'Vue'];

    // data passing to form
    selectedPhones = { phones: ['Samsung', 'OnePlus'] };

    form1 = new FormGroup({
        seasons: new FormControl()
    });
    form2 = new FormGroup({
        phones: new FormControl()
    });
    form3 = new FormGroup({
        sports: new FormControl(['cycling', 'running']),
        sportsDisabled: new FormControl()
    });
    form4 = new FormGroup(
        {
            frameworks: new FormControl()
        },
        { updateOn: 'submit' }
    );

    // template driven
    countrySeason = '';
    selectedSports = ['running', 'swimming'];

    // outside form
    selectedDishes = ['Chinese', 'Italian'];
}
