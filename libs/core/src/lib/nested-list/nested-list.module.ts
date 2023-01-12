import { NgModule } from '@angular/core';
import { NestedListDirective } from './nested-list/nested-list.directive';
import { NestedLinkDirective } from './nested-link/nested-link.directive';
import { NestedItemDirective } from './nested-item/nested-item.directive';
import {
    NestedListExpandIconComponent,
    NestedListHeaderDirective,
    NestedListIconComponent,
    NestedListTitleDirective
} from './nested-list-directives';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { CommonModule } from '@angular/common';
import { NestedListKeyboardService } from './nested-list-keyboard.service';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { NestedListPopoverComponent } from './nested-list-popover/nested-list-popover.component';
import { PreparedNestedListComponent } from './prepared-nested-list/prepared-nested-list.component';
import { NestedListStateService } from './nested-list-state.service';
import { RouterModule } from '@angular/router';
import { NestedListContentDirective } from './nested-content/nested-list-content.directive';
import { IconModule } from '@fundamental-ngx/core/icon';
import { DeprecatedNestedListCompactDirective } from './deprecated-nested-list-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, PopoverModule, RouterModule, IconModule, ContentDensityModule],
    declarations: [
        NestedListDirective,
        NestedLinkDirective,
        NestedItemDirective,
        NestedListIconComponent,
        NestedListTitleDirective,
        NestedListHeaderDirective,
        NestedListPopoverComponent,
        PreparedNestedListComponent,
        NestedListExpandIconComponent,
        NestedListContentDirective,
        DeprecatedNestedListCompactDirective
    ],
    exports: [
        NestedListDirective,
        NestedLinkDirective,
        NestedItemDirective,
        NestedListIconComponent,
        NestedListTitleDirective,
        NestedListHeaderDirective,
        NestedListPopoverComponent,
        PreparedNestedListComponent,
        NestedListExpandIconComponent,
        NestedListContentDirective,
        DeprecatedNestedListCompactDirective,
        ContentDensityModule
    ],
    providers: [MenuKeyboardService, NestedListKeyboardService, NestedListStateService]
})
export class NestedListModule {}
