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
    standalone: true,
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
            fileName: 'focusable-grid-default-example',
            component: 'DefaultExampleComponent'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'typescript',
            fileName: 'focusable-grid-default-example',
            component: 'DefaultExampleComponent'
        }
    ];

    shortRows: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(shortRowsExampleHtml),
            language: 'html',
            fileName: 'short-rows-example',
            component: 'ShortRowsExampleComponent'
        },
        {
            code: getAssetFromModuleAssets(shortRowsExampleTs),
            language: 'typescript',
            fileName: 'short-rows-example',
            component: 'ShortRowsExampleComponent'
        }
    ];

    constructor() {}
}
