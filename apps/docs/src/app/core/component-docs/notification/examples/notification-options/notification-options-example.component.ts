import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetComponent, MessageToastService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-notification-options-example',
    templateUrl: './notification-options-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationOptionsExampleComponent {
    @ViewChild(ActionSheetComponent)
    actionSheetComponent: ActionSheetComponent;

    expanded = true;

    constructor(private _messageToastService: MessageToastService, ) {}

    actionPicked(action: string): void {
        this.openMessageToast(action);
        this.actionSheetComponent.close();
    }

    openMessageToast(action: string): void {
        const content = `${action} action performed`;
        this._messageToastService.open(content, {
            duration: 2000
        });
    }
}
