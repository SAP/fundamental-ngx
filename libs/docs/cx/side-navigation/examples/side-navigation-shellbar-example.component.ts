import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
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
import {
    NestedItemComponent,
    NestedLinkComponent,
    NestedListButtonDirective,
    NestedListComponent,
    NestedListContentDirective,
    NestedListExpandIconComponent,
    NestedListHeaderDirective,
    NestedListIconComponent,
    NestedListPopoverComponent,
    NestedListTitleDirective,
    PreparedNestedListComponent
} from '@fundamental-ngx/cx/nested-list';
import {
    SideNavigationButtonDirective,
    SideNavigationComponent,
    SideNavigationMainComponent,
    SideNavigationUtilityDirective
} from '@fundamental-ngx/cx/side-navigation';
import { I18nModule } from '@fundamental-ngx/i18n';
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
        ButtonComponent,
        ScrollbarModule,
        I18nModule,
        SideNavigationMainComponent,
        SideNavigationUtilityDirective,
        SideNavigationButtonDirective,
        SideNavigationComponent,
        NestedListComponent,
        NestedLinkComponent,
        NestedItemComponent,
        NestedListIconComponent,
        NestedListTitleDirective,
        NestedListHeaderDirective,
        NestedListPopoverComponent,
        PreparedNestedListComponent,
        NestedListExpandIconComponent,
        NestedListContentDirective,
        NestedListButtonDirective,
        ContentDensityModule
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
