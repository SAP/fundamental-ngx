import { of } from 'rxjs';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-disabled-example',
    templateUrl: './platform-radio-group-disabled-example.component.html',
})
export class PlatformRadioGroupDisabledExampleComponent {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    items = [
        {
            label: 'Option 1',
            value: 'Option 1',
            state: 'default',
            disabled: false,
        },
        {
            label: 'Option 2',
            value: 'Option 2',
            state: 'valid',
            disabled: false,
        },
        {
            label: 'Option 3',
            value: 'Option 3',
            state: 'invalid',
            disabled: false,
        },
    ];

    disabledItems = [
        {
            label: 'Not disabled',
            value: 'Option 1',
            state: 'default',
        },
        {
            label: 'Option 2',
            value: 'Option 2',
            state: 'valid',
            disabled: true,
        },
        {
            label: 'Option 3',
            value: 'Option 3',
            state: 'invalid',
            disabled: true,
        },
    ];

    favoriteSeason1: string = '';
    favoriteSeason2: string = '';
    favoriteSeason3: string = '';
    favoriteSeason4: string = '';

    customForm = new FormGroup({
        example1: new FormControl({ value: '', disabled: true }),
        example2: new FormControl({ value: '', disabled: true }),
        example3: new FormControl({ value: 'Winter', disabled: true }),
    });
}
