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
        role: 'User Experience Designer'
    };

    userMenuListItems = [
        { text: 'Settings', glyph: 'action-settings', callback: this._settingsCallback },
        { text: 'Contact', glyph: 'email' },
        { text: 'Sign Out', glyph: 'log', callback: this._signOutCallback }
    ];

    text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum justo non dui viverra mattis. ' +
        'Fusce venenatis tortor sit amet neque volutpat, eu mollis eros pulvinar. Duis sagittis aliquam lacus, quis ' +
        'tempor nisi vulputate et. Integer sagittis, metus ac hendrerit luctus, enim diam hendrerit nisl, et pretium ' +
        'turpis magna sed felis. Etiam volutpat condimentum justo at auctor. Sed imperdiet elementum ex, at semper ' +
        'metus vestibulum vitae. Quisque orci odio, tincidunt sed felis et, porta ultricies ligula. Etiam finibus, ' +
        'diam nec ultrices ultricies, odio nisi pretium augue, eget pharetra ipsum massa quis purus. Curabitur ante ' +
        'sapien, pharetra sed convallis non, vehicula nec leo. Fusce et elit aliquet, lobortis urna eu, porttitor eros. ' +
        'Aenean ut luctus ex, facilisis tristique tellus. Mauris eget ante eros. Suspendisse dapibus, tortor a rhoncus ' +
        'congue, nunc elit mollis turpis, eget porta nulla neque sit amet risus.';

    selectedUserActionItem(event: MouseEvent | KeyboardEvent): void {
        console.log('Selected item: ', event);
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
