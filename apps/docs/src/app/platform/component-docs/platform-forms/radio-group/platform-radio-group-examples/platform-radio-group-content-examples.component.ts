import { Component, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-content-example',
    templateUrl: './platform-radio-group-content-example.component.html'
})
export class PlatformRadioGroupContentExampleComponent implements DoCheck {
    favoriteSeason = '';
    favoriteSeason2 = '';
    favoriteMonth = '';
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    customForm = new FormGroup({
        example1: new FormControl({ value: '', disabled: false }),
        example2: new FormControl({ value: '', disabled: false }),
        example3: new FormControl({ value: 'Winter', disabled: false }),
        example4: new FormControl({ value: '', disabled: false })
    });

    ngDoCheck() {
        this.customForm.get('example4').setErrors({ invalid: true });
        this.customForm.get('example4').markAsTouched();
    }
}
