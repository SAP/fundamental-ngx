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

import * as dateTimeDisabledHtml from '!raw-loader!./examples/datetime-disabled-example/datetime-disabled-example.component.html';
import * as dateTimeDisabledTs from '!raw-loader!./examples/datetime-disabled-example/datetime-disabled-example.component.ts';
import * as dateTimeFormHtml from '!raw-loader!./examples/datetime-form-example/datetime-form-example.component.html';
import * as dateTimeFormTs from '!raw-loader!./examples/datetime-form-example/datetime-form-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-datetime-picker-docs',
    templateUrl: './datetime-picker-docs.component.html',
    styleUrls: ['./datetime-picker-docs.component.scss']
})
export class DatetimePickerDocsComponent {

    datetimePickerSingle: ExampleFile[] = [
        {
            language: 'html',
            code: dateTimeSimpleHtml
        },
        {
            language: 'typescript',
            code: dateTimeSimpleTs
        }
    ];

    datetimeNonMer: ExampleFile[] = [
        {
            language: 'html',
            code: dateTimeNonMeridianHtml
        },
        {
            language: 'typescript',
            code: dateTimeNonMeridianTs
        }
    ];

    datetimeProgram: ExampleFile[] = [
        {
            language: 'html',
            code: dateTimeProgHtml
        },
        {
            language: 'typescript',
            code: dateTimeProgTs
        }
    ];

    datetimeFormat: ExampleFile[] = [
        {
            language: 'html',
            code: dateTimeFormatHtml
        },
        {
            language: 'typescript',
            code: dateTimeFormatTs
        }
    ];

    datetimeDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: dateTimeDisabledHtml
        },
        {
            language: 'typescript',
            code: dateTimeDisabledTs
        }
    ];

    datetimeForm: ExampleFile[] = [
        {
            language: 'html',
            code: dateTimeFormHtml
        },
        {
            language: 'typescript',
            code: dateTimeFormTs
        }
    ];

    datetimePickerAllowNull: ExampleFile[] = [{
        language: 'typescript',
        code: dateTimePickerAllowNullTs
    }];

}
