import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellbarComponent } from './shellbar.component';
import { ProductMenuComponent } from './product-menu.component';
import { ProductMenuControlComponent } from './product-menu-control.component';
import { ShellbarSubtitleComponent } from './shellbar-subtitle.component';
import { CopilotComponent } from './copilot.component';
import { ShellbarActionsComponent } from './shellbar-actions.component';
import { ShellbarActionComponent } from './shellbar-action.component';
import { UserMenuComponent } from './user-menu.component';
import { UserMenuControlComponent } from './user-menu-control.component';
import { ProductSwitcherComponent } from './product-switcher.component';
import { ProductSwitcherBodyComponent } from './product-switcher-body.component';
import { ProductSwitcherProductIconComponent } from './product-switcher-product-icon.component';
import { ProductSwitcherProductTitleComponent } from './product-switcher-product-title.component';
import { ShellbarLogoComponent } from './shellbar-logo.component';
import { ShellbarTitleComponent } from './shellbar-title.component';
import { ShellbarCollapseComponent } from './shellbar-collapse.component';
import { ShellbarCollapseControlComponent } from './shellbar-collapse-control.component';

@NgModule({
    declarations: [
        ShellbarComponent,
        ProductMenuComponent,
        ProductMenuControlComponent,
        ShellbarSubtitleComponent,
        CopilotComponent,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        UserMenuComponent,
        UserMenuControlComponent,
        ProductSwitcherComponent,
        ProductSwitcherBodyComponent,
        ProductSwitcherProductIconComponent,
        ProductSwitcherProductTitleComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarCollapseComponent,
        ShellbarCollapseControlComponent
    ],
    imports: [CommonModule],
    exports: [
        ShellbarComponent,
        ProductMenuComponent,
        ProductMenuControlComponent,
        ShellbarSubtitleComponent,
        CopilotComponent,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        UserMenuComponent,
        UserMenuControlComponent,
        ProductSwitcherComponent,
        ProductSwitcherBodyComponent,
        ProductSwitcherProductIconComponent,
        ProductSwitcherProductTitleComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarCollapseComponent,
        ShellbarCollapseControlComponent
    ]
})
export class ShellbarModule {}
