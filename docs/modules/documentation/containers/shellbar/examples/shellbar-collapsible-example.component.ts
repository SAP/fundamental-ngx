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
        {glyph: 'bell', callback: this.actionCallback, label: 'Notifications',
            notificationCount: 12, notificationLabel: 'Unread Notifications'},
        {glyph: 'pool', callback: this.actionCallback, label: 'Pool'}
    ];

    applicationList = [
        {name: 'Application A'},
        {name: 'Application B'},
        {name: 'Application C'},
        {name: 'Application D'}
    ];

    collapsedItems = [
        {name: 'Notifications'},
        {name: 'Pool'},
        {name: 'Product Switcher'}
    ];

    productSwitcher = [
        {title: 'Fiori Home', image: './assets/01.png'},
        {title: 'S/4 HANA Cloud', image: './assets/02.png'},
        {title: 'Analytics Cloud', image: './assets/03.png'},
        {title: 'Ariba', image: './assets/04.png'},
        {title: 'SuccessFactors', image: './assets/05.png'},
        {title: 'Commerce Cloud', image: './assets/06.png'},
        {title: 'Gigya', image: './assets/07.png'},
        {title: 'Callidus Cloud', image: './assets/08.png'},
        {title: 'Fieldglass', image: './assets/09.png'},
        {title: 'Concur', image: './assets/10.png'},
        {title: 'Cloud for Customer', image: './assets/11.png'},
        {title: 'Cloud Portal', image: './assets/12.png'},
    ];

    settingsCallback() {
        alert('Settings Clicked');
    }

    signOutCallback() {
        alert('Sign Out Clicked');
    }

    actionCallback() {
        alert('Action Clicked');
    }

}
