import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { LabelExample } from './examples/label-sample';

const basicSampleHtml = 'label-sample.html';
const basicSampleTs = 'label-sample.ts';

@Component({
    selector: 'ui5-label-docs',
    templateUrl: './label-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        LabelExample
    ]
})
export class LabelDocs {
    // Using Angular 20 signal for reactive example files
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'label-example'
        },
        {
            language: 'typescript',
            component: 'LabelExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'label-example'
        }
    ]);

    // Computed property for template binding (Angular 20 feature)
    readonly examples = computed(() => this.exampleFiles());
}
