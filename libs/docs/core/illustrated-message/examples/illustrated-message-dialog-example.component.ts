import { Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-illustrated-message-dialog-example',
    templateUrl: './illustrated-message-dialog-example.component.html'
})
export class IllustratedMessageDialogExampleComponent {
    dialogSvgConfig = {
        dialog: { url: 'assets/images/sapIllus-Dialog-NoMail.svg', id: 'sapIllus-Dialog-NoMail' }
    };
    dialogId = 'im-dialog-81mf46';

    confirmationReason: string;

    constructor(private _dialogService: DialogService) {}

    openDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(dialog, {
            id: this.dialogId,
            ariaLabelledBy: `${this.dialogId}-header`,
            ariaDescribedBy: `${this.dialogId}-description`
        });
    }
}
