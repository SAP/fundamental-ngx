import { Component } from '@angular/core';
import { ProductSwitchBodyComponent, ProductSwitchItem } from '@fundamental-ngx/core/product-switch';

@Component({
    selector: 'fd-product-switch-navigation-example',
    templateUrl: './product-switch-navigation-example.component.html',
    imports: [ProductSwitchBodyComponent]
})
export class ProductSwitchNavigationExampleComponent {
    list: ProductSwitchItem[] = [
        {
            title: 'SAP Start',
            subtitle: 'Opens in new tab (default)',
            icon: 'home',
            url: 'https://www.sap.com'
            // No target → defaults to _blank
        },
        {
            title: 'Analytics Cloud',
            subtitle: 'Opens in new tab (explicit)',
            icon: 'business-objects-experience',
            url: 'https://www.sap.com/products/technology-platform/cloud-analytics.html',
            target: '_blank'
        },
        {
            title: 'S/4HANA',
            subtitle: 'Opens in same tab',
            icon: 'batch-payments',
            url: 'https://www.sap.com/products/erp/s4hana.html',
            target: '_self'
        },
        {
            title: 'Callback Only',
            subtitle: 'No navigation, fires callback',
            icon: 'action',
            callback: () => alert('Custom callback fired')
        }
    ];
}
