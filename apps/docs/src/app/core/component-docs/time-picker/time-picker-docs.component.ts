import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as timePickerSrc from '!raw-loader!./examples/time-picker-example.component.html';
import * as timePickerMeridianSrc from '!raw-loader!./examples/time-picker-12-example.component.html';
import * as timePickerDisabledSrc from '!raw-loader!./examples/time-picker-disabled-example.component.html';
import * as timePickerNoSecondsSrc from '!raw-loader!./examples/time-picker-no-seconds-example.component.html';
import * as timePickerOnlyHoursSrc from '!raw-loader!./examples/time-picker-only-hours-example.component.html';
import * as timePickerCompactSrc from '!raw-loader!./examples/time-picker-compact-example.component.html';
import * as timePickerNullSrc from '!raw-loader!./examples/time-picker-allow-null-example.component.html';
import * as timePickerOtherDelimiterSrc from '!raw-loader!./examples/time-picker-other-delimiter-example.component.html';
import * as timePickerOtherDelimiterTsSrc from '!raw-loader!./examples/time-picker-other-delimiter-example.component.ts';
import * as timePickerFormHtmlSrc from '!raw-loader!./examples/time-picker-form-example.component.html';
import * as timePickerFormTsSrc from '!raw-loader!./examples/time-picker-form-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker-docs.component.html'
})
export class TimePickerDocsComponent implements OnInit {
    timePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerSrc
        }
    ];

    meridianTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerMeridianSrc
        }
    ];

    timePickerNoSeconds: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerNoSecondsSrc
        }
    ];

    timePickerOnlyHours: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerOnlyHoursSrc
        }
    ];

    disabledTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerDisabledSrc
        }
    ];

    compactTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerCompactSrc
        }
    ];

    nullTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerNullSrc
        }
    ];

    otherFormatTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerOtherDelimiterSrc
        },
        {
            language: 'typescript',
            code: timePickerOtherDelimiterTsSrc
        }
    ];

    timePickerForm: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerFormHtmlSrc
        },
        {
            language: 'typescript',
            code: timePickerFormTsSrc
        }
    ];

    ngOnInit() {}
}
