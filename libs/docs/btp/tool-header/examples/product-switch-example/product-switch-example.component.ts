import { Component } from '@angular/core';
import { ToolHeaderComponent, ToolHeaderProductSwitchComponent } from '@fundamental-ngx/btp/tool-header';
import { ProductSwitchBodyComponent, ProductSwitchItem } from '@fundamental-ngx/core/product-switch';

@Component({
    selector: 'fdb-tool-header-product-switch-example',
    template: `
        <fdb-tool-header productName="Fundamental-ngx">
            <fdb-tool-header-product-switch>
                <fd-product-switch-body [products]="productSwitcher"></fd-product-switch-body>
            </fdb-tool-header-product-switch>
        </fdb-tool-header>
    `,
    imports: [ToolHeaderComponent, ProductSwitchBodyComponent, ToolHeaderProductSwitchComponent]
})
export class ProductSwitchExampleComponent {
    productSwitcher: ProductSwitchItem[] = [
        {
            title: 'Home',
            subtitle: 'Central Home',
            icon: 'home',
            disabledDragAndDrop: true,
            stickToPosition: true
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
}
