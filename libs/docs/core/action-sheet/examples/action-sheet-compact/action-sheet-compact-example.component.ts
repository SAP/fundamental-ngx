import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActionSheetComponent } from '@fundamental-ngx/core/action-sheet';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';

@Component({
    selector: 'fd-action-sheet-compact-example',
    templateUrl: './action-sheet-compact-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ActionSheetModule, ContentDensityDirective, ButtonModule]
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
