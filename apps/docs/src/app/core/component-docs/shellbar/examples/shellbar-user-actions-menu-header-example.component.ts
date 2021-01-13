import { Component } from '@angular/core';
import { ShellbarUser } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-shellbar-user-actions-menu-header-example',
    templateUrl: './shellbar-user-actions-menu-header-example.component.html'
})
export class ShellbarUserActionsMenuHeaderExample {
    user: ShellbarUser = {
        fullName: 'John Doe',
        image: 'https://i.pravatar.cc/150?img=2',
        colorAccent: 1,
        role: 'User Experience Designe'
    };

    userMenuListItems = [
        { text: 'Settings', glyph: 'action-settings', callback: this._settingsCallback },
        { text: 'Contact', glyph: 'email' },
        { text: 'Sign Out', glyph: 'log', callback: this._signOutCallback }
    ];

    clickUserAction($event: MouseEvent): void {
        console.log('Click on: ', $event);
    }

    private _settingsCallback($event: MouseEvent): void {
        console.log($event);
        alert('Settings Clicked');
    }

    private _signOutCallback($event: MouseEvent): void {
        console.log($event);
        alert('Sign Out Clicked');
    }
}
