import { Component, OnInit } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';
import moment from 'moment';

@Component({
    selector: 'fd-time-picker-locale-example',
    templateUrl: './time-picker-locale-example.component.html',
    styleUrls: ['./time-picker-locale-example.component.scss']
})
export class TimePickerLocaleExampleComponent implements OnInit {
    timeMeridianObject = new FdDate().setTime(12, 0, 0);
    locale = 'en';
    meridian = false;
    placeholder: string;

    ngOnInit(): void {
        this.onOptionChange('en');
    }

    onOptionChange(event): void {
        moment.locale(event);
        if (moment().format('LT').includes('AM') || moment().format('LT').includes('PM')) {
            this.placeholder = 'hh:mm:ss am';
            this.meridian = true;
        } else {
            this.placeholder = 'hh:mm:ss';
            this.meridian = false;
        }
    }
}
