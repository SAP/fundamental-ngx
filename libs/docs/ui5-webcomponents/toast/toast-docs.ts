import { Component, computed, inject, Injector, runInInjectionContext } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ToastBasicSample } from './examples/basic-sample';
import { ToastDurationSample } from './examples/duration';
import { ToastPlacementSample } from './examples/placement';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const placementHtml = 'placement.html';
const placementTs = 'placement.ts';
const durationHtml = 'duration.html';
const durationTs = 'duration.ts';

@Component({
    selector: 'ui5-toast-docs',
    templateUrl: './toast-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        ToastBasicSample,
        ToastPlacementSample,
        ToastDurationSample
    ]
})
export class ToastDocs {
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
            component: 'ToastBasicSample'
        }
    ]);

    placementSampleFiles = computed((): ExampleFile[] => [
        {
            language: 'html',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(placementHtml)),
            originalFileName: 'placement'
        },
        {
            language: 'typescript',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(placementTs)),
            originalFileName: 'placement',
            component: 'ToastPlacementSample'
        }
    ]);

    durationSampleFiles = computed((): ExampleFile[] => [
        {
            language: 'html',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(durationHtml)),
            originalFileName: 'duration'
        },
        {
            language: 'typescript',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(durationTs)),
            originalFileName: 'duration',
            component: 'ToastDurationSample'
        }
    ]);
}
