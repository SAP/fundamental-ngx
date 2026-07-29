import { Component } from '@angular/core';
import { ProductSwitchItem, ProductSwitchModule } from '@fundamental-ngx/core/product-switch';

@Component({
    selector: 'fd-product-switch-medium-example',
    templateUrl: './product-switch-medium-example.component.html',
    imports: [ProductSwitchModule]
})
export class ProductSwitchMediumExampleComponent {
    list: ProductSwitchItem[] = [
        {
            title: 'Home',
            subtitle: 'Central Home',
            icon: 'home',
            stickToPosition: true,
            disabledDragAndDrop: true
        },
        {
            title: 'Analytics Cloud',
            subtitle: 'Analytics Cloud',
            icon: 'business-objects-experience',
            selected: true
        },
        {
            title: 'Catalog',
            subtitle: 'Ariba',
            icon: 'contacts'
        },
        {
            title: 'Guided Buying',
            icon: 'credit-card'
        },
        {
            title: 'Strategic Procurement',
            icon: 'cart-3'
        }
    ];

    productChangeHandle(products: ProductSwitchItem[]): void {
        this.list = products;
    }
}
