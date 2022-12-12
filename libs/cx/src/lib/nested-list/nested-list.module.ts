import { NgModule } from '@angular/core';
import { NestedListComponent } from './nested-list/nested-list.component';
import { NestedLinkComponent } from './nested-link/nested-link.component';
import { NestedItemComponent } from './nested-item/nested-item.component';
import {
    NestedListButtonDirective,
    NestedListExpandIconComponent,
    NestedListHeaderDirective,
    NestedListIconDirective,
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
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, PopoverModule, RouterModule, IconModule, ContentDensityModule],
    declarations: [
        NestedListComponent,
        NestedLinkComponent,
        NestedItemComponent,
        NestedListIconDirective,
        NestedListTitleDirective,
        NestedListHeaderDirective,
        NestedListPopoverComponent,
        PreparedNestedListComponent,
        NestedListExpandIconComponent,
        NestedListContentDirective,
        NestedListButtonDirective
    ],
    exports: [
        NestedListComponent,
        NestedLinkComponent,
        NestedItemComponent,
        NestedListIconDirective,
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
