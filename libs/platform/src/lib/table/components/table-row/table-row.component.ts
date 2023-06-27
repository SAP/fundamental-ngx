import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {
    DestroyedService,
    FDK_FOCUSABLE_ITEM_DIRECTIVE,
    FDK_FOCUSABLE_LIST_DIRECTIVE,
    FocusableItemDirective,
    KeyUtil,
    RtlService
} from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver } from '@fundamental-ngx/core/content-density';
import { TableRowDirective } from '@fundamental-ngx/core/table';
import {
    EditableTableCell,
    isTreeRowFirstCell,
    SelectionMode,
    SelectionModeValue,
    TableColumn,
    TableColumnResizeService,
    TableDraggableDirective,
    TableRow,
    TableRowKeyboardDrag,
    TableRowService,
    TableService
} from '@fundamental-ngx/platform/table-helpers';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, startWith, switchMap, takeUntil } from 'rxjs/operators';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-table-row]',
    templateUrl: './table-row.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FDK_FOCUSABLE_LIST_DIRECTIVE,
            useExisting: TableRowComponent
        },
        DestroyedService
    ]
})
export class TableRowComponent<T> extends TableRowDirective implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    /** Row ID. */
    @Input()
    rowId: string;

    /** Table Row. */
    @Input()
    row: TableRow<T>;

    /** Row index. */
    @HostBinding('attr.aria-rowindex')
    @Input()
    index: number;

    /** Selection mode. */
    @Input()
    selectionMode: SelectionModeValue;

    /** Selectable flag key. */
    @Input()
    selectableKey: string;

    /** Whether to enable checkbox tristate mode. */
    @Input()
    enableTristateMode: boolean;

    /**
     * Whether to fix the table header and footer. Default is true.
     * Note that if the table contains freezable columns, the header and
     * footer will be fixed automatically, regardless of this input value.
     * */
    @Input()
    fixed: boolean;

    /** Selection column width. */
    @Input()
    selectionColumnWidth: number;

    /** The column `name` to freeze columns up to and including. */
    @Input()
    freezeColumnsTo: string;

    /** The column `name` to freeze columns after and including. */
    @Input()
    freezeEndColumnsTo: string;

    /**
     * Event emitted when keyboard drag performed.
     */
    @Output()
    keyboardDrag = new EventEmitter<TableRowKeyboardDrag>();

    /** @hidden */
    _hasRowHeaderColumn = false;

    /** @hidden */
    @ViewChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE)
    private set _focusableViewCellItems(items: QueryList<FocusableItemDirective>) {
        this.setItems(items);
    }

    /** @hidden */
    @ViewChildren(EditableTableCell)
    private readonly _editableCells: QueryList<EditableTableCell>;

    /** @hidden */
    @HostBinding('attr.aria-selected')
    private get _ariaSelected(): boolean {
        return !!this.row.checked;
    }

    /** @hidden */
    _rtl = false;

    /** @hidden */
    readonly _isTreeRowFirstCell = isTreeRowFirstCell;

    /** @hidden */
    readonly SELECTION_MODE = SelectionMode;

    /** @hidden */
    readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    readonly _tableColumnResizeService = inject(TableColumnResizeService);

    /** @hidden */
    private readonly _refreshChildRows$ = new Subject<void>();

    /** @hidden */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    readonly _fdpTableService = inject(TableService);

    /** @hidden */
    readonly _tableRowService = inject(TableRowService);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _zone = inject(NgZone);

    /** @hidden */
    private readonly _elmRef = inject(ElementRef);

    /** @hidden */
    private readonly _dndTableDirective = inject(TableDraggableDirective, {
        optional: true
    });

    /** @hidden */
    constructor() {
        super();
        this._rtlService?.rtl.pipe(takeUntil(this._destroy$)).subscribe((rtl) => {
            this._rtl = rtl;
        });

        this._tableColumnResizeService.resizeInProgress$
            .pipe(
                switchMap(() => this._tableColumnResizeService.markForCheck),
                takeUntil(this._destroy$)
            )
            .subscribe(() => {
                this._cdr.markForCheck();
            });

        this._zone.runOutsideAngular(() => {
            fromEvent<KeyboardEvent>(this._elmRef.nativeElement, 'keydown')
                .pipe(
                    filter(() => !!this._dndTableDirective),
                    takeUntil(this._destroy$)
                )
                .subscribe((event) => {
                    this._onKeyDown(event);
                });
        });
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
        this._fdpTableService.visibleColumns$.pipe(takeUntil(this._destroy$)).subscribe((columns) => {
            this._hasRowHeaderColumn = columns.some((c) => c.role === 'rowheader');
            this._cdr.markForCheck();
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this._editableCells.changes.pipe(startWith(null), takeUntil(this._destroy$)).subscribe(() => {
            const cells = this._editableCells.toArray();
            if (cells.length > 0) {
                this._tableRowService.updateEditableCells(this.row, cells);
            } else {
                this._tableRowService.removeEditableCells(this.row);
            }
        });
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if ('row' in changes) {
            this._listenToRowExpansion();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._refreshChildRows$.next();
        this._refreshChildRows$.complete();
        this._tableRowService.removeEditableCells(this.row);
    }

    /** @hidden */
    private _listenToRowExpansion(): void {
        this._refreshChildRows$.next();
        const refresh = merge(this._refreshChildRows$, this._destroy$);
        // Load items only once. Further loading will be covered by the lazy loading functionality.
        this.row?.expanded$
            ?.pipe(
                filter((expanded) => expanded && this.row.children.length === 0),
                takeUntil(refresh)
            )
            .subscribe(() => {
                this._tableRowService.loadChildRows(this.row);
            });
    }

    /** @hidden */
    private _onKeyDown(event: KeyboardEvent): void {
        const isArrowDown = KeyUtil.isKeyCode(event, DOWN_ARROW);
        const isArrowUp = KeyUtil.isKeyCode(event, UP_ARROW);

        if (!event.altKey) {
            return;
        }

        if (!isArrowDown && !isArrowUp) {
            return;
        }

        this._dndTableDirective?.dragRowFromKeyboard(
            isArrowDown ? 'down' : 'up',
            event,
            this.index,
            event.shiftKey ? 'group' : 'shift'
        );
    }

    /** @hidden */
    _toggleGroupRow(): void {
        this._tableRowService.toggleRow({ type: 'toggleRow', row: this.row });
    }

    /** @hidden */
    _toggleSingleSelectableRow(): void {
        this._tableRowService.toggleRow({ type: 'toggleSingleSelectableRow', row: this.row });
    }

    /** @hidden */
    _toggleMultiSelectRow(row: TableRow<T>, event?: Event): void {
        this._tableRowService.toggleRow({ ...{ row, event }, ...{ type: 'toggleMultiSelectRow' } });
    }

    /** @hidden */
    _columnTrackBy(index: number, column: TableColumn): string {
        return column.name;
    }
}
