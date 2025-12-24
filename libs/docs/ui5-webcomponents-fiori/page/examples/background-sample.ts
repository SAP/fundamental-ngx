import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Page } from '@fundamental-ngx/ui5-webcomponents-fiori/page';
import { PageBackgroundDesign } from '@fundamental-ngx/ui5-webcomponents-fiori/types';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

// Import the icons used in this example
import '@ui5/webcomponents-icons/dist/action-settings.js';
import '@ui5/webcomponents-icons/dist/business-objects-experience.js';
import '@ui5/webcomponents-icons/dist/cart.js';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/donut-chart.js';
import '@ui5/webcomponents-icons/dist/product.js';

interface Item {
    id: string;
    title: string;
    description: string;
    icon: string;
}

@Component({
    selector: 'ui5-doc-page-background-sample',
    templateUrl: './background-sample.html',
    standalone: true,
    imports: [Page, Bar, Button, List, Label, ListItemStandard, Icon, SegmentedButton, SegmentedButtonItem]
})
export class BackgroundSample {
    backgroundDesignEnum = signal<typeof PageBackgroundDesign>(PageBackgroundDesign);
    backgroundDesign = signal<PageBackgroundDesign>(PageBackgroundDesign.Solid);

    items = signal<Item[]>([
        {
            id: '1',
            title: 'Dashboard',
            description: 'View your analytics dashboard',
            icon: 'business-objects-experience'
        },
        { id: '2', title: 'Orders', description: 'Manage customer orders', icon: 'cart' },
        { id: '3', title: 'Products', description: 'Browse product catalog', icon: 'product' },
        { id: '4', title: 'Customers', description: 'Customer relationship management', icon: 'customer' },
        { id: '5', title: 'Reports', description: 'Generate and view reports', icon: 'donut-chart' },
        { id: '6', title: 'Settings', description: 'Configure application settings', icon: 'action-settings' }
    ]);

    onDesignChange(event: UI5WrapperCustomEvent<SegmentedButton, 'ui5SelectionChange'>): void {
        const background = event.detail.selectedItems[0].textContent?.trim();
        this.backgroundDesign.set(background as PageBackgroundDesign);
    }
}
