import { Component, Inject } from '@angular/core';
import { DIALOG_REF, DialogRef, DialogService } from '@fundamental-ngx/core';
import { SecondDialogExampleComponent } from './second-dialog-example.component';

@Component({
    template: `
        <fd-dialog>

            <fd-dialog-header>
                <h1 fd-dialog-title>First Dialog</h1>
                <button fd-dialog-close-button (click)="dialogRef.dismiss('x')"></button>
            </fd-dialog-header>

            <fd-dialog-body>
                This is the first dialog!<br/>
                Click the button below to open the second dialog.
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-dialog-footer-button>
                    <button fd-button
                            fdType="emphasized"
                            fd-dialog-decisive-button
                            [compact]="true"
                            (click)="openDialog()">
                        Open Second Dialog
                    </button>
                </fd-dialog-footer-button>
            </fd-dialog-footer>

        </fd-dialog>
    `
})
export class FirstDialogExampleComponent {

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef, public _dialogService: DialogService) { }

    openDialog(): void {
        this._dialogService.open(SecondDialogExampleComponent, {responsivePadding: true});
    }
}
