import { Component, ViewChild } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarComponent, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import {
    UserMenuBodyComponent,
    UserMenuComponent,
    UserMenuContentContainerComponent,
    UserMenuControlComponent,
    UserMenuControlElementDirective,
    UserMenuFooterComponent,
    UserMenuHeaderContainerDirective,
    UserMenuHeaderDirective,
    UserMenuListComponent,
    UserMenuListItemComponent,
    UserMenuSublineDirective,
    UserMenuSublistComponent,
    UserMenuUserNameDirective
} from '@fundamental-ngx/core/user-menu';

import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';

@Component({
    selector: 'fd-user-menu-default-example',
    templateUrl: './user-menu-default-example.component.html',
    imports: [
        UserMenuComponent,
        UserMenuBodyComponent,
        UserMenuControlComponent,
        UserMenuFooterComponent,
        UserMenuContentContainerComponent,
        UserMenuHeaderContainerDirective,
        UserMenuHeaderDirective,
        UserMenuSublineDirective,
        UserMenuUserNameDirective,
        UserMenuListComponent,
        UserMenuSublistComponent,
        UserMenuListItemComponent,
        UserMenuControlElementDirective,
        AvatarComponent,
        PopoverModule,
        ListModule,
        PanelModule,
        MenuModule,
        ButtonComponent,
        BarComponent,
        BarRightDirective,
        MessageToastModule
    ]
})
export class UserMenuDefaultExampleComponent {
    @ViewChild(UserMenuComponent)
    userMenuComponent: UserMenuComponent;

    expanded = true;
    isOpen = false;

    constructor(private _messageToastService: MessageToastService) {}

    onZoomGlyphClick(): void {
        alert('Edit profile');
    }

    isOpenChange(isOpen: boolean): void {
        this.isOpen = isOpen;
    }

    actionPicked(action: string): void {
        this.openMessageToast(action);
        this.userMenuComponent.close();
    }

    openMessageToast(action: string): void {
        const content = `${action} action performed`;
        this._messageToastService.open(content, {
            duration: 5000
        });
    }
}
