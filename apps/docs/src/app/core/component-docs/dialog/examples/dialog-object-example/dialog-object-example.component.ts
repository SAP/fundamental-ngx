import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DialogRef, DialogService, DefaultDialogObject } from '@fundamental-ngx/core';

@Component({
  selector: 'fd-dialog-object-example',
  templateUrl: './dialog-object-example.component.html'
})
export class DialogObjectExampleComponent {

    constructor(private _dialogService: DialogService) {}

    @ViewChild('dialogContent', { read: TemplateRef })
    dialogContent: TemplateRef<any>;

    @ViewChild('dialogSubHeader', { read: TemplateRef })
    dialogSubHeader: TemplateRef<any>;

    closeReason: string = '';

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
            (result) => {
                this.closeReason = 'Dialog closed with result: ' + result;
            },
            (error) => {
                this.closeReason = 'Dialog dismissed with result: ' + error;
            }
        );
    }
}
