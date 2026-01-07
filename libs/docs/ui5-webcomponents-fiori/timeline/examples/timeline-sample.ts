import { Component, computed, effect, signal } from '@angular/core';
import { Timeline } from '@fundamental-ngx/ui5-webcomponents-fiori/timeline';
import { TimelineItem } from '@fundamental-ngx/ui5-webcomponents-fiori/timeline-item';
import { TimelineGrowingMode, TimelineLayout } from '@fundamental-ngx/ui5-webcomponents-fiori/types';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Card } from '@fundamental-ngx/ui5-webcomponents/card';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

// Import Fundamental Styles for layout and theming
import { TitleCasePipe } from '@angular/common';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';
import 'fundamental-styles/dist/panel.css';
import 'fundamental-styles/dist/section.css';

// Timeline data interface for type safety
interface TimelineEventData {
    id: string;
    title: string;
    subtitle: string;
    timestamp: string;
    description: string;
    icon?: string;
    userName?: string;
    status?: 'success' | 'warning' | 'error' | 'information' | 'neutral';
}

@Component({
    selector: 'ui5-timeline-sample',
    templateUrl: './timeline-sample.html',
    standalone: true,
    imports: [
        Timeline,
        TimelineItem,
        Button,
        SegmentedButton,
        SegmentedButtonItem,
        Switch,
        Text,
        Card,
        Tag,
        TitleCasePipe
    ]
})
export class TimelineExample {
    // Using Angular 20 signals for reactive state management
    readonly currentLayout = signal<TimelineLayout>(TimelineLayout.Vertical);
    readonly currentGrowingMode = signal<TimelineGrowingMode>(TimelineGrowingMode.None);
    readonly isLoading = signal<boolean>(false);
    readonly loadingDelay = signal<number>(1000);
    readonly accessibleName = signal<string>('Timeline demonstration');
    readonly timelineData = signal<TimelineEventData[]>([
        {
            id: '1',
            title: 'Project Kickoff',
            subtitle: 'Initial meeting completed',
            timestamp: '2024-01-15T09:00:00Z',
            description:
                'Project requirements gathered and team roles assigned. All stakeholders aligned on project scope and timeline.',
            icon: 'map',
            userName: 'Sarah Johnson',
            status: 'success'
        },
        {
            id: '2',
            title: 'Design Phase',
            subtitle: 'UI/UX designs approved',
            timestamp: '2024-01-22T14:30:00Z',
            description:
                'Final design mockups reviewed and approved by all stakeholders. Ready to proceed with development.',
            icon: 'palette',
            userName: 'Mike Chen',
            status: 'success'
        },
        {
            id: '3',
            title: 'Development Sprint 1',
            subtitle: 'Backend API completed',
            timestamp: '2024-02-05T16:45:00Z',
            description: 'Core API endpoints implemented with authentication and basic CRUD operations.',
            icon: 'settings',
            userName: 'Alex Rodriguez',
            status: 'success'
        },
        {
            id: '4',
            title: 'Frontend Integration',
            subtitle: 'UI components connected',
            timestamp: '2024-02-12T11:20:00Z',
            description:
                'Frontend components integrated with backend APIs. User interface is functional and responsive.',
            icon: 'chain-link',
            userName: 'Lisa Park',
            status: 'information'
        },
        {
            id: '5',
            title: 'Testing Phase',
            subtitle: 'Quality assurance in progress',
            timestamp: '2024-02-18T10:00:00Z',
            description: 'Comprehensive testing cycle initiated. Several edge cases identified and being addressed.',
            icon: 'checklist',
            userName: 'David Kim',
            status: 'warning'
        }
    ]);

    // Computed properties using Angular 20 computed signals
    readonly layoutOptions = computed(() => Object.values(TimelineLayout));
    readonly growingModeOptions = computed(() => Object.values(TimelineGrowingMode));
    readonly totalEvents = computed(() => this.timelineData().length);
    readonly timelineConfig = computed(() => ({
        layout: this.currentLayout(),
        growing: this.currentGrowingMode(),
        loading: this.isLoading(),
        loadingDelay: this.loadingDelay(),
        accessibleName: this.accessibleName()
    }));

    // Effect to demonstrate Angular 20 effect API (runs when signals change)
    private readonly configEffect = effect(() => {
        const config = this.timelineConfig();
        console.log('Timeline configuration updated:', config);
    });

    // Event handlers with signal updates
    onLayoutChange(event: CustomEvent): void {
        const target = event.target as HTMLElement;
        const selectedItem = target.querySelector('[selected]');
        if (selectedItem) {
            const layout = selectedItem.getAttribute('data-layout') as TimelineLayout;
            if (layout) {
                this.currentLayout.set(layout);
            }
        }
    }

    onGrowingModeChange(event: CustomEvent): void {
        const target = event.target as HTMLElement;
        const selectedItem = target.querySelector('[selected]');
        if (selectedItem) {
            const growingMode = selectedItem.getAttribute('data-growing') as TimelineGrowingMode;
            if (growingMode) {
                this.currentGrowingMode.set(growingMode);
            }
        }
    }

    onLoadingToggle(): void {
        this.isLoading.update((loading) => !loading);
    }

    onLoadMore(event: CustomEvent): void {
        console.log('Load more events requested:', event);
        // Simulate loading more data
        this.isLoading.set(true);

        setTimeout(() => {
            const currentData = this.timelineData();
            const newEvents: TimelineEventData[] = [
                {
                    id: `${currentData.length + 1}`,
                    title: 'New Event',
                    subtitle: 'Dynamically loaded',
                    timestamp: new Date().toISOString(),
                    description: 'This event was loaded dynamically when the load more action was triggered.',
                    icon: 'add',
                    userName: 'System',
                    status: 'neutral'
                }
            ];

            this.timelineData.update((data) => [...data, ...newEvents]);
            this.isLoading.set(false);
        }, 1500);
    }

    addNewEvent(): void {
        const currentData = this.timelineData();
        const newEvent: TimelineEventData = {
            id: `${currentData.length + 1}`,
            title: `New Event ${currentData.length + 1}`,
            subtitle: 'Manually added event',
            timestamp: new Date().toISOString(),
            description: 'This event was added programmatically using Angular signals.',
            icon: 'add-activity',
            userName: 'Current User',
            status: 'information'
        };

        this.timelineData.update((data) => [...data, newEvent]);
    }

    clearEvents(): void {
        this.timelineData.set([]);
    }

    resetToDefault(): void {
        this.currentLayout.set(TimelineLayout.Vertical);
        this.currentGrowingMode.set(TimelineGrowingMode.None);
        this.isLoading.set(false);
        this.loadingDelay.set(1000);
        this.timelineData.set([
            {
                id: '1',
                title: 'Project Kickoff',
                subtitle: 'Initial meeting completed',
                timestamp: '2024-01-15T09:00:00Z',
                description: 'Project requirements gathered and team roles assigned.',
                icon: 'rocket',
                userName: 'Sarah Johnson',
                status: 'success'
            }
        ]);
    }

    formatTimestamp(timestamp: string): string {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(timestamp));
    }

    getStatusVariant(status: string): string {
        const statusMap: Record<string, string> = {
            success: '3',
            warning: '2',
            error: '1',
            information: '6',
            neutral: '7'
        };
        return statusMap[status] || '7';
    }
}
