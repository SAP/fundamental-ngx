import { Component, computed, effect, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Calendar } from '@fundamental-ngx/ui5-webcomponents/calendar';
import { CalendarDate } from '@fundamental-ngx/ui5-webcomponents/calendar-date';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { CalendarSelectionMode, CalendarWeekNumbering } from '@fundamental-ngx/ui5-webcomponents/types';

// Import CalendarType directly from UI5 to avoid Vite resolution issues
import CalendarTypeEnum from '@ui5/webcomponents-base/dist/types/CalendarType.js';

// Import CLDR data for proper calendar functionality
import '@ui5/webcomponents-base/dist/features/LegacyDateFormats.js';
import '@ui5/webcomponents-localization/dist/Assets.js';

// Import specific calendar features
import '@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js';
import '@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js';
import '@ui5/webcomponents-localization/dist/features/calendar/Islamic.js';
import '@ui5/webcomponents-localization/dist/features/calendar/Japanese.js';
import '@ui5/webcomponents-localization/dist/features/calendar/Persian.js';

// Set language configuration
import { setLanguage } from '@ui5/webcomponents-base/dist/config/Language.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';
import 'fundamental-styles/dist/panel.css';
import 'fundamental-styles/dist/section.css';

// Create a TypeScript type from the enum for better developer experience
type CalendarType = (typeof CalendarTypeEnum)[keyof typeof CalendarTypeEnum];

@Component({
    selector: 'ui5-calendar-sample',
    templateUrl: './calendar-sample.html',
    standalone: true,
    imports: [Calendar, Button, SegmentedButton, SegmentedButtonItem, CalendarDate]
})
export class CalendarExample {
    readonly selectedDates = signal<string[]>([]);
    readonly currentSelectionMode = signal<CalendarSelectionMode>(CalendarSelectionMode.Single);
    readonly currentCalendarType = signal<CalendarType>(CalendarTypeEnum.Gregorian);
    readonly showWeekNumbers = signal<boolean>(true);
    readonly currentWeekNumbering = signal<CalendarWeekNumbering>(CalendarWeekNumbering.Default);

    readonly selectionModes = computed(() => Object.values(CalendarSelectionMode));
    readonly calendarTypes = computed(() => Object.values(CalendarTypeEnum));
    readonly weekNumberingOptions = computed(() => Object.values(CalendarWeekNumbering));

    readonly selectedDatesDisplay = computed(() => {
        const dates = this.selectedDates();
        return dates.length > 0 ? dates.join(', ') : 'No dates selected';
    });

    readonly isRangeMode = computed(() => this.currentSelectionMode() === CalendarSelectionMode.Range);

    readonly isMultipleMode = computed(() => this.currentSelectionMode() === CalendarSelectionMode.Multiple);

    // Date range for demonstration
    readonly minDate = signal('2024-01-01');
    readonly maxDate = signal('2025-12-31');
    readonly formatPattern = signal('yyyy-MM-dd');

    constructor() {
        // Set the language for UI5 Web Components
        setLanguage('en');

        // Using Angular 20 effect for side effects
        effect(() => {
            console.log('Selection mode changed to:', this.currentSelectionMode());
        });

        effect(() => {
            console.log('Selected dates updated:', this.selectedDates());
        });
    }

    // Event handlers using Angular 20 patterns
    onSelectionChange(event: UI5WrapperCustomEvent<Calendar, 'ui5SelectionChange'>): void {
        // Extract selectedValues (date strings) instead of selectedDates (timestamps)
        const dates = event.detail.selectedValues || [];
        this.selectedDates.set(dates);
        console.log('Calendar selection changed:', dates);
    }

    // Methods to update signals
    updateSelectionMode(mode: CalendarSelectionMode): void {
        this.currentSelectionMode.set(mode);
        this.selectedDates.set([]);
    }

    updateCalendarType(type: CalendarType): void {
        this.currentCalendarType.set(type);
    }

    // Event handlers for UI5 segmented buttons
    onSelectionModeChange(event: UI5WrapperCustomEvent<SegmentedButton, 'ui5SelectionChange'>): void {
        console.log('onSelectionModeChange called', event.detail);
        const selectedItems = event.detail.selectedItems;
        if (selectedItems && selectedItems.length > 0) {
            const selectedKey = selectedItems[0].innerText;
            this.updateSelectionMode(selectedKey as CalendarSelectionMode);
        }
    }

    onCalendarTypeChange(event: UI5WrapperCustomEvent<SegmentedButton, 'ui5SelectionChange'>): void {
        console.log('onCalendarTypeChange called:', event.detail.selectedItems[0].innerText);
        const selectedItems = event.detail.selectedItems;
        if (selectedItems && selectedItems.length > 0) {
            const selectedKey = selectedItems[0].innerText;
            this.updateCalendarType(selectedKey as CalendarType);
        }
    }

    toggleWeekNumbers(): void {
        this.showWeekNumbers.update((current) => !current);
        console.log('Week numbers visibility toggled:', this.showWeekNumbers());
    }

    updateWeekNumbering(numbering: CalendarWeekNumbering): void {
        this.currentWeekNumbering.set(numbering);
    }

    clearSelection(): void {
        this.selectedDates.set([]);
    }

    // Preset date selections
    selectToday(): void {
        const today = new Date().toISOString().split('T')[0];
        this.selectedDates.set([today]);
    }

    selectThisWeek(): void {
        if (
            this.currentSelectionMode() === CalendarSelectionMode.Range ||
            this.currentSelectionMode() === CalendarSelectionMode.Multiple
        ) {
            const today = new Date();
            const monday = new Date(today);
            const sunday = new Date(today);

            // Get Monday (start of week)
            const dayOfWeek = today.getDay();
            const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            monday.setDate(today.getDate() - daysToMonday);

            // Get Sunday (end of week)
            sunday.setDate(monday.getDate() + 6);

            if (this.currentSelectionMode() === CalendarSelectionMode.Range) {
                this.selectedDates.set([monday.toISOString().split('T')[0], sunday.toISOString().split('T')[0]]);
            } else {
                // Multiple mode - select all days of the week
                const weekDates: string[] = [];
                for (let i = 0; i < 7; i++) {
                    const date = new Date(monday);
                    date.setDate(monday.getDate() + i);
                    weekDates.push(date.toISOString().split('T')[0]);
                }
                this.selectedDates.set(weekDates);
            }
        }
    }
}
