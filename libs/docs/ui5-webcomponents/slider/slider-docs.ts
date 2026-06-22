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
import { CustomTickmarksSample } from './examples/custom-tickmarks-sample';
import { SliderExample } from './examples/slider-sample';

const basicSampleHtml = 'slider-sample.html';
const basicSampleTs = 'slider-sample.ts';
const customTickmarksHtml = 'custom-tickmarks-sample.html';
const customTickmarksTs = 'custom-tickmarks-sample.ts';

@Component({
    selector: 'ui5-slider-docs',
    templateUrl: './slider-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        SeparatorComponent,
        SliderExample,
        CustomTickmarksSample
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

    private readonly customTickmarksFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(customTickmarksHtml),
            originalFileName: 'custom-tickmarks-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customTickmarksTs),
            component: 'CustomTickmarksSample',
            originalFileName: 'custom-tickmarks-sample'
        }
    ]);

    readonly examples = computed(() => this.exampleFiles());
    readonly customTickmarksExamples = computed(() => this.customTickmarksFiles());
}
