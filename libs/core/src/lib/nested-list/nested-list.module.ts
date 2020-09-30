import { NgModule } from '@angular/core';
import { NestedListDirective } from './nested-list/nested-list.directive';
import { NestedLinkDirective } from './nested-link/nested-link.directive';
import { NestedItemDirective } from './nested-item/nested-item.directive';
import {
    NestedListExpandIconComponent,
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
import { IconModule } from '../icon/icon.module';

@NgModule({
    imports: [
        CommonModule,
        PopoverModule,
        RouterModule,
        IconModule
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
        NestedListExpandIconComponent,
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
        NestedListExpandIconComponent,
        NestedListContentDirective
    ],
    providers: [
        MenuKeyboardService,
        NestedListKeyboardService,
        NestedListStateService
    ]
})
export class NestedListModule {}
