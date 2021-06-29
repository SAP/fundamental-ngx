import { Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-dialog-mobile-example',
    templateUrl: './dialog-mobile-example.component.html'
})
export class DialogMobileExampleComponent {
    constructor(public _dialogService: DialogService) {}

    openDialog(dialogTemplate): void {
        this._dialogService.open(dialogTemplate, {
            mobile: true,
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-header-5',
            ariaDescribedBy: 'fd-dialog-body-5'
        });
    }
}
