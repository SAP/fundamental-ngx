import { NgModule } from '@angular/core';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { ShellbarComponent } from './shellbar.component';

import { ShellbarActionComponent } from './shellbar-action/shellbar-action.component';
import { ShellbarActionsComponent } from './shellbar-actions/shellbar-actions.component';
import { ShellbarLogoComponent } from './shellbar-logo/shellbar-logo.component';
import { ShellbarSubtitleComponent } from './shellbar-subtitle/shellbar-subtitle.component';
import { ShellbarTitleComponent } from './shellbar-title/shellbar-title.component';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ShellbarActionsMobileComponent } from './shellbar-actions-mobile/shellbar-actions-mobile.component';
import { ShellbarSidenavDirective } from './shellbar-sidenav.directive';
import { ShellbarUserMenuComponent } from './user-menu/shellbar-user-menu.component';
import { ShellbarBrandingComponent } from './shellbar-branding/shellbar-branding.component';
import { ShellbarUserMenuButtonDirective } from './user-menu/shellbar-user-menu-button.directive';
import { ShellbarContextAreaComponent } from './shellbar-context-area/shellbar-context-area.component';
import { ShellbarSeparatorComponent } from './shellbar-separator/shellbar-separator.component';

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
        ShellbarUserMenuButtonDirective,
        ShellbarSidenavDirective,
        ShellbarBrandingComponent,
        ShellbarContextAreaComponent,
        ShellbarSeparatorComponent
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
        ShellbarUserMenuButtonDirective,
        ShellbarSidenavDirective,
        ShellbarBrandingComponent,
        ShellbarContextAreaComponent,
        ShellbarSeparatorComponent,
        ContentDensityModule
    ]
})
export class ShellbarModule {}
