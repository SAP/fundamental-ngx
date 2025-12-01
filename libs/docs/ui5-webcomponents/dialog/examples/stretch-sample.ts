import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Dialog } from '@fundamental-ngx/ui5-webcomponents/dialog';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-dialog-stretch-sample',
    templateUrl: './stretch-sample.html',
    standalone: true,
    imports: [Dialog, Button]
})
export class DialogStretchSample {
    isNormalDialogOpen = signal(false);
    isStretchDialogOpen = signal(false);

    openNormalDialog(): void {
        this.isNormalDialogOpen.set(true);
    }

    openStretchDialog(): void {
        this.isStretchDialogOpen.set(true);
    }

    closeNormalDialog(): void {
        this.isNormalDialogOpen.set(false);
    }

    closeStretchDialog(): void {
        this.isStretchDialogOpen.set(false);
    }
}
