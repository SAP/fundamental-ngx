import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActionSheetComponent, ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';

@Component({
    selector: 'fd-action-sheet-compact-example',
    templateUrl: './action-sheet-compact-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ActionSheetModule, ContentDensityDirective, ButtonComponent, MessageToastModule]
})
export class ActionSheetCompactExampleComponent {
    @ViewChild(ActionSheetComponent)
    actionSheetComponent: ActionSheetComponent;

    isOpen = false;

    constructor(private _messageToastService: MessageToastService) {}

    isOpenChange(isOpen: boolean): void {
        this.isOpen = isOpen;
    }

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
