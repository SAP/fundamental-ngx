import { Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-popover-dialog-example',
    templateUrl: './popover-dialog-example.component.html'
})
export class PopoverDialogExampleComponent {

    constructor(private _dialogService: DialogService) {}

    openDialog(template: TemplateRef<any>) {
        this._dialogService.open(template, {
            width: '500px',
            responsivePadding: true
        })
    }
}
