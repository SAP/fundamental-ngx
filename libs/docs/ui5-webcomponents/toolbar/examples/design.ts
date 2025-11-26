import { Component, signal } from '@angular/core';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { Toolbar } from '@fundamental-ngx/ui5-webcomponents/toolbar';
import { ToolbarButton } from '@fundamental-ngx/ui5-webcomponents/toolbar-button';
import { ToolbarDesign } from '@fundamental-ngx/ui5-webcomponents/types';
import type { UI5CustomEvent } from '@ui5/webcomponents-base';

@Component({
    selector: 'ui5-toolbar-design-sample',
    templateUrl: './design.html',
    standalone: true,
    imports: [Toolbar, ToolbarButton, SegmentedButton, SegmentedButtonItem]
})
export class ToolbarDesignSample {
    selectedDesign = signal<ToolbarDesign>(ToolbarDesign.Solid);

    designs = signal([ToolbarDesign.Solid, ToolbarDesign.Transparent]);

    onDesignChange(event: UI5CustomEvent<any, 'selection-change'>): void {
        const selectedItems = event.detail.selectedItems;
        if (selectedItems && selectedItems.length > 0) {
            const design = selectedItems[0].textContent?.trim() as ToolbarDesign;
            this.selectedDesign.set(design);
        }
    }
}
