import { Component, TemplateRef } from '@angular/core';
import { MessageBoxService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-message-box-open-template-example',
    templateUrl: './template-based-message-box-example.component.html'
})
export class TemplateBasedMessageBoxExampleComponent {
    confirmationReason: string;

    constructor(private _messageBoxService: MessageBoxService) {}

    openDialog(messageBox: TemplateRef<any>): void {
        const dialogRef = this._messageBoxService.open(messageBox, { responsivePadding: true });

        dialogRef.afterClosed.subscribe(
            (result) => {
                this.confirmationReason = 'Message box closed with result: ' + result;
            },
            (error) => {
                this.confirmationReason = 'Message box dismissed with result: ' + error;
            }
        );
    }
}
