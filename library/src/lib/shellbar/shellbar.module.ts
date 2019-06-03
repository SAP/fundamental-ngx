import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellbarComponent } from './shellbar.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { ShellbarSubtitleComponent } from './shellbar-subtitle/shellbar-subtitle.component';
import { CopilotComponent } from './copilot/copilot.component';
import { ShellbarActionsComponent } from './shellbar-actions/shellbar-actions.component';
import { ShellbarActionComponent } from './shellbar-action/shellbar-action.component';
import { ShellbarLogoComponent } from './shellbar-logo/shellbar-logo.component';
import { ShellbarTitleComponent } from './shellbar-title/shellbar-title.component';

import { PopoverModule } from '../popover/popover.module';
import { MenuModule } from '../menu/menu.module';

@NgModule({
    declarations: [
        ShellbarComponent,
        ProductMenuComponent,
        ShellbarSubtitleComponent,
        CopilotComponent,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent
    ],
    imports: [CommonModule, PopoverModule, MenuModule],
    exports: [
        ShellbarComponent,
        ProductMenuComponent,
        ShellbarSubtitleComponent,
        CopilotComponent,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent
    ]
})
export class ShellbarModule {}
