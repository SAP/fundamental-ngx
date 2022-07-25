import { Component } from '@angular/core';
import { DialogRef } from '@fundamental-ngx/core/dialog';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 id="fd-dialog-header-1" fd-title>{{ dialogRef.data.title }}</h1>
            </fd-dialog-header>

            <fd-dialog-body>
                <p id="fd-dialog-body-1" role="dialog" style="text-align: justify; margin: 0">
                    {{ dialogRef.data.pinnapleDescription }}
                </p>
                <ul style="margin-bottom: 0">
                    <li *ngFor="let fact of dialogRef.data.pineappleFunFacts">
                        {{ fact }}
                    </li>
                </ul>
            </fd-dialog-body>

            <fd-dialog-footer fdCompact>
                <fd-button-bar
                    label="Interesting"
                    fdType="emphasized"
                    (click)="dialogRef.close('Continue')"
                    ariaLabel="Interesting Emphasized"
                >
                </fd-button-bar>
                <fd-button-bar
                    label="Cancel"
                    fdInitialFocus
                    fdType="transparent"
                    (click)="dialogRef.dismiss('Cancel')"
                    ariaLabel="Cancel"
                >
                </fd-button-bar>
            </fd-dialog-footer>
        </fd-dialog>
    `
})
export class DialogExampleComponent {
    constructor(public dialogRef: DialogRef) {}
}
