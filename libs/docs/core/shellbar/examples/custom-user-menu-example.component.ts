import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';
import {
    ShellbarActionsComponent,
    ShellbarComponent,
    ShellbarLogoComponent,
    ShellbarTitleComponent,
    ShellbarUserMenuButtonDirective,
    ShellbarUserMenuComponent
} from '@fundamental-ngx/core/shellbar';

@Component({
    selector: 'fd-shellbar-custom-user-menu-example',
    template: `
        <fd-shellbar>
            <fd-shellbar-logo>
                <a href="#" class="fd-shellbar__logo fd-shellbar__logo--image-replaced" aria-label="SAP"></a>
            </fd-shellbar-logo>

            <fd-shellbar-title> Corporate Portal</fd-shellbar-title>

            <fd-shellbar-actions [closePopoverOnSelect]="true">
                <fd-shellbar-user-menu>
                    <button fd-button fdShellbarUserMenuButton [fdMenuTrigger]="menu">
                        <fd-avatar size="xs" [colorAccent]="$any(6)" [circle]="true" label="William Willson">
                        </fd-avatar>
                    </button>
                    <fd-menu #menu>
                        <li fd-menu-item (click)="settingsCallback($event)">
                            <div fd-menu-interactive>
                                <span fd-menu-title>Settings</span>
                            </div>
                        </li>
                        <li fd-menu-item (click)="signOutCallback($event)">
                            <div fd-menu-interactive>
                                <span fd-menu-title>Sign Out</span>
                            </div>
                        </li>
                    </fd-menu>
                </fd-shellbar-user-menu>
            </fd-shellbar-actions>
        </fd-shellbar>
    `,
    imports: [
        ShellbarActionsComponent,
        ShellbarComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarUserMenuComponent,
        MenuComponent,
        MenuInteractiveComponent,
        MenuItemComponent,
        MenuTitleDirective,
        ShellbarUserMenuButtonDirective,
        ButtonComponent,
        AvatarComponent,
        MenuTriggerDirective
    ]
})
export class CustomUserMenuExampleComponent {
    settingsCallback($event: MouseEvent): void {
        console.log({ $event });
        alert('Settings Clicked');
    }

    signOutCallback($event: MouseEvent): void {
        console.log({ $event });
        alert('Sign Out Clicked');
    }
}
