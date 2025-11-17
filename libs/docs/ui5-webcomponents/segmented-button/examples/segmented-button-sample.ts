import { TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, computed, effect, signal, ViewChild } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { SegmentedButtonSelectionMode } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';
import 'fundamental-styles/dist/panel.css';
import 'fundamental-styles/dist/section.css';

@Component({
    selector: 'ui5-segmented-button-sample',
    templateUrl: './segmented-button-sample.html',
    standalone: true,
    imports: [SegmentedButton, SegmentedButtonItem, Button, TitleCasePipe]
})
export class SegmentedButtonExample implements AfterViewInit {
    readonly basicSelectedItems = signal<string[]>(['Option 2']); // Initialize with the pre-selected item

    // Reactive section event-based tracking (for comparison with reactive approach)
    readonly reactiveEventBasedItems = signal<string[]>(['🍌 Banana', '🍇 Grape']); // Initialize with pre-selected items

    // Configuration example signals
    readonly configurableSelectedItems = signal<string[]>([]);
    readonly currentSelectionMode = signal<SegmentedButtonSelectionMode>(SegmentedButtonSelectionMode.Single);
    readonly isDisabled = signal<boolean>(false);

    // Multiple selection example signals
    readonly multipleSelectedItems = signal<string[]>(['Item B', 'Item D']);

    // Single selection example signals
    readonly singleSelectedItems = signal<string[]>(['Choice 2']);

    // Theme selector signals
    readonly themeOptions = signal<string[]>(['light', 'dark', 'auto']);
    readonly currentTheme = signal<string>('light');

    // View type selector signals
    readonly viewTypes = signal<string[]>(['grid', 'list', 'card']);
    readonly currentViewType = signal<string>('grid');

    // Priority selector signals
    readonly priorityLevels = signal<string[]>(['low', 'medium', 'high', 'critical']);
    readonly selectedPriority = signal<string>('medium');

    // Status workflow signals
    readonly statusOptions = signal<string[]>(['draft', 'review', 'approved', 'published']);
    readonly currentStatus = signal<string>('draft');

    // ViewChild references to demonstrate direct access to selectedItems signal
    @ViewChild('basicSegmentedButton') basicSegmentedButton!: SegmentedButton;
    @ViewChild('reactiveSegmentedButton') reactiveSegmentedButton!: SegmentedButton;

    // Signal to track when ViewChild is ready
    readonly viewInitialized = signal(false);

    // Options for different selection modes
    readonly selectionModes = computed(() => Object.values(SegmentedButtonSelectionMode));

    // Computed properties using Angular 20 features
    readonly basicSelectedItemsDisplay = computed(() => {
        const items = this.basicSelectedItems();
        return items.length > 0 ? items.join(', ') : 'No items selected';
    });

    readonly configurableSelectedItemsDisplay = computed(() => {
        const items = this.configurableSelectedItems();
        return items.length > 0 ? items.join(', ') : 'No items selected';
    });

    readonly multipleSelectedItemsDisplay = computed(() => {
        const items = this.multipleSelectedItems();
        return items.length > 0 ? items.join(', ') : 'No items selected';
    });

    readonly singleSelectedItemsDisplay = computed(() => {
        const items = this.singleSelectedItems();
        return items.length > 0 ? items.join(', ') : 'No items selected';
    });

    readonly reactiveEventBasedItemsDisplay = computed(() => {
        const items = this.reactiveEventBasedItems();
        return items.length > 0 ? items.join(', ') : 'No items selected';
    });

    readonly isMultipleMode = computed(() => this.currentSelectionMode() === SegmentedButtonSelectionMode.Multiple);

    readonly isSingleMode = computed(() => this.currentSelectionMode() === SegmentedButtonSelectionMode.Single);

    // Computed properties that showcase reactive selectedItems from the component
    readonly reactiveSelectedItemsText = computed(() => {
        // Wait for view to be initialized and ViewChild to be available
        if (!this.viewInitialized() || !this.reactiveSegmentedButton?.selectedItems) {
            return 'Initializing...';
        }
        const items = this.reactiveSegmentedButton.selectedItems();
        return items.map((item) => item.innerText || item.textContent || 'Unknown').join(', ') || 'No selection';
    });

    readonly reactiveSelectedItemsCount = computed(() => {
        if (!this.viewInitialized() || !this.reactiveSegmentedButton?.selectedItems) {
            return 0;
        }
        return this.reactiveSegmentedButton.selectedItems().length;
    });

    // Combined reactive state showing both event data and direct signal access
    readonly combinedReactiveState = computed(() => {
        const eventBasedItems = this.basicSelectedItems();

        // Check if the component is ready
        if (!this.viewInitialized() || !this.basicSegmentedButton?.selectedItems) {
            return {
                fromEvent: eventBasedItems,
                fromSignal: ['Initializing...'],
                areEqual: false
            };
        }

        const signalBasedItems = this.basicSegmentedButton.selectedItems();
        const signalItemTexts = signalBasedItems.map((item) => item.innerText || item.textContent || 'Unknown');

        return {
            fromEvent: eventBasedItems,
            fromSignal: signalItemTexts,
            areEqual: JSON.stringify(eventBasedItems.sort()) === JSON.stringify(signalItemTexts.sort())
        };
    });

    constructor() {
        // Using Angular 20 effect for reactive side effects
        effect(() => {
            console.log('Selection mode changed to:', this.currentSelectionMode());
        });

        effect(() => {
            console.log('Basic selected items updated:', this.basicSelectedItems());
        });

        effect(() => {
            console.log('Configurable selected items updated:', this.configurableSelectedItems());
        });

        effect(() => {
            console.log('Current view type:', this.currentViewType());
        });

        // Effect to demonstrate reactive selectedItems signal
        effect(() => {
            if (this.reactiveSegmentedButton?.selectedItems) {
                const items = this.reactiveSegmentedButton.selectedItems();
                console.log(
                    'Reactive selectedItems signal updated:',
                    items.map((item) => item.innerText || item.textContent)
                );
            }
        });

        // Effect to show combined reactive state
        effect(() => {
            const state = this.combinedReactiveState();
            console.log('Combined reactive state:', state);
        });
    }

    ngAfterViewInit(): void {
        // Set the signal to indicate ViewChild is ready
        this.viewInitialized.set(true);

        // Use multiple strategies to ensure proper initialization
        // Strategy 1: Immediate check
        this.checkAndSyncInitialState();

        // Strategy 2: Delayed check to handle web component initialization timing
        setTimeout(() => this.checkAndSyncInitialState(), 50);
        setTimeout(() => this.checkAndSyncInitialState(), 200);
    }

    private checkAndSyncInitialState(): void {
        // Check basic segmented button
        if (this.basicSegmentedButton?.selectedItems) {
            const items = this.basicSegmentedButton.selectedItems();
            console.log('Checking basic selectedItems:', items.length, 'items found');

            if (items.length > 0) {
                const itemTexts = items.map((item) => item.innerText || item.textContent || 'Unknown');
                console.log('Found basic selected items:', itemTexts);

                // Update our event-based signal to match if they're different
                const currentEventItems = this.basicSelectedItems();
                if (JSON.stringify(currentEventItems.sort()) !== JSON.stringify(itemTexts.sort())) {
                    console.log('Syncing basic event-based signal with reactive signal');
                    this.basicSelectedItems.set(itemTexts);
                }
            }
        }

        // Check reactive segmented button
        if (this.reactiveSegmentedButton?.selectedItems) {
            const items = this.reactiveSegmentedButton.selectedItems();
            console.log('Checking reactive selectedItems:', items.length, 'items found');

            if (items.length > 0) {
                const itemTexts = items.map((item) => item.innerText || item.textContent || 'Unknown');
                console.log('Found reactive selected items:', itemTexts);

                // Update our reactive event-based signal to match if they're different
                const currentReactiveEventItems = this.reactiveEventBasedItems();
                if (JSON.stringify(currentReactiveEventItems.sort()) !== JSON.stringify(itemTexts.sort())) {
                    console.log('Syncing reactive event-based signal with reactive signal');
                    this.reactiveEventBasedItems.set(itemTexts);
                }
            }
        }
    }

    // Event handlers for segmented button selection changes
    onBasicSelectionChange(event: any): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        const itemTexts = selectedItems.map((item: any) => item.innerText || item.textContent);
        this.basicSelectedItems.set(itemTexts);
        console.log('Basic selection changed:', itemTexts);
    }

    onReactiveSelectionChange(event: any): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        const itemTexts = selectedItems.map((item: any) => item.innerText || item.textContent);
        this.reactiveEventBasedItems.set(itemTexts);
        console.log('Reactive section selection changed (event-based):', itemTexts);
        console.log(
            'Note: This updates both the event-based signal AND the reactive selectedItems() signal automatically'
        );
    }

    onConfigurableSelectionChange(event: any): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        const itemTexts = selectedItems.map((item: any) => item.innerText || item.textContent);
        this.configurableSelectedItems.set(itemTexts);
        console.log('Configurable selection changed:', itemTexts);
    }

    onMultipleSelectionChange(event: any): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        const itemTexts = selectedItems.map((item: any) => item.innerText || item.textContent);
        this.multipleSelectedItems.set(itemTexts);
        console.log('Multiple selection changed:', itemTexts);
    }

    onSingleSelectionChange(event: any): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        const itemTexts = selectedItems.map((item: any) => item.innerText || item.textContent);
        this.singleSelectedItems.set(itemTexts);
        console.log('Single selection changed:', itemTexts);
    }

    onSelectionModeChange(event: any): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        if (selectedItems.length > 0) {
            const selectedMode = selectedItems[0].innerText as SegmentedButtonSelectionMode;
            this.currentSelectionMode.set(selectedMode);
            // Clear previous selections when mode changes
            this.configurableSelectedItems.set([]);
        }
    }

    onThemeChange(event: any): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        if (selectedItems.length > 0) {
            const selectedTheme = selectedItems[0].innerText;
            this.currentTheme.set(selectedTheme);
            console.log('Theme changed to:', selectedTheme);
        }
    }

    onViewTypeChange(event: any): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        if (selectedItems.length > 0) {
            const selectedView = selectedItems[0].innerText;
            this.currentViewType.set(selectedView);
            console.log('View type changed to:', selectedView);
        }
    }

    onPriorityChange(event: any): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        if (selectedItems.length > 0) {
            const selectedPriority = selectedItems[0].innerText;
            this.selectedPriority.set(selectedPriority);
            console.log('Priority changed to:', selectedPriority);
        }
    }

    onStatusChange(event: any): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        if (selectedItems.length > 0) {
            const selectedStatus = selectedItems[0].innerText;
            this.currentStatus.set(selectedStatus);
            console.log('Status changed to:', selectedStatus);
        }
    }

    // Methods to programmatically control segmented buttons
    toggleDisabled(): void {
        this.isDisabled.update((current) => !current);
    }

    clearSelection(): void {
        this.configurableSelectedItems.set([]);
    }

    selectAll(): void {
        if (this.isMultipleMode()) {
            // In multiple mode, select all available options
            this.configurableSelectedItems.set(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
        }
    }

    resetToDefaults(): void {
        this.basicSelectedItems.set(['Option 2']);
        this.reactiveEventBasedItems.set(['🍌 Banana', '🍇 Grape']);
        this.configurableSelectedItems.set([]);
        this.multipleSelectedItems.set(['Item B', 'Item D']);
        this.singleSelectedItems.set(['Choice 2']);
        this.currentSelectionMode.set(SegmentedButtonSelectionMode.Single);
        this.isDisabled.set(false);
        this.currentTheme.set('light');
        this.currentViewType.set('grid');
        this.selectedPriority.set('medium');
        this.currentStatus.set('draft');
    }

    // Helper methods to get selection mode label
    getSelectionModeLabel(): string {
        const mode = this.currentSelectionMode();
        return mode.charAt(0).toUpperCase() + mode.slice(1);
    }

    // Helper methods to check if items are selected in different examples
    isConfigurableItemSelected(item: string): boolean {
        return this.configurableSelectedItems().includes(item);
    }

    isBasicItemSelected(item: string): boolean {
        return this.basicSelectedItems().includes(item);
    }

    isMultipleItemSelected(item: string): boolean {
        return this.multipleSelectedItems().includes(item);
    }

    isSingleItemSelected(item: string): boolean {
        return this.singleSelectedItems().includes(item);
    }

    // New methods to demonstrate reactive selectedItems usage
    getReactiveSelectedItems(): any[] {
        return this.reactiveSegmentedButton?.selectedItems?.() || [];
    }

    getReactiveSelectedItemsAsText(): string {
        const items = this.getReactiveSelectedItems();
        return items.map((item) => item.innerText || item.textContent || 'Unknown').join(', ') || 'No selection';
    }
}
