import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
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
    basicExample: ExampleFile[] = [
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
    providerExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(providerExampleHtml),
            language: 'html',
            fileName: 'provider-example'
        },
        {
            code: getAssetFromModuleAssets(providerExampleTs),
            language: 'typescript',
            fileName: 'provider-example',
            selector: 'clicked-provider-example',
            component: 'ProviderExampleComponent'
        },
        {
            code: getAssetFromModuleAssets(providerExampleDirectiveTs),
            language: 'typescript',
            directive: true,
            fileName: 'usage-with-provider'
        }
    ];
}
