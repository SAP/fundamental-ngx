import { Component } from '@angular/core';

import * as datePickerMomentAdapterSrcTs from '!raw-loader!./examples/date-picker-moment-adapter-example.component.ts';
import * as momentAdapterOptionsSrcTs from '!raw-loader!./examples/moment-adapter-options-example.component.ts';
import * as momentDatetimeFormatsSrcTs from '!raw-loader!./examples/moment-datetime-formats-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-moment-datetime-adapter',
    templateUrl: './moment-datetime-adapter-docs.component.html'
})
export class MomentDatetimeAdapterDocsComponent {
    datePickerMomentAdapter: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerMomentAdapterExampleComponent',
            code: datePickerMomentAdapterSrcTs,
            fileName: 'date-picker-moment-adapter-example'
        }
    ];

    momentAdapterOptions: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'MomentAdapterOptionsExampleComponent',
            code: momentAdapterOptionsSrcTs,
            fileName: 'moment-adapter-options-example'
        }
    ];

    momentDatetimeFormats: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'MomentDatetimeFormatsExampleComponent',
            code: momentDatetimeFormatsSrcTs,
            fileName: 'moment-datetime-formats-example'
        }
    ];
}

