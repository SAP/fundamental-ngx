import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarItem } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-item';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

// Import required icons
import '@ui5/webcomponents-icons/dist/activities.js';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/menu2.js';

interface EventLog {
    timestamp: Date;
    eventType: string;
    details: string;
}

@Component({
    selector: 'ui5-doc-shellbar-events-sample',
    templateUrl: './events-sample.html',
    standalone: true,
    imports: [ShellBar, ShellBarItem, Avatar, Button, Input, ListItemStandard]
})
export class EventsSample {
    primaryTitle = signal('Event Tracking Demo');
    notificationsCount = signal('5');
    eventLog = signal<EventLog[]>([]);

    logEvent(eventType: string, details: string): void {
        const newEvent: EventLog = {
            timestamp: new Date(),
            eventType,
            details
        };
        this.eventLog.update((log) => [newEvent, ...log].slice(0, 10));
    }

    onLogoClick(): void {
        this.logEvent('Logo Click', 'User clicked on the logo');
    }

    onProfileClick(): void {
        this.logEvent('Profile Click', 'User clicked on the profile avatar');
    }

    onNotificationsClick(): void {
        this.logEvent('Notifications Click', `${this.notificationsCount()} notifications`);
    }

    onProductSwitchClick(): void {
        this.logEvent('Product Switch Click', 'Product switch menu opened');
    }

    onMenuItemClick(event: UI5WrapperCustomEvent<ShellBar, 'ui5MenuItemClick'>): void {
        const itemText = event.detail.item.textContent?.trim() || 'Unknown';
        this.logEvent('Menu Item Click', `Selected: ${itemText}`);
    }

    onSearchButtonClick(): void {
        this.logEvent('Search Button Click', 'Search button activated');
    }

    onSearchFieldToggle(event: UI5WrapperCustomEvent<ShellBar, 'ui5SearchFieldToggle'>): void {
        const expanded = event.detail.expanded;
        this.logEvent('Search Field Toggle', `Search field ${expanded ? 'expanded' : 'collapsed'}`);
    }

    clearLog(): void {
        this.eventLog.set([]);
    }
}
