import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-form-dialog-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './form-dialog-example.component.html'
})
export class FormDialogExampleComponent {
    confirmationReason: string;
    responsivePadding = false;
    verticalPadding = false;

    constructor(private _dialogService: DialogService, private _cdr: ChangeDetectorRef) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: this.responsivePadding,
            focusTrapped: true,
            verticalPadding: this.verticalPadding
        });

        dialogRef.afterClosed.subscribe(
            (result) => {
                this.confirmationReason = 'Dialog closed with result: ' + result;
                this._cdr.detectChanges();
            },
            (error) => {
                this.confirmationReason = 'Dialog dismissed with result: ' + error;
                this._cdr.detectChanges();
            }
        );
    }
}
