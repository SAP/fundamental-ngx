import { Component, ViewEncapsulation } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { ShortRowsExampleComponent } from './examples/short-rows-example/short-rows-example.component';

const defaultExampleHtml = 'default-example/default-example.component.html';
const defaultExampleTs = 'default-example/default-example.component.ts';

const shortRowsExampleHtml = 'short-rows-example/short-rows-example.component.html';
const shortRowsExampleTs = 'short-rows-example/short-rows-example.component.ts';

@Component({
    selector: 'app-tabs',
    templateUrl: './focusable-grid-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        DefaultExampleComponent,
        CodeExampleComponent,
        ShortRowsExampleComponent
    ]
})
export class FocusableGridDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(defaultExampleHtml),
            language: 'html',
            fileName: 'default-example'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'typescript',
            selector: 'focusable-grid-default-example',
            fileName: 'default-example',
            component: 'DefaultExampleComponent'
        }
    ];

    shortRows: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(shortRowsExampleHtml),
            language: 'html',
            fileName: 'short-rows-example'
        },
        {
            code: getAssetFromModuleAssets(shortRowsExampleTs),
            language: 'typescript',
            selector: 'focusable-grid-short-rows-default-example',
            fileName: 'short-rows-example',
            component: 'ShortRowsExampleComponent'
        }
    ];

    constructor() {}
}
