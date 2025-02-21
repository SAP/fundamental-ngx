import { NgModule } from '@angular/core';

// Components
import { UserMenuBodyComponent } from './components/user-menu-body.component';
import { UserMenuListComponent } from './components/user-menu-list.component';
import { UserMenuComponent } from './user-menu.component';

// Directives
import { UserMenuContentContainerComponent } from './components/user-menu-content-container.component';
import { UserMenuHeaderContainerDirective } from './directives/user-menu-header-container.directive';
import { UserMenuHeaderDirective } from './directives/user-menu-header.directive';
import { UserMenuSublineDirective } from './directives/user-menu-subline.directive';
import { UserMenuUserNameDirective } from './directives/user-menu-user-name.directive';

const components = [
    UserMenuComponent,
    UserMenuBodyComponent,
    UserMenuListComponent,
    UserMenuContentContainerComponent,
    UserMenuHeaderContainerDirective,
    UserMenuHeaderDirective,
    UserMenuSublineDirective,
    UserMenuUserNameDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class UserMenuModule {}
