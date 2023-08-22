import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProductSwitchItem } from '@fundamental-ngx/core/product-switch';
import { ShellbarMenuItem, ShellbarUser, ShellbarUserMenu } from '@fundamental-ngx/core/shellbar';
import { SearchInput, SuggestionItem, ValueLabelItem } from '@fundamental-ngx/platform/search-field';
import { CxNestedListModule } from '../../../../cx/src/lib/nested-list/nested-list.module';
import { CxSideNavigationModule } from '../../../../cx/src/lib/side-navigation/side-navigation.module';
import { ShellbarActionComponent } from '@fundamental-ngx/core/shellbar';
import { NgFor } from '@angular/common';
import { ShellbarActionsComponent } from '@fundamental-ngx/core/shellbar';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { ShellbarSubtitleComponent } from '@fundamental-ngx/core/shellbar';
import { ShellbarLogoComponent } from '@fundamental-ngx/core/shellbar';
import { ShellbarSidenavDirective } from '@fundamental-ngx/core/shellbar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ShellbarComponent } from '@fundamental-ngx/core/shellbar';

@Component({
    selector: 'fundamental-ngx-side-navigation-shellbar-example',
    templateUrl: './side-navigation-shellbar-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ShellbarComponent,
        ButtonModule,
        ShellbarSidenavDirective,
        ShellbarLogoComponent,
        ShellbarSubtitleComponent,
        PlatformSearchFieldModule,
        ShellbarActionsComponent,
        NgFor,
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
