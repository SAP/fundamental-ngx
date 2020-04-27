import { Component, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-list-items-example',
    templateUrl: './platform-radio-group-list-items-example.component.html'
})
export class PlatformRadioGroupListItemsExampleComponent implements DoCheck {
    favoriteOption: string = '';
    favoriteOption2: string = '';

    customForm = new FormGroup({
        example1: new FormControl(''),
        example2: new FormControl('')
    });

    items = [
        {
            label: 'Option 1',
            value: 'Option 1',
            state: 'default',
            disabled: false
        },
        {
            label: 'Option 2',
            value: 'Option 2',
            state: 'valid',
            disabled: false
        },
        {
            label: 'Option 3',
            value: 'Option 3',
            state: 'invalid',
            disabled: false
        },
        {
            label: 'Option 4',
            value: 'Option 4',
            state: 'warning',
            disabled: false
        },
        {
            label: 'Option 5',
            value: 'Option 5',
            state: 'information',
            disabled: false
        }
    ];

    ngDoCheck() {
        this.customForm.get('example1').setErrors({ invalid: true });
        this.customForm.get('example1').markAsTouched();
    }
}
