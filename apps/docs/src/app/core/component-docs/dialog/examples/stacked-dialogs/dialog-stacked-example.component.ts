import { Component } from '@angular/core';
import { FirstDialogExampleComponent } from './first-dialog-example.component';
import { DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-dialog-stacked-example',
    template: '<button fd-button (click)="openDialog()">Open First Dialog</button>'
})
export class DialogStackedExampleComponent {

    constructor(private _dialogService: DialogService) { }

    openDialog(): void {
        this._dialogService.open(FirstDialogExampleComponent, {responsivePadding: true});
    }
}
