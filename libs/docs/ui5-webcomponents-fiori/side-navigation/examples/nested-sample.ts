import { Component } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { SideNavigation } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation';
import { SideNavigationItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-item';
import { SideNavigationSubItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-sub-item';

// Import icons used in the side navigation items
import '@ui5/webcomponents-icons/dist/activities.js';
import '@ui5/webcomponents-icons/dist/calendar.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/product.js';
import '@ui5/webcomponents-icons/dist/supplier.js';

@Component({
    selector: 'ui5-doc-side-navigation-nested-sample',
    templateUrl: './nested-sample.html',
    standalone: true,
    imports: [SideNavigation, SideNavigationItem, SideNavigationSubItem]
})
export class NestedSample {
    onSelectionChange(event: UI5WrapperCustomEvent<SideNavigation, 'ui5SelectionChange'>): void {
        const selectedItem = event.detail.item;
        console.log(`Selected Item: ${selectedItem.getAttribute('text')}.`);
    }
}
