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

const basicSampleHtml = 'input-sample.html';
const basicSampleTs = 'input-sample.ts';
const autofocusSampleHtml = 'autofocus-sample.html';
const autofocusSampleTs = 'autofocus-sample.ts';

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
        AutofocusSample
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
}
