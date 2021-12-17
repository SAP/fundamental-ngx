import { Component } from '@angular/core';

import smallProductSwitchH from '!./examples/product-switch-small-example.component.html?raw';
import smallProductSwitchTs from '!./examples/product-switch-small-example.component.ts?raw';

import productSwitchDndH from '!./examples/product-switch-dnd-example.component.html?raw';
import productSwitchDndTs from '!./examples/product-switch-dnd-example.component.ts?raw';

import listProductSwitchH from '!./examples/product-switch-list/product-switch-list-example.component.html?raw';
import listProductSwitchTs from '!./examples/product-switch-list/product-switch-list-example.component.ts?raw';
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
