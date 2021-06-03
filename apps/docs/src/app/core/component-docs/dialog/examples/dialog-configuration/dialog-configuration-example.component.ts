import { Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-dialog-configuration-example',
    templateUrl: './dialog-configuration-example.component.html'
})
export class DialogConfigurationExample {
    constructor(public _dialogService: DialogService) {}

    openDraggableDialog(template): void {
        this._dialogService.open(template, {
            width: '300px',
            draggable: true,
            responsivePadding: true,
            backdropClickCloseable: true,
            ariaLabelledBy: 'fd-dialog-header-4'
        });
    }

    openResizableDialog(template): void {
        this._dialogService.open(template, {
            width: '300px',
            resizable: true,
            responsivePadding: true,
            backdropClickCloseable: true,
            ariaLabelledBy: 'fd-dialog-header-4'
        });
    }

    openClosableByButtonDialog(template): void {
        this._dialogService.open(template, {
            width: '300px',
            escKeyCloseable: false,
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-header-4'
        });
    }
}
