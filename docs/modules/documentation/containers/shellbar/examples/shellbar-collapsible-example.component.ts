import { Component } from '@angular/core';

@Component({
    selector: 'fd-shellbar-collapsible-example',
    templateUrl: './shellbar-collapsible-example.component.html'
})
export class ShellbarCollapsibleExampleComponent {

    user = {
        initials: 'WW',
        image: './assets/headshot-male.jpg'
    };

    userMenu = [
        {text: 'Settings', callback: this.settingsCallback},
        {text: 'Sign Out', callback: this.signOutCallback}
    ];

    actions = [
        {glyph: 'bell', callback: this.actionNotificationCallback, label: 'Notifications',
            notificationCount: 12, notificationLabel: 'Unread Notifications'},
        {glyph: 'pool', callback: this.actionPoolCallback, label: 'Pool'}
    ];

    applicationList = [
        {name: 'Application A'},
        {name: 'Application B'},
        {name: 'Application C'},
        {name: 'Application D'}
    ];

    searchTerm = '';

    searchTerms = [
        {text: 'Apple', callback: () => {alert('Apple Clicked')}},
        {text: 'Banana', callback: () => {alert('Banana Clicked')}},
        {text: 'Kiwi', callback: () => {alert('Kiwi Clicked')}},
        {text: 'Strawberry', callback: () => {alert('Strawberry Clicked')}}
    ];

    productSwitcher = [
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

    exampleSearchFunction = () => {
        alert('Search Function Called with search term: ' + this.searchTerm);
    }

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
