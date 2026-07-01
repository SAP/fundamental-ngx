import { Component, signal } from '@angular/core';
import { SideNavigation } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation';
import { SideNavigationGroup } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-group';
import { SideNavigationItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-item';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';

// Import icons used in the side navigation items
import '@ui5/webcomponents-icons/dist/activities.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/lab.js';
import '@ui5/webcomponents-icons/dist/settings.js';
import '@ui5/webcomponents-icons/dist/sys-help.js';
import '@ui5/webcomponents-icons/dist/warning.js';

// Import styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-side-navigation-indication-tag-sample',
    templateUrl: './indication-tag-sample.html',
    imports: [SideNavigation, SideNavigationGroup, SideNavigationItem, Tag, Switch, Label]
})
export class IndicationTagSample {
    readonly collapsed = signal(false);

    toggleCollapsed(): void {
        this.collapsed.update((c) => !c);
    }
}
