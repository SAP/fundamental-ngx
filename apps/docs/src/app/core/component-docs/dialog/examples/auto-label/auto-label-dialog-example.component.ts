import { Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-auto-label-dialog-example',
    templateUrl: './auto-label-dialog-example.component.html'
})
export class AutoLabelDialogExampleComponent {
    confirmationReason: string;

    constructor(private _dialogService: DialogService) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true
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
