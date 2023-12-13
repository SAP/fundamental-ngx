import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { AsyncPipe, NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChildren,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
    DisabledBehaviorDirective,
    FDK_FOCUSABLE_ITEM_DIRECTIVE,
    FDK_FOCUSABLE_LIST_DIRECTIVE,
    FocusableItemDirective,
    KeyUtil,
    RtlService,
    ValueByPathPipe,
    destroyObservable,
    uuidv4
} from '@fundamental-ngx/cdk/utils';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ContentDensityObserver } from '@fundamental-ngx/core/content-density';
import {
    TableCellDirective,
    TableIconDirective,
    TableRowDirective,
    TableStatusIndicatorDirective
} from '@fundamental-ngx/core/table';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import {
    ColumnResizableSidePipe,
    EditableTableCell,
    FdpCellSelectableDirective,
    PlatformTableCellResizableDirective,
    SelectionCellStylesPipe,
    SelectionMode,
    SelectionModeValue,
    TableCellStylesPipe,
    TableColumn,
    TableColumnResizeService,
    TableDraggableDirective,
    TableRow,
    TableRowKeyboardDrag,
    TableRowService,
    TableService,
    isTreeRow,
    isTreeRowFirstCell
} from '@fundamental-ngx/platform/table-helpers';
import { Subject, fromEvent, merge } from 'rxjs';
import { filter, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { TableEditableCellComponent } from '../table-editable-cell/table-editable-cell.component';

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
        }
    ],
    host: {
        role: 'row',
        '[attr.aria-expanded]': '_isTreeRow(row) ? row.expanded : null'
    },
    standalone: true,
    imports: [
        TableCellDirective,
        TableStatusIndicatorDirective,
        DisabledBehaviorDirective,
        NgStyle,
        FdpCellSelectableDirective,
        NgTemplateOutlet,
        CheckboxComponent,
        FormsModule,
        PlatformTableCellResizableDirective,
        NgClass,
        TableEditableCellComponent,
        TableIconDirective,
        AsyncPipe,
        ValueByPathPipe,
        FdTranslatePipe,
        SelectionCellStylesPipe,
        TableCellStylesPipe,
        ColumnResizableSidePipe
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

    /** @ignore */
    @ViewChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE)
    private set _focusableViewCellItems(items: QueryList<FocusableItemDirective>) {
        this.setItems(items);
    }

    /** @ignore */
    @ViewChildren(EditableTableCell)
    private readonly _editableCells: QueryList<EditableTableCell>;

    /** @ignore */
    @HostBinding('attr.aria-selected')
    private get _ariaSelected(): boolean {
        return !!this.row.checked;
    }

    /** @ignore */
    _hasRowHeaderColumn = false;

    /** @ignore */
    _rtl = false;

    /** @ignore */
    _rowSelectionHelperTextId = `rowSelectionHelper-${uuidv4()}`;

    /** @ignore */
    readonly _isTreeRowFirstCell = isTreeRowFirstCell;

    /** @ignore */
    readonly SELECTION_MODE = SelectionMode;

    /** @ignore */
    readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @ignore */
    readonly _tableColumnResizeService = inject(TableColumnResizeService);

    /** @ignore */
    readonly _fdpTableService = inject(TableService);

    /** @ignore */
    readonly _tableRowService = inject(TableRowService);

    /** @ignore */
    readonly _isTreeRow = isTreeRow;

    /** @ignore */
    private readonly _refreshChildRows$ = new Subject<void>();

    /** @ignore */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @ignore */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @ignore */
    private readonly _zone = inject(NgZone);

    /** @ignore */
    private readonly _elmRef = inject(ElementRef);

    /** @ignore */
    private readonly _dndTableDirective = inject(TableDraggableDirective, {
        optional: true
    });

    /** @ignore */
    constructor() {
        super();
        this._rtlService?.rtl.pipe(takeUntilDestroyed()).subscribe((rtl) => {
            this._rtl = rtl;
        });

        this._tableColumnResizeService.resizeInProgress$
            .pipe(
                switchMap(() => this._tableColumnResizeService.markForCheck),
                takeUntilDestroyed()
            )
            .subscribe(() => {
                this._cdr.markForCheck();
            });

        this._zone.runOutsideAngular(() => {
            fromEvent<KeyboardEvent>(this._elmRef.nativeElement, 'keydown')
                .pipe(
                    filter(() => !!this._dndTableDirective),
                    takeUntilDestroyed()
                )
                .subscribe((event) => {
                    this._onKeyDown(event);
                });
        });
    }

    /** @ignore */
    ngOnInit(): void {
        super.ngOnInit();
        this._fdpTableService.visibleColumns$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((columns) => {
            this._hasRowHeaderColumn = columns.some((c) => c.role === 'rowheader');
            this._cdr.markForCheck();
        });
    }

    /** @ignore */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this._editableCells.changes.pipe(startWith(null), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            const cells = this._editableCells.toArray();
            if (cells.length > 0) {
                this._tableRowService.updateEditableCells(this.row, cells);
            } else {
                this._tableRowService.removeEditableCells(this.row);
            }
        });
    }

    /** @ignore */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if ('row' in changes) {
            this._listenToRowExpansion();
        }
    }

    /** @ignore */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._refreshChildRows$.next();
        this._refreshChildRows$.complete();
        this._tableRowService.removeEditableCells(this.row);
    }

    /** @ignore */
    _toggleGroupRow(): void {
        this._tableRowService.toggleRow({ type: 'toggleRow', row: this.row });
    }

    /** @ignore */
    _toggleSingleSelectableRow(): void {
        this._tableRowService.toggleRow({ type: 'toggleSingleSelectableRow', row: this.row });
    }

    /** @ignore */
    _toggleMultiSelectRow(row: TableRow<T>, event?: Event): void {
        this._tableRowService.toggleRow({ ...{ row, event }, ...{ type: 'toggleMultiSelectRow' } });
    }

    /** @ignore */
    _columnTrackBy(index: number, column: TableColumn): string {
        return column.name;
    }

    /** @ignore */
    protected _handleCellSpaceKey(colIdx: number, tableCellElement: HTMLTableCellElement, $event: Event): void {
        if ($event.target === tableCellElement && isTreeRowFirstCell(colIdx, this.row, $event)) {
            $event.preventDefault();
            this._toggleGroupRow();
        }
    }

    /** @ignore */
    private _listenToRowExpansion(): void {
        this._refreshChildRows$.next();
        const refresh = merge(this._refreshChildRows$, destroyObservable(this._destroyRef));
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

    /** @ignore */
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
}
