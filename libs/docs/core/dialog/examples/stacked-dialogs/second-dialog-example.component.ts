import { Component } from '@angular/core';
import { DialogRef } from '@fundamental-ngx/core/dialog';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 id="fd-dialog-header-9" fd-title>Second Dialog</h1>
                <button fd-dialog-close-button (click)="dialogRef.dismiss()" title="close"></button>
            </fd-dialog-header>

            <fd-dialog-body>
                <fd-text
                    id="fd-dialog-body-9"
                    role="dialog"
                    text="This is the second dialog! It is completely independent from the first dialog and can be controlled separately!"
                ></fd-text>
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-button-bar
                    [fdSkeletonState]="false"
                    fd-initial-focus
                    fdType="emphasized"
                    label="Close"
                    fdCompact
                    (click)="dialogRef.close()"
                    ariaLabel="Close Emphasized"
                >
                </fd-button-bar>
            </fd-dialog-footer>
        </fd-dialog>
    `
})
export class SecondDialogExampleComponent {
    constructor(public dialogRef: DialogRef) {}
}
