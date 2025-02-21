import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import {
    UserMenuBodyComponent,
    UserMenuComponent,
    UserMenuContentContainerComponent,
    UserMenuHeaderContainerDirective,
    UserMenuHeaderDirective,
    UserMenuSublineDirective,
    UserMenuUserNameDirective
} from '@fundamental-ngx/core/user-menu';

@Component({
    selector: 'fd-user-menu-default-example',
    templateUrl: './user-menu-default-example.component.html',
    imports: [
        UserMenuComponent,
        UserMenuBodyComponent,
        UserMenuContentContainerComponent,
        UserMenuHeaderContainerDirective,
        UserMenuHeaderDirective,
        UserMenuSublineDirective,
        UserMenuUserNameDirective,
        AvatarComponent,
        PopoverModule,
        ListModule,
        PanelModule,
        MenuModule,
        ButtonComponent
    ]
})
export class UserMenuDefaultExampleComponent {
    expanded = true;
}
