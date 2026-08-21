import { Component } from '@angular/core';
import { ProductSwitchBodyComponent, ProductSwitchItem } from '@fundamental-ngx/core/product-switch';

@Component({
    selector: 'fd-product-switch-two-column-example',
    templateUrl: './product-switch-two-column-example.component.html',
    imports: [ProductSwitchBodyComponent]
})
export class ProductSwitchTwoColumnExampleComponent {
    list: ProductSwitchItem[] = [
        {
            title: 'SAP Start',
            subtitle: 'Home',
            icon: 'home',
            url: 'https://www.sap.com',
            stickToPosition: true,
            disabledDragAndDrop: true
        },
        {
            title: 'Analytics Cloud',
            subtitle: 'Analytics Cloud',
            icon: 'business-objects-experience',
            url: 'https://www.sap.com/products/technology-platform/cloud-analytics.html'
        }
    ];
}
