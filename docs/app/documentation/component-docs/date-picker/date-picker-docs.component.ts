import { Component } from '@angular/core';

import * as datePickerRangeSrc from '!raw-loader!./examples/date-picker-range-example.component.ts';
import * as datePickerSingleSrc from '!raw-loader!./examples/date-picker-single-example.component.ts';
import * as datePickeri18nSrc from '!raw-loader!./examples/date-picker-i18n-example.component.ts';
import * as datePickerFormatSrc from '!raw-loader!./examples/date-picker-format-example.component.ts';
import * as datePickerAllowNullSrc from '!raw-loader!./examples/date-picker-allow-null-example.component.ts';
import * as datePickerFormTsSrc from '!raw-loader!./examples/date-picker-form-example.component.ts';
import * as datePickerRangeFormTsSrc from '!raw-loader!./examples/date-picker-form-range-example.component.ts';
import * as datePickerPositionSrc from '!raw-loader!./examples/date-picker-position-example.component.ts';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker-docs.component.html'
})
export class DatePickerDocsComponent {

    datePickerSingleJs = datePickerSingleSrc;
    datePickerRangeJs = datePickerRangeSrc;
    datePickerI18NTs = datePickeri18nSrc;
    datePickerFormatTs = datePickerFormatSrc;
    datePickerAllowNullTs = datePickerAllowNullSrc;
    datePickerFormTs = datePickerFormTsSrc;
    datePickerRangeFormTs = datePickerRangeFormTsSrc;
    datePickerPositionTs = datePickerPositionSrc;

}
