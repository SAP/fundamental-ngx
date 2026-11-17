import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarComponent, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { ShellbarModule } from '@fundamental-ngx/core/shellbar';
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

@Component({
    selector: 'fd-shellbar-dual-context-area-example',
    templateUrl: './shellbar-dual-context-area-example.component.html',
    imports: [
        ShellbarModule,
        AvatarComponent,
        ButtonComponent,
        ObjectStatusComponent,
        UserMenuComponent,
        UserMenuBodyComponent,
        UserMenuControlComponent,
        UserMenuControlElementDirective,
        UserMenuListComponent,
        UserMenuListItemComponent,
        UserMenuHeaderDirective,
        UserMenuHeaderContainerDirective,
        UserMenuSublineDirective,
        UserMenuUserNameDirective,
        UserMenuContentContainerComponent,
        UserMenuSublistComponent,
        UserMenuFooterComponent,
        PanelModule,
        ListModule,
        BarComponent,
        BarRightDirective,
        FormsModule
    ]
})
export class ShellbarDualContextAreaExampleComponent {
    expanded = true;
    isOpen = false;

    isOpenChange(isOpen: boolean): void {
        this.isOpen = isOpen;
    }

    onZoomGlyphClick(): void {
        alert('Edit profile');
    }

    actionPicked(action: string): void {
        alert(action + ' action performed');
    }
}
