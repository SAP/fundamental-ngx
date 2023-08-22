import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicExampleComponent } from './examples/basic-example/basic-example.component';
import { ProviderExampleComponent } from './examples/provider-example/provider-example.component';

const defaultExampleHtml = 'basic-example/basic-example.component.html';
const defaultExampleTs = 'basic-example/basic-example.component.ts';

const providerExampleHtml = 'provider-example/provider-example.component.html';
const providerExampleTs = 'provider-example/provider-example.component.ts';
const providerExampleDirectiveTs = 'provider-example/usage-with-provider.directive.ts';

@Component({
    templateUrl: './clicked-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        BasicExampleComponent,
        CodeExampleComponent,
        ProviderExampleComponent
    ]
})
export class ClickedDocsComponent {
    basicExample = [
        {
            code: getAssetFromModuleAssets(defaultExampleHtml),
            language: 'html',
            fileName: 'clicked-basic-example',
            component: 'ClickedBasicExample'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'typescript',
            fileName: 'clicked-basic-example',
            component: 'ClickedBasicExample'
        }
    ];
    providerExample = [
        {
            code: getAssetFromModuleAssets(providerExampleHtml),
            language: 'html',
            fileName: 'clicked-provider-example',
            component: 'ClickedProviderExample'
        },
        {
            code: getAssetFromModuleAssets(providerExampleTs),
            language: 'typescript',
            fileName: 'clicked-provider-example',
            component: 'ClickedProviderExample'
        },
        {
            code: getAssetFromModuleAssets(providerExampleDirectiveTs),
            language: 'typescript',
            fileName: 'clicked-provider-directive-example',
            component: 'ClickedProviderDirectiveExample'
        }
    ];
}
