import { NgModule } from '@angular/core';
import { NavigationMenuItemComponent } from './navigation-menu-item.component';
import { NavigationMenuComponent } from './navigation-menu.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [NavigationMenuComponent, NavigationMenuItemComponent],
    exports: [NavigationMenuComponent, NavigationMenuItemComponent]
})
export class NavigationMenuModule {}
