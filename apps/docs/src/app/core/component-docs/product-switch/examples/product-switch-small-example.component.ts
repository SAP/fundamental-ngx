import { Component } from '@angular/core';
import { ProductSwitchItem } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-product-switch-small-example',
    templateUrl: './product-switch-small-example.component.html'
})
export class ProductSwitchSmallExampleComponent {

    list: ProductSwitchItem[] = [
        {
            title: 'Home',
            subtitle: 'Central Home',
            icon: 'home'
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
            icon: 'contacts',
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
        console.log(products);
    }
}
