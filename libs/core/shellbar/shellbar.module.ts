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
import { ShellbarBrandingComponent } from './shellbar-branding/shellbar-branding.component';
import { ShellbarContextAreaComponent } from './shellbar-context-area/shellbar-context-area.component';
import { ShellbarSeparatorComponent } from './shellbar-separator/shellbar-separator.component';
import { ShellbarSidenavDirective } from './shellbar-sidenav.directive';
import { ShellbarUserMenuButtonDirective } from './user-menu/shellbar-user-menu-button.directive';
import { ShellbarUserMenuComponent } from './user-menu/shellbar-user-menu.component';

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
        ShellbarSidenavDirective,
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
        ShellbarSidenavDirective,
        ShellbarUserMenuButtonDirective,
        ShellbarSidenavDirective,
        ShellbarBrandingComponent,
        ShellbarContextAreaComponent,
        ShellbarSeparatorComponent,
        ContentDensityModule
    ]
})
export class ShellbarModule {}
