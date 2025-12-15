import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ProductSwitch } from '@fundamental-ngx/ui5-webcomponents-fiori/product-switch';
import { ProductSwitchItem } from '@fundamental-ngx/ui5-webcomponents-fiori/product-switch-item';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarBranding } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-branding';
import { Popover } from '@fundamental-ngx/ui5-webcomponents/popover';
import { ToggleButton } from '@fundamental-ngx/ui5-webcomponents/toggle-button';

// Import the icons used in this example
import '@ui5/webcomponents-icons/dist/business-objects-experience.js';
import '@ui5/webcomponents-icons/dist/cart-3.js';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/manager-insight.js';
import '@ui5/webcomponents-icons/dist/product.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

interface Product {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
}

@Component({
    selector: 'ui5-doc-product-switch-in-shell-bar-sample',
    templateUrl: './in-shell-bar-sample.html',
    standalone: true,
    imports: [ProductSwitch, ProductSwitchItem, Popover, ToggleButton, ShellBar, ShellBarBranding]
})
export class InShellBarSample {
    products = signal<Product[]>([
        { id: '1', title: 'Home', subtitle: 'Central Home', icon: 'home' },
        { id: '2', title: 'Analytics', subtitle: 'Analytics Cloud', icon: 'business-objects-experience' },
        { id: '3', title: 'Catalog', subtitle: 'Product Catalog', icon: 'product' },
        { id: '4', title: 'CRM', subtitle: 'Customer Management', icon: 'customer' },
        { id: '5', title: 'Procurement', subtitle: 'Strategic Procurement', icon: 'cart-3' },
        { id: '6', title: 'Finance', subtitle: 'Financial Planning', icon: 'manager-insight' }
    ]);

    opener = signal<HTMLElement | null>(null);
    popoverOpen = signal(false);

    onProductSwitchClick(event: UI5WrapperCustomEvent<ShellBar, 'ui5ProductSwitchClick'>): void {
        this.opener.set(event.detail.targetRef);
        this.popoverOpen.update((open) => !open);
    }

    onProductClick(product: Product): void {
        console.log(`Product selected: ${product.title}.`);
    }
}
