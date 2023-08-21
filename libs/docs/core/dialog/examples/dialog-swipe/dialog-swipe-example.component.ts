import { Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

type message = { icon: string; messageTitle: string; messageInfo: string };

@Component({
    selector: 'fd-dialog-swipe-example',
    templateUrl: './dialog-swipe-example.component.html'
})
export class DialogSwipeExampleComponent {
    messageSelected: boolean = false;
    subMessageSelected: boolean = false;
    dialogTitle: string = 'Swipe Dialog';
    messageList: message[] = [
        {
            icon: 'error',
            messageTitle: 'File not uploaded',
            messageInfo: 'Uploaded file does not meet security requirements'
        },
        { icon: 'error', messageTitle: 'Missing documents', messageInfo: 'The following documents were not found ...' },
        { icon: 'warning', messageTitle: 'Missing Data', messageInfo: 'Missing the folowing data ...' },
        {
            icon: 'message-information',
            messageTitle: 'Changes to upload policy',
            messageInfo: 'For better security measures the following ...'
        },
        { icon: 'incident', messageTitle: 'Improvement Survey', messageInfo: 'Complete the following survey' }
    ];
    arrList = [1, 2, 3];
    newMessage: message = { icon: '', messageTitle: '', messageInfo: '' };

    constructor(private _dialogService: DialogService) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            draggable: true,
            verticalPadding: false,
            width: '500px',
            height: '600px'
        });
    }

    openMessage(temp: message) {
        this.newMessage = temp;
        this.dialogTitle = temp.messageTitle;
        this.messageSelected = true;
    }
    openSubMessage(numb: number) {
        this.dialogTitle = this.newMessage.messageTitle + ' ' + numb;
        this.subMessageSelected = true;
    }
    returnToPrevious() {
        if (this.subMessageSelected === true) {
            this.dialogTitle = this.newMessage.messageTitle;
            this.subMessageSelected = false;
        } else {
            this.dialogTitle = 'Swipe Dialog';
            this.messageSelected = false;
        }
    }
}
