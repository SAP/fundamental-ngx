import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarBranding } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-branding';
import { UserMenu } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu';
import { UserMenuAccount } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu-account';
import { UserMenuItem } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu-item';
import { UserSettingsAccountView } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-account-view';
import { UserSettingsDialog } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-dialog';
import { UserSettingsItem } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-item';
import { UserSettingsView } from '@fundamental-ngx/ui5-webcomponents-fiori/user-settings-view';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { ComboBox } from '@fundamental-ngx/ui5-webcomponents/combo-box';
import { ComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/combo-box-item';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { Panel } from '@fundamental-ngx/ui5-webcomponents/panel';
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

interface ComboBoxOption {
    text: string;
    additionalText?: string;
}

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
        UserSettingsDialog,
        UserSettingsItem,
        UserSettingsView,
        Avatar,
        Button,
        CheckBox,
        ComboBox,
        ComboBoxItem,
        Label,
        List,
        ListItemStandard,
        Panel,
        Text,
        Toast,
        Icon
    ],
    styles: [
        `
            .language-region-container {
                display: flex;
                min-height: 2.5rem;
                align-item: flex-start;
                flex-direction: column;
                gap: 0.563rem;
            }
            .language-region-label {
                display: flex;
                flex: 1 0 0;
                width: 100%;
            }
            .language-region-control {
                display: flex;
                gap: 0.188rem;
                width: 100%;
            }
            .save-btn {
                position: absolute;
                bottom: 1rem;
            }
            .ua-panel {
                border-top: 2px solid lightgrey;
                margin: 1rem 0;
            }
        `
    ]
})
export class BasicSample {
    menuOpen = signal(false);
    settingsDialogOpen = signal(false);
    mobileSecondaryViewSelected = signal(false);
    secondaryViewText = signal('');

    // User account data
    userAccount = signal({
        avatarSrc: 'https://ui5.github.io/webcomponents/images/avatars/man_avatar_3.png',
        titleText: 'Alain Chevalier',
        subtitleText: 'alian.chevalier@sap.com',
        description: 'Delivery Manager, SAP SE'
    });

    // Theme options
    themes = signal<string[]>([
        'SAP Morning Horizon',
        'SAP Evening Horizon',
        'SAP High Contrast Black (SAP Horizon)',
        'SAP High Contrast White (SAP Horizon)'
    ]);

    // Language and region options
    languages = signal<ComboBoxOption[]>([
        { text: 'Browser Language', additionalText: 'English' },
        { text: 'English (United Kingdom)', additionalText: 'English (United Kingdom)' },
        { text: 'English (United States)', additionalText: 'English (United States)' },
        { text: 'French (France)', additionalText: 'Français (France)' },
        { text: 'French (Canada)', additionalText: 'Français (Canada)' },
        { text: 'German (Germany)', additionalText: 'Deutsch (Deutschland)' },
        { text: 'German (Switzerland)', additionalText: 'Deutsch (Schweiz)' },
        { text: 'Japanese', additionalText: '日本語 (日本)' },
        { text: 'Portuguese (Brazil)', additionalText: 'Português (Brasil)' },
        { text: 'Simplified Chinese (China)', additionalText: '简体中文（中国)' },
        { text: 'Spanish (Mexico)', additionalText: 'Español (América Latina)' },
        { text: 'Spanish (Spain)', additionalText: 'Español (España)' }
    ]);

    regions = signal<ComboBoxOption[]>([
        { text: 'United Kingdom', additionalText: 'GB' },
        { text: 'United States', additionalText: 'US' },
        { text: 'French (France)', additionalText: 'FR' },
        { text: 'French (Canada)', additionalText: 'CA' },
        { text: 'German (Germany)', additionalText: 'DE' },
        { text: 'German (Switzerland)', additionalText: 'CH' },
        { text: 'Japanese', additionalText: 'JP' },
        { text: 'Portuguese (Brazil)', additionalText: 'BR' },
        { text: 'Simplified Chinese (China)', additionalText: 'CN' },
        { text: 'Spanish (Mexico)', additionalText: 'MX' },
        { text: 'Spanish (Spain)', additionalText: 'ES' }
    ]);

    dateFormats = signal<ComboBoxOption[]>([
        { text: 'MM/DD/YYYY', additionalText: 'e.g. 10/23/2025' },
        { text: 'MM.DD.YYYY', additionalText: 'e.g. 10.23.2025' },
        { text: 'MM-DD-YYYY', additionalText: 'e.g. 10-23-2025' },
        { text: 'DD/MM/YYYY', additionalText: 'e.g. 23/10/2025' },
        { text: 'DD.MM.YYYY', additionalText: 'e.g. 23.10.2025' },
        { text: 'DD-MM-YYYY', additionalText: 'e.g. 23-10-2025' },
        { text: 'YYYY/MM/DD', additionalText: 'e.g. 2025/10/23' },
        { text: 'YYYY.MM.DD', additionalText: 'e.g. 2025.10.23' },
        { text: 'YYYY-MM-DD', additionalText: 'e.g. 2025-10-23' }
    ]);

    timeFormats = signal<ComboBoxOption[]>([
        { text: '24 Hour', additionalText: 'e.g. 12:05:10' },
        { text: '12 Hour', additionalText: 'e.g. 12:05:10 PM' },
        { text: '12 Hour (lowercase)', additionalText: 'e.g. 12:05:10 pm' },
        { text: 'Hours from 0 to 11', additionalText: 'e.g. 00:05:10 PM' },
        { text: 'Hours from 0 to 11 (lowercase)', additionalText: 'e.g. 00:05:10 pm' }
    ]);

    timeZones = signal<ComboBoxOption[]>([
        { text: 'Pacific Time (UTC -08:00)', additionalText: 'Sacramento, United States' },
        { text: 'Mountain Time (UTC -07:00)', additionalText: 'Denver, United States' },
        { text: 'Central Time (UTC -06:00)', additionalText: 'Austin, United States' },
        { text: 'Eastern Standard Time (UTC -05:00)', additionalText: 'Washington, United States' },
        { text: 'Atlantic Time (UTC -04:00)', additionalText: 'Halifax, Canada' },
        { text: 'Greenwich Mean Time (UTC +00:00)', additionalText: 'London, United Kingdom' },
        { text: 'Central European Time (UTC +01:00)', additionalText: 'Berlin, Germany' },
        { text: 'Japan Standard Time (UTC +09:00)', additionalText: 'Tokyo, Japan' }
    ]);

    currencies = signal<ComboBoxOption[]>([
        { text: 'USD - United States Dollar', additionalText: 'USD' },
        { text: 'Euro', additionalText: 'EUR' },
        { text: 'British Pound', additionalText: 'GBP' },
        { text: 'Japanese Yen', additionalText: 'JPY' },
        { text: 'Swiss Franc', additionalText: 'CHF' },
        { text: 'Canadian Dollar', additionalText: 'CAD' }
    ]);

    numberFormats = signal<ComboBoxOption[]>([
        { text: '1.234,56', additionalText: 'Germany' },
        { text: '1,234.56', additionalText: 'US/UK' },
        { text: '1 234,56', additionalText: 'France' },
        { text: "1'234.56", additionalText: 'Switzerland' },
        { text: '1234,56', additionalText: 'SI/SO Format' }
    ]);

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

    onSettingsDialogClose(): void {
        this.settingsDialogOpen.set(false);
    }

    onThemeSave(): void {
        console.log('Theme saved');
    }

    onMobileSelectionChange(_event: UI5WrapperCustomEvent<UserSettingsItem, 'ui5SelectionChange'>): void {
        this.mobileSecondaryViewSelected.set(false);
        this.secondaryViewText.set('');
    }

    onSecondaryViewSelected(mobileSetting: string): void {
        this.mobileSecondaryViewSelected.set(true);
        this.secondaryViewText.set(mobileSetting);
    }

    onResetPersonalization(): void {
        console.log('Personalization reset');
    }

    onResetAll(): void {
        console.log('All settings reset');
    }
}
