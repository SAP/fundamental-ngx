import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as datePickerRangeSrc from '!raw-loader!./examples/date-picker-range-example.component.ts';
import * as datePickerSingleSrc from '!raw-loader!./examples/date-picker-single-example.component.ts';
import * as datePickeri18nSrc from '!raw-loader!./examples/date-picker-i18n-example.component.ts';
import * as datePickerFormatSrc from '!raw-loader!./examples/date-picker-format-example.component.ts';
import * as datePickerAllowNullSrc from '!raw-loader!./examples/date-picker-allow-null-example.component.ts';
import * as datePickerFormTsSrc from '!raw-loader!./examples/date-picker-form-example.component.ts';
import * as datePickerRangeFormTsSrc from '!raw-loader!./examples/date-picker-form-range-example.component.ts';
import * as datePickerPositionSrc from '!raw-loader!./examples/date-picker-position-example.component.ts';
import * as datePickerDisabledSrc from '!raw-loader!./examples/date-picker-disabled-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker-docs.component.html'
})
export class DatePickerDocsComponent implements OnInit {
    datePickerSingle: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerSingleSrc,
            fileName: 'date-picker-single-example'
        }
    ];

    datePickerRange: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerRangeSrc,
            fileName: 'date-picker-range-example'
        }
    ];

    datePickerI18N: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickeri18nSrc,
            fileName: 'date-picker-i18n-example'
        }
    ];

    datePickerFormat: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerFormatSrc,
            fileName: 'date-picker-format-example'
        }
    ];

    datePickerAllowNull: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerAllowNullSrc,
            fileName: 'date-picker-allow-null-example'
        }
    ];

    datePickerForm: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerFormTsSrc,
            fileName: 'date-picker-form-example'
        }
    ];

    datePickerRangeForm: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerRangeFormTsSrc,
            fileName: 'date-picker-form-range-example'
        }
    ];

    datePickerPosition: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerPositionSrc,
            fileName: 'date-picker-position-example'
        }
    ];

    datePickerDisabled: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerDisabledSrc,
            fileName: 'date-picker-disabled-example'
        }
    ];

    ngOnInit() { }
}
