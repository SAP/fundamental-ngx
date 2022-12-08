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
                <div id="fd-dialog-body-9" role="dialog">
                    This is the second dialog!<br />
                    It is completely independent from the first dialog and can be controlled separately!
                </div>
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-button-bar
                    fd-initial-focus
                    fdType="emphasized"
                    label="Close"
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
