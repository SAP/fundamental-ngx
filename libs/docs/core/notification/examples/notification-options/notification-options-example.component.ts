import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActionSheetComponent, ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';
import { NotificationModule } from '@fundamental-ngx/core/notification';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

@Component({
    selector: 'fd-notification-options-example',
    templateUrl: './notification-options-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NotificationModule,
        AvatarComponent,
        ButtonComponent,
        MessageStripComponent,
        ActionSheetModule,
        MessageToastModule,
        ObjectStatusComponent,
        IconComponent
    ]
})
export class NotificationOptionsExampleComponent {
    @ViewChild(ActionSheetComponent)
    actionSheetComponent: ActionSheetComponent;

    expanded = true;

    constructor(private _messageToastService: MessageToastService) {}

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
