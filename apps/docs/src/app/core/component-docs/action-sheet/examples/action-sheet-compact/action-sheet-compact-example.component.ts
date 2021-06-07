import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActionSheetComponent } from '@fundamental-ngx/core/action-sheet';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';

@Component({
    selector: 'fd-action-sheet-compact-example',
    templateUrl: './action-sheet-compact-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSheetCompactExampleComponent {

    @ViewChild(ActionSheetComponent)
    actionSheetComponent: ActionSheetComponent;

    constructor(private _messageToastService: MessageToastService) {}

    actionPicked(action: string): void {
        this.openMessageToast(action);
        this.actionSheetComponent.close();
    }

    openMessageToast(action: string): void {
        const content = `${action} action performed`;
        this._messageToastService.open(content, {
            duration: 5000
        });
    }
}
