import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';

import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageBoxModule, MessageBoxService } from '@fundamental-ngx/core/message-box';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-template-based-message-box-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './template-based-message-box-example.component.html',
    imports: [MessageBoxModule, TitleComponent, BarModule, InitialFocusDirective, ButtonComponent]
})
export class TemplateBasedMessageBoxExampleComponent {
    confirmationReason: string;

    constructor(
        private _messageBoxService: MessageBoxService,
        private _cdr: ChangeDetectorRef
    ) {}

    open(messageBox: TemplateRef<any>): void {
        const messageBoxRef = this._messageBoxService.open(messageBox, {
            ariaLabel: 'aria-label attr for the Message Box',
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
