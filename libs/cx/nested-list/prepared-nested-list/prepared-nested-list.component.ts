import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { NestedListItem, NestedListModel } from '../nested-list-model';
import { NestedListComponent } from '../nested-list/nested-list.component';

/**
 * Component for internal usage, allows to generate the nested list from defined object.
 */
@Component({
    selector: 'fdx-prepared-nested-list',
    templateUrl: './prepared-nested-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreparedNestedListComponent {
    /**
     * @ignore
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
     * @ignore
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

    /** @ignore */
    _expandedChange(expanded: boolean, item: NestedListItem): void {
        item.expanded = expanded;
    }
}
