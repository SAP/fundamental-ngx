import { Component, computed, effect, signal } from '@angular/core';
import { DynamicSideContent } from '@fundamental-ngx/ui5-webcomponents-fiori/dynamic-side-content';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

// Import CSS utilities
import '@sap-ui/common-css/dist/sap-display.css';
import '@sap-ui/common-css/dist/sap-flex.css';
import '@sap-ui/common-css/dist/sap-margin.css';
import '@sap-ui/common-css/dist/sap-padding.css';
import '@sap-ui/common-css/dist/sap-text.css';
import '@sap-ui/common-css/dist/sap-title.css';
import 'fundamental-styles/dist/section.css';

// Product data interface
interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: 'available' | 'limited' | 'out-of-stock';
}

// Notification data interface
interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    priority: 'high' | 'medium' | 'low';
    read: boolean;
}

@Component({
    selector: 'ui5-dynamic-side-content-sample',
    templateUrl: './dynamic-side-content-sample.html',
    standalone: true,
    imports: [
        DynamicSideContent,
        Button,
        List,
        ListItemStandard,
        SegmentedButton,
        SegmentedButtonItem,
        Switch,
        Tag,
        Text,
        Title
    ]
})
export class DynamicSideContentSample {
    // Using Angular 20 signals for reactive state management
    readonly sideContentPosition = signal<'Start' | 'End'>('End');
    readonly sideContentVisibility = signal<'ShowAboveS' | 'ShowAboveM' | 'ShowAboveL' | 'AlwaysShow' | 'NeverShow'>(
        'ShowAboveS'
    );
    readonly sideContentFallDown = signal<'BelowL' | 'BelowM' | 'BelowXL' | 'OnMinimumWidth'>('OnMinimumWidth');
    readonly equalSplit = signal<boolean>(false);
    readonly hideMainContent = signal<boolean>(false);
    readonly hideSideContent = signal<boolean>(false);

    // Example 2: Product catalog state
    readonly selectedProduct = signal<Product | null>(null);
    readonly products = signal<Product[]>([
        { id: 'P001', name: 'Laptop Pro 15"', category: 'Electronics', price: 1299.99, stock: 15, status: 'available' },
        { id: 'P002', name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 3, status: 'limited' },
        { id: 'P003', name: 'USB-C Hub', category: 'Accessories', price: 49.99, stock: 0, status: 'out-of-stock' },
        { id: 'P004', name: 'Monitor 27"', category: 'Electronics', price: 399.99, stock: 8, status: 'available' }
    ]);

    // Example 3: Notifications state
    readonly notifications = signal<Notification[]>([
        {
            id: 'N001',
            title: 'System Update',
            message: 'A new system update is ready to install.',
            timestamp: new Date('2024-12-06T10:30:00'),
            priority: 'high',
            read: false
        },
        {
            id: 'N002',
            title: 'New Message',
            message: 'You have a new message.',
            timestamp: new Date('2024-12-06T09:15:00'),
            priority: 'medium',
            read: false
        },
        {
            id: 'N003',
            title: 'Backup Completed',
            message: 'Backup completed successfully.',
            timestamp: new Date('2024-12-06T08:00:00'),
            priority: 'low',
            read: true
        }
    ]);

    // Computed properties using Angular 20 computed signals
    readonly unreadNotifications = computed(() => this.notifications().filter((n) => !n.read).length);
    readonly highPriorityNotifications = computed(
        () => this.notifications().filter((n) => n.priority === 'high').length
    );
    readonly availableProducts = computed(() => this.products().filter((p) => p.status === 'available').length);
    readonly currentBreakpoint = signal<string>('Unknown');

    // Accessibility attributes
    readonly accessibilityAttributes = computed(() => ({
        mainContent: {
            ariaLabel: 'Main content area with primary information'
        },
        sideContent: {
            ariaLabel: 'Side content area with additional details'
        }
    }));

    // Configuration computed for display
    readonly config = computed(() => ({
        position: this.sideContentPosition(),
        visibility: this.sideContentVisibility(),
        fallDown: this.sideContentFallDown(),
        equalSplit: this.equalSplit(),
        hideMain: this.hideMainContent(),
        hideSide: this.hideSideContent()
    }));

    // Effect to log configuration changes (Angular 20 effect API)
    private readonly configEffect = effect(() => {
        const config = this.config();
        console.log('DynamicSideContent configuration updated:', config);
    });

    // Event handlers
    onLayoutChange(event: CustomEvent): void {
        const detail = event.detail;
        console.log('Layout changed:', detail);
        this.currentBreakpoint.set(detail.currentBreakpoint || 'Unknown');
    }

    togglePosition(): void {
        this.sideContentPosition.update((pos) => (pos === 'End' ? 'Start' : 'End'));
    }

    toggleEqualSplit(): void {
        this.equalSplit.update((split) => !split);
    }

    toggleMainContent(): void {
        this.hideMainContent.update((hide) => !hide);
    }

    toggleSideContent(): void {
        this.hideSideContent.update((hide) => !hide);
    }

    onVisibilityChange(event: Event): void {
        const target = event.target as HTMLElement;
        const selectedItem = target.querySelector('[selected]');
        if (selectedItem) {
            const visibility = selectedItem.getAttribute('data-visibility') as any;
            if (visibility) {
                this.sideContentVisibility.set(visibility);
            }
        }
    }

    onFallDownChange(event: Event): void {
        const target = event.target as HTMLElement;
        const selectedItem = target.querySelector('[selected]');
        if (selectedItem) {
            const fallDown = selectedItem.getAttribute('data-falldown') as any;
            if (fallDown) {
                this.sideContentFallDown.set(fallDown);
            }
        }
    }

    // Product selection
    selectProduct(product: Product): void {
        this.selectedProduct.set(product);
    }

    clearProductSelection(): void {
        this.selectedProduct.set(null);
    }

    getProductStatusDesign(status: string): 'Positive' | 'Negative' | 'Critical' | 'Neutral' {
        switch (status) {
            case 'available':
                return 'Positive';
            case 'limited':
                return 'Critical';
            case 'out-of-stock':
                return 'Negative';
            default:
                return 'Neutral';
        }
    }

    // Notification actions
    markAsRead(notificationId: string): void {
        this.notifications.update((notifications) =>
            notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
        );
    }

    markAllAsRead(): void {
        this.notifications.update((notifications) => notifications.map((n) => ({ ...n, read: true })));
    }

    deleteNotification(notificationId: string): void {
        this.notifications.update((notifications) => notifications.filter((n) => n.id !== notificationId));
    }

    getPriorityDesign(priority: string): 'Negative' | 'Critical' | 'Information' | 'Neutral' {
        switch (priority) {
            case 'high':
                return 'Negative';
            case 'medium':
                return 'Critical';
            case 'low':
                return 'Information';
            default:
                return 'Neutral';
        }
    }

    formatTimestamp(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    }
}
