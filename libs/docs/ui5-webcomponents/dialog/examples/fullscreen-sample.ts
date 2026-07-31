import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Dialog } from '@fundamental-ngx/ui5-webcomponents/dialog';

import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-dialog-fullscreen-sample',
    templateUrl: './fullscreen-sample.html',
    imports: [Dialog, Button]
})
export class DialogFullscreenSample {
    isOpen = signal(false);

    openDialog(): void {
        this.isOpen.set(true);
    }

    closeDialog(): void {
        this.isOpen.set(false);
    }
}
