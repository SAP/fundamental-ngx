import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import {
    NestedItemComponent,
    NestedLinkComponent,
    NestedListButtonDirective,
    NestedListComponent,
    NestedListExpandIconComponent,
    NestedListIconComponent,
    NestedListTitleDirective
} from '@fundamental-ngx/cx/nested-list';
import {
    SideNavigationComponent,
    SideNavigationMainComponent,
    SideNavigationUtilityDirective
} from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fdx-side-navigation-mobile-example',
    templateUrl: './side-navigation-mobile-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ScrollbarDirective,
        SideNavigationMainComponent,
        SideNavigationUtilityDirective,
        SideNavigationComponent,
        NestedListComponent,
        NestedLinkComponent,
        NestedItemComponent,
        NestedListIconComponent,
        NestedListTitleDirective,
        NestedListExpandIconComponent,
        NestedListButtonDirective,
        ContentDensityModule
    ]
})
export class SideNavigationMobileExampleComponent {}
