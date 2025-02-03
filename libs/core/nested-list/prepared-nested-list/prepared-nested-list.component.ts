import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { NestedListContentDirective } from '../nested-content/nested-list-content.directive';
import { NestedItemDirective } from '../nested-item/nested-item.directive';
import { NestedLinkDirective } from '../nested-link/nested-link.directive';
import {
    NestedListExpandIconComponent,
    NestedListHeaderDirective,
    NestedListIconComponent,
    NestedListTitleDirective
} from '../nested-list-directives';
import { NestedListItem, NestedListModel } from '../nested-list-model';
import { NestedListPopoverComponent } from '../nested-list-popover/nested-list-popover.component';
import { NestedListDirective } from '../nested-list/nested-list.directive';

/**
 * Component for internal usage, allows to generate the nested list from defined object.
 */
@Component({
    selector: 'fd-prepared-nested-list',
    templateUrl: './prepared-nested-list.component.html',
    styleUrl: './prepared-nested-list.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NestedListDirective,
        NestedListHeaderDirective,
        NestedItemDirective,
        NestedListPopoverComponent,
        NestedListContentDirective,
        NgTemplateOutlet,
        NestedListExpandIconComponent,
        forwardRef(() => PreparedNestedListComponent),
        NestedLinkDirective,
        RouterLink,
        NestedListIconComponent,
        NestedListTitleDirective
    ]
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
    @ViewChild(forwardRef(() => NestedListDirective))
    _nestedListDirective: NestedListDirective;

    /**
     * In prepared nested list, nested items should be taken as reference of View, not Content.
     * There is direct reference to these directives here.
     */
    get nestedListDirective(): NestedListDirective {
        return this._nestedListDirective;
    }

    /** @hidden */
    _expandedChange(expanded: boolean, item: NestedListItem): void {
        item.expanded = expanded;
    }
}
