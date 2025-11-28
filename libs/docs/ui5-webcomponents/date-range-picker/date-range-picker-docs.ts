import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DateRangePickerBasicSample } from './examples/basic-sample';
import { DateRangePickerComponentStatesSample } from './examples/component-states-sample';
import { DateRangePickerDelimiterSample } from './examples/delimiter-sample';
import { DateRangePickerFormatSample } from './examples/format-sample';
import { DateRangePickerMinMaxSample } from './examples/min-max-sample';
import { DateRangePickerValueStateSample } from './examples/value-state-sample';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const delimiterSampleHtml = 'delimiter-sample.html';
const delimiterSampleTs = 'delimiter-sample.ts';
const formatSampleHtml = 'format-sample.html';
const formatSampleTs = 'format-sample.ts';
const minMaxSampleHtml = 'min-max-sample.html';
const minMaxSampleTs = 'min-max-sample.ts';
const valueStateSampleHtml = 'value-state-sample.html';
const valueStateSampleTs = 'value-state-sample.ts';
const componentStatesSampleHtml = 'component-states-sample.html';
const componentStatesSampleTs = 'component-states-sample.ts';

@Component({
    selector: 'ui5-date-range-picker-docs',
    templateUrl: './date-range-picker-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        DateRangePickerBasicSample,
        DateRangePickerDelimiterSample,
        DateRangePickerFormatSample,
        DateRangePickerMinMaxSample,
        DateRangePickerValueStateSample,
        DateRangePickerComponentStatesSample
    ]
})
export class DateRangePickerDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'DateRangePickerBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-sample'
        }
    ]);

    private readonly delimiterExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(delimiterSampleHtml),
            fileName: 'delimiter-sample'
        },
        {
            language: 'typescript',
            component: 'DateRangePickerDelimiterSample',
            code: getAssetFromModuleAssets(delimiterSampleTs),
            fileName: 'delimiter-sample'
        }
    ]);

    private readonly formatExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(formatSampleHtml),
            fileName: 'format-sample'
        },
        {
            language: 'typescript',
            component: 'DateRangePickerFormatSample',
            code: getAssetFromModuleAssets(formatSampleTs),
            fileName: 'format-sample'
        }
    ]);

    private readonly minMaxExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(minMaxSampleHtml),
            fileName: 'min-max-sample'
        },
        {
            language: 'typescript',
            component: 'DateRangePickerMinMaxSample',
            code: getAssetFromModuleAssets(minMaxSampleTs),
            fileName: 'min-max-sample'
        }
    ]);

    private readonly valueStateExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(valueStateSampleHtml),
            fileName: 'value-state-sample'
        },
        {
            language: 'typescript',
            component: 'DateRangePickerValueStateSample',
            code: getAssetFromModuleAssets(valueStateSampleTs),
            fileName: 'value-state-sample'
        }
    ]);

    private readonly componentStatesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(componentStatesSampleHtml),
            fileName: 'component-states-sample'
        },
        {
            language: 'typescript',
            component: 'DateRangePickerComponentStatesSample',
            code: getAssetFromModuleAssets(componentStatesSampleTs),
            fileName: 'component-states-sample'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly delimiterExamples = computed(() => this.delimiterExampleFiles());
    readonly formatExamples = computed(() => this.formatExampleFiles());
    readonly minMaxExamples = computed(() => this.minMaxExampleFiles());
    readonly valueStateExamples = computed(() => this.valueStateExampleFiles());
    readonly componentStatesExamples = computed(() => this.componentStatesExampleFiles());
}
