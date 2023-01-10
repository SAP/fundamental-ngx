import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationComponent } from './side-navigation.component';
import { SideNavigationMainComponent } from './side-navigation-main.component';
import { SideNavigationUtilityDirective } from './side-navigation-utility.directive';
import { CxNestedListModule } from '@fundamental-ngx/cx/nested-list';
import { SideNavigationButtonDirective } from './side-navigation-button.directive';
import { ButtonModule } from '@fundamental-ngx/core/button';

@NgModule({
    imports: [CommonModule, CxNestedListModule, ButtonModule],
    exports: [
        SideNavigationComponent,
        SideNavigationMainComponent,
        SideNavigationUtilityDirective,
        SideNavigationButtonDirective,
        CxNestedListModule
    ],
    declarations: [
        SideNavigationComponent,
        SideNavigationMainComponent,
        SideNavigationUtilityDirective,
        SideNavigationButtonDirective
    ]
})
export class CxSideNavigationModule {}
