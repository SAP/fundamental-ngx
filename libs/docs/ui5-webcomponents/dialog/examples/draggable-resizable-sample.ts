import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Dialog } from '@fundamental-ngx/ui5-webcomponents/dialog';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-dialog-draggable-resizable-sample',
    templateUrl: './draggable-resizable-sample.html',
    standalone: true,
    imports: [Dialog, Button, Label]
})
export class DialogDraggableResizableSample {
    isDraggableDialogOpen = signal(false);
    isResizableDialogOpen = signal(false);
    isDraggableResizableDialogOpen = signal(false);

    openDraggableDialog(): void {
        this.isDraggableDialogOpen.set(true);
    }

    openResizableDialog(): void {
        this.isResizableDialogOpen.set(true);
    }

    openDraggableResizableDialog(): void {
        this.isDraggableResizableDialogOpen.set(true);
    }

    closeDraggableDialog(): void {
        this.isDraggableDialogOpen.set(false);
    }

    closeResizableDialog(): void {
        this.isResizableDialogOpen.set(false);
    }

    closeDraggableResizableDialog(): void {
        this.isDraggableResizableDialogOpen.set(false);
    }
}
