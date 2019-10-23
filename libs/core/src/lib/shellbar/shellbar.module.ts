import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellbarComponent } from './shellbar.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { PopoverModule } from '../popover/popover.module';
import { MenuModule } from '../menu/menu.module';
import { IdentifierModule } from '../identifier/identifier.module';
import { ButtonModule } from '../button/button.module';
import { ComboboxModule } from '../combobox/combobox.module';


import { ShellbarSubtitleComponent } from './shellbar-subtitle/shellbar-subtitle.component';
import { ShellbarActionsComponent } from './shellbar-actions/shellbar-actions.component';
import { ShellbarActionComponent } from './shellbar-action/shellbar-action.component';
import { ShellbarLogoComponent } from './shellbar-logo/shellbar-logo.component';
import { ShellbarTitleComponent } from './shellbar-title/shellbar-title.component';

import { ShellbarUserMenuComponent } from './user-menu/shellbar-user-menu.component';
import { IconModule } from '../icon/icon.module';
import { DragAndDropModule } from '../utils/drag-and-drop/drag-and-drop.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProductSwitchModule } from '../product-switch/product-switch.module';

@NgModule({
    declarations: [
        ShellbarComponent,
        ProductMenuComponent,
        ShellbarSubtitleComponent,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarUserMenuComponent
    ],
    imports: [
        CommonModule,
        PopoverModule,
        MenuModule,
        IdentifierModule,
        ButtonModule,
        ComboboxModule,
        DragAndDropModule,
        DragDropModule,
        ProductSwitchModule,
        IconModule
    ],
    exports: [
        ShellbarComponent,
        ProductMenuComponent,
        ShellbarSubtitleComponent,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarUserMenuComponent
    ]
})
export class ShellbarModule { }
