import { Component } from '@angular/core';
import { ShellbarUser, ShellbarUserMenu } from '@fundamental-ngx/core/shellbar';

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
        { text: 'Settings', callback: this.settingsCallback, glyph: 'action-settings' },
        { text: 'Sign Out', callback: this.signOutCallback, glyph: 'log' }
    ];

    settingsCallback(): void {
        alert('Settings Clicked');
    }

    signOutCallback(): void {
        alert('Sign Out Clicked');
    }
}
