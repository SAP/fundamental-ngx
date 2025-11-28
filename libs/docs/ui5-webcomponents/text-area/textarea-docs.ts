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
import { TextAreaCharacterLimitSample } from './examples/character-limit';
import { TextAreaEventsSample } from './examples/events';
import { TextAreaGrowingSample } from './examples/growing';
import { TextAreaValueStatesSample } from './examples/value-states';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const growingHtml = 'growing.html';
const growingTs = 'growing.ts';
const characterLimitHtml = 'character-limit.html';
const characterLimitTs = 'character-limit.ts';
const valueStatesHtml = 'value-states.html';
const valueStatesTs = 'value-states.ts';
const eventsHtml = 'events.html';
const eventsTs = 'events.ts';

@Component({
    selector: 'ui5-textarea-docs',
    templateUrl: './textarea-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        TextAreaBasicSample,
        TextAreaGrowingSample,
        TextAreaValueStatesSample,
        TextAreaCharacterLimitSample,
        TextAreaEventsSample
    ]
})
export class TextAreaDocs {
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

    private readonly characterLimitExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(characterLimitHtml),
            originalFileName: 'character-limit'
        },
        {
            language: 'typescript',
            component: 'TextAreaCharacterLimitSample',
            code: getAssetFromModuleAssets(characterLimitTs),
            originalFileName: 'character-limit'
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

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly growingExamples = computed(() => this.growingExampleFiles());
    readonly characterLimitExamples = computed(() => this.characterLimitExampleFiles());
    readonly valueStatesExamples = computed(() => this.valueStatesExampleFiles());
    readonly eventsExamples = computed(() => this.eventsExampleFiles());
}
