import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-list-example',
    templateUrl: './platform-radio-group-list-example.component.html'
})
export class PlatformRadioGroupListExampleComponent implements AfterViewInit {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    favoriteOption = '';
    favoriteOption2 = 'Winter';

    form1 = new FormGroup({});

    form2 = new FormGroup({});
    form2Data = { radiol2: 'Winter' };

    form3 = new FormGroup({
        month: new FormControl('Winter')
    });

    constructor(private _cd: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    onSubmit(form: NgForm): void {
        if (this.form1.controls.radiol1.status === 'INVALID' && form.submitted) {
            this.form1.controls.radiol1.markAsTouched();
            this._cd.detectChanges();
        }
    }
}
