import { Component } from '@angular/core';
import { ProductSwitchItem, ShellbarMenuItem, ShellbarUser, ShellbarUserMenu } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-shellbar-advanced-example',
    templateUrl: './shellbar-advanced-example.component.html'
})
export class ShellbarAdvancedExampleComponent {

    searchTerm: string;

    productMenuControl = 'Corporate Portal';

    productMenuItems: ShellbarMenuItem[] = [
        {name: 'Application A', link: '#'},
        {name: 'Application B', glyph: 'menu', callback: () => { alert('Application B'); }},
        {name: 'Application C', link: '#', glyph: 'menu'},
        {name: 'Application D', link: '#', glyph: 'menu'}
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
            callback: () => this.productSwitcherCallback('Home '),
            disabledDragAndDrop: true,
            stickToPosition: true
        },
        {
            title: 'Analytics Cloud',
            subtitle: 'Analytics Cloud',
            icon: 'business-objects-experience',
            selected: true,
        },
        {
            title: 'Catalog',
            subtitle: 'Ariba',
            icon: 'contacts',
        },
        {
            title: 'Guided Buying',
            icon: 'credit-card',
        },
        {
            title: 'Strategic Procurement',
            icon: 'cart-3',
        },
        {
            title: 'Vendor Managemen',
            subtitle: 'Fieldglass',
            icon: 'shipping-status',
        },
        {
            title: 'Human Capital Management',
            icon: 'customer',
        },
        {
            title: 'Sales Cloud',
            subtitle: 'Sales Cloud',
            icon: 'sales-notification',
        },
        {
            title: 'Commerce Cloud',
            subtitle: 'Commerce Cloud',
            icon: 'retail-store',
        },
        {
            title: 'Marketing Cloud',
            subtitle: 'Marketing Cloud',
            icon: 'marketing-campaign',
        },
        {
            title: 'Service Cloud',
            icon: 'family-care',
        },
        {
            title: 'S/4HANA',
            icon: 'batch-payments',
        },
    ];

    settingsCallback($event) {
        alert('Settings Clicked');
    }

    signOutCallback($event) {
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

    productSwitcherCallback(product) {
        alert(product + ' Product Clicked');
    }
}
