import { Component } from '@angular/core';

import * as smallProductSwitchH from '!raw-loader!./examples/product-switch-small-example.component.html';
import * as smallProductSwitchTs from '!raw-loader!./examples/product-switch-small-example.component.ts';

import * as productSwitchDndH from '!raw-loader!./examples/product-switch-dnd-example.component.html';
import * as productSwitchDndTs from '!raw-loader!./examples/product-switch-dnd-example.component.ts';

import * as listProductSwitchH from '!raw-loader!./examples/product-switch-list/product-switch-list.component.html';
import * as listProductSwitchTs from '!raw-loader!./examples/product-switch-list/product-switch-list.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-product-switch',
    templateUrl: './product-switch-docs.component.html'
})
export class ProductSwitchDocsComponent {
    productSwitchBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: productSwitchDndH
        },
        {
            language: 'typescript',
            code: productSwitchDndTs
        }
    ];

    productSwitchSmallExample: ExampleFile[] = [
        {
            language: 'html',
            code: smallProductSwitchH
        },
        {
            language: 'typescript',
            code: smallProductSwitchTs
        }
    ];

    productSwitchListExample: ExampleFile[] = [
        {
            language: 'html',
            code: listProductSwitchH,
        },
        {
            language: 'typescript',
            code: listProductSwitchTs
        }
    ];

}
