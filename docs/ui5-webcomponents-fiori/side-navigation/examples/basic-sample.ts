import { Component } from '@angular/core';
import { SideNavigation } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation';
import { SideNavigationGroup } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-group';
import { SideNavigationItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-item';
import { SideNavigationSubItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-sub-item';

// Import icons used in the side navigation items
import '@ui5/webcomponents-icons/dist/calendar.js';
import '@ui5/webcomponents-icons/dist/chain-link.js';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/group.js';
import '@ui5/webcomponents-icons/dist/history.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/locate-me.js';

@Component({
    selector: 'ui5-doc-side-navigation-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [SideNavigation, SideNavigationGroup, SideNavigationItem, SideNavigationSubItem]
})
export class BasicSample {}
