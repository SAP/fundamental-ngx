import { Component, computed, inject, Injector, runInInjectionContext } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TokenBasicSample } from './examples/basic-sample';
import { TokenInMultiInputSample } from './examples/token-in-multi-input';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const tokenInMultiInputHtml = 'token-in-multi-input.html';
const tokenInMultiInputTs = 'token-in-multi-input.ts';

@Component({
    selector: 'ui5-token-docs',
    templateUrl: './token-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        TokenBasicSample,
        TokenInMultiInputSample
    ]
})
export class TokenDocs {
    private injector = inject(Injector);

    basicSampleFiles = computed((): ExampleFile[] => [
        {
            language: 'html',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(basicSampleHtml)),
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(basicSampleTs)),
            fileName: 'basic-sample',
            component: 'TokenBasicSample'
        }
    ]);

    tokenInMultiInputSampleFiles = computed((): ExampleFile[] => [
        {
            language: 'html',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(tokenInMultiInputHtml)),
            fileName: 'token-in-multi-input'
        },
        {
            language: 'typescript',
            code: runInInjectionContext(this.injector, () => getAssetFromModuleAssets(tokenInMultiInputTs)),
            fileName: 'token-in-multi-input',
            component: 'TokenInMultiInputSample'
        }
    ]);
}
