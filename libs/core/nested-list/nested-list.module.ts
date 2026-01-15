import { NgModule } from '@angular/core';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { NestedListContentDirective } from './nested-content/nested-list-content.directive';
import { NestedItemDirective } from './nested-item/nested-item.directive';
import { NestedLinkDirective } from './nested-link/nested-link.directive';
import {
    NestedListExpandIconComponent,
    NestedListHeaderDirective,
    NestedListIconComponent,
    NestedListTitleDirective
} from './nested-list-directives';
import { NestedListKeyboardService } from './nested-list-keyboard.service';
import { NestedListPopoverComponent } from './nested-list-popover/nested-list-popover.component';
import { NestedListStateService } from './nested-list-state.service';
import { NestedListDirective } from './nested-list/nested-list.directive';
import { PreparedNestedListComponent } from './prepared-nested-list/prepared-nested-list.component';

const components = [
    NestedListDirective,
    NestedLinkDirective,
    NestedItemDirective,
    NestedListIconComponent,
    NestedListTitleDirective,
    NestedListHeaderDirective,
    NestedListPopoverComponent,
    PreparedNestedListComponent,
    NestedListExpandIconComponent,
    NestedListContentDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components],
    providers: [MenuKeyboardService, NestedListKeyboardService, NestedListStateService]
})
export class NestedListModule {}
