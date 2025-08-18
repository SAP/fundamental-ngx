import { Component } from '@angular/core';
import { ProductSwitchItem, ProductSwitchModule } from '@fundamental-ngx/core/product-switch';

@Component({
    selector: 'fd-product-switch-list-example',
    templateUrl: './product-switch-list-example.component.html',
    imports: [ProductSwitchModule]
})
export class ProductSwitchListComponent {
    list: ProductSwitchItem[] = [
        {
            title: 'Heart',
            subtitle: 'Heart Filled',
            icon: 'heart',
            font: 'SAP-icons',
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
            avatar: {
                glyph: 'contacts',
                colorAccent: 5,
                ariaLabel: 'Ariba Catalog',
                circle: true
            }
        },
        {
            title: 'Guided Buying',
            avatar: {
                image: 'https://picsum.photos/id/1018/400',
                ariaLabel: 'Guided Buying',
                transparent: true
            }
        },
        {
            title: 'Strategic Procurement',
            icon: 'cart-3'
        },
        {
            title: 'Vendor Managemen',
            subtitle: 'Fieldglass',
            icon: 'shipping-status',
            selected: true
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
