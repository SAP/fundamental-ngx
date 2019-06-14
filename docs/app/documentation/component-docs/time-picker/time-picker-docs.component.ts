import { Component } from '@angular/core';

import * as timePickerSrc from '!raw-loader!./examples/time-picker-example.component.html';
import * as timePickerMeridianSrc from '!raw-loader!./examples/time-picker-12-example.component.html';
import * as timePickerDisabledSrc from '!raw-loader!./examples/time-picker-disabled-example.component.html';
import * as timePickerNoSecondsSrc from '!raw-loader!./examples/time-picker-no-seconds-example.component.html';
import * as timePickerCompactSrc from '!raw-loader!./examples/time-picker-compact-example.component.html';
import * as timePickerNullSrc from '!raw-loader!./examples/time-picker-allow-null-example.component.html';
import * as timePickerFormHtmlSrc from '!raw-loader!./examples/time-picker-form-example.component.html';
import * as timePickerFormTsSrc from '!raw-loader!./examples/time-picker-form-example.component.ts'

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker-docs.component.html'
})
export class TimePickerDocsComponent {
    timePickerHtml = timePickerSrc;
    meridianTimePickerHtml = timePickerMeridianSrc;
    timePickerNoSecondsHtml = timePickerNoSecondsSrc;
    disabledTimePickerHtml = timePickerDisabledSrc;
    compactTimePickerHtml = timePickerCompactSrc;
    nullTimePickerHtml = timePickerNullSrc;
    timePickerFormHtml = timePickerFormHtmlSrc;
    timePickerFormTs = timePickerFormTsSrc;

    constructor() { }
}
