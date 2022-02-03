import { Component } from '@angular/core';

import dateTimeSimpleHtml from '!./examples/datetime-example/datetime-example.component.html?raw';
import dateTimeSimpleTs from '!./examples/datetime-example/datetime-example.component.ts?raw';

import dateTimeProgHtml from '!./examples/datetime-program-example/datetime-program-example.component.html?raw';
import dateTimeProgTs from '!./examples/datetime-program-example/datetime-program-example.component.ts?raw';

import dateTimePickerAllowNullTs from '!./examples/datetime-allow-null-example/datetime-allow-null-example.component.ts?raw';

import dateTimeFormatHtml from '!./examples/datetime-format-example/datetime-format-example.component.html?raw';
import dateTimeFormatTs from '!./examples/datetime-format-example/datetime-format-example.component.ts?raw';

import datetimeI18nComplexTs from '!./examples/datetime-picker-complex-i18n-example/datetime-picker-complex-i18n-example.component.ts?raw';
import datetimeI18nComplexH from '!./examples/datetime-picker-complex-i18n-example/datetime-picker-complex-i18n-example.component.html?raw';

import datetimeUpdateOnBlurSrcTs from '!./examples/datetime-picker-update-on-blur-example/datetime-picker-update-on-blur-example.component?raw';

import dateTimeDisabledHtml from '!./examples/datetime-disabled-example/datetime-disabled-example.component.html?raw';
import dateTimeDisabledTs from '!./examples/datetime-disabled-example/datetime-disabled-example.component.ts?raw';
import dateTimeFormHtml from '!./examples/datetime-form-example/datetime-form-example.component.html?raw';
import dateTimeFormTs from '!./examples/datetime-form-example/datetime-form-example.component.ts?raw';
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
        }
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
        }
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
        }
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
        }
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
        }
    ];

    datetimePickerAllowNull: ExampleFile[] = [
        {
            language: 'typescript',
            code: dateTimePickerAllowNullTs,
            fileName: 'date-time-picker-allow-null-example',
            component: 'DatetimePickerAllowNullExampleComponent'
        }
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
        }
    ];

    dateTimePickerUpdateOnBlur: ExampleFile[] = [
        {
            language: 'typescript',
            code: datetimeUpdateOnBlurSrcTs,
            fileName: 'datetime-picker-update-on-blur-example',
            component: 'DateTimePickerUpdateOnBlurExampleComponent'
        }
    ];
}
