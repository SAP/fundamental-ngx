import { Component, signal } from '@angular/core';
import { ProductSwitch } from '@fundamental-ngx/ui5-webcomponents-fiori/product-switch';
import { ProductSwitchItem } from '@fundamental-ngx/ui5-webcomponents-fiori/product-switch-item';

// Import the icons used in this example
import '@ui5/webcomponents-icons/dist/business-objects-experience.js';
import '@ui5/webcomponents-icons/dist/cart-3.js';
import '@ui5/webcomponents-icons/dist/contacts.js';
import '@ui5/webcomponents-icons/dist/credit-card.js';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/flight.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/shipping-status.js';

interface Product {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
}

@Component({
    selector: 'ui5-doc-product-switch-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [ProductSwitch, ProductSwitchItem]
})
export class BasicSample {
    products = signal<Product[]>([
        { id: '1', title: 'Home', subtitle: 'Central Home', icon: 'home' },
        { id: '2', title: 'Analytics Cloud', subtitle: 'Analytics Cloud', icon: 'business-objects-experience' },
        { id: '3', title: 'Catalog', subtitle: 'Ariba', icon: 'contacts' },
        { id: '4', title: 'Guided Buying', subtitle: 'Ariba', icon: 'credit-card' },
        { id: '5', title: 'Strategic Procurement', subtitle: 'Ariba', icon: 'cart-3' },
        { id: '6', title: 'Travel & Expense', subtitle: 'Concur', icon: 'flight' },
        { id: '7', title: 'Vendor Management', subtitle: 'Fieldglass', icon: 'shipping-status' },
        { id: '8', title: 'Human Capital Management', subtitle: 'SuccessFactors', icon: 'customer' }
    ]);
}
