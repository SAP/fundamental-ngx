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
import { TimePickerAllowNullExampleComponent } from './examples/time-picker-allow-null-example.component';
import { TimePickerCompactExampleComponent } from './examples/time-picker-compact-example.component';
import { TimePickerDisabledExampleComponent } from './examples/time-picker-disabled-example.component';
import { TimePickerExampleComponent } from './examples/time-picker-example.component';
import { TimePickerFormExampleComponent } from './examples/time-picker-form-example.component';
import { TimePickerFormatExampleComponent } from './examples/time-picker-format-example.component';
import { TimePickerLocaleExampleComponent } from './examples/time-picker-locale-example/time-picker-locale-example.component';
import { TimePickerMinuteStepExample } from './examples/time-picker-minute-step-example';

const timePickerFormScssSrc = 'time-picker-form-example.component.scss';

const timePickerSrc = 'time-picker-example.component.html';
const timePickerFormatSrc = 'time-picker-format-example.component.html';
const timePickerFormatSrcTs = 'time-picker-format-example.component.ts';
const timePickerDisabledSrc = 'time-picker-disabled-example.component.html';
const timePickerCompactSrc = 'time-picker-compact-example.component.html';
const timePickerNullSrc = 'time-picker-allow-null-example.component.html';
const timePickerSrcTs = 'time-picker-example.component.ts';
const timePickerDisabledSrcTs = 'time-picker-disabled-example.component.ts';
const timePickerCompactSrcTs = 'time-picker-compact-example.component.ts';
const timePickerNullSrcTs = 'time-picker-allow-null-example.component.ts';
const timePickerLocaleHtmlSrc = 'time-picker-locale-example/time-picker-locale-example.component.html';
const timePickerLocaleTsSrc = 'time-picker-locale-example/time-picker-locale-example.component.ts';
const timePickerFormHtmlSrc = 'time-picker-form-example.component.html';
const timePickerFormTsSrc = 'time-picker-form-example.component.ts';
const timePickerMinuteStepSrc = 'time-picker-minute-step-example.ts';
const timePickerMinuteStepHtmlSrc = 'time-picker-minute-step-example.html';

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        TimePickerExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        TimePickerFormatExampleComponent,
        TimePickerDisabledExampleComponent,
        TimePickerCompactExampleComponent,
        TimePickerAllowNullExampleComponent,
        TimePickerFormExampleComponent,
        TimePickerLocaleExampleComponent,
        TimePickerMinuteStepExample
    ]
})
export class TimePickerDocsComponent {
    defaultTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerSrc),
            typescriptFileCode: getAssetFromModuleAssets(timePickerSrcTs),
            fileName: 'time-picker-example',
            component: 'TimePickerExampleComponent'
        }
    ];

    formatTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerFormatSrc),
            fileName: 'time-picker-format-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timePickerFormatSrcTs),
            fileName: 'time-picker-format-example',
            component: 'TimePickerFormatExampleComponent'
        }
    ];

    disabledTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerDisabledSrc),
            typescriptFileCode: getAssetFromModuleAssets(timePickerDisabledSrcTs),
            fileName: 'time-picker-disabled-example',
            component: 'TimePickerDisabledExampleComponent'
        }
    ];

    compactTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerCompactSrc),
            typescriptFileCode: getAssetFromModuleAssets(timePickerCompactSrcTs),
            fileName: 'time-picker-compact-example',
            component: 'TimePickerCompactExampleComponent'
        }
    ];

    nullTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerNullSrc),
            typescriptFileCode: getAssetFromModuleAssets(timePickerNullSrcTs),
            fileName: 'time-picker-allow-null-example',
            component: 'TimePickerAllowNullExampleComponent'
        }
    ];

    timePickerForm: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerFormHtmlSrc),
            fileName: 'time-picker-form-example',
            scssFileCode: getAssetFromModuleAssets(timePickerFormScssSrc)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timePickerFormTsSrc),
            fileName: 'time-picker-form-example',
            component: 'TimePickerFormExampleComponent'
        }
    ];

    timePickerLocale: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerLocaleHtmlSrc),
            fileName: 'time-picker-locale-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timePickerLocaleTsSrc),
            fileName: 'time-picker-locale-example',
            component: 'TimePickerLocaleExampleComponent'
        }
    ];

    timePickerStep: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerMinuteStepHtmlSrc),
            fileName: 'time-picker-minute-step-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timePickerMinuteStepSrc),
            fileName: 'time-picker-minute-step-example',
            component: 'TimePickerMinuteStepExample'
        }
    ];
}
