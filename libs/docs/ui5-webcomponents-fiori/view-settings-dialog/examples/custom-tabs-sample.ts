import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { SortItem } from '@fundamental-ngx/ui5-webcomponents-fiori/sort-item';
import { ViewSettingsDialog } from '@fundamental-ngx/ui5-webcomponents-fiori/view-settings-dialog';
import { ViewSettingsDialogCustomTab } from '@fundamental-ngx/ui5-webcomponents-fiori/view-settings-dialog-custom-tab';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { RadioButton } from '@fundamental-ngx/ui5-webcomponents/radio-button';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

interface ColumnOption {
    key: string;
    label: string;
    visible: boolean;
}

interface SortOption {
    text: string;
    selected: boolean;
}

type Density = 'compact' | 'cozy' | 'condensed';

@Component({
    selector: 'ui5-doc-view-settings-dialog-custom-tabs-sample',
    templateUrl: './custom-tabs-sample.html',
    imports: [ViewSettingsDialog, ViewSettingsDialogCustomTab, SortItem, Button, CheckBox, RadioButton, Text, Title],
    styles: [
        `
            .custom-tab-content {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding: 1rem;
            }

            .custom-tab-title {
                margin-bottom: 0.5rem;
            }

            .results-container {
                margin-top: 2rem;
                padding: 1rem;
                border: 1px solid var(--sapGroup_ContentBorderColor);
                border-radius: 0.25rem;
            }

            .result-title {
                margin-bottom: 0.5rem;
            }

            .result-item {
                display: block;
            }
        `
    ]
})
export class CustomTabsSample {
    dialogOpen = signal(false);
    sortDescending = signal(false);
    resetEnabled = signal(false);
    resultText = signal('');

    private readonly defaultDensity: Density = 'cozy';
    private readonly defaultColumns: ColumnOption[] = [
        { key: 'name', label: 'Name', visible: true },
        { key: 'age', label: 'Age', visible: true },
        { key: 'email', label: 'Email', visible: true },
        { key: 'department', label: 'Department', visible: false },
        { key: 'location', label: 'Location', visible: false }
    ];

    sortItems = signal<SortOption[]>([
        { text: 'Name', selected: true },
        { text: 'Age', selected: false },
        { text: 'Email', selected: false }
    ]);

    columnOptions = signal<ColumnOption[]>(structuredClone(this.defaultColumns));
    currentDensity = signal<Density>(this.defaultDensity);

    onOpenDialog(): void {
        this.dialogOpen.set(true);
    }

    onColumnToggle(key: string): void {
        this.columnOptions.update((columns) =>
            columns.map((col) => (col.key === key ? { ...col, visible: !col.visible } : col))
        );
        this.updateResetEnabled();
    }

    onDensityChange(density: Density): void {
        this.currentDensity.set(density);
        this.updateResetEnabled();
    }

    onConfirm(event: UI5WrapperCustomEvent<ViewSettingsDialog, 'ui5Confirm'>): void {
        const detail = event.detail;
        const resultLines: string[] = [];

        if (detail.sortBy) {
            const sortOrder = detail.sortDescending ? 'descending' : 'ascending';
            resultLines.push(`Sort by: ${detail.sortBy} (${sortOrder})`);
        }

        const visibleCols = this.columnOptions()
            .filter((c) => c.visible)
            .map((c) => c.label);
        resultLines.push(`Visible columns: ${visibleCols.join(', ')}`);
        resultLines.push(`Row density: ${this.currentDensity()}`);

        this.resultText.set(resultLines.join('\n'));
        this.dialogOpen.set(false);
        this.resetEnabled.set(false);
    }

    onCancel(): void {
        this.dialogOpen.set(false);
    }

    onClose(): void {
        this.dialogOpen.set(false);
    }

    onReset(): void {
        this.columnOptions.set(structuredClone(this.defaultColumns));
        this.currentDensity.set(this.defaultDensity);
        this.resetEnabled.set(false);
    }

    private updateResetEnabled(): void {
        const columnsChanged = JSON.stringify(this.columnOptions()) !== JSON.stringify(this.defaultColumns);
        const densityChanged = this.currentDensity() !== this.defaultDensity;
        this.resetEnabled.set(columnsChanged || densityChanged);
    }
}
