import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as timePickerSrc from '!raw-loader!./examples/time-picker-example.component.html';
import * as timePickerMeridianSrc from '!raw-loader!./examples/time-picker-12-example.component.html';
import * as timePickerDisabledSrc from '!raw-loader!./examples/time-picker-disabled-example.component.html';
import * as timePickerNoSecondsSrc from '!raw-loader!./examples/time-picker-no-seconds-example.component.html';
import * as timePickerOnlyHoursSrc from '!raw-loader!./examples/time-picker-only-hours-example.component.html';
import * as timePickerCompactSrc from '!raw-loader!./examples/time-picker-compact-example.component.html';
import * as timePickerNullSrc from '!raw-loader!./examples/time-picker-allow-null-example.component.html';
import * as timePickerTsCode from '!raw-loader!./examples/time-picker-examples.component.ts';
import * as timePickerOtherDelimiterSrc from '!raw-loader!./examples/time-picker-other-delimiter-example.component.html';
import * as timePickerOtherDelimiterTsSrc from '!raw-loader!./examples/time-picker-other-delimiter-example.component.ts';
import * as timePickerFormHtmlSrc from '!raw-loader!./examples/time-picker-form-example.component.html';
import * as timePickerFormTsSrc from '!raw-loader!./examples/time-picker-form-example.component.ts';
import * as timePickerFormScssSrc from '!raw-loader!./examples/time-picker-form-example.component.scss';
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
            code: timePickerSrc,
            secondFile: 'time-picker-examples',
            typescriptFileCode: timePickerTsCode,
            fileName: 'time-picker-example',
            component: 'TimePickerExampleComponent',
            addonTs: 'timeObject = { hour: 12, minute: 0, second: 0 };'
        }
    ];

    meridianTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerMeridianSrc,
            secondFile: 'time-picker-examples',
            typescriptFileCode: timePickerTsCode,
            fileName: 'time-picker-12-example',
            component: 'TimePicker12ExampleComponent',
            addonTs: 'timeMeridianObject = { hour: 12, minute: 0, second: 0 };'
        }
    ];

    timePickerNoSeconds: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerNoSecondsSrc,
            secondFile: 'time-picker-examples',
            typescriptFileCode: timePickerTsCode,
            fileName: 'time-picker-no-seconds-example',
            component: 'TimePickerNoSecondsExampleComponent',
            addonTs: 'timePickerNoSecondsObject = { hour: 12, minute: 0, second: null };'
        }
    ];

    timePickerOnlyHours: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerOnlyHoursSrc,
            secondFile: 'time-picker-examples',
            typescriptFileCode: timePickerTsCode,
            fileName: 'time-picker-only-hours-example',
            component: 'TimePickerOnlyHoursExampleComponent',
            addonTs: 'timePickerOnlyHoursObject = { hour: 12, minute: null, second: null };'
        }
    ];

    disabledTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerDisabledSrc,
            secondFile: 'time-picker-examples',
            typescriptFileCode: timePickerTsCode,
            fileName: 'time-picker-disabled-example',
            component: 'TimePickerDisabledExampleComponent',
            addonTs: 'timeObject = { hour: 12, minute: 0, second: 0 };'
        }
    ];

    compactTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerCompactSrc,
            secondFile: 'time-picker-examples',
            typescriptFileCode: timePickerTsCode,
            fileName: 'time-picker-compact-example',
            component: 'TimePickerCompactExampleComponent',
            addonTs: 'timeObject = { hour: 12, minute: 0, second: 0 };'
        }
    ];

    nullTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerNullSrc,
            secondFile: 'time-picker-examples',
            typescriptFileCode: timePickerTsCode,
            fileName: 'time-picker-allow-null-example',
            component: 'TimePickerAllowNullExampleComponent',
            addonTs: 'timeObject = { hour: 12, minute: 0, second: 0 };'
        }
    ];

    otherFormatTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerOtherDelimiterSrc,
            fileName: 'time-picker-other-delimiter-example',
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

    ngOnInit() { }
}
