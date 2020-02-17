import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationComponent } from './side-navigation.component';
import { SideNavigationMainDirective } from './side-navigation-main.directive';
import { SideNavigationUtilityDirective } from './side-navigation-utility.directive';
import { NestedListModule } from '../nested-list/nested-list.module';

@NgModule({
    imports: [CommonModule, NestedListModule],
    exports: [
        SideNavigationComponent,
        SideNavigationMainDirective,
        SideNavigationUtilityDirective,
    ],
    declarations: [
        SideNavigationComponent,
        SideNavigationMainDirective,
        SideNavigationUtilityDirective,
    ]
})
export class SideNavigationModule {}
