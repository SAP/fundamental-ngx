import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationComponent } from './side-navigation.component';
import { SideNavigationGroupComponent } from './side-navigation-group/side-navigation-group.component';
import { SideNavigationTitleDirective } from './side-navigation-title/side-navigation-title.directive';
import { SideNavigationListComponent } from './side-navigation-list/side-navigation-list.component';
import { SideNavigationItemComponent } from './side-navigation-item/side-navigation-item.component';
import { SideNavigationLinkComponent } from './side-navigation-link/side-navigation-link.component';
import { SideNavigationSubListComponent } from './side-navigation-sublist/side-navigation-sublist.component';
import { SideNavigationSubItemComponent } from './side-navigation-subitem/side-navigation-subitem.component';
import { SideNavigationSubLinkComponent } from './side-navigation-sublink/side-navigation-sublink.component';
import { SideNavigationIconComponent } from './side-navigation-icon/side-navigation-icon.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        SideNavigationComponent,
        SideNavigationGroupComponent,
        SideNavigationTitleDirective,
        SideNavigationListComponent,
        SideNavigationItemComponent,
        SideNavigationLinkComponent,
        SideNavigationSubListComponent,
        SideNavigationSubItemComponent,
        SideNavigationSubLinkComponent,
        SideNavigationIconComponent
    ],
    declarations: [
        SideNavigationComponent,
        SideNavigationGroupComponent,
        SideNavigationTitleDirective,
        SideNavigationListComponent,
        SideNavigationItemComponent,
        SideNavigationLinkComponent,
        SideNavigationSubListComponent,
        SideNavigationSubItemComponent,
        SideNavigationSubLinkComponent,
        SideNavigationIconComponent
    ]
})
export class SideNavigationModule {}
