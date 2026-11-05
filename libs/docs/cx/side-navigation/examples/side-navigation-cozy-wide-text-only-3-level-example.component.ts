import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    NestedItemComponent,
    NestedLinkComponent,
    NestedListComponent,
    NestedListExpandIconComponent,
    NestedListTitleDirective
} from '@fundamental-ngx/cx/nested-list';
import {
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
        NestedListComponent,
        NestedListExpandIconComponent,
        NestedListTitleDirective,
        SideNavigationComponent,
        SideNavigationMainComponent,
        SideNavigationUtilityDirective
    ]
})
export class SideNavigationCozyWideTextOnly3LevelExampleComponent {}
