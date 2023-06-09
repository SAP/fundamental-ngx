import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {
    DestroyedService,
    FDK_FOCUSABLE_ITEM_DIRECTIVE,
    FocusableItemDirective,
    FocusableListDirective,
    RtlService
} from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver } from '@fundamental-ngx/core/content-density';
import {
    SelectionMode,
    SelectionModeValue,
    TableColumn,
    TableColumnResizeService,
    TableRowService,
    TableService
} from '@fundamental-ngx/platform/table-helpers';
import { takeUntil } from 'rxjs/operators';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-table-header-row]',
    templateUrl: './table-header-row.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyedService]
})
export class TableHeaderRowComponent implements OnInit {
    /** Table ID. */
    @Input()
    id: string;

    /**
     * Whether to fix the table header and footer. Default is true.
     * Note that if the table contains freezable columns, the header and
     * footer will be fixed automatically, regardless of this input value.
     * */
    @Input()
    fixed: boolean;

    /**
     * Whether to show selection column.
     */
    @Input()
    isShownSelectionColumn: boolean;

    /**
     * Row checked state.
     */
    @Input()
    checkedState: boolean | null;

    /**
     * Selection mode.
     */
    @Input()
    selectionMode: SelectionModeValue;

    /**
     * Selection column width.
     */
    @Input()
    selectionColumnWidth: number;

    /** The column `name` to freeze columns up to and including. */
    @Input()
    freezeColumnsTo: string;

    /** The column `name` to freeze columns after and including. */
    @Input()
    freezeEndColumnsTo: string;

    /** @hidden */
    @ViewChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE)
    private set _focusableItems(items: QueryList<FocusableItemDirective>) {
        this._focusableDirective.setItems(items);
    }

    /** @hidden */
    _rtl = false;

    /** @hidden */
    readonly SELECTION_MODE = SelectionMode;

    /** @hidden */
    readonly _tableColumnResizeService = inject(TableColumnResizeService);

    /** @hidden */
    readonly _tableService = inject(TableService);

    /** @hidden */
    readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    private readonly _focusableDirective = inject(FocusableListDirective, {
        self: true
    });

    /** @hidden */
    readonly _tableRowService = inject(TableRowService);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _destroy$ = inject(DestroyedService);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    constructor() {
        this._rtlService?.rtl.pipe(takeUntil(this._destroy$)).subscribe((isRtl) => {
            this._rtl = isRtl;
        });
    }

    /** @hidden */
    ngOnInit(): void {
        this._tableColumnResizeService.markForCheck.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._cdr.detectChanges();
        });
    }

    /** @hidden */
    _columnTrackBy(index: number, column: TableColumn): string {
        return column.name;
    }

    /** @hidden */
    _isColumnHasHeaderMenu(column: TableColumn): boolean {
        return (
            column.sortable ||
            column.groupable ||
            column.freezable ||
            column.endFreezable ||
            (column.filterable && !this._tableService._isFilteringFromHeaderDisabled$.value)
        );
    }
}
