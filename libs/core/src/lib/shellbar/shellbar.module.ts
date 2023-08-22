import { NgModule } from '@angular/core';
import { ShellbarComponent } from './shellbar.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';

import { ShellbarSubtitleComponent } from './shellbar-subtitle/shellbar-subtitle.component';
import { ShellbarActionsComponent } from './shellbar-actions/shellbar-actions.component';
import { ShellbarActionComponent } from './shellbar-action/shellbar-action.component';
import { ShellbarLogoComponent } from './shellbar-logo/shellbar-logo.component';
import { ShellbarTitleComponent } from './shellbar-title/shellbar-title.component';

import { ShellbarUserMenuComponent } from './user-menu/shellbar-user-menu.component';
import { ShellbarSidenavDirective } from './shellbar-sidenav.directive';
import { ShellbarActionsMobileComponent } from './shellbar-actions-mobile/shellbar-actions-mobile.component';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [
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
        ContentDensityModule
    ]
})
export class ShellbarModule {}
