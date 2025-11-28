import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { CardExample } from './examples/card-sample';

const basicSampleHtml = 'card-sample.html';
const basicSampleTs = 'card-sample.ts';

@Component({
    selector: 'ui5-card-docs',
    templateUrl: './card-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        CardExample
    ]
})
export class CardDocs {
    // Using Angular 20 signal for reactive example files
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'card-example'
        },
        {
            language: 'typescript',
            component: 'CardExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'card-example'
        }
    ]);

    readonly examples = computed(() => this.exampleFiles());
}
