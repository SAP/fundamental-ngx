import { Component, signal } from '@angular/core';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarBranding } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-branding';
import { UserMenu } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu';
import { UserMenuAccount } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu-account';
import { UserMenuItem } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu-item';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { MessageStrip } from '@fundamental-ngx/ui5-webcomponents/message-strip';

import '@ui5/webcomponents-icons/dist/action-settings.js';
import '@ui5/webcomponents-icons/dist/message-information.js';

@Component({
    selector: 'ui5-doc-user-menu-info-area-sample',
    templateUrl: './info-area-sample.html',
    imports: [UserMenu, UserMenuAccount, UserMenuItem, ShellBar, ShellBarBranding, Avatar, MessageStrip]
})
export class InfoAreaSample {
    menuOpen = signal(false);

    onProfileClick(): void {
        this.menuOpen.set(true);
    }

    onClose(): void {
        this.menuOpen.set(false);
    }
}
