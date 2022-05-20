import { Component } from '@angular/core';

import datePickerDayjsAdapterSrcTs from '!./examples/date-picker-dayjs-adapter-example.component.ts?raw';
import datePickerDayjsAdapterSrcHtml from '!./examples/date-picker-dayjs-adapter-example.component.html?raw';
import dayjsAdapterOptionsSrcTs from '!./examples/dayjs-adapter-options-example.component.ts?raw';
import dayjsAdapterOptionsSrcHtml from '!./examples/dayjs-adapter-options-example.component.html?raw';
import dayjsDatetimeFormatsSrcTs from '!./examples/dayjs-datetime-formats-example.component.ts?raw';
import dayjsDatetimeFormatsSrcHtml from '!./examples/dayjs-datetime-formats-example.component.html?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-dayjs-datetime-adapter',
    templateUrl: './dayjs-datetime-adapter-docs.component.html'
})
export class DayjsDatetimeAdapterDocsComponent {
    datePickerDayjsAdapter: ExampleFile[] = [
        {
            language: 'html',
            code: datePickerDayjsAdapterSrcHtml,
            fileName: 'date-picker-dayjs-adapter-example'
        },
        {
            language: 'typescript',
            component: 'DatePickerDayjsAdapterExampleComponent',
            code: datePickerDayjsAdapterSrcTs,
            fileName: 'date-picker-dayjs-adapter-example'
        }
    ];

    dayjsAdapterOptions: ExampleFile[] = [
        {
            language: 'html',
            code: dayjsAdapterOptionsSrcHtml,
            fileName: 'dayjs-adapter-options-example'
        },
        {
            language: 'typescript',
            component: 'DayjsAdapterOptionsExampleComponent',
            code: dayjsAdapterOptionsSrcTs,
            fileName: 'dayjs-adapter-options-example'
        }
    ];

    dayjsDatetimeFormats: ExampleFile[] = [
        {
            language: 'html',
            code: dayjsDatetimeFormatsSrcHtml,
            fileName: 'dayjs-datetime-formats-example'
        },
        {
            language: 'typescript',
            component: 'DayjsDatetimeFormatsExampleComponent',
            code: dayjsDatetimeFormatsSrcTs,
            fileName: 'dayjs-datetime-formats-example'
        }
    ];
}
