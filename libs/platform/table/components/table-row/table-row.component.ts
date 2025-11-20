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
    computed,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
    DisabledBehaviorDirective,
    FDK_FOCUSABLE_ITEM_DIRECTIVE,
    FDK_FOCUSABLE_LIST_DIRECTIVE,
    FocusableItemDirective,
    FocusableItemPosition,
    KeyUtil,
    RtlService,
    ValueByPathPipe,
    destroyObservable,
    uuidv4
} from '@fundamental-ngx/cdk/utils';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ContentDensityObserver } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
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
import { get } from 'lodash-es';
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
    imports: [
        TableCellDirective,
        TableStatusIndicatorDirective,
        DisabledBehaviorDirective,
        NgStyle,
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
        ColumnResizableSidePipe,
        IconComponent
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
    @ViewChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE)
    private set _focusableViewCellItems(items: QueryList<FocusableItemDirective>) {
        this.setItems(items);
    }

    /** @hidden */
    @ViewChildren(EditableTableCell)
    private readonly _editableCells: QueryList<EditableTableCell>;

    /** @hidden */
    @HostBinding('attr.aria-selected')
    protected get _ariaSelected(): boolean {
        return !!this.row.checked;
    }

    /** @hidden */
    _hasRowHeaderColumn$ = computed(() => this._fdpTableService.visibleColumns$().some((c) => c.role === 'rowheader'));

    /** @hidden */
    readonly _rtl$ = computed(() => !!this._rtlService?.rtlSignal());

    /** @hidden */
    _rowSelectionHelperTextId = `rowSelectionHelper-${uuidv4()}`;

    /** @hidden */
    readonly _announceEmptyCell = signal(false);

    /** @hidden */
    readonly _isTreeRowFirstCell = isTreeRowFirstCell;

    /** @hidden */
    readonly SELECTION_MODE = SelectionMode;

    /** @hidden */
    readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    readonly _tableColumnResizeService = inject(TableColumnResizeService);

    /** @hidden */
    readonly _fdpTableService = inject(TableService);

    /** @hidden */
    readonly _tableRowService = inject(TableRowService);

    /** @hidden */
    readonly _isTreeRow = isTreeRow;

    /** @hidden */
    private readonly _refreshChildRows$ = new Subject<void>();

    /** @hidden */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

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

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
    }

    /** @hidden */
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
    _toggleGroupRow(): void {
        this._tableRowService.toggleRow({ type: 'toggleRow', row: this.row });
    }

    /** @hidden */
    _toggleSingleSelectableRow(event?: Event): void {
        event?.preventDefault();
        this._tableRowService.toggleRow({ type: 'toggleSingleSelectableRow', row: this.row });
    }

    /** @hidden */
    _toggleMultiSelectRow(row: TableRow<T>, event?: Event): void {
        event?.preventDefault();
        this._tableRowService.toggleRow({ ...{ row, event }, ...{ type: 'toggleMultiSelectRow' } });
    }

    /** @hidden */
    _columnTrackBy(index: number, column: TableColumn): string {
        return column.name;
    }

    /** @hidden */
    _itemFocusedEventAnnouncer = (position: FocusableItemPosition): string => {
        let retVal = `Column ${position.colIndex + 1} of ${position.totalCols}, `;
        let column;
        if (this._fdpTableService?.visibleColumns$) {
            let colIndex = position.colIndex;
            if (this.selectionMode === 'single' || this.selectionMode === 'multiple') {
                colIndex--;
            }
            column = this._fdpTableService.visibleColumns$()[colIndex];
        }
        if (column && (column._freezed || column._endFreezed)) {
            retVal = retVal + 'fixed, ';
        }
        retVal = retVal + `row: ${position.rowIndex + 1} of ${position.totalRows}`;
        if (this._isTreeRow(this.row) || this.row.level > 0) {
            retVal = retVal + ', level ' + (this.row.level + 1);
        }
        return retVal;
    };

    /** @hidden */
    _handleCellFocused(
        event: FocusableItemPosition,
        index: number,
        row: TableRow<T>,
        column: TableColumn,
        tableTextContainer: HTMLElement
    ): void {
        this._setAnnounceEmptyCell(row, column, tableTextContainer);
        this._tableRowService.cellFocused(event);
        this._tableRowService.cellActivate(index, row);
    }

    /** @hidden */
    protected _handleCellSpaceKey(colIdx: number, tableCellElement: HTMLTableCellElement, $event: Event): void {
        if ($event.target === tableCellElement && isTreeRowFirstCell(colIdx, this.row, $event)) {
            $event.preventDefault();
            this._toggleGroupRow();
        }
    }

    /** @hidden */
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
    private _setAnnounceEmptyCell(row: TableRow<T>, column: TableColumn, tableTextContainer: HTMLElement): void {
        if (row.state !== 'readonly') {
            this._announceEmptyCell.set(false);
            return;
        }

        let value: string;
        // For non-column templates (data-driven), always check for empty content.
        const isCellEmptyInNonColumnTemplate =
            !column.columnCellTemplate &&
            (!(value = get(row.value, column.key)) || (typeof value === 'string' && value.trim() === ''));

        // For column templates (consumer-provided), check text content by default.
        // Otherwise, determined by consumer by disabling default checking.
        const isCellEmptyInColumnTemplate =
            column.columnCellTemplate && column.announceEmptyCell() && tableTextContainer?.innerText?.trim() === '';

        this._announceEmptyCell.set(isCellEmptyInColumnTemplate || isCellEmptyInNonColumnTemplate);
    }
}
