import { NgClass, NgStyle } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    Pipe,
    PipeTransform,
    QueryList,
    ViewChildren,
    ViewEncapsulation,
    computed,
    forwardRef,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
    DisabledBehaviorDirective,
    FDK_FOCUSABLE_ITEM_DIRECTIVE,
    FDK_FOCUSABLE_LIST_DIRECTIVE,
    FocusableItemDirective,
    RtlService
} from '@fundamental-ngx/cdk/utils';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ContentDensityObserver } from '@fundamental-ngx/core/content-density';
import { PopoverTriggerDirective } from '@fundamental-ngx/core/popover';
import { TableCellDirective, TableRowDirective, TableStatusIndicatorDirective } from '@fundamental-ngx/core/table';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import {
    ColumnResizableSidePipe,
    PlatformTableCellResizableDirective,
    SelectionCellStylesPipe,
    SelectionMode,
    SelectionModeValue,
    SortDirection,
    TableCellStylesPipe,
    TableColumn,
    TableColumnResizeService,
    TableColumnSortingDirectionPipe,
    TableRowService,
    TableService
} from '@fundamental-ngx/platform/table-helpers';
import { TableCellHeaderPopoverComponent } from '../table-cell-header-popover/table-cell-header-popover.component';
import { TableHeaderCellContentComponent } from '../table-header-cell-content/table-header-cell-content.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-table-header-row]',
    templateUrl: './table-header-row.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FDK_FOCUSABLE_LIST_DIRECTIVE,
            useExisting: TableHeaderRowComponent
        }
    ],
    host: {
        role: 'row'
    },
    imports: [
        TableCellDirective,
        TableStatusIndicatorDirective,
        DisabledBehaviorDirective,
        CheckboxComponent,
        FormsModule,
        PlatformTableCellResizableDirective,
        NgClass,
        NgStyle,
        PopoverTriggerDirective,
        TableHeaderCellContentComponent,
        TableCellHeaderPopoverComponent,
        FdTranslatePipe,
        SelectionCellStylesPipe,
        TableCellStylesPipe,
        ColumnResizableSidePipe,
        TableColumnSortingDirectionPipe,
        forwardRef(() => IsColumnHasHeaderMenuPipe)
    ]
})
export class TableHeaderRowComponent extends TableRowDirective implements OnInit {
    /** Table ID. */
    @Input()
    rowId: string;

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

    /** Table without horizontal borders. */
    @Input()
    noHorizontalBorders = false;

    /** Table without vertical borders. */
    @Input()
    noVerticalBorders = false;

    /** Table without borders. */
    @Input()
    noBorders = false;

    /** The column `name` to freeze columns after and including. */
    @Input()
    freezeEndColumnsTo: string;

    /** @hidden */
    @Input()
    disableSelectionCheckbox = false;

    /** @hidden */
    @ViewChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE)
    private set _focusableCellItems(items: QueryList<FocusableItemDirective>) {
        this.setItems(items);
    }

    /** @hidden */
    readonly _rtl$ = computed(() => !!this._rtlService?.rtlSignal());

    /** @hidden */
    readonly SELECTION_MODE = SelectionMode;

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;

    /** @hidden */
    readonly _tableColumnResizeService = inject(TableColumnResizeService);

    /** @hidden */
    readonly _fdpTableService = inject(TableService);

    /** @hidden */
    readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    readonly _tableRowService = inject(TableRowService);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
        this._tableColumnResizeService.markForCheck.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._cdr.detectChanges();
        });
    }

    /** @hidden */
    _columnTrackBy(index: number, column: TableColumn): string {
        return column.name;
    }
}

/** @hidden */
@Pipe({
    name: 'isColumnHasHeaderMenu',
    standalone: true
})
export class IsColumnHasHeaderMenuPipe implements PipeTransform {
    /** @hidden */
    private readonly _fdpTableService = inject(TableService);

    /** @hidden */
    transform(column: TableColumn): boolean {
        return (
            column.sortable ||
            column.groupable ||
            column.freezable ||
            column.endFreezable ||
            (column.filterable && !this._fdpTableService._isFilteringFromHeaderDisabled$())
        );
    }
}
