import { Component } from '@angular/core';
import { getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const defaultExampleHtml = 'basic-example/basic-example.component.html';
const defaultExampleTs = 'basic-example/basic-example.component.ts';

const providerExampleHtml = 'provider-example/provider-example.component.html';
const providerExampleTs = 'provider-example/provider-example.component.ts';
const providerExampleDirectiveTs = 'provider-example/usage-with-provider.directive.ts';

@Component({
    templateUrl: './fn-clicked-docs.component.html'
})
export class FnClickedDocsComponent {
    basicExample = [
        {
            code: getAssetFromModuleAssets(defaultExampleHtml),
            language: 'html',
            fileName: 'fn-clicked-basic-example',
            component: 'FnClickedBasicExample'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'ts',
            fileName: 'fn-clicked-basic-example',
            component: 'FnClickedBasicExample'
        }
    ];
    providerExample = [
        {
            code: getAssetFromModuleAssets(providerExampleHtml),
            language: 'html',
            fileName: 'fn-clicked-provider-example',
            component: 'FnClickedProviderExample'
        },
        {
            code: getAssetFromModuleAssets(providerExampleTs),
            language: 'ts',
            fileName: 'fn-clicked-provider-example',
            component: 'FnClickedProviderExample'
        },
        {
            code: getAssetFromModuleAssets(providerExampleDirectiveTs),
            language: 'ts',
            fileName: 'fn-clicked-provider-directive-example',
            component: 'FnClickedProviderDirectiveExample'
        }
    ];
}
