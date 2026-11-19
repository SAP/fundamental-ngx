import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import {
    NestedItemComponent,
    NestedLinkComponent,
    NestedListComponent,
    NestedListExpandIconComponent,
    NestedListIconComponent,
    NestedListPopoverComponent,
    NestedListTitleDirective
} from '@fundamental-ngx/cx/nested-list';
import {
    SideNavigationComponent,
    SideNavigationMainComponent,
    SideNavigationUtilityDirective
} from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fdx-side-navigation-overflow-example',
    templateUrl: './side-navigation-overflow-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
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
        NestedListPopoverComponent,
        NestedListExpandIconComponent,
        ContentDensityModule
    ]
})
export class SideNavigationOverflowExampleComponent {}
