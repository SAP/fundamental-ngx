import { Component } from '@angular/core';

import * as datePickerRangeSrc from '!raw-loader!./examples/date-picker-range-example.component.ts';
import * as datePickerSingleSrc from '!raw-loader!./examples/date-picker-single-example.component.ts';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker-docs.component.html'
})
export class DatePickerDocsComponent {

    datePickerSingleJs = datePickerSingleSrc;
    datePickerRangeJs = datePickerRangeSrc;

}
