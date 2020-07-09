import { Component, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-list-example',
    templateUrl: './platform-radio-group-list-example.component.html'
})
export class PlatformRadioGroupListExampleComponent implements DoCheck {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    favoriteOption: string = '';
    favoriteOption2: string = 'Winter';

    form1 = new FormGroup({});

    form2 = new FormGroup({});
    form2Data = { radiol2: 'Winter' };

    form3 = new FormGroup({
        month: new FormControl('Winter')
    });

    ngDoCheck() {
        if (this.form1.controls.radiol1) {
            this.form1.controls.radiol1.setErrors({ invalid: true });
            this.form1.controls.radiol1.markAsTouched();
        }
    }
}
