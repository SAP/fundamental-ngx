import { Component, ViewEncapsulation } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const defaultExampleHtml = 'default-example/default-example.component.html';
const defaultExampleTs = 'default-example/default-example.component.ts';

@Component({
    selector: 'app-tabs',
    templateUrl: './focusable-list-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DocsSectionTitleComponent, ComponentExampleComponent, DefaultExampleComponent, CodeExampleComponent]
})
export class FocusableListDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(defaultExampleHtml),
            language: 'html',
            fileName: 'focusable-list-default-example',
            component: 'FocusableListDefaultExample'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'ts',
            fileName: 'focusable-list-default-example',
            component: 'FocusableListDefaultExample'
        }
    ];

    constructor() {}
}
