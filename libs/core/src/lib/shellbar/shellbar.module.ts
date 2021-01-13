import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ShellbarComponent } from './shellbar.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { PopoverModule } from '../popover/popover.module';
import { MenuModule } from '../menu/menu.module';
import { ButtonModule } from '../button/button.module';

import { ShellbarSubtitleComponent } from './shellbar-subtitle/shellbar-subtitle.component';
import { ShellbarActionsComponent } from './shellbar-actions/shellbar-actions.component';
import { ShellbarActionComponent } from './shellbar-action/shellbar-action.component';
import { ShellbarLogoComponent } from './shellbar-logo/shellbar-logo.component';
import { ShellbarTitleComponent } from './shellbar-title/shellbar-title.component';
import { ShellbarActionsMobileComponent } from './shellbar-actions/shellbar-actions-mobile.component';
import { ShellbarSidenavDirective } from './shellbar-sidenav.directive';
import { ShellbarUserMenuComponent } from './user-menu/shellbar-user-menu.component';

import { IconModule } from '../icon/icon.module';
import { DragAndDropModule } from '../utils/drag-and-drop/drag-and-drop.module';
import { ProductSwitchModule } from '../product-switch/product-switch.module';
import { AvatarModule } from '../../lib/avatar/avatar.module'
import { UserActionsMenuModule } from './user-actions-menu/user-actions-menu.module';

@NgModule({
    declarations: [
        ShellbarComponent,
        ProductMenuComponent,
        ShellbarSubtitleComponent,
        ShellbarActionsComponent,
        ShellbarActionsMobileComponent,
        ShellbarActionComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarSidenavDirective,
        ShellbarUserMenuComponent
    ],
    imports: [
        CommonModule,
        PopoverModule,
        MenuModule,
        ButtonModule,
        DragAndDropModule,
        DragDropModule,
        ProductSwitchModule,
        IconModule,
        UserActionsMenuModule,
        AvatarModule
    ],
    exports: [
        ShellbarComponent,
        ProductMenuComponent,
        ShellbarSubtitleComponent,
        ShellbarActionsComponent,
        ShellbarActionsMobileComponent,
        ShellbarActionComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        UserActionsMenuModule,
        ShellbarSidenavDirective,
        ShellbarUserMenuComponent
    ]
})
export class ShellbarModule {}
