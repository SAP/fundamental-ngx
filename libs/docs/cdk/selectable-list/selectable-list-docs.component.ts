import { Component, ViewEncapsulation } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { AdvancedUsageComponent } from './examples/advanced-usage/advanced-usage.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { ReadonlyExampleComponent } from './examples/readonly-example/readonly-example.component';

const defaultExampleHtml = 'default-example/default-example.component.html';
const defaultExampleTs = 'default-example/default-example.component.ts';

const advancedExampleHtml = 'advanced-usage/advanced-usage.component.html';
const advancedExampleTs = 'advanced-usage/advanced-usage.component.ts';
const advancedExampleCustomDirTs = 'advanced-usage/custom-selectable-item.directive.ts';

const readonlyExampleHtml = 'readonly-example/readonly-example.component.html';
const readonlyExampleTs = 'readonly-example/readonly-example.component.ts';

@Component({
    selector: 'app-tabs',
    templateUrl: './selectable-list-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        DefaultExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        AdvancedUsageComponent,
        ReadonlyExampleComponent
    ]
})
export class SelectableListDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(defaultExampleHtml),
            language: 'html',
            fileName: 'default-example'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'typescript',
            fileName: 'default-example',
            selector: 'selectable-list-default-example',
            component: 'DefaultExampleComponent'
        }
    ];

    readonlyExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(readonlyExampleHtml),
            language: 'html',
            fileName: 'readonly-example'
        },
        {
            code: getAssetFromModuleAssets(readonlyExampleTs),
            language: 'typescript',
            fileName: 'readonly-example',
            selector: 'selectable-list-readonly-example',
            component: 'ReadonlyExampleComponent'
        }
    ];

    advancedExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(advancedExampleHtml),
            language: 'html',
            fileName: 'advanced-usage'
        },
        {
            code: getAssetFromModuleAssets(advancedExampleTs),
            language: 'typescript',
            fileName: 'advanced-usage',
            selector: 'selectable-list-advanced-usage',
            component: 'SelectableListAdvancedExample'
        },
        {
            code: getAssetFromModuleAssets(advancedExampleCustomDirTs),
            language: 'typescript',
            fileName: 'custom-selectable-item',
            directive: true
        }
    ];

    constructor() {}
}
