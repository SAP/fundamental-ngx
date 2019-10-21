import { Component } from '@angular/core';
import { ShellbarMenuItem, ProductSwitchItem, ShellbarUser, ShellbarUserMenu } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-shellbar-collapsible-example',
    templateUrl: './shellbar-collapsible-example.component.html'
})
export class ShellbarCollapsibleExampleComponent {

    searchTerm: string;

    productMenuControl = 'Corporate Portal';

    productMenuItems: ShellbarMenuItem[] = [
        {name: 'Application A', callback: () => {alert('Application A Clicked')}},
        {name: 'Application B', callback: () => {alert('Application B Clicked')}},
        {name: 'Application C', callback: () => {alert('Application C Clicked')}},
        {name: 'Application D', callback: () => {alert('Application D Clicked')}}
    ];

    user: ShellbarUser = {
        initials: 'WW',
        colorAccent: 1
    };

    userMenu: ShellbarUserMenu[] = [
        {text: 'Settings', callback: this.settingsCallback},
        {text: 'Sign Out', callback: this.signOutCallback}
    ];

    actions = [
        {glyph: 'pool', callback: this.actionPoolCallback, label: 'Pool',
            notificationCount: 3, notificationLabel: 'Pool Count'},
        {glyph: 'bell', callback: this.actionNotificationCallback, label: 'Notifications',
            notificationCount: 12, notificationLabel: 'Unread Notifications'}
    ];

    searchTerms = [
        'Apple',
        'Banana',
        'Kiwi',
        'Strawberry',
    ];

    productSwitcher: ProductSwitchItem[] = [
        {
            title: 'Home',
            subtitle: 'Central Home',
            icon: 'home',
            callback: this.productSwitcherCallback
        },
        {
            title: 'Analytics Cloud',
            subtitle: 'Analytics Cloud',
            icon: 'business-objects-experience',
            selected: true,
            callback: this.productSwitcherCallback
        },
        {
            title: 'Catalog',
            subtitle: 'Ariba',
            icon: 'contacts',
            disabledDragAndDrop: true,
            callback: this.productSwitcherCallback
        },
        {
            title: 'Guided Buying',
            icon: 'credit-card',
            callback: this.productSwitcherCallback
        },
        {
            title: 'Strategic Procurement',
            icon: 'cart-3',
            callback: this.productSwitcherCallback
        },
        {
            title: 'Vendor Managemen',
            subtitle: 'Fieldglass',
            icon: 'shipping-status',
            callback: this.productSwitcherCallback
        },
        {
            title: 'Human Capital Management',
            icon: 'customer',
            callback: this.productSwitcherCallback
        },
        {
            title: 'Sales Cloud',
            subtitle: 'Sales Cloud',
            icon: 'sales-notification',
            callback: this.productSwitcherCallback
        },
        {
            title: 'Commerce Cloud',
            subtitle: 'Commerce Cloud',
            icon: 'retail-store',
            callback: this.productSwitcherCallback
        },
        {
            title: 'Marketing Cloud',
            subtitle: 'Marketing Cloud',
            icon: 'marketing-campaign',
            callback: this.productSwitcherCallback
        },
        {
            title: 'Service Cloud',
            icon: 'family-care',
            callback: this.productSwitcherCallback
        },
        {
            title: 'S/4HANA',
            icon: 'batch-payments',
            callback: this.productSwitcherCallback
        },
    ];

    settingsCallback($event) {
        console.log($event);
        alert('Settings Clicked');
    }

    signOutCallback($event) {
        console.log($event);
        alert('Sign Out Clicked');
    }

    actionNotificationCallback($event) {
        console.log($event);
        alert('Notification Action Clicked');
    }

    actionPoolCallback($event) {
        console.log($event);
        alert('Pool Action Clicked');
    }

    productSwitcherCallback($event) {
        console.log($event);
        alert('Product Clicked');
    }

}
