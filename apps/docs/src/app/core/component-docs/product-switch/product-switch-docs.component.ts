import { Component } from '@angular/core';

import * as smallProductSwitchH from '!raw-loader!./examples/product-switch-small-example.component.html';
import * as smallProductSwitchTs from '!raw-loader!./examples/product-switch-small-example.component.ts';

import * as productSwitchDndH from '!raw-loader!./examples/product-switch-dnd-example.component.html';
import * as productSwitchDndTs from '!raw-loader!./examples/product-switch-dnd-example.component.ts';

import * as listProductSwitchH from '!raw-loader!./examples/product-switch-list/product-switch-list-example.component.html';
import * as listProductSwitchTs from '!raw-loader!./examples/product-switch-list/product-switch-list-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-product-switch',
    templateUrl: './product-switch-docs.component.html'
})
export class ProductSwitchDocsComponent {
    productSwitchBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: productSwitchDndH,
            fileName: 'product-switch-dnd-example'
        },
        {
            language: 'typescript',
            code: productSwitchDndTs,
            fileName: 'product-switch-dnd-example',
            component: 'ProductSwitchDndExampleComponent'
        }
    ];

    productSwitchSmallExample: ExampleFile[] = [
        {
            language: 'html',
            code: smallProductSwitchH,
            fileName: 'product-switch-small-example'
        },
        {
            language: 'typescript',
            code: smallProductSwitchTs,
            fileName: 'product-switch-small-example',
            component: 'ProductSwitchSmallExampleComponent'
        }
    ];

    productSwitchListExample: ExampleFile[] = [
        {
            language: 'html',
            code: listProductSwitchH,
            fileName: 'product-switch-list-example'
        },
        {
            language: 'typescript',
            code: listProductSwitchTs,
            fileName: 'product-switch-list-example',
            component: 'ProductSwitchListComponent'
        }
    ];
}
