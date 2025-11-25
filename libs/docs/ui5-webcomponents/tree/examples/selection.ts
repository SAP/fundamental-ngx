import { Component, computed, signal } from '@angular/core';
import { ListSelectionMode } from '@fundamental-ngx/ui5-webcomponents';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { Tree } from '@fundamental-ngx/ui5-webcomponents/tree';
import { TreeItem } from '@fundamental-ngx/ui5-webcomponents/tree-item';
import type { UI5CustomEvent } from '@ui5/webcomponents-base';

@Component({
    selector: 'ui5-tree-selection-sample',
    templateUrl: './selection.html',
    standalone: true,
    imports: [Tree, TreeItem, SegmentedButton, SegmentedButtonItem]
})
export class TreeSelectionSample {
    selectionMode = signal<ListSelectionMode>(ListSelectionMode.None);
    selectedItems = signal<string[]>([]);

    selectionModes = signal<ListSelectionMode[]>(Object.values(ListSelectionMode));

    selectedItemsText = computed(() => {
        const items = this.selectedItems();
        return items.length > 0 ? items.join(', ') : 'None';
    });

    onSelectionModeChange(event: UI5CustomEvent<any, 'selection-change'>): void {
        const selectedItems = event.detail.selectedItems;
        if (selectedItems && selectedItems.length > 0) {
            const mode = selectedItems[0].textContent?.trim() as ListSelectionMode;
            this.selectionMode.set(mode);
            this.selectedItems.set([]);
        }
    }

    onSelectionChange(event: UI5CustomEvent<any, 'selection-change'>): void {
        const selectedItems = event.detail.selectedItems || [];
        const itemTexts = selectedItems.map((item: any) => item.text || 'Unknown');
        this.selectedItems.set(itemTexts);
    }
}
