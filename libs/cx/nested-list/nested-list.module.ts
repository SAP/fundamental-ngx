import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { NestedListContentDirective } from './nested-content/nested-list-content.directive';
import { NestedItemComponent } from './nested-item/nested-item.component';
import { NestedLinkComponent } from './nested-link/nested-link.component';
import {
    NestedListButtonDirective,
    NestedListExpandIconComponent,
    NestedListHeaderDirective,
    NestedListIconComponent,
    NestedListTitleDirective
} from './nested-list-directives';
import { NestedListKeyboardService } from './nested-list-keyboard.service';
import { NestedListPopoverComponent } from './nested-list-popover/nested-list-popover.component';
import { NestedListStateService } from './nested-list-state.service';
import { NestedListComponent } from './nested-list/nested-list.component';
import { PreparedNestedListComponent } from './prepared-nested-list/prepared-nested-list.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
        NestedListComponent,
        NestedLinkComponent,
        NestedItemComponent,
        NestedListIconComponent,
        NestedListTitleDirective,
        NestedListHeaderDirective,
        NestedListPopoverComponent,
        PreparedNestedListComponent,
        NestedListExpandIconComponent,
        NestedListButtonDirective,
        PopoverModule,
        RouterModule,
        IconComponent,
        ContentDensityModule,
        NestedListContentDirective
    ],
    exports: [
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
    ],
    providers: [MenuKeyboardService, NestedListKeyboardService, NestedListStateService]
})
export class CxNestedListModule {}
