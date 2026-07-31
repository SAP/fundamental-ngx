import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarBranding } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-branding';
import { UserMenu } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu';
import { UserMenuAccount } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu-account';
import { UserMenuItem } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu-item';
import { UserSettingsDialog } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-dialog';
import { UserSettingsItem } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-item';
import { UserSettingsView } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-view';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';

import '@ui5/webcomponents-icons/dist/action-settings.js';
import '@ui5/webcomponents-icons/dist/bell.js';
import '@ui5/webcomponents-icons/dist/palette.js';

@Component({
    selector: 'ui5-user-settings-dialog-save-mode-sample',
    templateUrl: './save-mode-sample.html',
    imports: [
        ShellBar,
        ShellBarBranding,
        UserMenu,
        UserMenuAccount,
        UserMenuItem,
        UserSettingsDialog,
        UserSettingsItem,
        UserSettingsView,
        Avatar,
        CheckBox,
        List,
        ListItemStandard
    ]
})
export class SaveModeSample {
    menuOpen = signal(false);
    settingsDialogOpen = signal(false);
    lastAction = signal('');

    userAccount = signal({
        avatarSrc: 'https://ui5.github.io/webcomponents/images/avatars/man_avatar_3.png',
        titleText: 'Alain Chevalier',
        subtitleText: 'alain.chevalier@sap.com'
    });

    themes = signal([
        'SAP Morning Horizon',
        'SAP Evening Horizon',
        'SAP High Contrast Black',
        'SAP High Contrast White'
    ]);
    pendingTheme = signal('SAP Morning Horizon');
    savedTheme = signal('SAP Morning Horizon');

    pendingNotifications = signal(true);
    savedNotifications = signal(true);

    onProfileClick(): void {
        this.menuOpen.set(true);
    }

    onMenuClose(): void {
        this.menuOpen.set(false);
    }

    onSettingsClick(): void {
        this.pendingTheme.set(this.savedTheme());
        this.pendingNotifications.set(this.savedNotifications());
        this.settingsDialogOpen.set(true);
        this.menuOpen.set(false);
    }

    onThemeSelect(event: UI5WrapperCustomEvent<List, 'ui5SelectionChange'>): void {
        const selected = event.detail.selectedItems[0];
        if (selected) {
            this.pendingTheme.set(selected.textContent?.trim() ?? '');
        }
    }

    onNotificationsChange(event: UI5WrapperCustomEvent<CheckBox, 'ui5Change'>): void {
        this.pendingNotifications.set(event.currentTarget.checked);
    }

    onSave(): void {
        this.savedTheme.set(this.pendingTheme());
        this.savedNotifications.set(this.pendingNotifications());
        this.lastAction.set(`Saved — theme: ${this.savedTheme()}`);
        this.settingsDialogOpen.set(false);
    }

    onCancel(): void {
        this.lastAction.set('Cancelled — changes discarded');
        this.settingsDialogOpen.set(false);
    }

    onSettingsDialogClose(): void {
        this.settingsDialogOpen.set(false);
    }
}
