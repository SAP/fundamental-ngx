import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { ShellbarComponent } from './shellbar.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ButtonModule } from '@fundamental-ngx/core/button';

import { ShellbarSubtitleComponent } from './shellbar-subtitle/shellbar-subtitle.component';
import { ShellbarActionsComponent } from './shellbar-actions/shellbar-actions.component';
import { ShellbarActionComponent } from './shellbar-action/shellbar-action.component';
import { ShellbarLogoComponent } from './shellbar-logo/shellbar-logo.component';
import { ShellbarTitleComponent } from './shellbar-title/shellbar-title.component';

import { ShellbarUserMenuComponent } from './user-menu/shellbar-user-menu.component';
import { IconModule } from '@fundamental-ngx/core/icon';
import { DragAndDropModule } from '@fundamental-ngx/core/utils';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProductSwitchModule } from '@fundamental-ngx/core/product-switch';
import { ShellbarSidenavDirective } from './shellbar-sidenav.directive';
import { ShellbarActionsMobileComponent } from './shellbar-actions-mobile/shellbar-actions-mobile.component';
import { AvatarModule } from '@fundamental-ngx/core/avatar';

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
        ShellbarUserMenuComponent,
        ShellbarSidenavDirective
    ],
    imports: [
        CommonModule,
        PopoverModule,
        MenuModule,
        ActionSheetModule,
        ButtonModule,
        DragAndDropModule,
        DragDropModule,
        ProductSwitchModule,
        IconModule,
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
        ShellbarUserMenuComponent,
        ShellbarSidenavDirective
    ]
})
export class ShellbarModule {}
