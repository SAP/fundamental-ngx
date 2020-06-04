import { Component, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-list-example',
    templateUrl: './platform-radio-group-list-example.component.html'
})
export class PlatformRadioGroupListExampleComponent implements DoCheck {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    favoriteOption: string = '';
    favoriteOption2: string = '';
    customForm = new FormGroup({
        example1: new FormControl({ value: '', disabled: false }),
        example2: new FormControl({ value: '', disabled: false })
    });

    ngDoCheck() {
        this.customForm.get('example1').setErrors({ invalid: true });
        this.customForm.get('example1').markAsTouched();
    }
}
