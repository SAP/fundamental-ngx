import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DialogDefaultContent, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';

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

    closeReason = '';

    private _dialogReference: DialogRef;

    openDialog(): void {
        const object: DialogDefaultContent = {
            title: 'Dialog Title',
            titleId: 'fd-dialog-header-12',
            content: this.dialogContent,
            subHeader: this.dialogSubHeader,
            approveButton: 'Ok',
            approveButtonAriaLabel: 'Ok Emphasized',
            approveButtonCallback: () => this._dialogReference.close('Approved'),
            cancelButton: 'Cancel',
            cancelButtonCallback: () => this._dialogReference.close('Canceled'),
            closeButtonCallback: () => this._dialogReference.dismiss('Dismissed'),
            closeButtonTitle: 'close'
        };

        this._dialogReference = this._dialogService.open(object, {
            ariaLabelledBy: 'fd-dialog-header-12',
            ariaDescribedBy: 'fd-dialog-body-12',
            focusTrapped: true
        });

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
