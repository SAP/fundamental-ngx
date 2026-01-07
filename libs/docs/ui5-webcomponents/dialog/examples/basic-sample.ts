import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Dialog } from '@fundamental-ngx/ui5-webcomponents/dialog';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-dialog-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Dialog, Button, Title]
})
export class DialogBasicSample {
    isOpen = signal(false);

    openDialog(): void {
        this.isOpen.set(true);
    }

    closeDialog(): void {
        this.isOpen.set(false);
    }
}
