import { Component, signal } from '@angular/core';
import { SideNavigation } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation';
import { SideNavigationItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-item';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

// Import icons used in the side navigation items
import '@ui5/webcomponents-icons/dist/activities.js';
import '@ui5/webcomponents-icons/dist/calendar.js';
import '@ui5/webcomponents-icons/dist/contacts.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/product.js';

@Component({
    selector: 'ui5-doc-side-navigation-collapsed-sample',
    templateUrl: './collapsed-sample.html',
    standalone: true,
    imports: [SideNavigation, SideNavigationItem, Button]
})
export class CollapsedSample {
    isCollapsed = signal(false);

    toggleCollapse(): void {
        this.isCollapsed.update((value) => !value);
    }
}
