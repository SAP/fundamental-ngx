import { Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-dialog-open-template-example',
    templateUrl: './template-based-dialog-example.component.html'
})
export class TemplateBasedDialogExampleComponent {
    confirmationReason: string;

    constructor(private _dialogService: DialogService) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-header-10'
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
