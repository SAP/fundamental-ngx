import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import {
    NestedItemComponent,
    NestedLinkComponent,
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
    selector: 'fdx-side-navigation-cozy-wide-icon-3-level-example',
    templateUrl: './side-navigation-cozy-wide-icon-3-level-example.component.html',
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
        ContentDensityModule
    ]
})
export class SideNavigationCozyWideIcon3LevelExampleComponent {}
