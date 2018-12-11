import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellbarComponent } from './shellbar.component';
import { ProductMenuComponent } from './product-menu.component';
import { ProductMenuControlComponent } from './product-menu-control.component';
import { ShellbarSubtitleComponent } from './shellbar-subtitle.component';
import { CopilotComponent } from './copilot.component';
import { ShellbarActionsComponent } from './shellbar-actions.component';
import { ShellbarActionComponent } from './shellbar-action.component';
import { ShellbarLogoComponent } from './shellbar-logo.component';
import { ShellbarTitleComponent } from './shellbar-title.component';
import { ShellbarCollapseComponent } from './shellbar-collapse.component';
import { ShellbarCollapseControlComponent } from './shellbar-collapse-control.component';

import { PopoverModule } from '../popover/popover.module';
import { MenuModule } from '../menu/menu.module';

@NgModule({
    declarations: [
        ShellbarComponent,
        ProductMenuComponent,
        ProductMenuControlComponent,
        ShellbarSubtitleComponent,
        CopilotComponent,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarCollapseComponent,
        ShellbarCollapseControlComponent
    ],
    imports: [CommonModule, PopoverModule, MenuModule],
    exports: [
        ShellbarComponent,
        ProductMenuComponent,
        ProductMenuControlComponent,
        ShellbarSubtitleComponent,
        CopilotComponent,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarCollapseComponent,
        ShellbarCollapseControlComponent
    ]
})
export class ShellbarModule {}
