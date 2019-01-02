import { Component } from '@angular/core';

@Component({
    selector: 'fd-shellbar-basic-example',
    templateUrl: './shellbar-basic-example.component.html'
})
export class ShellbarBasicExampleComponent {

    user = {
        initials: 'WW',
        colorAccent: 11
    };

    userMenu = [
        {text: 'Settings', callback: this.settingsCallback},
        {text: 'Sign Out', callback: this.signOutCallback}
    ];

    settingsCallback() {
        alert('Settings Clicked');
    }

    signOutCallback() {
        alert('Sign Out Clicked');
    }

}
