import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import {
    NestedItemComponent,
    NestedLinkComponent,
    NestedListComponent,
    NestedListIconComponent,
    NestedListTitleDirective
} from '@fundamental-ngx/cx/nested-list';
import {
    SideNavigationComponent,
    SideNavigationMainComponent,
    SideNavigationUtilityDirective
} from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fdx-side-navigation-wide-icon-1-level-example',
    templateUrl: './side-navigation-wide-icon-1-level-example.component.html',
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
        ContentDensityModule
    ]
})
export class SideNavigationWideIcon1LevelExampleComponent {}
