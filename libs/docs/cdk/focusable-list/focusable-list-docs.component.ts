import { Component, ViewEncapsulation } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';

const defaultExampleHtml = 'default-example/default-example.component.html';
const defaultExampleTs = 'default-example/default-example.component.ts';

@Component({
    selector: 'app-tabs',
    templateUrl: './focusable-list-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [DocsSectionTitleComponent, ComponentExampleComponent, DefaultExampleComponent, CodeExampleComponent]
})
export class FocusableListDocsComponent {
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
            selector: 'focusable-list-default-example',
            component: 'DefaultExampleComponent'
        }
    ];
}
