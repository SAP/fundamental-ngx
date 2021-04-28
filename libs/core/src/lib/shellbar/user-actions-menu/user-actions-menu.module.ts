import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from '../../popover/popover.module';
import { TitleModule } from '../../title/title.module';
import { AvatarModule } from '../../avatar/avatar.module';
import { DialogModule } from '../../dialog/dialog.module';
import { ButtonModule } from '../../button/button.module';
import { BarModule } from '../../bar/bar.module';

import { UserActionsMenuComponent } from './components/user-actions-menu/user-actions-menu.component';
import { UserActionsMenuHeaderComponent } from './components/user-actions-menu-header/user-actions-menu-header.component';
import { UserActionsMenuFooterComponent } from './components/user-actions-menu-footer/user-actions-menu-footer.component';
import { UserActionsSubmenuComponent } from './components/user-actions-submenu/user-actions-submenu.component';

import { UserActionsMenuHeaderAddonLeftDirective } from './directives/user-actions-menu-header-addon-left.directive';
import { UserActionsMenuHeaderAddonRightDirective } from './directives/user-actions-menu-header-addon-right.directive';
import { UserActionsMenuItemDirective } from './directives/user-actions-menu-item.directive';

const COMPONENTS = [
    UserActionsMenuComponent,
    UserActionsMenuHeaderComponent,
    UserActionsMenuFooterComponent,
    UserActionsSubmenuComponent
];

const DIRECTIVES = [
    UserActionsMenuHeaderAddonLeftDirective,
    UserActionsMenuHeaderAddonRightDirective,
    UserActionsMenuItemDirective
];
@NgModule({
    declarations: [...COMPONENTS, ...DIRECTIVES],
    exports: [...COMPONENTS, ...DIRECTIVES],
    imports: [
        CommonModule,
        PopoverModule,
        AvatarModule,
        TitleModule,
        DialogModule,
        ButtonModule,
        BarModule
    ]
})
export class UserActionsMenuModule {}
