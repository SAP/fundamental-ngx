import { Component } from '@angular/core';
import { SideNavigation } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation';
import { SideNavigationItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-item';

// Import icons used in the side navigation items
import '@ui5/webcomponents-icons/dist/activities.js';
import '@ui5/webcomponents-icons/dist/calendar.js';
import '@ui5/webcomponents-icons/dist/contacts.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/log.js';
import '@ui5/webcomponents-icons/dist/product.js';
import '@ui5/webcomponents-icons/dist/settings.js';
import '@ui5/webcomponents-icons/dist/sys-help.js';

@Component({
    selector: 'ui5-doc-side-navigation-fixed-items-sample',
    templateUrl: './fixed-items-sample.html',
    standalone: true,
    imports: [SideNavigation, SideNavigationItem]
})
export class FixedItemsSample {}
