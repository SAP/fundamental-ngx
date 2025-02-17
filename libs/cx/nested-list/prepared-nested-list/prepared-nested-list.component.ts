import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { NestedListContentDirective } from '../nested-content/nested-list-content.directive';
import { NestedItemComponent } from '../nested-item/nested-item.component';
import { NestedLinkComponent } from '../nested-link/nested-link.component';
import {
    NestedListExpandIconComponent,
    NestedListHeaderDirective,
    NestedListIconComponent,
    NestedListTitleDirective
} from '../nested-list-directives';
import { NestedListItem, NestedListModel } from '../nested-list-model';
import { NestedListPopoverComponent } from '../nested-list-popover/nested-list-popover.component';
import { NestedListComponent } from '../nested-list/nested-list.component';

/**
 * Component for internal usage, allows to generate the nested list from defined object.
 */
@Component({
    selector: 'fdx-prepared-nested-list',
    templateUrl: './prepared-nested-list.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        NestedListComponent,
        NestedListHeaderDirective,
        NestedItemComponent,
        NestedListPopoverComponent,
        NestedLinkComponent,
        RouterModule,
        NestedListContentDirective,
        NestedListIconComponent,
        NestedListTitleDirective,
        NestedListExpandIconComponent
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreparedNestedListComponent {
    /**
     * @hidden
     * For internal usage.
     * Defines if the component is first
     */
    @Input()
    first = true;

    /** Defines if list should be displayed in condensed mode */
    @Input()
    condensed = false;

    /** List configuration*/
    @Input()
    list: Nullable<NestedListModel>;

    /**
     * @hidden
     */
    @ViewChild(forwardRef(() => NestedListComponent))
    _nestedListComponent: NestedListComponent;

    /**
     * In prepared nested list, nested items should be taken as reference of View, not Content.
     * There is direct reference to these directives here.
     */
    get nestedListComponent(): NestedListComponent {
        return this._nestedListComponent;
    }

    /** @hidden */
    _expandedChange(expanded: boolean, item: NestedListItem): void {
        item.expanded = expanded;
    }
}
