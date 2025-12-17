import { Component } from '@angular/core';
import { SideNavigation } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation';
import { SideNavigationGroup } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-group';
import { SideNavigationItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-item';
import { SideNavigationSubItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-sub-item';

// Import icons used in the side navigation items
import '@ui5/webcomponents-icons/dist/address-book.js';
import '@ui5/webcomponents-icons/dist/area-chart.js';
import '@ui5/webcomponents-icons/dist/bar-chart.js';
import '@ui5/webcomponents-icons/dist/bbyd-dashboard.js';
import '@ui5/webcomponents-icons/dist/calendar.js';
import '@ui5/webcomponents-icons/dist/history.js';
import '@ui5/webcomponents-icons/dist/message-information.js';
import '@ui5/webcomponents-icons/dist/wrench.js';

@Component({
    selector: 'ui5-doc-side-navigation-custom-width-sample',
    templateUrl: './custom-width-sample.html',
    standalone: true,
    imports: [SideNavigation, SideNavigationGroup, SideNavigationItem, SideNavigationSubItem]
})
export class CustomWidthSample {}
