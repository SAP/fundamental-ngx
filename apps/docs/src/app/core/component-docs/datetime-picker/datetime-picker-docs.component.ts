import { Component } from '@angular/core';

import * as dateTimeSimpleHtml from '!raw-loader!./examples/datetime-example/datetime-example.component.html';
import * as dateTimeSimpleTs from '!raw-loader!./examples/datetime-example/datetime-example.component.ts';

import * as dateTimeNonMeridianHtml from '!raw-loader!./examples/datetime-non-meridian-example/datetime-non-meridian-example.component.html';
import * as dateTimeNonMeridianTs from '!raw-loader!./examples/datetime-non-meridian-example/datetime-non-meridian-example.component.ts';

import * as dateTimeProgHtml from '!raw-loader!./examples/datetime-program-example/datetime-program-example.component.html';
import * as dateTimeProgTs from '!raw-loader!./examples/datetime-program-example/datetime-program-example.component.ts';

import * as dateTimePickerAllowNullTs from '!raw-loader!./examples/datetime-allow-null-example/datetime-allow-null-example.component.ts';

import * as dateTimeFormatHtml from '!raw-loader!./examples/datetime-format-example/datetime-format-example.component.html';
import * as dateTimeFormatTs from '!raw-loader!./examples/datetime-format-example/datetime-format-example.component.ts';

import * as datetimeI18nComplexTs from '!raw-loader!./examples/datetime-picker-complex-i18n-example/datetime-picker-complex-i18n-example.component.ts';
import * as datetimeI18nComplexH from '!raw-loader!./examples/datetime-picker-complex-i18n-example/datetime-picker-complex-i18n-example.component.html';

import * as dateTimeDisabledHtml from '!raw-loader!./examples/datetime-disabled-example/datetime-disabled-example.component.html';
import * as dateTimeDisabledTs from '!raw-loader!./examples/datetime-disabled-example/datetime-disabled-example.component.ts';
import * as dateTimeFormHtml from '!raw-loader!./examples/datetime-form-example/datetime-form-example.component.html';
import * as dateTimeFormTs from '!raw-loader!./examples/datetime-form-example/datetime-form-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-datetime-picker-docs',
    templateUrl: './datetime-picker-docs.component.html',
    styleUrls: ['./datetime-picker-docs.component.scss']
})
export class DatetimePickerDocsComponent {
    datetimePickerSingle: ExampleFile[] = [
        {
            language: 'html',
            code: dateTimeSimpleHtml,
            fileName: 'datetime-example'
        },
        {
            language: 'typescript',
            code: dateTimeSimpleTs,
            fileName: 'datetime-example',
            component: 'DatetimeExampleComponent'
        },
    ];

    datetimeNonMer: ExampleFile[] = [
        {
            language: 'html',
            code: dateTimeNonMeridianHtml,
            fileName: 'datetime-non-meridian-example'
        },
        {
            language: 'typescript',
            code: dateTimeNonMeridianTs,
            fileName: 'datetime-non-meridian-example',
            component: 'DatetimeNonMeridianExampleComponent'
        },
    ];

    datetimeProgram: ExampleFile[] = [
        {
            language: 'html',
            code: dateTimeProgHtml,
            fileName: 'datetime-program-example'
        },
        {
            language: 'typescript',
            code: dateTimeProgTs,
            fileName: 'datetime-program-example',
            component: 'DatetimeProgramExampleComponent'
        },
    ];

    datetimeFormat: ExampleFile[] = [
        {
            language: 'html',
            code: dateTimeFormatHtml,
            fileName: 'datetime-format-example'
        },
        {
            language: 'typescript',
            code: dateTimeFormatTs,
            fileName: 'datetime-format-example',
            component: 'DatetimeFormatExampleComponent'
        },
    ];

    datetimeDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: dateTimeDisabledHtml,
            fileName: 'datetime-disabled-example'
        },
        {
            language: 'typescript',
            code: dateTimeDisabledTs,
            fileName: 'datetime-disabled-example',
            component: 'DatetimeDisabledExampleComponent'
        },
    ];

    datetimeForm: ExampleFile[] = [
        {
            language: 'html',
            code: dateTimeFormHtml,
            fileName: 'datetime-form-example'
        },
        {
            language: 'typescript',
            code: dateTimeFormTs,
            fileName: 'datetime-form-example',
            component: 'DatetimeFormExampleComponent'
        },
    ];

    datetimePickerAllowNull: ExampleFile[] = [
        {
            language: 'typescript',
            code: dateTimePickerAllowNullTs,
            fileName: 'date-time-picker-allow-null-example',
            component: 'DatetimePickerAllowNullExampleComponent'
        },
    ];

    datetimeI18nComplex: ExampleFile[] = [
        {
            language: 'typescript',
            code: datetimeI18nComplexTs,
            fileName: 'datetime-picker-complex-i18n-example',
            component: 'DatetimePickerComplexI18nExampleComponent'
        },
        {
            language: 'html',
            code: datetimeI18nComplexH,
            fileName: 'datetime-picker-complex-i18n-example',
            component: 'DatetimePickerComplexI18nExampleComponent'
        },
    ];
}
