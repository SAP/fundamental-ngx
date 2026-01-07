import { Component, signal } from '@angular/core';
import { Page } from '@fundamental-ngx/ui5-webcomponents-fiori/page';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarBranding } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-branding';
import { SideNavigation } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation';
import { SideNavigationGroup } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-group';
import { SideNavigationItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-item';
import { SideNavigationSubItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-sub-item';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Dialog } from '@fundamental-ngx/ui5-webcomponents/dialog';
import { ResponsivePopover } from '@fundamental-ngx/ui5-webcomponents/responsive-popover';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import icons used in the example
import '@ui5/webcomponents-icons/dist/calendar.js';
import '@ui5/webcomponents-icons/dist/chain-link.js';
import '@ui5/webcomponents-icons/dist/compare.js';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/group.js';
import '@ui5/webcomponents-icons/dist/history.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/locate-me.js';
import '@ui5/webcomponents-icons/dist/menu2.js';
import '@ui5/webcomponents-icons/dist/widgets.js';
import '@ui5/webcomponents-icons/dist/write-new.js';

const dummyText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

interface NavigationSubItem {
    text: string;
    href: string;
    id: string;
}

interface NavigationItem {
    text: string;
    icon?: string;
    href?: string;
    id?: string;
    selected?: boolean;
    expanded?: boolean;
    unselectable?: boolean;
    design?: 'Default' | 'Action';
    target?: string;
    subItems?: NavigationSubItem[];
}

interface NavigationGroup {
    text: string;
    expanded?: boolean;
    items: NavigationItem[];
}

interface ContentSection {
    id: string;
    title: string;
    content: string;
}

@Component({
    selector: 'ui5-doc-side-navigation-overlay-mode-sample',
    templateUrl: './overlay-mode-sample.html',
    styles: [
        `
            #respPopover::part(content) {
                padding: 0;
                overflow-x: visible;
                overflow-y: hidden;
            }

            .content {
                padding: 2rem;
            }

            .contentItem {
                display: none;
            }

            .contentItemVisible {
                display: block;
            }

            #sideNavigation {
                width: 18rem;
                box-shadow: none;
                border-inline-end: none;
            }
        `
    ],
    standalone: true,
    imports: [
        Bar,
        Button,
        Dialog,
        SideNavigation,
        SideNavigationGroup,
        SideNavigationItem,
        SideNavigationSubItem,
        Text,
        Page,
        ShellBar,
        ShellBarBranding,
        Title,
        ResponsivePopover
    ]
})
export class OverlayModeSample {
    isPopoverOpen = signal(false);
    isDialogOpen = signal(false);
    selectedContentId = signal('contHome');

    // Navigation data structure
    mainNavigationItems = signal<NavigationItem[]>([
        {
            text: 'Home',
            icon: 'home',
            href: '#contHome',
            id: 'contHome',
            selected: true
        }
    ]);

    navigationGroups = signal<NavigationGroup[]>([
        {
            text: 'Group 1',
            expanded: true,
            items: [
                {
                    text: 'People',
                    icon: 'group',
                    href: '#contItem1',
                    id: 'contItem1',
                    subItems: [
                        { text: 'From My Team', href: '#contSubitem1', id: 'contSubitem1' },
                        { text: 'From Other Teams', href: '#contSubitem2', id: 'contSubitem2' }
                    ]
                },
                {
                    text: 'Recent Applications for user role',
                    icon: 'history',
                    href: '#contItem2',
                    id: 'contItem2'
                }
            ]
        },
        {
            text: 'Group 2',
            expanded: true,
            items: [
                {
                    text: 'Locations',
                    icon: 'locate-me',
                    href: '#contItem3',
                    id: 'contItem3'
                },
                {
                    text: 'Events',
                    icon: 'calendar',
                    expanded: true,
                    unselectable: true,
                    subItems: [
                        { text: 'Local', href: '#contSubitem3', id: 'contSubitem3' },
                        { text: 'Others', href: '#contSubitem4', id: 'contSubitem4' }
                    ]
                }
            ]
        }
    ]);

    fixedItems = signal<NavigationItem[]>([
        {
            text: 'Create',
            icon: 'write-new',
            design: 'Action',
            unselectable: true,
            id: 'quickAction'
        },
        {
            text: 'App Finder',
            icon: 'widgets',
            href: 'https://openui5.hana.ondemand.com/demoapps',
            target: '_blank'
        },
        {
            text: 'Legal',
            icon: 'compare',
            href: 'https://www.sap.com/about/legal/impressum.html',
            target: '_blank'
        }
    ]);

    // Content sections
    contentSections = signal<ContentSection[]>([
        {
            id: 'contHome',
            title: 'Home',
            content: dummyText
        },
        {
            id: 'contItem1',
            title: 'People',
            content: dummyText
        },
        {
            id: 'contItem2',
            title: 'Recent Applications for user role',
            content: dummyText
        },
        {
            id: 'contItem3',
            title: 'Locations',
            content: dummyText
        },
        {
            id: 'contSubitem1',
            title: 'From My Team',
            content: dummyText
        },
        {
            id: 'contSubitem2',
            title: 'From Other Teams',
            content: dummyText
        },
        {
            id: 'contSubitem3',
            title: 'Local Events',
            content: dummyText
        },
        {
            id: 'contSubitem4',
            title: 'Other Events',
            content: dummyText
        }
    ]);

    togglePopover(): void {
        this.isPopoverOpen.update((isOpen) => !isOpen);
    }

    onNavigationChange(event: any): void {
        const selectedItem = event.detail.item;
        const href = selectedItem.getAttribute('href');

        if (href && href.startsWith('#')) {
            const contentId = href.substring(1);
            this.selectedContentId.set(contentId);
        }

        // Close popover after selection
        this.isPopoverOpen.set(false);
    }

    isContentVisible(contentId: string): boolean {
        return this.selectedContentId() === contentId;
    }

    openDialog(): void {
        this.isDialogOpen.set(true);
    }

    closeDialog(): void {
        this.isDialogOpen.set(false);
    }
}
