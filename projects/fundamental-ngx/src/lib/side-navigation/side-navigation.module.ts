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
import { SideNavigationIconComponent } from './side-navigation-icon.component';
import { SideNavigationIconsDirective } from './side-navigation-icons.directive';

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
        SideNavigationIconComponent,
        SideNavigationIconsDirective
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
        SideNavigationIconComponent,
        SideNavigationIconsDirective
    ]
})
export class SideNavigationModule {}
