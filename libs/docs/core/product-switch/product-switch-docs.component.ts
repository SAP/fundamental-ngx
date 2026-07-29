import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ProductSwitchDndExampleComponent } from './examples/product-switch-dnd-example.component';
import { ProductSwitchLargeExampleComponent } from './examples/product-switch-large-example.component';
import { ProductSwitchListComponent } from './examples/product-switch-list/product-switch-list-example.component';
import { ProductSwitchMediumExampleComponent } from './examples/product-switch-medium-example.component';

const productSwitchDndH = 'product-switch-dnd-example.component.html';
const productSwitchDndTs = 'product-switch-dnd-example.component.ts';

const largeProductSwitchH = 'product-switch-large-example.component.html';
const largeProductSwitchTs = 'product-switch-large-example.component.ts';

const mediumProductSwitchH = 'product-switch-medium-example.component.html';
const mediumProductSwitchTs = 'product-switch-medium-example.component.ts';

const listProductSwitchH = 'product-switch-list/product-switch-list-example.component.html';
const listProductSwitchTs = 'product-switch-list/product-switch-list-example.component.ts';

@Component({
    selector: 'app-product-switch',
    templateUrl: './product-switch-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        ProductSwitchDndExampleComponent,
        ProductSwitchLargeExampleComponent,
        ProductSwitchMediumExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        ProductSwitchListComponent
    ]
})
export class ProductSwitchDocsComponent {
    productSwitchBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(productSwitchDndH),
            fileName: 'product-switch-dnd-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(productSwitchDndTs),
            fileName: 'product-switch-dnd-example',
            component: 'ProductSwitchDndExampleComponent'
        }
    ];

    productSwitchLargeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(largeProductSwitchH),
            fileName: 'product-switch-large-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(largeProductSwitchTs),
            fileName: 'product-switch-large-example',
            component: 'ProductSwitchLargeExampleComponent'
        }
    ];

    productSwitchMediumExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(mediumProductSwitchH),
            fileName: 'product-switch-medium-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(mediumProductSwitchTs),
            fileName: 'product-switch-medium-example',
            component: 'ProductSwitchMediumExampleComponent'
        }
    ];

    productSwitchListExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listProductSwitchH),
            fileName: 'product-switch-list-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(listProductSwitchTs),
            fileName: 'product-switch-list-example',
            component: 'ProductSwitchListComponent'
        }
    ];
}
