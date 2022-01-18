import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import defaultFlexibleColumnLayoutHtml from '!./examples/default/flexible-column-layout-example.component.html?raw';
import defaultFlexibleColumnLayoutTs from '!./examples/default/flexible-column-layout-example.component.ts?raw';
import defaultFlexibleColumnLayoutScss from '!./examples/default/flexible-column-layout-example.component.scss?raw';

import flexibleColumnLayoutDynamicPageHtml from '!./examples/dynamic-page/flexible-column-layout-dynamic-page-example.component.html?raw';
import flexibleColumnLayoutDynamicPageTs from '!./examples/dynamic-page/flexible-column-layout-dynamic-page-example.component.ts?raw';
import flexibleColumnLayoutDynamicPageScss from '!./examples/dynamic-page/flexible-column-layout-dynamic-page-example.component.scss?raw';

@Component({
    selector: 'fd-flexible-column-layout-docs',
    templateUrl: './flexible-column-layout-docs.component.html'
})
export class FlexibleColumnLayoutDocsComponent {
    defaultFlexibleColumnLayout: ExampleFile[] = [
        {
            language: 'html',
            code: defaultFlexibleColumnLayoutHtml,
            fileName: 'flexible-column-layout-example',
            scssFileCode: defaultFlexibleColumnLayoutScss
        },
        {
            language: 'typescript',
            component: 'FlexibleColumnLayoutExampleComponent',
            code: defaultFlexibleColumnLayoutTs,
            fileName: 'flexible-column-layout-example'
        }
    ];

    flexibleColumnLayoutDynamicPage: ExampleFile[] = [
        {
            language: 'html',
            code: flexibleColumnLayoutDynamicPageHtml,
            fileName: 'flexible-column-layout-dynamic-page-example',
            scssFileCode: flexibleColumnLayoutDynamicPageScss
        },
        {
            language: 'typescript',
            component: 'FlexibleColumnLayoutDynamicPageExampleComponent',
            code: flexibleColumnLayoutDynamicPageTs,
            fileName: 'flexible-column-layout-dynamic-page-example'
        }
    ];
}
