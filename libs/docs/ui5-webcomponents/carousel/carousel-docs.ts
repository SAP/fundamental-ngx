import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { CarouselExample } from './examples/carousel-sample';

const basicSampleHtml = 'carousel-sample.html';
const basicSampleTs = 'carousel-sample.ts';

@Component({
    selector: 'ui5-carousel-docs',
    templateUrl: './carousel-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        CarouselExample
    ]
})
export class CarouselDocs {
    // Using Angular 20 signal for reactive example files
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'carousel-example'
        },
        {
            language: 'typescript',
            component: 'CarouselExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'carousel-example'
        }
    ]);

    // Computed property for template binding (Angular 20 feature)
    readonly examples = computed(() => this.exampleFiles());
}
