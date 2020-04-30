import { Component } from '@angular/core';
import { ShellbarUser, ShellbarUserMenu } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-shellbar-basic-example',
    templateUrl: './shellbar-basic-example.component.html'
})
export class ShellbarBasicExampleComponent {
    user: ShellbarUser = {
        initials: 'WW',
        colorAccent: 11
    };

    userMenu: ShellbarUserMenu[] = [
        { text: 'Settings', callback: this.settingsCallback },
        { text: 'Sign Out', callback: this.signOutCallback }
    ];

    settingsCallback() {
        alert('Settings Clicked');
    }

    signOutCallback() {
        alert('Sign Out Clicked');
    }
}
