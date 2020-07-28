import { Component } from '@angular/core';

import * as timePickerSrc from '!raw-loader!./examples/time-picker-example.component.html';
import * as timePickerMeridianSrc from '!raw-loader!./examples/time-picker-12-example.component.html';
import * as timePickerDisabledSrc from '!raw-loader!./examples/time-picker-disabled-example.component.html';
import * as timePickerNoSecondsSrc from '!raw-loader!./examples/time-picker-no-seconds-example.component.html';
import * as timePickerOnlyHoursSrc from '!raw-loader!./examples/time-picker-only-hours-example.component.html';
import * as timePickerCompactSrc from '!raw-loader!./examples/time-picker-compact-example.component.html';
import * as timePickerNullSrc from '!raw-loader!./examples/time-picker-allow-null-example.component.html';
import * as timePickerSrcTs from '!raw-loader!./examples/time-picker-example.component.ts';
import * as timePickerMeridianSrcTs from '!raw-loader!./examples/time-picker-12-example.component.ts';
import * as timePickerDisabledSrcTs from '!raw-loader!./examples/time-picker-disabled-example.component.ts';
import * as timePickerNoSecondsSrcTs from '!raw-loader!./examples/time-picker-no-seconds-example.component.ts';
import * as timePickerCompactSrcTs from '!raw-loader!./examples/time-picker-compact-example.component.ts';
import * as timePickerNullSrcTs from '!raw-loader!./examples/time-picker-allow-null-example.component.ts';
import * as timePickerOnlyHoursSrcTs from '!raw-loader!./examples/time-picker-only-hours-example.component.ts';
import * as timePickerOtherDelimiterSrc from '!raw-loader!./examples/time-picker-other-delimiter-example.component.html';
import * as timePickerOtherDelimiterTsSrc from '!raw-loader!./examples/time-picker-other-delimiter-example.component.ts';
import * as timePickerLocaleHtmlSrc from '!raw-loader!./examples/time-picker-locale-example/time-picker-locale-example.component.html';
import * as timePickerLocaleTsSrc from '!raw-loader!./examples/time-picker-locale-example/time-picker-locale-example.component.ts';
import * as timePickerFormHtmlSrc from '!raw-loader!./examples/time-picker-form-example.component.html';
import * as timePickerFormTsSrc from '!raw-loader!./examples/time-picker-form-example.component.ts';
import * as timePickerFormScssSrc from '!raw-loader!./examples/time-picker-form-example.component.scss';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker-docs.component.html'
})
export class TimePickerDocsComponent {
    timePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerSrc,
            typescriptFileCode: timePickerSrcTs,
            fileName: 'time-picker-example',
            component: 'TimePickerExampleComponent'
        }
    ];

    meridianTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerMeridianSrc,
            typescriptFileCode: timePickerMeridianSrcTs,
            fileName: 'time-picker-12-example',
            component: 'TimePicker12ExampleComponent'
        }
    ];

    timePickerNoSeconds: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerNoSecondsSrc,
            typescriptFileCode: timePickerNoSecondsSrcTs,
            fileName: 'time-picker-no-seconds-example',
            component: 'TimePickerNoSecondsExampleComponent'
        }
    ];

    timePickerOnlyHours: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerOnlyHoursSrc,
            typescriptFileCode: timePickerOnlyHoursSrcTs,
            fileName: 'time-picker-only-hours-example',
            component: 'TimePickerOnlyHoursExampleComponent'
        }
    ];

    disabledTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerDisabledSrc,
            typescriptFileCode: timePickerDisabledSrcTs,
            fileName: 'time-picker-disabled-example',
            component: 'TimePickerDisabledExampleComponent'
        }
    ];

    compactTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerCompactSrc,
            typescriptFileCode: timePickerCompactSrcTs,
            fileName: 'time-picker-compact-example',
            component: 'TimePickerCompactExampleComponent'
        }
    ];

    nullTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerNullSrc,
            typescriptFileCode: timePickerNullSrcTs,
            fileName: 'time-picker-allow-null-example',
            component: 'TimePickerAllowNullExampleComponent'
        }
    ];

    otherFormatTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerOtherDelimiterSrc,
            fileName: 'time-picker-other-delimiter-example'
        },
        {
            language: 'typescript',
            code: timePickerOtherDelimiterTsSrc,
            fileName: 'time-picker-other-delimiter-example',
            component: 'TimePickerOtherDelimiterExampleComponent'
        }
    ];

    timePickerForm: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerFormHtmlSrc,
            fileName: 'time-picker-form-example',
            scssFileCode: timePickerFormScssSrc
        },
        {
            language: 'typescript',
            code: timePickerFormTsSrc,
            fileName: 'time-picker-form-example',
            component: 'TimePickerFormExampleComponent'
        }
    ];

    timePickerLocale: ExampleFile[] = [
      {
          language: 'html',
          code: timePickerLocaleHtmlSrc,
          fileName: 'time-picker-locale-example',
      },
      {
          language: 'typescript',
          code: timePickerLocaleTsSrc,
          fileName: 'time-picker-locale-example',
          component: 'TimePickerLocaleExampleComponent'
      }
  ];
}
