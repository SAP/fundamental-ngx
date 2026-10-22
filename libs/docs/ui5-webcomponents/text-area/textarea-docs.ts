import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TextAreaBasicSample } from './examples/basic-sample';
import { TextAreaCharacterCounterModesSample } from './examples/character-counter-modes-sample';
import { TextAreaEventsSample } from './examples/events';
import { TextAreaGrowingSample } from './examples/growing';
import { TextAreaValueStatesSample } from './examples/value-states';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const growingHtml = 'growing.html';
const growingTs = 'growing.ts';
const characterCounterModesHtml = 'character-counter-modes-sample.html';
const characterCounterModesTs = 'character-counter-modes-sample.ts';
const valueStatesHtml = 'value-states.html';
const valueStatesTs = 'value-states.ts';
const eventsHtml = 'events.html';
const eventsTs = 'events.ts';

@Component({
    selector: 'ui5-textarea-docs',
    templateUrl: './textarea-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        TextAreaBasicSample,
        TextAreaGrowingSample,
        TextAreaValueStatesSample,
        TextAreaCharacterCounterModesSample,
        TextAreaEventsSample
    ]
})
export class TextAreaDocs {
    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly growingExamples = computed(() => this.growingExampleFiles());
    readonly characterCounterModesExamples = computed(() => this.characterCounterModesExampleFiles());
    readonly valueStatesExamples = computed(() => this.valueStatesExampleFiles());
    readonly eventsExamples = computed(() => this.eventsExampleFiles());

    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'TextAreaBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly growingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(growingHtml),
            originalFileName: 'growing'
        },
        {
            language: 'typescript',
            component: 'TextAreaGrowingSample',
            code: getAssetFromModuleAssets(growingTs),
            originalFileName: 'growing'
        }
    ]);

    private readonly characterCounterModesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(characterCounterModesHtml),
            originalFileName: 'character-counter-modes-sample'
        },
        {
            language: 'typescript',
            component: 'TextAreaCharacterCounterModesSample',
            code: getAssetFromModuleAssets(characterCounterModesTs),
            originalFileName: 'character-counter-modes-sample'
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
            component: 'TextAreaValueStatesSample',
            code: getAssetFromModuleAssets(valueStatesTs),
            originalFileName: 'value-states'
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
            component: 'TextAreaEventsSample',
            code: getAssetFromModuleAssets(eventsTs),
            originalFileName: 'events'
        }
    ]);
}
