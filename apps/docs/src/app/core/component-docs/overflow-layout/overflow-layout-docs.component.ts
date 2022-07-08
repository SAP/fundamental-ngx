import { Component } from '@angular/core';

import overflowLayoutDefaultExampleHtml from '!./examples/default/overflow-layout-default-example.component.html?raw';
import overflowLayoutDefaultExampleTs from '!./examples/default/overflow-layout-default-example.component.ts?raw';

import overflowLayoutComplexExampleHtml from '!./examples/complex/overflow-layout-complex-example.component.html?raw';
import overflowLayoutComplexExampleTs from '!./examples/complex/overflow-layout-complex-example.component.ts?raw';
import overflowLayoutComplexExampleScss from '!./examples/complex/overflow-layout-complex-example.component.scss?raw';

import overflowLayoutVisibleItemsExampleHtml from '!./examples/always-visible/overflow-layout-always-visible-example.component.html?raw';
import overflowLayoutVisibleItemsExampleTs from '!./examples/always-visible/overflow-layout-always-visible-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-overflow-layout',
    templateUrl: './overflow-layout-docs.component.html'
})
export class OverflowLayoutDocsComponent {
    overflowLayoutDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'overflow-layout-default-example',
            code: overflowLayoutDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: overflowLayoutDefaultExampleTs,
            fileName: 'overflow-layout-default-example',
            component: 'OverflowLayoutDefaultExampleComponent'
        }
    ];

    overflowLayoutComplexExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'overflow-layout-complex-example',
            code: overflowLayoutComplexExampleHtml
        },
        {
            language: 'typescript',
            code: overflowLayoutComplexExampleTs,
            fileName: 'overflow-layout-complex-example',
            component: 'OverflowLayoutComplexExampleComponent'
        },
        {
            language: 'scss',
            code: overflowLayoutComplexExampleScss,
            fileName: 'overflow-layout-complex-example'
        }
    ];

    overflowLayoutVisibleItemsExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'overflow-layout-always-visible-example',
            code: overflowLayoutVisibleItemsExampleHtml
        },
        {
            language: 'typescript',
            code: overflowLayoutVisibleItemsExampleTs,
            fileName: 'overflow-layout-always-visible-example',
            component: 'OverflowLayoutAlwaysVisibleExampleComponent'
        }
    ];
}
