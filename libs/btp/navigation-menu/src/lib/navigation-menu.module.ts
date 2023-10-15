import { NgModule } from '@angular/core';
import { NavigationMenuItemComponent } from './navigation-menu-item.component';
import { NavigationMenuComponent } from './navigation-menu.component';

@NgModule({
    imports: [NavigationMenuComponent, NavigationMenuItemComponent],
    exports: [NavigationMenuComponent, NavigationMenuItemComponent]
})
export class NavigationMenuModule {}
