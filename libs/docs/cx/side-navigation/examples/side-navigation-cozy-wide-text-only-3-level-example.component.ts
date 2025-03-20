import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    NestedItemComponent,
    NestedLinkComponent,
    NestedListButtonDirective,
    NestedListComponent,
    NestedListContentDirective,
    NestedListExpandIconComponent,
    NestedListHeaderDirective,
    NestedListIconComponent,
    NestedListPopoverComponent,
    NestedListTitleDirective,
    PreparedNestedListComponent
} from '@fundamental-ngx/cx/nested-list';
import {
    SideNavigationButtonDirective,
    SideNavigationComponent,
    SideNavigationMainComponent,
    SideNavigationUtilityDirective
} from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fdx-side-navigation-cozy-wide-text-only-3-level-example',
    templateUrl: './side-navigation-cozy-wide-text-only-3-level-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NestedItemComponent,
        NestedLinkComponent,
        NestedListButtonDirective,
        NestedListComponent,
        NestedListContentDirective,
        NestedListExpandIconComponent,
        NestedListHeaderDirective,
        NestedListIconComponent,
        NestedListPopoverComponent,
        NestedListTitleDirective,
        PreparedNestedListComponent,
        SideNavigationButtonDirective,
        SideNavigationComponent,
        SideNavigationMainComponent,
        SideNavigationUtilityDirective
    ]
})
export class SideNavigationCozyWideTextOnly3LevelExampleComponent {}
