import { Component } from '@angular/core';
import { FirstDialogExampleComponent } from './first-dialog-example.component';
import { DialogConfig, DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-dialog-stacked-example',
    template: '<button fd-button label="Open First Dialog" (click)="openDialog()"></button>'
})
export class DialogStackedExampleComponent {
    constructor(private _dialogService: DialogService) {}

    openDialog(): void {
        this._dialogService.open(FirstDialogExampleComponent, { responsivePadding: true, ariaLabelledBy: 'fd-dialog-header-8' });
    }
}
