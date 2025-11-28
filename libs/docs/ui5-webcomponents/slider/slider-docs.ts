import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { SliderExample } from './examples/slider-sample';

const basicSampleHtml = 'slider-sample.html';
const basicSampleTs = 'slider-sample.ts';

@Component({
    selector: 'ui5-slider-docs',
    templateUrl: './slider-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        SliderExample
    ]
})
export class SliderDocsComponent {
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'slider-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            component: 'SliderExample',
            originalFileName: 'slider-sample'
        }
    ]);

    readonly examples = computed(() => this.exampleFiles());
}
