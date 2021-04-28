import { Component } from '@angular/core';
import { ShellbarUser } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-shellbar-user-actions-menu-example',
    templateUrl: './shellbar-user-actions-menu-example.component.html'
})
export class ShellbarUserActionsMenuExample {
    user: ShellbarUser = {
        fullName: 'John Doe',
        colorAccent: 11,
        role: 'User Experience Designer'
    };

    userMenuListItems = [
        { text: 'Settings', glyph: 'action-settings', callback: this._settingsCallback },
        { text: 'Contact', glyph: 'email' },
        { text: 'Sign Out', glyph: 'log', callback: this._signOutCallback }
    ];

    selectedUserActionItem(event: MouseEvent | KeyboardEvent): void {
        console.log('Click on item', event);
    }

    private _settingsCallback(event: MouseEvent | KeyboardEvent): void {
        console.log('Selected item: ', event);
        alert('Settings Clicked');
    }

    private _signOutCallback(event: MouseEvent | KeyboardEvent): void {
        console.log('Selected item: ', event);
        alert('Sign Out Clicked');
    }
}
