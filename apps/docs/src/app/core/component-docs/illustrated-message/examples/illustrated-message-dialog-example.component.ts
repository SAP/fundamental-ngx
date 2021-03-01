import { Component, TemplateRef } from '@angular/core';
import { DialogConfig, DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-illustrated-message-dialog-example',
    templateUrl: './illustrated-message-dialog-example.component.html'
})
export class IllustratedMessageDialogExampleComponent {
    dialogSvgConfig = {
        dialog: {url: 'assets/images/sapIllus-Dialog-NoMail.svg', id: 'sapIllus-Dialog-NoMail'}
    }

    confirmationReason: string;

    constructor(private _dialogService: DialogService) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog);
    }
}
