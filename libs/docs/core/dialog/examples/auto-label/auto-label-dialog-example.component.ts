import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-auto-label-dialog-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './auto-label-dialog-example.component.html'
})
export class AutoLabelDialogExampleComponent {
    confirmationReason: string;

    constructor(private _dialogService: DialogService, private _cdr: ChangeDetectorRef) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true
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
