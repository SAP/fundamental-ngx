import { Component } from '@angular/core';
import { DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { SecondDialogExampleComponent } from './second-dialog-example.component';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 id="fd-dialog-header-8" fd-title>First Dialog</h1>
                <button fd-dialog-close-button (click)="dialogRef.dismiss('x')"></button>
            </fd-dialog-header>

            <fd-dialog-body>
                This is the first dialog!<br />
                Click the button below to open the second dialog.
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-button-bar
                        fd-initial-focus
                        fdType="emphasized"
                        label="Open Second Dialog"
                        [compact]="true"
                        (click)="openDialog()">
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
            ariaLabelledBy: 'fd-dialog-header-9'
        });
    }
}
