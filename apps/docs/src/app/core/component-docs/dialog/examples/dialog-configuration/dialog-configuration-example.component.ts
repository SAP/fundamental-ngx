import { Component } from '@angular/core';
import { DialogConfig, DialogService } from '@fundamental-ngx/core';

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
            responsivePadding: true
        } as DialogConfig);
    }

    openResizableDialog(template): void {
        this._dialogService.open(template, {
            width: '300px',
            resizable: true,
            responsivePadding: true
        } as DialogConfig);
    }

    openClosableByButtonDialog(template): void {
        this._dialogService.open(template, {
            width: '300px',
            escKeyCloseable: false,
            responsivePadding: true,
            backdropClickCloseable: false
        } as DialogConfig);
    }

    openNavigationDialog(template): void {
        this._dialogService.open(template, {
            width: '300px',
            responsivePadding: true,
            closeOnNavigation: false
        } as DialogConfig);
    }
}
