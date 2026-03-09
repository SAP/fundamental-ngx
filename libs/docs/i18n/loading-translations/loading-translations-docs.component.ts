import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicUsageExampleComponent } from './examples/basic-usage-example/basic-usage-example.component';
import { JsonLoadingExampleComponent } from './examples/json-loading-example/json-loading-example.component';
import { PropertiesLoadingExampleComponent } from './examples/properties-loading-example/properties-loading-example.component';

@Component({
    templateUrl: './loading-translations-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        SeparatorComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        LinkComponent,
        BasicUsageExampleComponent,
        JsonLoadingExampleComponent,
        PropertiesLoadingExampleComponent
    ]
})
export class LoadingTranslationsDocsComponent {
    basicUsageExampleFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('basic-usage-example/basic-usage-example.component.html'),
            fileName: 'basic-usage-example'
        },
        {
            language: 'typescript',
            component: 'BasicUsageExampleComponent',
            code: getAssetFromModuleAssets('basic-usage-example/basic-usage-example.component.ts'),
            fileName: 'basic-usage-example'
        }
    ];

    jsonLoadingExampleFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('json-loading-example/json-loading-example.component.html'),
            fileName: 'json-loading-example'
        },
        {
            language: 'typescript',
            component: 'JsonLoadingExampleComponent',
            code: getAssetFromModuleAssets('json-loading-example/json-loading-example.component.ts'),
            fileName: 'json-loading-example'
        }
    ];

    propertiesLoadingExampleFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('properties-loading-example/properties-loading-example.component.html'),
            fileName: 'properties-loading-example'
        },
        {
            language: 'typescript',
            component: 'PropertiesLoadingExampleComponent',
            code: getAssetFromModuleAssets('properties-loading-example/properties-loading-example.component.ts'),
            fileName: 'properties-loading-example'
        }
    ];

    supportedLanguages = [
        'Albanian',
        'Bulgarian',
        'Chinese',
        'Czech',
        'English',
        'French',
        'Georgian',
        'Hindi',
        'Italian',
        'Polish',
        'Ukrainian'
    ].join(', ');
}
