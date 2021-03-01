import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActionSheetComponent, MessageToastService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-action-sheet-mobile-example',
    templateUrl: './action-sheet-mobile-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSheetMobileExampleComponent {

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
