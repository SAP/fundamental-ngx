import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { CxNestedListModule } from '@fundamental-ngx/cx/nested-list';
import { I18nModule } from '@fundamental-ngx/i18n';
import { SideNavigationButtonDirective } from './side-navigation-button.directive';
import { SideNavigationMainComponent } from './side-navigation-main.component';
import { SideNavigationUtilityDirective } from './side-navigation-utility.directive';
import { SideNavigationComponent } from './side-navigation.component';

@NgModule({
    imports: [CommonModule, CxNestedListModule, ButtonComponent, ScrollbarModule, I18nModule],
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
