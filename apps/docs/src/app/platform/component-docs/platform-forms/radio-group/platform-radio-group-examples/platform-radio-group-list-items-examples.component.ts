import { Component, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-list-items-example',
    templateUrl: './platform-radio-group-list-items-example.component.html',
    styleUrls: ['platform-radio-group.component.scss']
})
export class PlatformRadioGroupListItemsExampleComponent implements DoCheck {
    favoriteOption: string = '';
    favoriteOption2: string = 'winter';

    form1 = new FormGroup({
        example1: new FormControl('')
    });

    form2 = new FormGroup({
        example2: new FormControl('winter')
    });

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

    ngDoCheck() {
        this.form1.get('example1').setErrors({ invalid: true });
        this.form1.get('example1').markAsTouched();
    }
}
