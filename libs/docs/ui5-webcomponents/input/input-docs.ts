import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { InputExample } from './examples/input-sample';

const basicSampleHtml = 'input-sample.html';
const basicSampleTs = 'input-sample.ts';

@Component({
    selector: 'ui5-input-docs',
    templateUrl: './input-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        InputExample
    ]
})
export class InputDocs {
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'input-example'
        },
        {
            language: 'typescript',
            component: 'InputExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'input-example'
        }
    ]);

    readonly examples = computed(() => this.exampleFiles());
}
