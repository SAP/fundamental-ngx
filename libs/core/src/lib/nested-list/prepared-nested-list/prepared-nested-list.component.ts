import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NestedListDirective } from '../nested-list/nested-list.directive';
import { NestedListItem, NestedListModel } from '../nested-list-model';
import { Nullable } from '@fundamental-ngx/cdk/utils';

/**
 * Component for internal usage, allows to generate the nested list from defined object.
 */
@Component({
    selector: 'fd-prepared-nested-list',
    templateUrl: './prepared-nested-list.component.html',
    styleUrls: ['./prepared-nested-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
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
