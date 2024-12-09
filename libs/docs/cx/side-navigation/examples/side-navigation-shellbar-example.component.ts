import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    ShellbarActionComponent,
    ShellbarActionsComponent,
    ShellbarComponent,
    ShellbarLogoComponent,
    ShellbarSidenavDirective,
    ShellbarSubtitleComponent,
    ShellbarUser,
    ShellbarUserMenu
} from '@fundamental-ngx/core/shellbar';
import { CxNestedListModule } from '@fundamental-ngx/cx/nested-list';
import { CxSideNavigationModule } from '@fundamental-ngx/cx/side-navigation';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';

@Component({
    selector: 'fdx-side-navigation-shellbar-example',
    templateUrl: './side-navigation-shellbar-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ShellbarComponent,
        ButtonComponent,
        ShellbarSidenavDirective,
        ShellbarLogoComponent,
        ShellbarSubtitleComponent,
        PlatformSearchFieldModule,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        CxSideNavigationModule,
        CxNestedListModule
    ]
})
export class SideNavigationShellbarExampleComponent {
    condensed = true;

    user: ShellbarUser = {
        fullName: 'William Willson',
        colorAccent: 1
    };

    userMenu: ShellbarUserMenu[] = [{ text: 'Settings' }, { text: 'Sign Out' }];

    actions = [
        {
            glyph: 'pool',
            label: 'Pool',
            notificationCount: 3,
            notificationLabel: 'Pool Count'
        },
        {
            glyph: 'bell',
            label: 'Notifications',
            notificationCount: 12,
            notificationLabel: 'Unread Notifications'
        }
    ];
}
