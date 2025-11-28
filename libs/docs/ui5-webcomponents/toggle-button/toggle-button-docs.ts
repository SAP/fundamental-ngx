import { Component, computed, inject, Injector, runInInjectionContext } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ToggleButtonBasicSample } from './examples/basic-sample';
import { ToggleButtonDesignsSample } from './examples/designs';
import { ToggleButtonIconsSample } from './examples/icons';
import { ToggleButtonInteractiveSample } from './examples/interactive';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const designsHtml = 'designs.html';
const designsTs = 'designs.ts';
const iconsHtml = 'icons.html';
const iconsTs = 'icons.ts';
const interactiveHtml = 'interactive.html';
const interactiveTs = 'interactive.ts';

@Component({
    selector: 'ui5-toggle-button-docs',
    templateUrl: './toggle-button-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        ToggleButtonBasicSample,
        ToggleButtonDesignsSample,
        ToggleButtonIconsSample,
        ToggleButtonInteractiveSample
    ]
})
export class ToggleButtonDocs {
    private injector = inject(Injector);

    basicSampleFiles = computed((): ExampleFile[] => [
        {
            language: 'html',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(basicSampleHtml)),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(basicSampleTs)),
            originalFileName: 'basic-sample',
            component: 'ToggleButtonBasicSample'
        }
    ]);

    designsSampleFiles = computed((): ExampleFile[] => [
        {
            language: 'html',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(designsHtml)),
            originalFileName: 'designs'
        },
        {
            language: 'typescript',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(designsTs)),
            originalFileName: 'designs',
            component: 'ToggleButtonDesignsSample'
        }
    ]);

    iconsSampleFiles = computed((): ExampleFile[] => [
        {
            language: 'html',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(iconsHtml)),
            originalFileName: 'icons'
        },
        {
            language: 'typescript',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(iconsTs)),
            originalFileName: 'icons',
            component: 'ToggleButtonIconsSample'
        }
    ]);

    interactiveSampleFiles = computed((): ExampleFile[] => [
        {
            language: 'html',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(interactiveHtml)),
            originalFileName: 'interactive'
        },
        {
            language: 'typescript',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(interactiveTs)),
            originalFileName: 'interactive',
            component: 'ToggleButtonInteractiveSample'
        }
    ]);
}
