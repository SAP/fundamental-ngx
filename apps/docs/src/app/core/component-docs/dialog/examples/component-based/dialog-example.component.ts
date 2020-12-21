import { Component, Inject } from '@angular/core';
import { DialogRef } from '@fundamental-ngx/core';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 fd-title>{{ dialogRef.data.title }}</h1>
                <button fd-dialog-close-button (click)="dialogRef.dismiss('Close button')"></button>
            </fd-dialog-header>

            <fd-dialog-body>
                <ul>
                    <li *ngFor="let fact of dialogRef.data.pineappleFunFacts">
                        {{ fact }}
                    </li>
                </ul>
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-dialog-footer-button>
                    <button
                        fd-button
                        fdType="emphasized"
                        fd-dialog-decisive-button
                        label="Interesting"
                        [compact]="true"
                        (click)="this.dialogRef.close('Continue')">
                    </button>
                </fd-dialog-footer-button>

                <fd-dialog-footer-button>
                    <button
                        fd-button
                        fdType="transparent"
                        fd-dialog-decisive-button
                        fd-initial-focus
                        label="Cancel"
                        [compact]="true"
                        (click)="this.dialogRef.dismiss('Cancel')">
                    </button>
                </fd-dialog-footer-button>
            </fd-dialog-footer>
        </fd-dialog>
    `
})
export class DialogExampleComponent {
    constructor(public dialogRef: DialogRef) {}
}
