import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { LinkExample } from './examples/link-sample';

const basicSampleHtml = 'link-sample.html';
const basicSampleTs = 'link-sample.ts';

@Component({
    selector: 'ui5-link-docs',
    templateUrl: './link-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        LinkExample
    ]
})
export class LinkDocs {
    // Using Angular 20 signal for reactive example files
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: basicSampleHtml
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: basicSampleTs
        }
    ]);

    // Computed property for template binding (Angular 20 feature)
    readonly examples = computed(() => this.exampleFiles());
}
