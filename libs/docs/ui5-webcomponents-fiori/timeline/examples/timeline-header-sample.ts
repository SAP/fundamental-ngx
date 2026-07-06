import { Component, computed, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Timeline } from '@fundamental-ngx/ui5-webcomponents-fiori/timeline';
import { TimelineItem } from '@fundamental-ngx/ui5-webcomponents-fiori/timeline-item';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';
import { Toolbar } from '@fundamental-ngx/ui5-webcomponents/toolbar';
import { ToolbarButton } from '@fundamental-ngx/ui5-webcomponents/toolbar-button';

import '@ui5/webcomponents-icons/dist/AllIcons.js';

interface OrderEvent {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    iconTooltip: string;
    name: string;
    timestamp: string;
    status?: 'complete' | 'shipping' | 'placed';
    eventType: 'placed' | 'confirmed' | 'fraud-check' | 'warehouse' | 'shipped' | 'delivered' | 'return';
}

@Component({
    selector: 'ui5-timeline-header-sample',
    templateUrl: './timeline-header-sample.html',
    standalone: true,
    imports: [Timeline, TimelineItem, Bar, Button, Input, Label, Tag, Text, Title, Toolbar, ToolbarButton]
})
export class TimelineHeaderSample {
    readonly searchValue = signal<string>('');
    readonly sortAscending = signal<boolean>(true);
    readonly filterStatus = signal<string | null>(null);

    readonly allEvents = signal<OrderEvent[]>([
        {
            id: '1',
            title: 'Order placed',
            subtitle: '03.11.2024 09:14',
            icon: 'cart',
            iconTooltip: 'Order placed',
            name: 'Maria Chen',
            timestamp: '2024-11-03T09:14:00Z',
            status: 'placed',
            eventType: 'placed'
        },
        {
            id: '2',
            title: 'Payment confirmed',
            subtitle: '03.11.2024 09:15',
            icon: 'credit-card',
            iconTooltip: 'Payment confirmed',
            name: 'Payment Gateway',
            timestamp: '2024-11-03T09:15:00Z',
            status: 'placed',
            eventType: 'confirmed'
        },
        {
            id: '3',
            title: 'Fraud check passed',
            subtitle: '03.11.2024 09:16',
            icon: 'shield',
            iconTooltip: 'Security check passed',
            name: 'System',
            timestamp: '2024-11-03T09:16:00Z',
            status: 'placed',
            eventType: 'fraud-check'
        },
        {
            id: '4',
            title: 'Warehouse notified',
            subtitle: '03.11.2024 12:22',
            icon: 'factory',
            iconTooltip: 'Warehouse received order',
            name: 'System',
            timestamp: '2024-11-03T12:22:00Z',
            status: 'placed',
            eventType: 'warehouse'
        },
        {
            id: '5',
            title: 'Items picked',
            subtitle: '03.11.2024 14:27',
            icon: 'checklist',
            iconTooltip: 'Items picked from warehouse',
            name: 'Warehouse Team',
            timestamp: '2024-11-03T14:27:00Z',
            status: 'shipping',
            eventType: 'warehouse'
        },
        {
            id: '6',
            title: 'Out for delivery',
            subtitle: '05.11.2024 08:12',
            icon: 'shipping-status',
            iconTooltip: 'Out for delivery',
            name: 'Carrier',
            timestamp: '2024-11-05T08:12:00Z',
            status: 'shipping',
            eventType: 'shipped'
        },
        {
            id: '7',
            title: 'Delivered',
            subtitle: '05.11.2024 14:47',
            icon: 'complete',
            iconTooltip: 'Order delivered',
            name: 'Carrier',
            timestamp: '2024-11-05T14:47:00Z',
            status: 'complete',
            eventType: 'delivered'
        },
        {
            id: '8',
            title: 'Return requested',
            subtitle: '06.11.2024 10:03',
            icon: 'undo',
            iconTooltip: 'Return requested',
            name: 'Maria Chen',
            timestamp: '2024-11-06T10:03:00Z',
            eventType: 'return'
        }
    ]);

    readonly filteredAndSortedEvents = computed(() => {
        let events = this.allEvents();

        // Filter by search
        const search = this.searchValue().toLowerCase();
        if (search) {
            events = events.filter(
                (e) =>
                    e.title.toLowerCase().includes(search) ||
                    e.name.toLowerCase().includes(search) ||
                    e.subtitle.toLowerCase().includes(search)
            );
        }

        // Filter by status
        const status = this.filterStatus();
        if (status) {
            events = events.filter((e) => e.status === status);
        }

        // Sort
        if (this.sortAscending()) {
            events = [...events].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
        } else {
            events = [...events].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
        }

        return events;
    });

    readonly totalCount = computed(() => this.filteredAndSortedEvents().length);
    readonly isFiltered = computed(() => !!this.searchValue() || !!this.filterStatus());

    onSearch(event: UI5WrapperCustomEvent<Input, 'ui5Input'>): void {
        this.searchValue.set(event.currentTarget.value || '');
    }

    toggleSort(): void {
        this.sortAscending.update((val) => !val);
    }

    setFilter(status: string | null): void {
        this.filterStatus.set(status);
    }

    clearFilters(): void {
        this.searchValue.set('');
        this.filterStatus.set(null);
    }
}
