import { Component } from '@angular/core';

import datePickerMomentAdapterSrcTs from '!./examples/date-picker-moment-adapter-example.component.ts?raw';
import datePickerMomentAdapterSrcHtml from '!./examples/date-picker-moment-adapter-example.component.html?raw';
import momentAdapterOptionsSrcTs from '!./examples/moment-adapter-options-example.component.ts?raw';
import momentAdapterOptionsSrcHtml from '!./examples/moment-adapter-options-example.component.html?raw';
import momentDatetimeFormatsSrcTs from '!./examples/moment-datetime-formats-example.component.ts?raw';
import momentDatetimeFormatsSrcHtml from '!./examples/moment-datetime-formats-example.component.html?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-moment-datetime-adapter',
    templateUrl: './moment-datetime-adapter-docs.component.html'
})
export class MomentDatetimeAdapterDocsComponent {
    datePickerMomentAdapter: ExampleFile[] = [
        {
            language: 'html',
            code: datePickerMomentAdapterSrcHtml,
            fileName: 'date-picker-moment-adapter-example'
        },
        {
            language: 'typescript',
            component: 'DatePickerMomentAdapterExampleComponent',
            code: datePickerMomentAdapterSrcTs,
            fileName: 'date-picker-moment-adapter-example'
        }
    ];

    momentAdapterOptions: ExampleFile[] = [
        {
            language: 'html',
            code: momentAdapterOptionsSrcHtml,
            fileName: 'moment-adapter-options-example'
        },
        {
            language: 'typescript',
            component: 'MomentAdapterOptionsExampleComponent',
            code: momentAdapterOptionsSrcTs,
            fileName: 'moment-adapter-options-example'
        }
    ];

    momentDatetimeFormats: ExampleFile[] = [
        {
            language: 'html',
            code: momentDatetimeFormatsSrcHtml,
            fileName: 'moment-datetime-formats-example'
        },
        {
            language: 'typescript',
            component: 'MomentDatetimeFormatsExampleComponent',
            code: momentDatetimeFormatsSrcTs,
            fileName: 'moment-datetime-formats-example'
        }
    ];
}
