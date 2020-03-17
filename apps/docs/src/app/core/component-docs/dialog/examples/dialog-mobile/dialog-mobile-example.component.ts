import { Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-dialog-mobile-example',
    templateUrl: './dialog-mobile-example.component.html'
})
export class DialogMobileExampleComponent {

    constructor(public _dialogService: DialogService)  {}

    openDialog(modalTemplate) {
        this._dialogService.open(modalTemplate, {
            mobile: true
        });
    }
}
