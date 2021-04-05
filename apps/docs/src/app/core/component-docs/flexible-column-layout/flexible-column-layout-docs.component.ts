import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as defaultFlexibleColumnLayoutHtml from '!raw-loader!./examples/default/flexible-column-layout-example.component.html';
import * as defaultFlexibleColumnLayoutTs from '!raw-loader!./examples/default/flexible-column-layout-example.component.ts';
import * as defaultFlexibleColumnLayoutScss from '!raw-loader!./examples/default/flexible-column-layout-example.component.scss';

import * as flexibleColumnLayoutDynamicPageHtml from '!raw-loader!./examples/dynamic-page/flexible-column-layout-dynamic-page-example.component.html';
import * as flexibleColumnLayoutDynamicPageTs from '!raw-loader!./examples/dynamic-page/flexible-column-layout-dynamic-page-example.component.ts';
import * as flexibleColumnLayoutDynamicPageScss from '!raw-loader!./examples/dynamic-page/flexible-column-layout-dynamic-page-example.component.scss';

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
