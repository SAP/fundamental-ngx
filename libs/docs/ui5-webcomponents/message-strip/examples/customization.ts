import { Component, computed, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { MessageStrip } from '@fundamental-ngx/ui5-webcomponents/message-strip';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { MessageStripDesign } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/paddings.css';
import 'fundamental-styles/dist/panel.css';

// Import icons
import '@ui5/webcomponents-icons/dist/AllIcons.js';

@Component({
    selector: 'ui5-message-strip-customization-sample',
    templateUrl: './customization.html',
    standalone: true,
    imports: [MessageStrip, Icon, Button, SegmentedButton, SegmentedButtonItem]
})
export class MessageStripCustomizationSample {
    readonly showIcon = signal<boolean>(true);
    readonly showCloseButton = signal<boolean>(true);
    readonly selectedColorScheme = signal<string>('1');
    readonly selectedDesign = signal<MessageStripDesign>(MessageStripDesign.ColorSet1);

    // Generate available color schemes as strings '1' to '10'
    readonly colorSchemes = computed(() => Array.from({ length: 10 }, (_, i) => (i + 1).toString()));

    readonly colorSetDesigns = computed(() => [MessageStripDesign.ColorSet1, MessageStripDesign.ColorSet2]);

    toggleIcon(): void {
        this.showIcon.update((current) => !current);
    }

    toggleCloseButton(): void {
        this.showCloseButton.update((current) => !current);
    }

    onColorSchemeChange(event: any): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        if (selectedItems.length > 0) {
            const selectedScheme = selectedItems[0].innerText;
            this.selectedColorScheme.set(selectedScheme);
        }
    }

    onDesignChange(event: any): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        if (selectedItems.length > 0) {
            const selectedDesign = selectedItems[0].innerText;
            this.selectedDesign.set(selectedDesign);
        }
    }

    onCustomMessageClose(event: any): void {
        console.log('Custom message closed: ', event);
    }
}
