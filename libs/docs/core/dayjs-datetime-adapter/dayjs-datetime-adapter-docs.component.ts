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
import { DatePickerDayjsAdapterExampleComponent } from './examples/date-picker-dayjs-adapter-example.component';
import { DayjsAdapterOptionsExampleComponent } from './examples/dayjs-adapter-options-example.component';
import { DayjsDatetimeFormatsExampleComponent } from './examples/dayjs-datetime-formats-example.component';

const datePickerDayjsAdapterSrcTs = 'date-picker-dayjs-adapter-example.component.ts';
const datePickerDayjsAdapterSrcHtml = 'date-picker-dayjs-adapter-example.component.html';
const dayjsAdapterOptionsSrcTs = 'dayjs-adapter-options-example.component.ts';
const dayjsAdapterOptionsSrcHtml = 'dayjs-adapter-options-example.component.html';
const dayjsDatetimeFormatsSrcTs = 'dayjs-datetime-formats-example.component.ts';
const dayjsDatetimeFormatsSrcHtml = 'dayjs-datetime-formats-example.component.html';

@Component({
    selector: 'app-dayjs-datetime-adapter',
    templateUrl: './dayjs-datetime-adapter-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        DatePickerDayjsAdapterExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DayjsAdapterOptionsExampleComponent,
        DayjsDatetimeFormatsExampleComponent
    ]
})
export class DayjsDatetimeAdapterDocsComponent {
    datePickerDayjsAdapter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(datePickerDayjsAdapterSrcHtml),
            fileName: 'date-picker-dayjs-adapter-example'
        },
        {
            language: 'typescript',
            component: 'DatePickerDayjsAdapterExampleComponent',
            code: getAssetFromModuleAssets(datePickerDayjsAdapterSrcTs),
            fileName: 'date-picker-dayjs-adapter-example'
        }
    ];

    dayjsAdapterOptions: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dayjsAdapterOptionsSrcHtml),
            fileName: 'dayjs-adapter-options-example'
        },
        {
            language: 'typescript',
            component: 'DayjsAdapterOptionsExampleComponent',
            code: getAssetFromModuleAssets(dayjsAdapterOptionsSrcTs),
            fileName: 'dayjs-adapter-options-example'
        }
    ];

    dayjsDatetimeFormats: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dayjsDatetimeFormatsSrcHtml),
            fileName: 'dayjs-datetime-formats-example'
        },
        {
            language: 'typescript',
            component: 'DayjsDatetimeFormatsExampleComponent',
            code: getAssetFromModuleAssets(dayjsDatetimeFormatsSrcTs),
            fileName: 'dayjs-datetime-formats-example'
        }
    ];
}
