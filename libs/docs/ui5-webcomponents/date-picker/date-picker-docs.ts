import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DatePickerBasicSample } from './examples/basic-sample';
import { DatePickerCalendarTypesSample } from './examples/calendar-types-sample';
import { DatePickerComponentStatesSample } from './examples/component-states-sample';
import { DatePickerFormatSample } from './examples/format-sample';
import { DatePickerMinMaxSample } from './examples/min-max-sample';
import { DatePickerValueStateSample } from './examples/value-state-sample';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const formatSampleHtml = 'format-sample.html';
const formatSampleTs = 'format-sample.ts';
const minMaxSampleHtml = 'min-max-sample.html';
const minMaxSampleTs = 'min-max-sample.ts';
const valueStateSampleHtml = 'value-state-sample.html';
const valueStateSampleTs = 'value-state-sample.ts';
const componentStatesSampleHtml = 'component-states-sample.html';
const componentStatesSampleTs = 'component-states-sample.ts';
const calendarTypesSampleHtml = 'calendar-types-sample.html';
const calendarTypesSampleTs = 'calendar-types-sample.ts';

@Component({
    selector: 'ui5-date-picker-docs',
    templateUrl: './date-picker-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        DatePickerBasicSample,
        DatePickerFormatSample,
        DatePickerMinMaxSample,
        DatePickerValueStateSample,
        DatePickerComponentStatesSample,
        DatePickerCalendarTypesSample
    ]
})
export class DatePickerDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'DatePickerBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-sample'
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
            component: 'DatePickerFormatSample',
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
            component: 'DatePickerMinMaxSample',
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
            component: 'DatePickerValueStateSample',
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
            component: 'DatePickerComponentStatesSample',
            code: getAssetFromModuleAssets(componentStatesSampleTs),
            fileName: 'component-states-sample'
        }
    ]);

    private readonly calendarTypesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(calendarTypesSampleHtml),
            fileName: 'calendar-types-sample'
        },
        {
            language: 'typescript',
            component: 'DatePickerCalendarTypesSample',
            code: getAssetFromModuleAssets(calendarTypesSampleTs),
            fileName: 'calendar-types-sample'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly formatExamples = computed(() => this.formatExampleFiles());
    readonly minMaxExamples = computed(() => this.minMaxExampleFiles());
    readonly valueStateExamples = computed(() => this.valueStateExampleFiles());
    readonly componentStatesExamples = computed(() => this.componentStatesExampleFiles());
    readonly calendarTypesExamples = computed(() => this.calendarTypesExampleFiles());
}
