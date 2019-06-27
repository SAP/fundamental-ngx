import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationComponent } from './side-navigation.component';
import { SideNavigationGroupComponent } from './side-navigation-group/side-navigation-group.component';
import { SideNavigationTitleDirective } from './side-navigation-title/side-navigation-title.directive';
import { SideNavigationListDirective } from './side-navigation-list/side-navigation-list.directive';
import { SideNavigationItemComponent } from './side-navigation-item/side-navigation-item.component';
import { SideNavigationLinkDirective } from './side-navigation-link/side-navigation-link.directive';
import { SideNavigationSublistDirective } from './side-navigation-sublist/side-navigation-sublist.directive';
import { SideNavigationSubitemDirective } from './side-navigation-subitem/side-navigation-subitem.directive';
import { SideNavigationSublinkDirective } from './side-navigation-sublink/side-navigation-sublink.directive';

@NgModule({
    imports: [CommonModule],
    exports: [
        SideNavigationComponent,
        SideNavigationGroupComponent,
        SideNavigationTitleDirective,
        SideNavigationListDirective,
        SideNavigationItemComponent,
        SideNavigationLinkDirective,
        SideNavigationSublistDirective,
        SideNavigationSubitemDirective,
        SideNavigationSublinkDirective,
    ],
    declarations: [
        SideNavigationComponent,
        SideNavigationGroupComponent,
        SideNavigationTitleDirective,
        SideNavigationListDirective,
        SideNavigationItemComponent,
        SideNavigationLinkDirective,
        SideNavigationSublistDirective,
        SideNavigationSubitemDirective,
        SideNavigationSublinkDirective,
    ]
})
export class SideNavigationModule {}
