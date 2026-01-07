import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { FilterItem } from '@fundamental-ngx/ui5-webcomponents-fiori/filter-item';
import { FilterItemOption } from '@fundamental-ngx/ui5-webcomponents-fiori/filter-item-option';
import { GroupItem } from '@fundamental-ngx/ui5-webcomponents-fiori/group-item';
import { SortItem } from '@fundamental-ngx/ui5-webcomponents-fiori/sort-item';
import { ViewSettingsDialog } from '@fundamental-ngx/ui5-webcomponents-fiori/view-settings-dialog';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

interface SortOption {
    text: string;
    selected: boolean;
}

interface FilterOption {
    text: string;
    selected: boolean;
}

interface FilterCategory {
    text: string;
    options: FilterOption[];
}

interface GroupOption {
    text: string;
    selected: boolean;
}

@Component({
    selector: 'ui5-doc-view-settings-dialog-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [ViewSettingsDialog, SortItem, FilterItem, FilterItemOption, GroupItem, Button, Text, Title],
    styles: [
        `
            .results-container {
                margin-top: 2rem;
                padding: 1rem;
                border: 1px solid var(--sapGroup_ContentBorderColor, #d9d9d9);
                border-radius: 0.25rem;
            }
        `
    ]
})
export class BasicSample {
    dialogOpen = signal(false);
    sortDescending = signal(true);
    resultText = signal('');

    // Sort options
    sortItems = signal<SortOption[]>([
        { text: 'Name', selected: true },
        { text: 'Position', selected: false },
        { text: 'Company', selected: false },
        { text: 'Department', selected: false }
    ]);

    // Filter categories with options
    filterCategories = signal<FilterCategory[]>([
        {
            text: 'Position',
            options: [
                { text: 'CTO', selected: false },
                { text: 'CPO', selected: false },
                { text: 'VP', selected: false }
            ]
        },
        {
            text: 'Department',
            options: [
                { text: 'Sales', selected: false },
                { text: 'Management', selected: false },
                { text: 'PR', selected: false }
            ]
        },
        {
            text: 'Location',
            options: [
                { text: 'Walldorf', selected: false },
                { text: 'New York', selected: false },
                { text: 'London', selected: false }
            ]
        },
        {
            text: 'Reports to',
            options: [
                { text: 'CTO', selected: false },
                { text: 'CPO', selected: false },
                { text: 'VP', selected: false }
            ]
        }
    ]);

    // Group options
    groupItems = signal<GroupOption[]>([
        { text: 'Name', selected: true },
        { text: 'Position', selected: false },
        { text: 'Company', selected: false },
        { text: 'Department', selected: false },
        { text: '(Not Grouped)', selected: false }
    ]);

    onOpenDialog(): void {
        this.dialogOpen.set(true);
    }

    onConfirm(event: UI5WrapperCustomEvent<ViewSettingsDialog, 'ui5Confirm'>): void {
        const detail = event.detail;
        const resultLines: string[] = [];

        // Sort information
        if (detail.sortBy) {
            const sortOrder = detail.sortDescending ? 'descending' : 'ascending';
            resultLines.push(`Sort by: ${detail.sortBy} (${sortOrder})`);
        }

        // Group information
        if (detail.groupBy) {
            const groupOrder = detail.groupDescending ? 'descending' : 'ascending';
            resultLines.push(`Group by: ${detail.groupBy} (${groupOrder})`);
        }

        // Filter information
        if (detail.filters?.length) {
            const filterSummary = detail.filters
                .map((filter) =>
                    Object.entries(filter)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(' | ')
                )
                .join(' | ');
            resultLines.push(`Filters: ${filterSummary}`);
        }

        this.resultText.set(resultLines.join('\n'));
        this.dialogOpen.set(false);
    }

    onCancel(): void {
        this.dialogOpen.set(false);
    }

    onClose(): void {
        this.dialogOpen.set(false);
    }
}
