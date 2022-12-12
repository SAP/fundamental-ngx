import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NestedListComponent } from '../nested-list/nested-list.component';
import { NestedListItem, NestedListModel } from '../nested-list-model';

/**
 * Component for internal usage, allows to generate the nested list from defined object.
 */
@Component({
    selector: 'fdx-prepared-nested-list',
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
    list: NestedListModel;

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
