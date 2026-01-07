import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { NavigationLayoutSample } from './examples/navigation-layout-sample';

const basicSampleHtml = 'navigation-layout-sample.html';
const basicSampleTs = 'navigation-layout-sample.ts';

@Component({
    selector: 'ui5-navigation-layout-docs',
    templateUrl: 'navigation-layout-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        NavigationLayoutSample
    ]
})
export class NavigationLayoutDocs {
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'navigation-layout-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'navigation-layout-sample',
            component: 'NavigationLayoutSample'
        }
    ]);
    readonly examples = computed(() => this.exampleFiles());
}
