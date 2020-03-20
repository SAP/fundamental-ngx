import { AfterViewInit, ChangeDetectorRef, Component, forwardRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NestedListDirective } from '../nested-list/nested-list.directive';
import { NestedListModel } from '../nested-list-model';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedItemDirective } from '../nested-item/nested-item.directive';

/**
 * Component for internal usage, allows to generate the nested list from defined object.
 */
@Component({
  selector: 'fd-prepared-nested-list',
  templateUrl: './prepared-nested-list.component.html',
  styleUrls: ['./prepared-nested-list.component.scss']
})
export class PreparedNestedListComponent implements AfterViewInit {

    /**
     * @hidden
     * For internal usage.
     * Defines if the component is first
     */
    @Input()
    first: boolean = true;

    /**
     * Defines if list should be displayed in condensed mode
     */
    @Input()
    condensed: boolean = false;

    /**
     * List configuration
     */
    @Input()
    list: NestedListModel;

    /**
     * @hidden
     */
    @ViewChild(forwardRef(() => NestedListDirective))
    _nestedListDirective: NestedListDirective;

    /**
     * @hidden
     */
    @ViewChildren(forwardRef(() => NestedItemDirective))
    nestedListItems: QueryList<NestedItemDirective>;

    /**
     * In prepared nested list, nested items should be taken as reference of View, not Content.
     * There is direct reference to these directives here.
     */
    get nestedListDirective(): NestedListDirective {
        return Object.assign(this._nestedListDirective, { nestedItems: this.nestedListItems });
    }

    /** @hidden */
    constructor (
        private changeDetRef: ChangeDetectorRef,
        private stateService: NestedListStateService
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this.stateService.propagateSelected(this.nestedListDirective);
        this.changeDetRef.markForCheck();
        this.changeDetRef.detectChanges();
    }
}
