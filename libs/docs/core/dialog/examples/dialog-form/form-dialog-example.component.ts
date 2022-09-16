import { Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-form-dialog-example',
    templateUrl: './form-dialog-example.component.html'
})
export class FormDialogExampleComponent {
    confirmationReason: string;
    responsivePadding = false;
    verticalPadding = false;

    constructor(private _dialogService: DialogService) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: this.responsivePadding,
            focusTrapped: true,
            verticalPadding: this.verticalPadding
        });

        dialogRef.afterClosed.subscribe(
            (result) => {
                this.confirmationReason = 'Dialog closed with result: ' + result;
            },
            (error) => {
                this.confirmationReason = 'Dialog dismissed with result: ' + error;
            }
        );
    }
}
