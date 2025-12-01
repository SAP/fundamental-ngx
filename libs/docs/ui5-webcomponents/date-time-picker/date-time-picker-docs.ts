import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicSample } from './examples/basic-sample';
import { EventsSample } from './examples/events-sample';
import { FormatsSample } from './examples/formats-sample';
import { MinMaxSample } from './examples/min-max-sample';
import { TimezonesSample } from './examples/timezones';
import { ValueStateSample } from './examples/value-state-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const valueStateSampleTs = 'value-state-sample.ts';
const valueStateSampleHtml = 'value-state-sample.html';
const minMaxSampleTs = 'min-max-sample.ts';
const minMaxSampleHtml = 'min-max-sample.html';
const formatsSampleTs = 'formats-sample.ts';
const formatsSampleHtml = 'formats-sample.html';
const eventsSampleTs = 'events-sample.ts';
const eventsSampleHtml = 'events-sample.html';
const accessibilitySampleTs = 'accessibility-sample.ts';
const accessibilitySampleHtml = 'accessibility-sample.html';
const timezonesSampleTs = 'timezones.ts';
const timezonesSampleHtml = 'timezones.html';

@Component({
    selector: 'ui5-doc-date-time-picker',
    templateUrl: './date-time-picker-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicSample,
        ValueStateSample,
        MinMaxSample,
        FormatsSample,
        EventsSample,
        TimezonesSample
    ]
})
export class DateTimePickerDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly valueStateExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(valueStateSampleTs),
            originalFileName: 'value-state-sample',
            component: 'ValueStateSample',
            typescriptFileCode: getAssetFromModuleAssets(valueStateSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(valueStateSampleHtml),
            originalFileName: 'value-state-sample'
        }
    ]);

    private readonly minMaxExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(minMaxSampleTs),
            originalFileName: 'min-max-sample',
            component: 'MinMaxSample',
            typescriptFileCode: getAssetFromModuleAssets(minMaxSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(minMaxSampleHtml),
            originalFileName: 'min-max-sample'
        }
    ]);

    private readonly formatsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(formatsSampleTs),
            originalFileName: 'formats-sample',
            component: 'FormatsSample',
            typescriptFileCode: getAssetFromModuleAssets(formatsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(formatsSampleHtml),
            originalFileName: 'formats-sample'
        }
    ]);

    private readonly eventsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(eventsSampleTs),
            originalFileName: 'events-sample',
            component: 'EventsSample',
            typescriptFileCode: getAssetFromModuleAssets(eventsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(eventsSampleHtml),
            originalFileName: 'events-sample'
        }
    ]);

    private readonly accessibilityExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(accessibilitySampleTs),
            originalFileName: 'accessibility-sample',
            component: 'AccessibilitySample',
            typescriptFileCode: getAssetFromModuleAssets(accessibilitySampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(accessibilitySampleHtml),
            originalFileName: 'accessibility-sample'
        }
    ]);

    private readonly timezonesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timezonesSampleTs),
            originalFileName: 'timezones',
            component: 'TimezonesSample',
            typescriptFileCode: getAssetFromModuleAssets(timezonesSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(timezonesSampleHtml),
            originalFileName: 'timezones'
        }
    ]);

    readonly basicExample = computed(() => this.basicExampleFiles());
    readonly valueStateExample = computed(() => this.valueStateExampleFiles());
    readonly minMaxExample = computed(() => this.minMaxExampleFiles());
    readonly formatsExample = computed(() => this.formatsExampleFiles());
    readonly eventsExample = computed(() => this.eventsExampleFiles());
    readonly accessibilityExample = computed(() => this.accessibilityExampleFiles());
    readonly timezonesExample = computed(() => this.timezonesExampleFiles());
}
