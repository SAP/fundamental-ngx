import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { FirstDialogExampleComponent } from './first-dialog-example.component';

@Component({
    selector: 'fd-dialog-stacked-example',
    template: '<button fd-button label="Open First Dialog" (click)="openDialog()"></button>',
    imports: [ButtonComponent]
})
export class DialogStackedExampleComponent {
    constructor(private _dialogService: DialogService) {}

    openDialog(): void {
        this._dialogService.open(FirstDialogExampleComponent, {
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-header-first',
            ariaDescribedBy: 'fd-dialog-body-first'
        });
    }
}
