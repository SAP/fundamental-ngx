import { Component, DoCheck, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-content-example',
    templateUrl: './platform-radio-group-content-example.component.html'
})
export class PlatformRadioGroupContentExampleComponent implements AfterViewInit, DoCheck {
    favoriteSeason = '';
    favoriteSeason2 = 'spring';
    favoriteMonth = '';
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    form1 = new FormGroup({});

    form2 = new FormGroup({});

    form3 = new FormGroup({});
    form3Data = { radioc3: 'winter' };

    form4 = new FormGroup({});

    form5 = new FormGroup({
        month: new FormControl('february')
    });

    constructor(private _cd: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    ngDoCheck(): void {
        if (this.form4.controls.radioc4) {
            this.form4.controls.radioc4.setErrors({ invalid: true });
            this.form4.controls.radioc4.markAsTouched();
        }
    }
}
