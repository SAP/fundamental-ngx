import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProductSwitchItem } from '@fundamental-ngx/core/product-switch';
import { ShellbarMenuItem, ShellbarUser, ShellbarUserMenu } from '@fundamental-ngx/core/shellbar';
import { SearchInput, SuggestionItem, ValueLabelItem } from '@fundamental-ngx/platform/search-field';

@Component({
    selector: 'fundamental-ngx-side-navigation-shellbar-example',
    templateUrl: './side-navigation-shellbar-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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
