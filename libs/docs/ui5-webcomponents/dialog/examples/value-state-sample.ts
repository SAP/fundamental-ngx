import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Dialog } from '@fundamental-ngx/ui5-webcomponents/dialog';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-dialog-value-state-sample',
    templateUrl: './value-state-sample.html',
    standalone: true,
    imports: [Dialog, Button]
})
export class DialogValueStateSample {
    isDefaultDialogOpen = signal(false);
    isPositiveDialogOpen = signal(false);
    isCriticalDialogOpen = signal(false);
    isNegativeDialogOpen = signal(false);

    openDefaultDialog(): void {
        this.isDefaultDialogOpen.set(true);
    }

    openPositiveDialog(): void {
        this.isPositiveDialogOpen.set(true);
    }

    openCriticalDialog(): void {
        this.isCriticalDialogOpen.set(true);
    }

    openNegativeDialog(): void {
        this.isNegativeDialogOpen.set(true);
    }

    closeDefaultDialog(): void {
        this.isDefaultDialogOpen.set(false);
    }

    closePositiveDialog(): void {
        this.isPositiveDialogOpen.set(false);
    }

    closeCriticalDialog(): void {
        this.isCriticalDialogOpen.set(false);
    }

    closeNegativeDialog(): void {
        this.isNegativeDialogOpen.set(false);
    }
}
