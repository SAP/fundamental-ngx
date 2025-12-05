import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { ResponsivePopover } from '@fundamental-ngx/ui5-webcomponents/responsive-popover';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-responsive-popover-modal-sample',
    templateUrl: './modal-sample.html',
    standalone: true,
    imports: [ResponsivePopover, Button, NgStyle]
})
export class ModalSample {
    modalOpen = signal(false);
    nonModalOpen = signal(false);

    openModalPopover(): void {
        this.modalOpen.set(true);
    }

    closeModalPopover(): void {
        this.modalOpen.set(false);
    }

    openNonModalPopover(): void {
        this.nonModalOpen.set(true);
    }

    closeNonModalPopover(): void {
        this.nonModalOpen.set(false);
    }

    onNonModalClosed(): void {
        this.nonModalOpen.set(false);
    }
}
