import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';

import { MessageBoxService } from '@fundamental-ngx/core/message-box';

@Component({
    selector: 'fd-template-based-message-box-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './template-based-message-box-example.component.html'
})
export class TemplateBasedMessageBoxExampleComponent {
    confirmationReason: string;

    constructor(private _messageBoxService: MessageBoxService, private _cdr: ChangeDetectorRef) {}

    open(messageBox: TemplateRef<any>): void {
        const messageBoxRef = this._messageBoxService.open(messageBox, {
            ariaLabelledBy: 'fd-message-box-template-base-header fd-message-box-template-base-body',
            focusTrapped: true
        });

        messageBoxRef.afterClosed.subscribe(
            (result) => {
                this.confirmationReason = 'Message box closed with result: ' + result;
                this._cdr.detectChanges();
            },
            (error) => {
                this.confirmationReason = 'Message box dismissed with result: ' + error;
                this._cdr.detectChanges();
            }
        );
    }
}
