import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarBranding } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-branding';
import { UserMenu } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu';
import { UserMenuAccount } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu-account';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';

// Import icons
import '@ui5/webcomponents-icons/dist/badge.js';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/employee.js';

interface UserAccount {
    id: string;
    name: string;
    email: string;
    icon: string;
    avatarSrc?: string;
}

@Component({
    selector: 'ui5-doc-user-menu-accounts-sample',
    templateUrl: './accounts-sample.html',
    standalone: true,
    imports: [UserMenu, UserMenuAccount, ShellBar, ShellBarBranding, Avatar]
})
export class AccountsSample {
    menuOpen = signal(false);

    accounts = signal<UserAccount[]>([
        {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@company.com',
            icon: 'customer',
            avatarSrc: 'https://ui5.github.io/webcomponents/images/avatars/man_avatar_3.png'
        },
        { id: '2', name: 'Jane Smith', email: 'jane.smith@company.com', icon: 'employee' },
        { id: '3', name: 'Bob Wilson', email: 'bob.wilson@company.com', icon: 'badge' }
    ]);

    onProfileClick(): void {
        this.menuOpen.set(true);
    }

    onChangeAccount(event: UI5WrapperCustomEvent<UserMenu, 'ui5ChangeAccount'>): void {
        const accountName = event.detail.selectedAccount.titleText || 'Unknown';
        console.log('Account changed to:', accountName);
    }

    onEditAccounts(): void {
        console.log('Edit accounts clicked');
    }

    onSignOutClick(): void {
        console.log('Sign out clicked');
    }

    onClose(): void {
        this.menuOpen.set(false);
    }
}
