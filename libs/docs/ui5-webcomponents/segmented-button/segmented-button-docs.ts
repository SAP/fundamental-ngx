import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { SegmentedButtonExample } from './examples/segmented-button-sample';

const basicSampleHtml = 'segmented-button-sample.html';
const basicSampleTs = 'segmented-button-sample.ts';

@Component({
    selector: 'ui5-segmented-button-docs',
    templateUrl: './segmented-button-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        SegmentedButtonExample
    ]
})
export class SegmentedButtonDocs {
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'segmented-button-example'
        },
        {
            language: 'typescript',
            component: 'SegmentedButtonExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'segmented-button-example'
        }
    ]);

    readonly examples = computed(() => this.exampleFiles());
}
