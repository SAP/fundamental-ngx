import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-checkbox-group-list',
    templateUrl: './platform-checkbox-group-list.component.html'
})
export class PlatformCheckboxGroupListComponent {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
    dishes: string[] = ['Italian', 'Chinese', 'Indian', 'Japanese'];
    sports: string[] = ['cycling', 'running', 'visit gym', 'swimming'];
    phonesList: string[] = ['Samsung', 'Apple', 'OnePlus', 'Redmi'];
    frameworks: string[] = ['Angular', 'React', 'Vue'];

    // data passing to form
    selectedPhones = { phones: ['Samsung', 'OnePlus'] };

    form1 = new FormGroup({});
    form2 = new FormGroup({});
    form3 = new FormGroup({
        sports: new FormControl(['cycling', 'running'])
    });
    form4 = new FormGroup({}, { updateOn: 'submit' });

    // template driven
    countrySeason = '';
    selectedSports = ['running', 'swimming'];

    // outside form
    selectedDishes = ['Chinese', 'Italian'];
}
