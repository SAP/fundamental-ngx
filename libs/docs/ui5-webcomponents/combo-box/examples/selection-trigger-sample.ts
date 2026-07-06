import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { ComboBox } from '@fundamental-ngx/ui5-webcomponents/combo-box';
import { ComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/combo-box-item';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

interface SelectionEvent {
    value: string;
    trigger: 'typeahead' | 'click' | 'keyboard';
    timestamp: Date;
}

@Component({
    selector: 'ui5-combo-box-selection-trigger-sample',
    templateUrl: './selection-trigger-sample.html',
    standalone: true,
    imports: [ComboBox, ComboBoxItem, CheckBox, Tag]
})
export class ComboBoxSelectionTriggerSample {
    selectedValue = signal<string>('');
    noTypeahead = signal(false);
    lastEvent = signal<SelectionEvent | null>(null);
    selectionHistory = signal<SelectionEvent[]>([]);

    countries = [
        'Argentina',
        'Australia',
        'Brazil',
        'Canada',
        'China',
        'France',
        'Germany',
        'India',
        'Italy',
        'Japan',
        'Mexico',
        'Spain',
        'United Kingdom',
        'United States'
    ];

    /**
     * The selection-change event includes a 'trigger' property
     * indicating the source of the selection: 'typeahead', 'click', or 'keyboard'.
     */
    onSelectionChange(event: UI5WrapperCustomEvent<ComboBox, 'ui5SelectionChange'>): void {
        const detail = (event as any).detail;
        const trigger = detail?.trigger || 'unknown';
        const value = event.currentTarget.value;

        const selectionEvent: SelectionEvent = {
            value,
            trigger,
            timestamp: new Date()
        };

        this.lastEvent.set(selectionEvent);
        this.selectionHistory.update((history) => [selectionEvent, ...history.slice(0, 4)]);
        this.selectedValue.set(value);
    }

    onChange(event: UI5WrapperCustomEvent<ComboBox, 'ui5Change'>): void {
        // Change event fires when selection is confirmed (e.g., Enter key)
        console.log('Change confirmed:', event.currentTarget.value);
    }

    toggleNoTypeahead(): void {
        this.noTypeahead.update((val) => !val);
    }

    getTriggerBadgeColor(
        trigger: string
    ): 'Set1' | 'Set2' | 'Neutral' | 'Information' | 'Positive' | 'Negative' | 'Critical' {
        switch (trigger) {
            case 'typeahead':
                return 'Information';
            case 'click':
                return 'Positive';
            case 'keyboard':
                return 'Set2';
            default:
                return 'Neutral';
        }
    }
}
