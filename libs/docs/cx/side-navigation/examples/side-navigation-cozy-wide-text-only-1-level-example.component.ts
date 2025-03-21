import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    NestedItemComponent,
    NestedLinkComponent,
    NestedListComponent,
    NestedListTitleDirective
} from '@fundamental-ngx/cx/nested-list';
import {
    SideNavigationComponent,
    SideNavigationMainComponent,
    SideNavigationUtilityDirective
} from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fdx-side-navigation-default-example',
    templateUrl: './side-navigation-cozy-wide-text-only-1-level-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NestedItemComponent,
        NestedLinkComponent,
        NestedListComponent,
        NestedListTitleDirective,
        SideNavigationComponent,
        SideNavigationMainComponent,
        SideNavigationUtilityDirective
    ]
})
export class SideNavigationCozyWideTextOnly1LevelExampleComponent {}
