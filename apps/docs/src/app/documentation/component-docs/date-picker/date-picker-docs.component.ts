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
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker-docs.component.html'
})
export class DatePickerDocsComponent implements OnInit {
    datePickerSingle: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerSingleSrc
        }
    ];

    datePickerRange: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerRangeSrc
        }
    ];

    datePickerI18N: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickeri18nSrc
        }
    ];

    datePickerFormat: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerFormatSrc
        }
    ];

    datePickerAllowNull: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerAllowNullSrc
        }
    ];

    datePickerForm: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerFormTsSrc
        }
    ];

    datePickerRangeForm: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerRangeFormTsSrc
        }
    ];

    datePickerPosition: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerPositionSrc
        }
    ];

    datePickerDisabled: ExampleFile[] = [
        {
            language: 'typescript',
            code: datePickerDisabledSrc
        }
    ];

    ngOnInit() {}
}
