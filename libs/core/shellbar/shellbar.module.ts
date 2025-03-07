import { NgModule } from '@angular/core';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { ShellbarComponent } from './shellbar.component';

import { ShellbarActionComponent } from './shellbar-action/shellbar-action.component';
import { ShellbarActionsComponent } from './shellbar-actions/shellbar-actions.component';
import { ShellbarLogoComponent } from './shellbar-logo/shellbar-logo.component';
import { ShellbarSubtitleComponent } from './shellbar-subtitle/shellbar-subtitle.component';
import { ShellbarTitleComponent } from './shellbar-title/shellbar-title.component';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ShellbarSidenavDirective } from './shellbar-sidenav.directive';
import { ShellbarUserMenuComponent } from './user-menu/shellbar-user-menu.component';

@NgModule({
    imports: [
        ShellbarComponent,
        ProductMenuComponent,
        ShellbarSubtitleComponent,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarUserMenuComponent,
        ShellbarSidenavDirective
    ],
    exports: [
        ShellbarComponent,
        ProductMenuComponent,
        ShellbarSubtitleComponent,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarUserMenuComponent,
        ShellbarSidenavDirective,
        ContentDensityModule
    ]
})
export class ShellbarModule {}
