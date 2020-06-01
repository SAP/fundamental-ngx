import { Component, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-content-example',
    templateUrl: './platform-radio-group-content-example.component.html'
})
export class PlatformRadioGroupContentExampleComponent implements DoCheck {
    favoriteSeason: string = '';
    favoriteSeason2: string = 'spring';
    favoriteMonth: string = '';
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    form1 = new FormGroup({
        example1: new FormControl({ value: '', disabled: false })
    });

    form2 = new FormGroup({
        example2: new FormControl({ value: '', disabled: false })
    });

    form3 = new FormGroup({
        example3: new FormControl({ value: 'winter', disabled: false })
    });

    form4 = new FormGroup({
        example4: new FormControl({ value: '', disabled: false }, Validators.required)
    });

    ngDoCheck() {
        this.form4.controls.example4.setErrors({ invalid: true });
        this.form4.controls.example4.markAsTouched();
    }
}
