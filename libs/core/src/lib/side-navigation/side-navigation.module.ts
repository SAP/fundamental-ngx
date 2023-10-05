import { NgModule } from '@angular/core';

import { SideNavigationMainDirective } from './side-navigation-main.directive';
import { SideNavigationUtilityDirective } from './side-navigation-utility.directive';
import { SideNavigationComponent } from './side-navigation.component';

import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { NestedListKeyboardService, NestedListStateService } from '@fundamental-ngx/core/nested-list';

/**
 * @deprecated
 */
@NgModule({
    imports: [SideNavigationComponent, SideNavigationMainDirective, SideNavigationUtilityDirective],
    exports: [SideNavigationComponent, SideNavigationMainDirective, SideNavigationUtilityDirective],
    providers: [MenuKeyboardService, NestedListKeyboardService, NestedListStateService]
})
export class SideNavigationModule {}
