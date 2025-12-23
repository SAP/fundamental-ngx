import { Component, signal } from '@angular/core';
import { ProductSwitch } from '@fundamental-ngx/ui5-webcomponents-fiori/product-switch';
import { ProductSwitchItem } from '@fundamental-ngx/ui5-webcomponents-fiori/product-switch-item';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';

// Import the icons used in this example
import '@ui5/webcomponents-icons/dist/cart-3.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/product.js';

interface Product {
    id: string;
    title: string;
    subtitle: string;
    icon?: string;
    initials?: string;
    useAvatar?: boolean;
    imageSrc?: string;
}

@Component({
    selector: 'ui5-doc-product-switch-icons-sample',
    templateUrl: './icons-sample.html',
    standalone: true,
    imports: [ProductSwitch, ProductSwitchItem, Avatar]
})
export class IconsSample {
    products = signal<Product[]>([
        { id: '1', title: 'Home', subtitle: 'Central Home', icon: 'home' },
        { id: '2', title: 'Analytics', subtitle: 'With Custom Avatar', useAvatar: true, initials: 'AN' },
        { id: '3', title: 'Catalog', subtitle: 'Product Catalog', icon: 'product' },
        {
            id: '4',
            title: 'SAP',
            subtitle: 'SVG Icon',
            useAvatar: true,
            imageSrc: 'https://www.sap.com/dam/application/shared/logos/sap-logo-svg.svg.adapt.svg/1493030643828.svg'
        },
        { id: '5', title: 'Procurement', subtitle: 'Strategic Procurement', icon: 'cart-3' },
        { id: '6', title: 'Finance', subtitle: 'With Custom Avatar', useAvatar: true, initials: 'FI' }
    ]);
}
