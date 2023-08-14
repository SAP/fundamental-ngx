import { Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-dialog-swipe-example',
    templateUrl: './dialog-swipe-example.component.html'
})
export class DialogSwipeExampleComponent {
    elementSelected: boolean = false;
    dialogTitle: string = 'Swipe Dialog';
    messageList = [
        {icon: 'error',messageTitle: 'File not uploaded',messageInfo: 'Uploaded file does not meet security requirements'},
        {icon: 'error',messageTitle: 'Missing required documents',messageInfo: 'The following documents were not found ...'},
        {icon: 'warning', messageTitle: 'Missing Data', messageInfo: 'Missing the folowing data ...'},
        {icon: 'message-information',messageTitle: 'Changes to upload policy',messageInfo: 'For better security measures the following ...'},
        {icon: 'incident', messageTitle: 'Improvement Survey', messageInfo: 'Complete the following survey'}
    ];
    content: string = '';

    constructor(private _dialogService: DialogService) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            draggable: true,
            verticalPadding: false
        });
    }

    openElement(numb: number) {
        this.content = this.messageList[numb].messageInfo;
        this.dialogTitle = this.messageList[numb].messageTitle;
        this.elementSelected = true;
    }

    returnToMain() {
        this.content = '';
        this.dialogTitle = 'Swipe Dialog';
        this.elementSelected = false;
    }
}
