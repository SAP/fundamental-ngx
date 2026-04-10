import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    CodeSnippetComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DatetimeAdaptersDayjsBasicExampleComponent } from './examples/datetime-adapters-dayjs-basic-example.component';
import { DatetimeAdaptersDayjsFormatsExampleComponent } from './examples/datetime-adapters-dayjs-formats-example.component';
import { DatetimeAdaptersDayjsOptionsExampleComponent } from './examples/datetime-adapters-dayjs-options-example.component';
import { DatetimeAdaptersFddateExampleComponent } from './examples/datetime-adapters-fddate-example.component';
import { DatetimeAdaptersLocaleExampleComponent } from './examples/datetime-adapters-locale-example.component';
import { DatetimeAdaptersMomentExampleComponent } from './examples/datetime-adapters-moment-example.component';

const fddateExampleTs = 'datetime-adapters-fddate-example.component.ts';
const fddateExampleHtml = 'datetime-adapters-fddate-example.component.html';
const momentExampleTs = 'datetime-adapters-moment-example.component.ts';
const momentExampleHtml = 'datetime-adapters-moment-example.component.html';
const dayjsBasicExampleTs = 'datetime-adapters-dayjs-basic-example.component.ts';
const dayjsBasicExampleHtml = 'datetime-adapters-dayjs-basic-example.component.html';
const dayjsOptionsExampleTs = 'datetime-adapters-dayjs-options-example.component.ts';
const dayjsOptionsExampleHtml = 'datetime-adapters-dayjs-options-example.component.html';
const dayjsFormatsExampleTs = 'datetime-adapters-dayjs-formats-example.component.ts';
const dayjsFormatsExampleHtml = 'datetime-adapters-dayjs-formats-example.component.html';
const localeExampleTs = 'datetime-adapters-locale-example.component.ts';

@Component({
    selector: 'app-datetime-adapters',
    templateUrl: './datetime-adapters-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        CodeSnippetComponent,
        SeparatorComponent,
        DatetimeAdaptersFddateExampleComponent,
        DatetimeAdaptersMomentExampleComponent,
        DatetimeAdaptersDayjsBasicExampleComponent,
        DatetimeAdaptersDayjsOptionsExampleComponent,
        DatetimeAdaptersDayjsFormatsExampleComponent,
        DatetimeAdaptersLocaleExampleComponent
    ]
})
export class DatetimeAdaptersDocsComponent {
    fddateExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fddateExampleHtml),
            fileName: 'datetime-adapters-fddate-example'
        },
        {
            language: 'typescript',
            component: 'DatetimeAdaptersFddateExampleComponent',
            code: getAssetFromModuleAssets(fddateExampleTs),
            fileName: 'datetime-adapters-fddate-example'
        }
    ];

    momentExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(momentExampleHtml),
            fileName: 'datetime-adapters-moment-example'
        },
        {
            language: 'typescript',
            component: 'DatetimeAdaptersMomentExampleComponent',
            code: getAssetFromModuleAssets(momentExampleTs),
            fileName: 'datetime-adapters-moment-example'
        }
    ];

    dayjsBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dayjsBasicExampleHtml),
            fileName: 'datetime-adapters-dayjs-basic-example'
        },
        {
            language: 'typescript',
            component: 'DatetimeAdaptersDayjsBasicExampleComponent',
            code: getAssetFromModuleAssets(dayjsBasicExampleTs),
            fileName: 'datetime-adapters-dayjs-basic-example'
        }
    ];

    localeExample: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatetimeAdaptersLocaleExampleComponent',
            code: getAssetFromModuleAssets(localeExampleTs),
            fileName: 'datetime-adapters-locale-example'
        }
    ];

    dayjsOptionsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dayjsOptionsExampleHtml),
            fileName: 'datetime-adapters-dayjs-options-example'
        },
        {
            language: 'typescript',
            component: 'DatetimeAdaptersDayjsOptionsExampleComponent',
            code: getAssetFromModuleAssets(dayjsOptionsExampleTs),
            fileName: 'datetime-adapters-dayjs-options-example'
        }
    ];

    dayjsFormatsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dayjsFormatsExampleHtml),
            fileName: 'datetime-adapters-dayjs-formats-example'
        },
        {
            language: 'typescript',
            component: 'DatetimeAdaptersDayjsFormatsExampleComponent',
            code: getAssetFromModuleAssets(dayjsFormatsExampleTs),
            fileName: 'datetime-adapters-dayjs-formats-example'
        }
    ];

    migrationSnippet: ExampleFile = {
        code: `// Before (Moment)
import { MomentDatetimeModule } from '@fundamental-ngx/moment-adapter';
// providers: [MomentDatetimeModule]

// After (Dayjs)
import { provideDayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';
// providers: [provideDayjsDatetimeAdapter()]`,
        language: 'typescript'
    };
}
