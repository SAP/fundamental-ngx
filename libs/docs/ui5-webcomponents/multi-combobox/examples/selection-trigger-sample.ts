import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { MultiComboBox } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box';
import { MultiComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box-item';

interface SelectionEvent {
    item: string;
    trigger: 'typeahead' | 'click' | 'keyboard';
    timestamp: Date;
}

@Component({
    selector: 'ui5-multi-combobox-selection-trigger-sample',
    templateUrl: './selection-trigger-sample.html',
    imports: [MultiComboBox, MultiComboBoxItem, CheckBox]
})
export class MultiComboBoxSelectionTriggerSample {
    selectedValues = signal<string[]>([]);
    noTypeahead = signal(false);
    lastEvent = signal<SelectionEvent | null>(null);

    skills = [
        'Angular',
        'React',
        'Vue',
        'TypeScript',
        'JavaScript',
        'Node.js',
        'Python',
        'Java',
        'Go',
        'Rust',
        'Docker',
        'Kubernetes'
    ];

    onSelectionChange(event: UI5WrapperCustomEvent<MultiComboBox, 'ui5SelectionChange'>): void {
        // Note: The trigger property is not yet in the official TypeScript types for MultiComboBox
        // but is available at runtime in UI5 Web Components v2.24.0
        const detail = (event as any).detail;
        const trigger = detail?.trigger?.toLowerCase() || 'unknown';
        const items = event.currentTarget.selectedItems || [];
        const itemTexts = items.map((item) => item.text || '');

        if (detail?.item) {
            const selectionEvent: SelectionEvent = {
                item: detail.item.text || '',
                trigger,
                timestamp: new Date()
            };

            this.lastEvent.set(selectionEvent);
        }

        this.selectedValues.set(itemTexts);
    }

    toggleNoTypeahead(): void {
        this.noTypeahead.update((val) => !val);
    }
}
