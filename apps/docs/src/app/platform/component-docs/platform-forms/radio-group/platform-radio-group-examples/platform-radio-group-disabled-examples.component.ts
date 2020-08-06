import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-disabled-example',
    templateUrl: './platform-radio-group-disabled-example.component.html'
})
export class PlatformRadioGroupDisabledExampleComponent {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    items = [
        {
            label: 'Winter',
            value: 'winter',
            disabled: false
        },
        {
            label: 'Spring',
            value: 'spring',
            disabled: false
        },
        {
            label: 'Summer',
            value: 'summer',
            disabled: false
        },
        {
            label: 'Autumn',
            value: 'autumn',
            disabled: false
        }
    ];

    disabledItems = [
        {
            label: 'Not disabled',
            value: 'fall',
            disabled: false
        },
        {
            label: 'Winter',
            value: 'winter',
            disabled: false
        },
        {
            label: 'Spring',
            value: 'spring',
            disabled: true
        },
        {
            label: 'Summer',
            value: 'summer',
            disabled: true
        },
        {
            label: 'Autumn',
            value: 'autumn',
            disabled: true
        }
    ];

    favoriteSeason1: string;
    favoriteSeason2: string;
    favoriteSeason3: string;
    favoriteSeason4: string;
    favoriteSeason5: string;

    customForm = new FormGroup({
        example1: new FormControl({ value: '', disabled: true }),
        example2: new FormControl({ value: '', disabled: false }),
        example3: new FormControl({ value: '', disabled: true }),
        example4: new FormControl({ value: 'winter', disabled: true }),
        example5: new FormControl({ value: 'winter', disabled: false })
    });
}
