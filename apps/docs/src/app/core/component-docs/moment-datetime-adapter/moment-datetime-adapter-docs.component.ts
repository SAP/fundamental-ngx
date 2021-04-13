import { Component } from '@angular/core';

import * as datePickerMomentAdaptorSrcTs from '!raw-loader!./examples/date-picker-moment-adaptor-example.component.ts';
import * as momentAdaptorOptionsSrcTs from '!raw-loader!./examples/moment-adaptor-options-example.component.ts';
import * as momentDatetimeFormatsSrcTs from '!raw-loader!./examples/moment-adaptor-options-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-moment-datetime-adapter',
    templateUrl: './moment-datetime-adapter-docs.component.html'
})
export class MomentDatetimeAdapterDocsComponent {
    datePickerMomentAdaptor: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerMomentAdaptorExampleComponent',
            code: datePickerMomentAdaptorSrcTs,
            fileName: 'date-picker-moment-adaptor-example'
        }
    ];

    momentAdaptorOptions: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'MomentAdaptorOptionsExampleComponent',
            code: momentAdaptorOptionsSrcTs,
            fileName: 'moment-adaptor-options-example'
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
