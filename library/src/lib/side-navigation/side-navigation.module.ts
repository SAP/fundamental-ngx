import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationComponent } from './side-navigation.component';
import { SideNavigationGroupComponent } from './side-navigation-group.component';
import { SideNavigationTitleComponent } from './side-navigation-title.component';
import { SideNavigationListComponent } from './side-navigation-list.component';
import { SideNavigationItemComponent } from './side-navigation-item.component';
import { SideNavigationLinkComponent } from './side-navigation-link.component';
import { SideNavigationSubListComponent } from './side-navigation-sublist.component';
import { SideNavigationSubItemComponent } from './side-navigation-subitem.component';
import { SideNavigationSubLinkComponent } from './side-navigation-sublink.component';
import { SideNavigationIconComponent } from './side-navigation-icon.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        SideNavigationComponent,
        SideNavigationGroupComponent,
        SideNavigationTitleComponent,
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
        SideNavigationTitleComponent,
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
