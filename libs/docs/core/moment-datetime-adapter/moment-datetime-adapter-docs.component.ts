import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DatePickerMomentAdapterExampleComponent } from './examples/date-picker-moment-adapter-example.component';
import { MomentAdapterOptionsExampleComponent } from './examples/moment-adapter-options-example.component';
import { MomentDatetimeFormatsExampleComponent } from './examples/moment-datetime-formats-example.component';

const datePickerMomentAdapterSrcTs = 'date-picker-moment-adapter-example.component.ts';
const datePickerMomentAdapterSrcHtml = 'date-picker-moment-adapter-example.component.html';
const momentAdapterOptionsSrcTs = 'moment-adapter-options-example.component.ts';
const momentAdapterOptionsSrcHtml = 'moment-adapter-options-example.component.html';
const momentDatetimeFormatsSrcTs = 'moment-datetime-formats-example.component.ts';
const momentDatetimeFormatsSrcHtml = 'moment-datetime-formats-example.component.html';

@Component({
    selector: 'app-moment-datetime-adapter',
    templateUrl: './moment-datetime-adapter-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        DatePickerMomentAdapterExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        MomentAdapterOptionsExampleComponent,
        MomentDatetimeFormatsExampleComponent
    ]
})
export class MomentDatetimeAdapterDocsComponent {
    datePickerMomentAdapter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(datePickerMomentAdapterSrcHtml),
            fileName: 'date-picker-moment-adapter-example'
        },
        {
            language: 'typescript',
            component: 'DatePickerMomentAdapterExampleComponent',
            code: getAssetFromModuleAssets(datePickerMomentAdapterSrcTs),
            fileName: 'date-picker-moment-adapter-example'
        }
    ];

    momentAdapterOptions: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(momentAdapterOptionsSrcHtml),
            fileName: 'moment-adapter-options-example'
        },
        {
            language: 'typescript',
            component: 'MomentAdapterOptionsExampleComponent',
            code: getAssetFromModuleAssets(momentAdapterOptionsSrcTs),
            fileName: 'moment-adapter-options-example'
        }
    ];

    momentDatetimeFormats: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(momentDatetimeFormatsSrcHtml),
            fileName: 'moment-datetime-formats-example'
        },
        {
            language: 'typescript',
            component: 'MomentDatetimeFormatsExampleComponent',
            code: getAssetFromModuleAssets(momentDatetimeFormatsSrcTs),
            fileName: 'moment-datetime-formats-example'
        }
    ];
}
