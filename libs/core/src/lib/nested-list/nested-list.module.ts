import { NgModule } from '@angular/core';
import { NestedListDirective } from './nested-list/nested-list.directive';
import { NestedLinkDirective } from './nested-link/nested-link.directive';
import { NestedItemDirective } from './nested-item/nested-item.directive';
import {
    NestedListExpandIconDirective,
    NestedListHeaderDirective,
    NestedListIconDirective,
    NestedListTitleDirective
} from './nested-list-directives';
import { MenuKeyboardService } from '../menu/menu-keyboard.service';
import { CommonModule } from '@angular/common';
import { NestedListKeyboardService } from './nested-list-keyboard.service';
import { PopoverModule } from '../popover/popover.module';
import { NestedListPopoverComponent } from './nested-list-popover/nested-list-popover.component';
import { PreparedNestedListComponent } from './prepared-nested-list/prepared-nested-list.component';
import { NestedListStateService } from './nested-list-state.service';
import { RouterModule } from '@angular/router';
import { NestedListContentDirective } from './nested-content/nested-list-content.directive';

@NgModule({
    imports: [
        CommonModule,
        PopoverModule,
        RouterModule
    ],
    declarations: [
        NestedListDirective,
        NestedLinkDirective,
        NestedItemDirective,
        NestedListIconDirective,
        NestedListTitleDirective,
        NestedListHeaderDirective,
        NestedListPopoverComponent,
        PreparedNestedListComponent,
        NestedListExpandIconDirective,
        NestedListContentDirective
    ],
    exports: [
        NestedListDirective,
        NestedLinkDirective,
        NestedItemDirective,
        NestedListIconDirective,
        NestedListTitleDirective,
        NestedListHeaderDirective,
        NestedListPopoverComponent,
        PreparedNestedListComponent,
        NestedListExpandIconDirective,
        NestedListContentDirective
    ],
    providers: [
        MenuKeyboardService,
        NestedListKeyboardService,
        NestedListStateService
    ]
})
export class NestedListModule {}
