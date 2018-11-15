import { Component } from '@angular/core';

import * as timePickerSrc from '!raw-loader!./examples/time-picker-example.component.html';
import * as timePickerMeridianSrc from '!raw-loader!./examples/time-picker-12-example.component.html';
import * as timePickerDisabledSrc from '!raw-loader!./examples/time-picker-disabled-example.component.html';
import * as timePickerNoSecondsSrc from '!raw-loader!./examples/time-picker-no-seconds-example.component.html';

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker-docs.component.html'
})
export class TimePickerDocsComponent {
    timePickerHtml = timePickerSrc;
    meridianTimePickerHtml = timePickerMeridianSrc;
    timePickerNoSecondsHtml = timePickerNoSecondsSrc;
    disabledTimePickerHtml = timePickerDisabledSrc;

    constructor() {}
}
