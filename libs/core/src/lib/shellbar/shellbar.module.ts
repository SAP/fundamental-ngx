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
import { I18nModule } from '@fundamental-ngx/i18n';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { DeprecatedShellbarCompactDirective } from './deprecated-shellbar-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

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
        ShellbarSidenavDirective,
        DeprecatedShellbarCompactDirective
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
        I18nModule,
        AvatarModule,
        ContentDensityModule
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
        ShellbarSidenavDirective,
        DeprecatedShellbarCompactDirective,
        ContentDensityModule
    ]
})
export class ShellbarModule {}
