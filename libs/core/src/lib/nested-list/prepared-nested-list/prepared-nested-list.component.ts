import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input,
    Optional,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NestedListDirective } from '../nested-list/nested-list.directive';
import { NestedListModel } from '../nested-list-model';
import { NestedItemService } from '../nested-item/nested-item.service';

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
    first: boolean = true;

    /** Defines if list should be displayed in condensed mode */
    @Input()
    condensed: boolean = false;

    /** List configuration*/
    @Input()
    list: NestedListModel;

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
    constructor(
        @Optional() private _nestedItemService: NestedItemService
    ) {}
}
