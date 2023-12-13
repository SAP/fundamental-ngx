import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
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
    standalone: true,
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
        AsyncPipe,
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

    /** The column `name` to freeze columns after and including. */
    @Input()
    freezeEndColumnsTo: string;

    /** @ignore */
    @Input()
    disableSelectionCheckbox = false;

    /** @ignore */
    @ViewChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE)
    private set _focusableCellItems(items: QueryList<FocusableItemDirective>) {
        this.setItems(items);
    }

    /** @ignore */
    _rtl = false;

    /** @ignore */
    readonly SELECTION_MODE = SelectionMode;

    /** @ignore */
    readonly SORT_DIRECTION = SortDirection;

    /** @ignore */
    readonly _tableColumnResizeService = inject(TableColumnResizeService);

    /** @ignore */
    readonly _fdpTableService = inject(TableService);

    /** @ignore */
    readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @ignore */
    readonly _tableRowService = inject(TableRowService);

    /** @ignore */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @ignore */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @ignore */
    constructor() {
        super();
        this._rtlService?.rtl.pipe(takeUntilDestroyed()).subscribe((isRtl) => {
            this._rtl = isRtl;
        });
    }

    /** @ignore */
    ngOnInit(): void {
        super.ngOnInit();
        this._tableColumnResizeService.markForCheck.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._cdr.detectChanges();
        });
    }

    /** @ignore */
    _columnTrackBy(index: number, column: TableColumn): string {
        return column.name;
    }
}

/** @ignore */
@Pipe({
    name: 'isColumnHasHeaderMenu',
    standalone: true
})
export class IsColumnHasHeaderMenuPipe implements PipeTransform {
    /** @ignore */
    private readonly _fdpTableService = inject(TableService);

    /** @ignore */
    transform(column: TableColumn): boolean {
        return (
            column.sortable ||
            column.groupable ||
            column.freezable ||
            column.endFreezable ||
            (column.filterable && !this._fdpTableService._isFilteringFromHeaderDisabled$.value)
        );
    }
}
