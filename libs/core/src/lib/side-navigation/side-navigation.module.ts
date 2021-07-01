import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationComponent } from './side-navigation.component';
import { SideNavigationMainDirective } from './side-navigation-main.directive';
import { SideNavigationUtilityDirective } from './side-navigation-utility.directive';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';

@NgModule({
    imports: [CommonModule, NestedListModule],
    exports: [SideNavigationComponent, SideNavigationMainDirective, SideNavigationUtilityDirective, NestedListModule],
    declarations: [SideNavigationComponent, SideNavigationMainDirective, SideNavigationUtilityDirective]
})
export class SideNavigationModule {}
