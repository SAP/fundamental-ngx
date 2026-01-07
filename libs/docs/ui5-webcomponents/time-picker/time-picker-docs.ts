import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TimePickerBasicSample } from './examples/basic-sample';
import { TimePickerEventsSample } from './examples/events';
import { TimePickerFormatPatternsSample } from './examples/format-patterns';
import { TimePickerStatesSample } from './examples/states';
import { TimePickerValueStatesSample } from './examples/value-states';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const formatPatternsHtml = 'format-patterns.html';
const formatPatternsTs = 'format-patterns.ts';
const valueStatesHtml = 'value-states.html';
const valueStatesTs = 'value-states.ts';
const statesHtml = 'states.html';
const statesTs = 'states.ts';
const eventsHtml = 'events.html';
const eventsTs = 'events.ts';

@Component({
    selector: 'ui5-time-picker-docs',
    templateUrl: './time-picker-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        TimePickerBasicSample,
        TimePickerFormatPatternsSample,
        TimePickerValueStatesSample,
        TimePickerStatesSample,
        TimePickerEventsSample
    ]
})
export class TimePickerDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'TimePickerBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly formatPatternsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(formatPatternsHtml),
            originalFileName: 'format-patterns'
        },
        {
            language: 'typescript',
            component: 'TimePickerFormatPatternsSample',
            code: getAssetFromModuleAssets(formatPatternsTs),
            originalFileName: 'format-patterns'
        }
    ]);

    private readonly valueStatesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(valueStatesHtml),
            originalFileName: 'value-states'
        },
        {
            language: 'typescript',
            component: 'TimePickerValueStatesSample',
            code: getAssetFromModuleAssets(valueStatesTs),
            originalFileName: 'value-states'
        }
    ]);

    private readonly statesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(statesHtml),
            originalFileName: 'states'
        },
        {
            language: 'typescript',
            component: 'TimePickerStatesSample',
            code: getAssetFromModuleAssets(statesTs),
            originalFileName: 'states'
        }
    ]);

    private readonly eventsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(eventsHtml),
            originalFileName: 'events'
        },
        {
            language: 'typescript',
            component: 'TimePickerEventsSample',
            code: getAssetFromModuleAssets(eventsTs),
            originalFileName: 'events'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly formatPatternsExamples = computed(() => this.formatPatternsExampleFiles());
    readonly valueStatesExamples = computed(() => this.valueStatesExampleFiles());
    readonly statesExamples = computed(() => this.statesExampleFiles());
    readonly eventsExamples = computed(() => this.eventsExampleFiles());
}
