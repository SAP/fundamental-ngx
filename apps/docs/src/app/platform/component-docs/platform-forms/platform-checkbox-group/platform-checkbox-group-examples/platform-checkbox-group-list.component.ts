import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-checkbox-group-list',
    templateUrl: './platform-checkbox-group-list.component.html'
})
export class PlatformCheckboxGroupListComponent {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
    sports: string[] = ['cycling', 'running', 'visit gym', 'swimming'];
    phoneslist: string[] = ['Samsung', 'Apple', 'OnePlus', 'Redmi'];

    // data passing to form
    selectedPhones = { phones: ['Samsung', 'OnePlus'] };

    form1 = new FormGroup({});
    form2 = new FormGroup({});
    form3 = new FormGroup({
        sports: new FormControl(['cycling', 'running'])
    });

    // template driven
    countrySeason = '';
    selectedSports = ['running', 'swimming'];
}
