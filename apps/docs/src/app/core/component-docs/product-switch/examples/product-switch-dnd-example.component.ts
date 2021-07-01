import { Component } from '@angular/core';
import { ProductSwitchItem } from '@fundamental-ngx/core/product-switch';

@Component({
    selector: 'fd-product-switch-dnd-example',
    templateUrl: './product-switch-dnd-example.component.html'
})
export class ProductSwitchDndExampleComponent {
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
            icon: 'business-objects-experience'
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
        },
        {
            title: 'Vendor Managemen',
            subtitle: 'Fieldglass',
            icon: 'shipping-status'
        },
        {
            title: 'Human Capital Management',
            icon: 'customer'
        },
        {
            title: 'Sales Cloud',
            subtitle: 'Sales Cloud',
            icon: 'sales-notification'
        },
        {
            title: 'Commerce Cloud',
            subtitle: 'Commerce Cloud',
            icon: 'retail-store'
        },
        {
            title: 'Marketing Cloud',
            subtitle: 'Marketing Cloud',
            icon: 'marketing-campaign'
        },
        {
            title: 'Service Cloud',
            icon: 'family-care'
        },
        {
            title: 'S/4HANA',
            icon: 'batch-payments'
        }
    ];

    productChangeHandle(products: ProductSwitchItem[]): void {
        this.list = products;
        console.log(products);
    }
}
