import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Dialog } from '@fundamental-ngx/ui5-webcomponents/dialog';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-dialog-events-sample',
    templateUrl: './events-sample.html',
    standalone: true,
    imports: [Dialog, Button]
})
export class DialogEventsSample {
    isDialogOpen = signal(false);
    eventLog = signal<string[]>([]);

    openDialog(): void {
        this.isDialogOpen.set(true);
    }

    onBeforeOpen(_event: UI5WrapperCustomEvent<Dialog, 'ui5BeforeOpen'>): void {
        this.addLog('before-open: Dialog is about to open');
    }

    onOpen(_event: UI5WrapperCustomEvent<Dialog, 'ui5Open'>): void {
        this.addLog('open: Dialog has opened');
    }

    onBeforeClose(_event: UI5WrapperCustomEvent<Dialog, 'ui5BeforeClose'>): void {
        this.addLog('before-close: Dialog is about to close');
    }

    onClose(_event: UI5WrapperCustomEvent<Dialog, 'ui5Close'>): void {
        this.addLog('close: Dialog has closed');
    }

    closeDialog(): void {
        this.isDialogOpen.set(false);
    }

    clearLog(): void {
        this.eventLog.set([]);
    }

    private addLog(message: string): void {
        const timestamp = new Date().toLocaleTimeString();
        this.eventLog.update((log) => [`[${timestamp}] ${message}`, ...log].slice(0, 15));
    }
}
