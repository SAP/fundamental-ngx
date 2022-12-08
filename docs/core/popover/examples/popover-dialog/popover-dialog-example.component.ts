import { Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-popover-dialog-example',
    templateUrl: './popover-dialog-example.component.html'
})
export class PopoverDialogExampleComponent {
    constructor(private _dialogService: DialogService) {}

    openDialog(template: TemplateRef<any>): void {
        this._dialogService.open(template, {
            width: '500px',
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-popover-1',
            focusTrapped: false
        });
    }
}
