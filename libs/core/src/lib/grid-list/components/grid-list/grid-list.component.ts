import {
    Component,
    ContentChildren,
    QueryList,
    ViewEncapsulation,
    Input,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef,
    EventEmitter,
    Output,
    AfterContentInit,
    OnDestroy,
    ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { parseLayoutPattern } from '../../helpers';
import { GridListSelectionEvent, GridListSelectionService } from '../../services/grid-list-selection.service';
import { GridListItemComponent } from '../grid-list-item/grid-list-item.component';
import { GridListSelectionMode } from './grid-list-selection-mode';

let gridListUniqueId = 0;

@Component({
    selector: 'fd-grid-list',
    templateUrl: './grid-list.component.html',
    styleUrls: ['./grid-list.component.scss', '../../../utils/drag-and-drop/drag-and-drop.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [GridListSelectionService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridListComponent<T> implements OnChanges, AfterContentInit, OnDestroy {
    /** id for the Element */
    @Input()
    id = `fd-grid-list-${gridListUniqueId++}`;

    /** width of the element */
    @Input()
    width: string;

    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel: string;

    /**
     * Defines the mode of Grid List
     * Modes:
     * - none: Default mode (no selection)
     * - delete: Delete mode (only one list item can be deleted via provided delete button)
     * - singleSelect: Selected item is highlighted but no selection control is visible (only one list item can be selected)
     * - singleSelectLeft: Left-positioned single selection mode (only one list item can be selected)
     * - singleSelectRight: Right-positioned single selection mode (only one list item can be selected)
     * - multiSelect: Multi-selection mode (more than one list item can be selected)
     *  */
    @Input()
    selectionMode: GridListSelectionMode = 'none';

    /**
     * specify the column layout in the format `XLn-Ln-Mn-Sn` where n is the number of columns and can be different for each size.
     * eg: XL2-L2-M2-S1 would create 2-column layouts for XL, L, and M sizes and single-column layout for S size.
     */
    @Input()
    layoutPattern: string;

    /** Event is thrown, when mode is singleSelect, singleSelectLeft, singleSelectRight or multiSelect and item was selected */
    @Output()
    selectionChange = new EventEmitter<GridListSelectionEvent<T>>();

    /** @hidden */
    @ContentChildren(GridListItemComponent, { descendants: true })
    set gridListItems(components: QueryList<GridListItemComponent<T>>) {
        this._gridListItems = components;
        this._updateGridListItemsProperties(components);
    }

    /** @hidden */
    private _gridListItems: QueryList<GridListItemComponent<T>>;

    /** @hidden */
    private readonly subscription = new Subscription();

    /** @hidden */
    constructor(
        private readonly _cd: ChangeDetectorRef,
        private readonly _gridListSelectionService: GridListSelectionService<T>
    ) {
        const selectedItemsSub = this._gridListSelectionService.selectedItemsObs
            .pipe(filter(() => !!this._gridListItems))
            .subscribe((selectedItems) => this.selectionChange.emit(selectedItems));

        this.subscription.add(selectedItemsSub);
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes.layoutPattern &&
            !changes.layoutPattern.firstChange &&
            changes.layoutPattern.previousValue !== changes.layoutPattern.currentValue
        ) {
            const baseLayoutItemPattern = parseLayoutPattern(this.layoutPattern);
            this._updateGridListItemsProperty('gridLayoutClasses', baseLayoutItemPattern);
        }

        if (
            changes.selectionMode &&
            !changes.selectionMode.firstChange &&
            changes.selectionMode.previousValue !== changes.selectionMode.currentValue
        ) {
            this._updateGridListItemsProperty('selectionMode', this.selectionMode);
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._cd.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    /**
     * Clears previous selection of the items.
     */
    clearSelection(): void {
        this._gridListSelectionService.clearSelection();
    }

    /** @hidden */
    private _updateGridListItemsProperties(components: QueryList<GridListItemComponent<T>>): void {
        const layoutPattern = this.layoutPattern ? this.layoutPattern : 'XL4-L3-M2-S1';
        const baseLayoutItemPattern = parseLayoutPattern(layoutPattern);

        components.forEach((component, index) => {
            if (component._index !== index) {
                component._index = index;
            }

            if (!component.selectionMode) {
                component.selectionMode = this.selectionMode;
            }

            if (!component.layoutItemPattern) {
                component.gridLayoutClasses = baseLayoutItemPattern;
            }
        });
    }

    /** @hidden */
    private _updateGridListItemsProperty(key: string, value: string | string[]): void {
        this._gridListItems.forEach((componenet) => {
            componenet[key] = value;
        });
    }
}
