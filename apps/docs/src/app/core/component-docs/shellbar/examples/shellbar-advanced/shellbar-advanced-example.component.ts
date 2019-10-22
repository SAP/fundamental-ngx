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
        {title: 'Fiori Home', image: './assets/01.png',
            callback: ($event) => {this.productSwitcherCallback($event, 'Fiori Home')}},
        {title: 'S/4 HANA Cloud', image: './assets/02.png',
            callback: ($event) => {this.productSwitcherCallback($event, 'S/4 HANA Cloud')}},
        {title: 'Analytics Cloud', image: './assets/03.png',
            callback: ($event) => {this.productSwitcherCallback($event, 'Analytics Cloud')}},
        {title: 'Ariba', image: './assets/04.png',
            callback: ($event) => {this.productSwitcherCallback($event, 'Ariba')}},
        {title: 'SuccessFactors', image: './assets/05.png',
            callback: ($event) => {this.productSwitcherCallback($event, 'SuccessFactors')}},
        {title: 'Commerce Cloud', image: './assets/06.png',
            callback: ($event) => {this.productSwitcherCallback($event, 'Commerce Cloud')}},
        {title: 'Gigya', image: './assets/07.png',
            callback: ($event) => {this.productSwitcherCallback($event, 'Gigya')}},
        {title: 'Callidus Cloud', image: './assets/08.png',
            callback: ($event) => {this.productSwitcherCallback($event, 'Callidus Cloud')}},
        {title: 'Fieldglass', image: './assets/09.png',
            callback: ($event) => {this.productSwitcherCallback($event, 'Fieldglass')}},
        {title: 'Concur', image: './assets/10.png',
            callback: ($event) => {this.productSwitcherCallback($event, 'Concur')}},
        {title: 'Cloud for Customer', image: './assets/11.png',
            callback: ($event) => {this.productSwitcherCallback($event, 'Cloud for Customer')}},
        {title: 'Cloud Portal', image: './assets/12.png',
            callback: ($event) => {this.productSwitcherCallback($event, 'Cloud Portal')}}
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

    productSwitcherCallback($event, product) {
        console.log($event);
        alert(product + ' Product Clicked');
    }
}
