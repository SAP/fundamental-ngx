import { NgModule } from '@angular/core';

// Components
import { UserMenuBodyComponent } from './components/user-menu-body.component';
import { UserMenuContentContainerComponent } from './components/user-menu-content-container.component';
import { UserMenuControlComponent } from './components/user-menu-control.component';
import { UserMenuFooterComponent } from './components/user-menu-footer.component';
import { UserMenuListItemComponent } from './components/user-menu-list-item.component';
import { UserMenuListComponent } from './components/user-menu-list.component';
import { UserMenuSublistComponent } from './components/user-menu-sublist.component';
import { UserMenuComponent } from './user-menu.component';

// Directives
import { UserMenuControlElementDirective } from './directives/user-menu-control-element.directive';
import { UserMenuHeaderContainerDirective } from './directives/user-menu-header-container.directive';
import { UserMenuHeaderDirective } from './directives/user-menu-header.directive';
import { UserMenuSublineDirective } from './directives/user-menu-subline.directive';
import { UserMenuUserNameDirective } from './directives/user-menu-user-name.directive';

const components = [
    UserMenuComponent,
    UserMenuControlComponent,
    UserMenuBodyComponent,
    UserMenuFooterComponent,
    UserMenuListComponent,
    UserMenuSublistComponent,
    UserMenuListItemComponent,
    UserMenuContentContainerComponent,
    UserMenuHeaderDirective,
    UserMenuHeaderContainerDirective,
    UserMenuUserNameDirective,
    UserMenuSublineDirective,
    UserMenuControlElementDirective
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
