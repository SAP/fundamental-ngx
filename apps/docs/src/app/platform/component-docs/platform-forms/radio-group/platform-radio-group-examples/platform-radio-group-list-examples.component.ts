import { Component, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-list-example',
    templateUrl: './platform-radio-group-list-example.component.html',
    styleUrls: ['platform-radio-group.component.scss']
})
export class PlatformRadioGroupListExampleComponent implements DoCheck {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    favoriteOption: string = '';
    favoriteOption2: string = 'Winter';

    form1 = new FormGroup({
        example1: new FormControl({ value: '', disabled: false })
    });

    form2 = new FormGroup({
        example2: new FormControl({ value: 'Winter', disabled: false })
    });

    ngDoCheck() {
        this.form1.get('example1').setErrors({ invalid: true });
        this.form1.get('example1').markAsTouched();
    }
}
