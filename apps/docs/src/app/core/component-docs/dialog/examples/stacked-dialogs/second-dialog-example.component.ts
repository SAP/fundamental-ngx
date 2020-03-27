import { Component, Inject } from '@angular/core';
import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

@Component({
    template: `
        <fd-dialog>

            <fd-dialog-header>
                <h1 fd-dialog-title>Second Dialog</h1>
                <button fd-dialog-close-button (click)="dialogRef.dismiss()"></button>
            </fd-dialog-header>

            <fd-dialog-body>
                This is the second dialog!<br/>
                It is completely independent from the first dialog and can be controlled separately!
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-dialog-footer-button>
                    <button fd-button
                            fdType="emphasized"
                            fd-dialog-decisive-button
                            [compact]="true"
                            (click)="dialogRef.close()">
                        Close
                    </button>
                </fd-dialog-footer-button>
            </fd-dialog-footer>

        </fd-dialog>
    `
})
export class SecondDialogExampleComponent {
    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) { }
}
