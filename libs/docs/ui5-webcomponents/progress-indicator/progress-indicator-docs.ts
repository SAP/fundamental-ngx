import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicProgressIndicatorExample } from './examples/basic-progress-indicator';
import { CustomDisplayProgressIndicatorExample } from './examples/custom-display-progress-indicator';
import { ValueStateProgressIndicatorExample } from './examples/value-state-progress-indicator';

const basicExampleHtml = 'basic-progress-indicator.html';
const basicExampleTs = 'basic-progress-indicator.ts';
const valueStateExampleHtml = 'value-state-progress-indicator.html';
const valueStateExampleTs = 'value-state-progress-indicator.ts';
const customDisplayExampleHtml = 'custom-display-progress-indicator.html';
const customDisplayExampleTs = 'custom-display-progress-indicator.ts';

@Component({
    selector: 'ui5-progress-indicator-docs',
    templateUrl: './progress-indicator-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicProgressIndicatorExample,
        ValueStateProgressIndicatorExample,
        CustomDisplayProgressIndicatorExample
    ]
})
export class ProgressIndicatorDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicExampleHtml),
            originalFileName: 'basic-progress-indicator'
        },
        {
            language: 'typescript',
            component: 'BasicProgressIndicatorExample',
            code: getAssetFromModuleAssets(basicExampleTs),
            originalFileName: 'basic-progress-indicator'
        }
    ]);

    private readonly customDisplayExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(customDisplayExampleHtml),
            originalFileName: 'custom-display-progress-indicator'
        },
        {
            language: 'typescript',
            component: 'CustomDisplayProgressIndicatorExample',
            code: getAssetFromModuleAssets(customDisplayExampleTs),
            originalFileName: 'custom-display-progress-indicator'
        }
    ]);

    private readonly valueStateExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(valueStateExampleHtml),
            originalFileName: 'value-state-progress-indicator'
        },
        {
            language: 'typescript',
            component: 'ValueStateProgressIndicatorExample',
            code: getAssetFromModuleAssets(valueStateExampleTs),
            originalFileName: 'value-state-progress-indicator'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly customDisplayExamples = computed(() => this.customDisplayExampleFiles());
    readonly valueStateExamples = computed(() => this.valueStateExampleFiles());
}
