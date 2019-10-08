import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-calendar-form-example',
    templateUrl: 'calendar-form-examples.component.html',
    styles: [`
            button {
                margin-top: 1rem;
            }

            .flex-form{
                display:flex;
                justify-content:space-between;
            }
    `]
})
export class CalendarFormExamplesComponent {
    customForm = new FormGroup({
        date: new FormControl(FdDate.getToday()),
        dateRange: new FormControl({
            value: {
                start: new FdDate(2019, 10, 11),
                end: new FdDate(2019, 10, 19)
            }, disabled: false
        })
    });

    setInvalid() {
        this.customForm.controls['date'].setValue(new FdDate(null, null, null));
    }

    setInvalidRange() {
        this.customForm.controls['dateRange'].setValue(new FdDate(null, null, null));
    }

}
