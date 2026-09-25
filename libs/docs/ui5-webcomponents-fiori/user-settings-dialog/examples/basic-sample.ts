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

// Import icons
import '@ui5/webcomponents-icons/dist/action-settings.js';
import '@ui5/webcomponents-icons/dist/bell.js';
import '@ui5/webcomponents-icons/dist/iphone.js';
import '@ui5/webcomponents-icons/dist/palette.js';
import '@ui5/webcomponents-icons/dist/qr-code.js';
import '@ui5/webcomponents-icons/dist/reset.js';
import '@ui5/webcomponents-icons/dist/user-settings.js';

@Component({
    selector: 'ui5-doc-user-settings-dialog-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
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
export class BasicSample {
    readonly toastReset = viewChild<Toast>('toastReset');
    readonly toastResetAll = viewChild<Toast>('toastResetAll');

    menuOpen = signal(false);
    settingsDialogOpen = signal(false);
    mobileSecondaryViewSelected = signal(false);
    mobileSecondaryViewText = signal('');

    userAccount = signal({
        avatarSrc: 'https://ui5.github.io/webcomponents/images/avatars/man_avatar_3.png',
        titleText: 'Alain Chevalier',
        subtitleText: 'alian.chevalier@sap.com',
        description: 'Delivery Manager, SAP SE'
    });

    onProfileClick(): void {
        this.menuOpen.set(true);
    }

    onMenuClose(): void {
        this.menuOpen.set(false);
    }

    onSettingsClick(): void {
        this.settingsDialogOpen.set(true);
        this.menuOpen.set(false);
    }

    onSettingsDialogOpen(): void {
        console.log('Settings dialog opened');
    }

    onSettingsDialogBeforeClose(event: Event): void {
        console.log('Settings dialog before close', event);
        if (!confirm('Are you sure you want to close the dialog?')) {
            event.preventDefault();
        }
    }

    onSettingsDialogClose(): void {
        this.settingsDialogOpen.set(false);
        console.log('Settings dialog closed');
    }

    onSettingsSelectionChange(event: UI5WrapperCustomEvent<UserSettingsDialog, 'ui5SelectionChange'>): void {
        console.log(`Selection change: ${event.detail.item.text}`, event.detail);
        if (event.detail.item.text === 'Language and Region') {
            event.detail.item.loading = true;
            event.detail.item.loadingReason = 'Language & Region loading data...';
            setTimeout(() => {
                event.detail.item.loading = false;
            }, 500);
        }
    }

    onEditAccountsClick(): void {
        console.log('Edit accounts clicked');
    }

    onManageAccountClick(): void {
        console.log('Manage account clicked');
    }

    onResetAllPersonalization(): void {
        this.toastReset()?.open();
    }

    onThemeSelectionChange(event: UI5WrapperCustomEvent<UserSettingsAppearanceView, 'ui5SelectionChange'>): void {
        const selectedItem = event.detail.item;
        if (selectedItem?.itemKey) {
            console.log(`Theme changed to: ${selectedItem.itemKey}`);
            // In a real app, you would set the theme here using setTheme from @ui5/webcomponents-base/dist/config/Theme.js
        }
    }

    onLanguageRegionSelectionChange(event: UI5WrapperCustomEvent<UserSettingsItem, 'ui5SelectionChange'>): void {
        console.log('Language and Region selection change', event.detail);
    }

    onMobileSelectionChange(_event: UI5WrapperCustomEvent<UserSettingsItem, 'ui5SelectionChange'>): void {
        this.mobileSecondaryViewSelected.set(false);
        this.mobileSecondaryViewText.set('');
    }

    onMobileButtonClick(platform: string): void {
        this.mobileSecondaryViewSelected.set(true);
        this.mobileSecondaryViewText.set(platform);
    }

    onNotificationsSelectionChange(event: any): void {
        console.log(`Notifications selection change: ${event.detail?.view?.text}`, event.detail);
    }

    onResetPersonalization(): void {
        console.log('Personalization reset');
        this.toastReset()?.open();
    }

    onResetAllSettings(): void {
        console.log('All settings reset');
        this.toastResetAll()?.open();
    }
}
