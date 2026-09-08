import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ProductSwitchBodyComponent, ProductSwitchItem } from '@fundamental-ngx/core/product-switch';

@Component({
    selector: 'fd-product-switch-busy-example',
    templateUrl: './product-switch-busy-example.component.html',
    imports: [ProductSwitchBodyComponent, ButtonComponent]
})
export class ProductSwitchBusyExampleComponent {
    readonly busy = signal(false);

    list: ProductSwitchItem[] = [
        { title: 'SAP Start', subtitle: 'Central Home', icon: 'home' },
        { title: 'Analytics Cloud', subtitle: 'Ariba', icon: 'business-objects-experience' },
        { title: 'Catalog', subtitle: 'Ariba', icon: 'contacts' }
    ];
}
