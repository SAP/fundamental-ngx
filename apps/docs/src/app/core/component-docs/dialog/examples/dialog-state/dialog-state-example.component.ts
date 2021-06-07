import { Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-dialog-state-example',
    templateUrl: './dialog-state-example.component.html'
})
export class DialogStateExample {
    constructor(public dialogService: DialogService) {}

    openCloseDialog(template): void {
        const dialogRef = this.dialogService.open(template, {
            width: '300px',
            responsivePadding: true,
            data: 'This Dialog will be closed after 4s',
            ariaLabelledBy: 'fd-dialog-header-7'
        });
        setTimeout(() => dialogRef.close(), 4000);
    }

    openDismissDialog(template): void {
        const dialogRef = this.dialogService.open(template, {
            width: '300px',
            responsivePadding: true,
            data: 'This Dialog will be dismissed after 4s',
            ariaLabelledBy: 'fd-dialog-header-7'
        });
        setTimeout(() => dialogRef.dismiss(), 4000);
    }

    openHideDialog(template): void {
        const dialogRef = this.dialogService.open(template, {
            width: '300px',
            responsivePadding: true,
            data: 'This Dialog will be hidden after 4s',
            ariaLabelledBy: 'fd-dialog-header-7'
        });
        setTimeout(() => dialogRef.hide(true), 4000);
    }

    openLoadingDialog(template): void {
        const dialogRef = this.dialogService.open(template, {
            width: '300px',
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-header-7'
        });
        dialogRef.loading(true);
    }
}
