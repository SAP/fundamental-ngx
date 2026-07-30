import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { AutofocusSample } from './examples/autofocus-sample';
import { InputExample } from './examples/input-sample';
import { InputInteractiveIconsSample } from './examples/interactive-icons-sample';

const basicSampleHtml = 'input-sample.html';
const basicSampleTs = 'input-sample.ts';
const autofocusSampleHtml = 'autofocus-sample.html';
const autofocusSampleTs = 'autofocus-sample.ts';
const interactiveIconsSampleHtml = 'interactive-icons-sample.html';
const interactiveIconsSampleTs = 'interactive-icons-sample.ts';

@Component({
    selector: 'ui5-input-docs',
    templateUrl: './input-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        SeparatorComponent,
        InputExample,
        AutofocusSample,
        InputInteractiveIconsSample
    ]
})
export class InputDocs {
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'input-example'
        },
        {
            language: 'typescript',
            component: 'InputExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'input-example'
        }
    ]);

    private readonly autofocusExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(autofocusSampleHtml),
            originalFileName: 'autofocus-sample'
        },
        {
            language: 'typescript',
            component: 'AutofocusSample',
            code: getAssetFromModuleAssets(autofocusSampleTs),
            originalFileName: 'autofocus-sample'
        }
    ]);

    readonly examples = computed(() => this.exampleFiles());
    readonly autofocusExamples = computed(() => this.autofocusExampleFiles());

    private readonly interactiveIconsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(interactiveIconsSampleHtml),
            originalFileName: 'input-interactive-icons-sample'
        },
        {
            language: 'typescript',
            component: 'InputInteractiveIconsSample',
            code: getAssetFromModuleAssets(interactiveIconsSampleTs),
            originalFileName: 'input-interactive-icons-sample'
        }
    ]);

    readonly interactiveIconsExamples = computed(() => this.interactiveIconsExampleFiles());
}
