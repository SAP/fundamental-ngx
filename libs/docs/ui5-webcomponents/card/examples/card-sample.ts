import { Component, computed, effect, signal } from '@angular/core';
import { ObjectStatus, ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Card } from '@fundamental-ngx/ui5-webcomponents/card';
import { CardHeader } from '@fundamental-ngx/ui5-webcomponents/card-header';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { ProgressIndicator } from '@fundamental-ngx/ui5-webcomponents/progress-indicator';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';
import 'fundamental-styles/dist/panel.css';
import 'fundamental-styles/dist/section.css';

// Import SAP UI Common CSS
import '@sap-ui/common-css/dist/sap-flex.css';
import '@sap-ui/common-css/dist/sap-margin.css';
import '@sap-ui/common-css/dist/sap-padding.css';
import '@sap-ui/common-css/dist/sap-text.css';

@Component({
    selector: 'ui5-card-sample',
    templateUrl: './card-sample.html',
    standalone: true,
    imports: [Card, CardHeader, Button, Icon, Label, Tag, Avatar, ProgressIndicator, ObjectStatusComponent],
    styles: [
        `
            /* Additional utility classes not available in common-css */
            .sap-text-align-center {
                text-align: center;
            }
            .sap-text-weight-bold {
                font-weight: bold;
            }
            .sap-text-color-positive {
                color: var(--sapSuccessColor);
            }
            .sap-text-color-information {
                color: var(--sapInformationColor);
            }
            .sap-text-color-neutral {
                color: var(--sapNeutralTextColor);
            }
            .sap-width-full {
                width: 100%;
            }
        `
    ]
})
export class CardExample {
    // Basic card configuration signals
    readonly showLoading = signal<boolean>(false);
    readonly loadingDelay = signal<number>(3000);
    readonly interactive = signal<boolean>(false);

    // Content state signals
    readonly currentView = signal<string>('overview');
    readonly refreshing = signal<boolean>(false);

    // Demo data signals
    readonly salesData = signal<Array<{ month: string; value: number; trend: string }>>([
        { month: 'Jan', value: 125000, trend: 'up' },
        { month: 'Feb', value: 138000, trend: 'up' },
        { month: 'Mar', value: 142000, trend: 'up' },
        { month: 'Apr', value: 135000, trend: 'down' },
        { month: 'May', value: 148000, trend: 'up' }
    ]);

    readonly teamMembers = signal<Array<{ name: string; role: string; avatar: string; status: string }>>([
        { name: 'Alice Johnson', role: 'Product Manager', avatar: 'AJ', status: 'online' },
        { name: 'Bob Smith', role: 'Developer', avatar: 'BS', status: 'online' },
        { name: 'Carol Davis', role: 'Designer', avatar: 'CD', status: 'busy' },
        { name: 'David Wilson', role: 'QA Engineer', avatar: 'DW', status: 'offline' }
    ]);

    readonly products = signal<Array<{ name: string; price: number; stock: number; image: string; category: string }>>([
        {
            name: 'Wireless Headphones',
            price: 299.99,
            stock: 15,
            image: 'https://picsum.photos/300/200?id=1',
            category: 'Electronics'
        },
        {
            name: 'Smart Watch',
            price: 399.99,
            stock: 8,
            image: 'https://picsum.photos/300/200?id=2',
            category: 'Wearables'
        },
        {
            name: 'Laptop Stand',
            price: 79.99,
            stock: 25,
            image: 'https://picsum.photos/300/200?id=3',
            category: 'Accessories'
        },
        {
            name: 'USB-C Hub',
            price: 49.99,
            stock: 32,
            image: 'https://picsum.photos/300/200?id=4',
            category: 'Electronics'
        }
    ]);

    readonly tasks = signal<Array<{ title: string; progress: number; priority: string; assignee: string }>>([
        { title: 'UI Component Library', progress: 85, priority: 'high', assignee: 'Alice' },
        { title: 'API Documentation', progress: 60, priority: 'medium', assignee: 'Bob' },
        { title: 'User Testing', progress: 30, priority: 'high', assignee: 'Carol' },
        { title: 'Performance Optimization', progress: 45, priority: 'low', assignee: 'David' }
    ]);

    // Computed properties
    readonly totalSales = computed(() => this.salesData().reduce((sum, item) => sum + item.value, 0));

    readonly averageProgress = computed(() => {
        const tasks = this.tasks();
        return Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length);
    });

    readonly onlineMembers = computed(() => this.teamMembers().filter((member) => member.status === 'online').length);

    readonly lowStockProducts = computed(() => this.products().filter((product) => product.stock < 10).length);

    readonly viewOptions = computed(() => ['overview', 'analytics', 'details', 'settings']);
    readonly loadingDelayOptions = computed(() => [500, 1000, 2000, 3000]);

    constructor() {
        // Simulate data refresh effect
        effect(() => {
            if (this.refreshing()) {
                const timer = setTimeout(() => {
                    this.refreshing.set(false);
                }, 2000);

                return () => clearTimeout(timer);
            }
        });
    }

    // Event handlers
    onCardHeaderClick(cardType: string): void {
        console.log(`${cardType} card header clicked`);
    }

    onActionButtonClick(action: string): void {
        console.log(`Action clicked: ${action}`);
    }

    // Configuration methods
    toggleLoading(): void {
        console.log('toggleLoading called, current value:', this.showLoading());
        this.showLoading.update((loading) => !loading);
        console.log('toggleLoading new value:', this.showLoading());
    }

    refreshData(): void {
        this.refreshing.set(true);
    }

    // Utility methods
    formatCurrency(value: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

    getStatusState(status: string): ObjectStatus {
        const states: Record<string, ObjectStatus> = {
            online: 'positive',
            busy: 'critical',
            offline: 'informative'
        };
        return states[status] || 'neutral';
    }

    getStatusIcon(status: string): string {
        const icons: Record<string, string> = {
            online: 'sys-enter-2',
            busy: 'busy',
            offline: 'log'
        };
        return icons[status] || 'circle-task';
    }
}
