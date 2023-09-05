import { Component } from '@angular/core';
import {
    ShellbarActionsComponent,
    ShellbarComponent,
    ShellbarLogoComponent,
    ShellbarTitleComponent,
    ShellbarUser,
    ShellbarUserMenu
} from '@fundamental-ngx/core/shellbar';

@Component({
    selector: 'fd-shellbar-basic-example',
    templateUrl: './shellbar-basic-example.component.html',
    standalone: true,
    imports: [ShellbarComponent, ShellbarLogoComponent, ShellbarTitleComponent, ShellbarActionsComponent]
})
export class ShellbarBasicExampleComponent {
    user: ShellbarUser = {
        fullName: 'William Willson',
        colorAccent: 6
    };

    userMenu: ShellbarUserMenu[] = [
        { text: 'Settings', callback: this.settingsCallback },
        { text: 'Sign Out', callback: this.signOutCallback }
    ];

    settingsCallback(): void {
        alert('Settings Clicked');
    }

    signOutCallback(): void {
        alert('Sign Out Clicked');
    }
}
