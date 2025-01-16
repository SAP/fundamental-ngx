import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
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
import { I18nModule } from '@fundamental-ngx/i18n';

@Component({
    selector: 'fdx-side-navigation-narrow-example',
    templateUrl: './side-navigation-narrow-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        ScrollbarModule,
        I18nModule,
        SideNavigationMainComponent,
        SideNavigationUtilityDirective,
        SideNavigationButtonDirective,
        SideNavigationComponent,
        NestedListComponent,
        NestedLinkComponent,
        NestedItemComponent,
        NestedListIconComponent,
        NestedListTitleDirective,
        NestedListHeaderDirective,
        NestedListPopoverComponent,
        PreparedNestedListComponent,
        NestedListExpandIconComponent,
        NestedListContentDirective,
        NestedListButtonDirective,
        ContentDensityModule
    ]
})
export class SideNavigationNarrowExampleComponent {}
