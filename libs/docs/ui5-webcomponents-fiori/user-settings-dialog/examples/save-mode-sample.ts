import { Component, signal, viewChild } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarBranding } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-branding';
import { UserMenu } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu';
import { UserMenuAccount } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu-account';
import { UserMenuItem } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu-item';
import { UserSettingsAccountView } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-account-view';
import { UserSettingsAppearanceView } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-appearance-view';
import { UserSettingsAppearanceViewGroup } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-appearance-view-group';
import { UserSettingsAppearanceViewItem } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-appearance-view-item';
import { UserSettingsDialog } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-dialog';
import { UserSettingsItem } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-item';
import { UserSettingsNotificationsView } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-notifications-view';
import { UserSettingsNotificationsViewGroup } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-notifications-view-group';
import { UserSettingsNotificationsViewItem } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-notifications-view-item';
import { UserSettingsView } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-view';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Link } from '@fundamental-ngx/ui5-webcomponents/link';
import { MessageStrip } from '@fundamental-ngx/ui5-webcomponents/message-strip';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Panel } from '@fundamental-ngx/ui5-webcomponents/panel';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { Toast } from '@fundamental-ngx/ui5-webcomponents/toast';

import '@ui5/webcomponents-icons/dist/action-settings.js';
import '@ui5/webcomponents-icons/dist/bell.js';
import '@ui5/webcomponents-icons/dist/iphone.js';
import '@ui5/webcomponents-icons/dist/palette.js';
import '@ui5/webcomponents-icons/dist/qr-code.js';
import '@ui5/webcomponents-icons/dist/reset.js';
import '@ui5/webcomponents-icons/dist/user-settings.js';

@Component({
    selector: 'ui5-user-settings-dialog-save-mode-sample',
    templateUrl: './save-mode-sample.html',
    imports: [
        ShellBar,
        ShellBarBranding,
        UserMenu,
        UserMenuAccount,
        UserMenuItem,
        UserSettingsAccountView,
        UserSettingsAppearanceView,
        UserSettingsAppearanceViewGroup,
        UserSettingsAppearanceViewItem,
        UserSettingsDialog,
        UserSettingsItem,
        UserSettingsNotificationsView,
        UserSettingsNotificationsViewGroup,
        UserSettingsNotificationsViewItem,
        UserSettingsView,
        Avatar,
        Button,
        CheckBox,
        Icon,
        Label,
        Link,
        MessageStrip,
        Option,
        Panel,
        Select,
        Switch,
        Text,
        Toast
    ],
    styles: [
        `
            body {
                height: 600px;
            }

            .ua-panel {
                border-top: 2px solid lightgrey;
                margin: 1rem 0;
            }

            .ui5-user-settings-appearance-view-additional-content-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
                width: 100%;
            }

            .ui5-user-settings-appearance-view-additional-content-description {
                display: block;
                color: var(--sapContent_LabelColor);
                font-size: var(--sapFontSmallSize);
            }

            #language-region-strip {
                display: block;
                margin-bottom: 1rem;
            }

            .language-region-form {
                display: flex;
                flex-direction: column;
                width: 100%;
            }

            .language-region-row {
                display: flex;
                flex-direction: column;
                width: 100%;
            }

            .language-region-row > ui5-label,
            .language-region-row > [ui5-label] {
                padding: 0.5rem 0 0.125rem 0;
            }

            .language-region-row:first-child > ui5-label,
            .language-region-row:first-child > [ui5-label] {
                padding-top: 0;
            }

            .language-region-row > ui5-select,
            .language-region-row > [ui5-select] {
                display: block;
                width: 100%;
            }
        `
    ]
})
export class SaveModeSample {
    readonly toastReset = viewChild<Toast>('toastReset');
    readonly toastResetAll = viewChild<Toast>('toastResetAll');

    menuOpen = signal(false);
    settingsDialogOpen = signal(false);
    lastAction = signal('');
    mobileSecondaryViewSelected = signal(false);
    mobileSecondaryViewText = signal('');

    userAccount = signal({
        avatarSrc: 'https://ui5.github.io/webcomponents/images/avatars/man_avatar_3.png',
        titleText: 'Alain Chevalier',
        subtitleText: 'alain.chevalier@sap.com',
        description: 'Delivery Manager, SAP SE'
    });

    // Theme management
    pendingTheme = signal('sap_horizon');
    savedTheme = signal('sap_horizon');

    // Notifications management
    pendingNotifications = signal(true);
    savedNotifications = signal(true);
    pendingBannerAlerts = signal(true);
    savedBannerAlerts = signal(true);

    // Language and Region management
    pendingLanguage = signal('English (United States)');
    savedLanguage = signal('English (United States)');
    pendingRegion = signal('United States');
    savedRegion = signal('United States');

    onProfileClick(): void {
        this.menuOpen.set(true);
    }

    onMenuClose(): void {
        this.menuOpen.set(false);
    }

    onSettingsClick(): void {
        this.pendingTheme.set(this.savedTheme());
        this.pendingNotifications.set(this.savedNotifications());
        this.pendingBannerAlerts.set(this.savedBannerAlerts());
        this.pendingLanguage.set(this.savedLanguage());
        this.pendingRegion.set(this.savedRegion());
        this.mobileSecondaryViewSelected.set(false);
        this.mobileSecondaryViewText.set('');
        this.settingsDialogOpen.set(true);
        this.menuOpen.set(false);
    }

    onEditAccountsClick(): void {
        console.log('Edit accounts clicked');
    }

    onManageAccountClick(): void {
        console.log('Manage account clicked');
    }

    onResetAllPersonalization(): void {
        console.log('Reset all personalization');
        this.toastReset()?.open();
    }

    onThemeSelectionChange(event: any): void {
        const selectedItem = event.detail?.item;
        if (selectedItem?.itemKey) {
            this.pendingTheme.set(selectedItem.itemKey);
            console.log(`Theme changed to: ${selectedItem.itemKey}`);
        }
    }

    onLanguageChange(event: UI5WrapperCustomEvent<Select, 'ui5Change'>): void {
        const selected = event.detail.selectedOption;
        if (selected) {
            this.pendingLanguage.set(selected.textContent?.trim() ?? '');
        }
    }

    onRegionChange(event: UI5WrapperCustomEvent<Select, 'ui5Change'>): void {
        const selected = event.detail.selectedOption;
        if (selected) {
            this.pendingRegion.set(selected.textContent?.trim() ?? '');
        }
    }

    onMobileSelectionChange(_event: UI5WrapperCustomEvent<UserSettingsItem, 'ui5SelectionChange'>): void {
        this.mobileSecondaryViewSelected.set(false);
        this.mobileSecondaryViewText.set('');
    }

    onMobileButtonClick(platform: string): void {
        this.mobileSecondaryViewSelected.set(true);
        this.mobileSecondaryViewText.set(platform);
    }

    onNotificationsChange(event: any): void {
        this.pendingNotifications.set(event.currentTarget?.checked ?? false);
    }

    onBannerAlertsChange(event: any): void {
        this.pendingBannerAlerts.set(event.currentTarget?.checked ?? false);
    }

    onResetPersonalization(): void {
        console.log('Personalization reset');
        this.toastReset()?.open();
    }

    onResetAllSettings(): void {
        console.log('All settings reset');
        this.toastResetAll()?.open();
    }

    onSave(): void {
        this.savedTheme.set(this.pendingTheme());
        this.savedNotifications.set(this.pendingNotifications());
        this.savedBannerAlerts.set(this.pendingBannerAlerts());
        this.savedLanguage.set(this.pendingLanguage());
        this.savedRegion.set(this.pendingRegion());

        this.lastAction.set(
            `Saved — theme: ${this.savedTheme()}, language: ${this.savedLanguage()}, notifications: ${this.savedNotifications()}`
        );
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
