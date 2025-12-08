import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { IllustratedMessageSample } from './examples/illustrated-message-sample';

const basicSampleHtml = 'illustrated-message-sample.html';
const basicSampleTs = 'illustrated-message-sample.ts';

@Component({
    selector: 'ui5-illustrated-message-docs',
    templateUrl: './illustrated-message-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        IllustratedMessageSample
    ]
})
export class IllustratedMessageDocs {
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'illustrated-message-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'illustrated-message-sample',
            component: 'IllustratedMessageSample'
        }
    ]);
    readonly examples = computed(() => this.exampleFiles());
}
