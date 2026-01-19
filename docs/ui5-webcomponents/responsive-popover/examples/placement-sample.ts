import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { ResponsivePopover } from '@fundamental-ngx/ui5-webcomponents/responsive-popover';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { PopoverHorizontalAlign, PopoverPlacement } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-responsive-popover-placement-sample',
    templateUrl: './placement-sample.html',
    standalone: true,
    imports: [ResponsivePopover, Button, SegmentedButton, SegmentedButtonItem]
})
export class PlacementSample {
    isOpen = signal(false);

    placement = signal<PopoverPlacement>(PopoverPlacement.End);
    horizontalAlign = signal<PopoverHorizontalAlign>(PopoverHorizontalAlign.Center);
    hideArrow = signal(false);

    readonly placements = signal(Object.values(PopoverPlacement));
    readonly alignments = signal(Object.values(PopoverHorizontalAlign));

    openPopover(): void {
        this.isOpen.set(true);
    }

    closePopover(): void {
        this.isOpen.set(false);
    }

    setPlacement(newPlacement: UI5WrapperCustomEvent<SegmentedButton, 'ui5SelectionChange'>): void {
        this.placement.set(newPlacement.detail.selectedItems[0].innerText as PopoverPlacement);
    }

    setAlignment(newAlignment: UI5WrapperCustomEvent<SegmentedButton, 'ui5SelectionChange'>): void {
        this.horizontalAlign.set(newAlignment.detail.selectedItems[0].innerText as PopoverHorizontalAlign);
    }

    toggleArrow(): void {
        this.hideArrow.update((value) => !value);
    }
}
