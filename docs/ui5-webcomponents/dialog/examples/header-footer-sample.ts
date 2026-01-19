import { Component, signal } from '@angular/core';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Dialog } from '@fundamental-ngx/ui5-webcomponents/dialog';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

// Import the icons used in this example
import '@ui5/webcomponents-icons/dist/decline.js';
import '@ui5/webcomponents-icons/dist/message-success.js';

@Component({
    selector: 'ui5-dialog-header-footer-sample',
    templateUrl: './header-footer-sample.html',
    standalone: true,
    imports: [Dialog, Bar, Button, Title, Icon]
})
export class DialogHeaderFooterSample {
    isSimpleHeaderDialogOpen = signal(false);
    isCustomDialogOpen = signal(false);

    openSimpleDialog(): void {
        this.isSimpleHeaderDialogOpen.set(true);
    }

    openCustomDialog(): void {
        this.isCustomDialogOpen.set(true);
    }

    closeSimpleHeaderDialog(): void {
        this.isSimpleHeaderDialogOpen.set(false);
    }

    closeCustomDialog(): void {
        this.isCustomDialogOpen.set(false);
    }
}
