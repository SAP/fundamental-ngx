import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-content-example',
    templateUrl: './platform-radio-group-content-example.component.html'
})
export class PlatformRadioGroupContentExampleComponent {
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

    onSubmit(form: NgForm): void {
        if (this.form4.controls.radioc4.status === 'INVALID' && form.submitted) {
            this.form4.controls.radioc4.markAsTouched();
        }
    }

    onReset(form: NgForm): void {
        this.form4.reset();
    }
}
