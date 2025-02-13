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

const defaultExampleHtml = 'default-example/default-example.component.html';
const defaultExampleTs = 'default-example/default-example.component.ts';

const advancedExampleHtml = 'advanced-usage/advanced-usage.component.html';
const advancedExampleTs = 'advanced-usage/advanced-usage.component.ts';
const advancedExampleCustomDirTs = 'advanced-usage/custom-selectable-item.directive.ts';

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
        AdvancedUsageComponent
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
