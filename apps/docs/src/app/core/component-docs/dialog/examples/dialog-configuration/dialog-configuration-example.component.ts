import { Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-dialog-configuration-example',
    templateUrl: './dialog-configuration-example.component.html',
})
export class DialogConfigurationExample {

    constructor(public _dialogService: DialogService) { }

    openDialog(template): void {
        this._dialogService.open(template, {
            draggable: true,
            resizable: true,
            responsivePadding: true,
            escKeyCloseable: false,
            backdropClickCloseable: false,
            width: '300px',
        });
    }

}
