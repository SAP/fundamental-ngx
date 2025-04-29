import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageBoxContent, MessageBoxService } from '@fundamental-ngx/core/message-box';

@Component({
    selector: 'fd-object-based-message-box-example',
    templateUrl: './object-based-message-box-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        // The MessageBoxService is already provided on the MessageBoxModule module.
        // We do it at the component level here, due to the limitations of our example generation script.
        MessageBoxService
    ],
    imports: [ButtonComponent]
})
export class ObjectBasedMessageBoxExampleComponent {
    title = 'Fruit facts';
    content = 'Strawberries have more vitamin C than oranges.';
    closeReason = '';

    constructor(
        private _messageBoxService: MessageBoxService,
        private _cdr: ChangeDetectorRef
    ) {}

    open(): void {
        const content: MessageBoxContent = {
            title: this.title,
            titleId: 'message-box-title-id-1',
            contentId: 'message-box-content-id-1',
            content: this.content,
            approveButton: 'Ok',
            cancelButton: 'Cancel',
            approveButtonCallback: () => messageBoxRef.close('Approved'),
            cancelButtonCallback: () => messageBoxRef.close('Canceled'),
            closeButtonCallback: () => messageBoxRef.dismiss('Dismissed')
        };

        const messageBoxRef = this._messageBoxService.open(content, {
            ariaLabelledBy: 'message-box-title-id-1',
            ariaDescribedBy: 'message-box-content-id-1'
        });

        messageBoxRef.afterClosed.subscribe({
            next: (result) => {
                this.closeReason = 'Message box closed with result: ' + result;
                this._cdr.detectChanges();
            },
            error: (error) => {
                this.closeReason = 'Message box dismissed with result: ' + error;
                this._cdr.detectChanges();
            }
        });
    }
}
