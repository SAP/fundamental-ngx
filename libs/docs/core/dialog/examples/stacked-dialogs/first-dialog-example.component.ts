import { Component } from '@angular/core';
import { DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { SecondDialogExampleComponent } from './second-dialog-example.component';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 id="fd-dialog-header-8" fd-title>First Dialog</h1>
                <button fd-dialog-close-button (click)="dialogRef.dismiss('x')" title="close"></button>
            </fd-dialog-header>

            <fd-dialog-body>
                <fd-text
                    id="fd-dialog-body-8"
                    role="dialog"
                    text="This is the first dialog! Click the button below to open the second dialog."
                ></fd-text>
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-button-bar
                    [fdSkeletonState]="false"
                    fd-initial-focus
                    fdType="emphasized"
                    label="Open Second Dialog"
                    fdCompact
                    (click)="openDialog()"
                    ariaLabel="Open Second Dialog Emphasized"
                >
                </fd-button-bar>
            </fd-dialog-footer>
        </fd-dialog>
    `
})
export class FirstDialogExampleComponent {
    constructor(public dialogRef: DialogRef, public _dialogService: DialogService) {}

    openDialog(): void {
        this._dialogService.open(SecondDialogExampleComponent, {
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-header-9',
            ariaDescribedBy: 'fd-dialog-body-9'
        });
    }
}
