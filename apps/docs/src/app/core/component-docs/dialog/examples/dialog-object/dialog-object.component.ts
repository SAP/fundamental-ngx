import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DialogRef, DialogService, DefaultDialogObject } from '@fundamental-ngx/core';

@Component({
  selector: 'fd-dialog-object',
  templateUrl: './dialog-object.component.html'
})
export class DialogObjectComponent {

    constructor(private _dialogService: DialogService) {}

    @ViewChild('dialogContent', { read: TemplateRef })
    dialogContent: TemplateRef<any>;

    @ViewChild('dialogSubHeader', { read: TemplateRef })
    dialogSubHeader: TemplateRef<any>;

    reason: string = '';

    private _dialogReference: DialogRef;

    openDialog(): void {
        const object: DefaultDialogObject = {
            title: 'Dialog Title',
            content: this.dialogContent,
            subHeader: this.dialogSubHeader,
            approveButton: 'Ok',
            approveButtonCallback: () => this._dialogReference.close('Approved'),
            cancelButton: 'Cancel',
            cancelButtonCallback: () => this._dialogReference.close('Canceled'),
            closeButtonCallback: () => this._dialogReference.dismiss('Dismissed')
        };

        this._dialogReference = this._dialogService.open(object);

        this._dialogReference.afterClosed.subscribe(
            reason => this.reason = reason,
            reason => this.reason = reason ? reason : 'Backdrop Clicked'
        );
    }
}
