import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Input,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { ListIconDirective, ListLinkDirective, ListTitleDirective } from '@fundamental-ngx/core/list';
import { PopoverComponent, TriggerConfig } from '@fundamental-ngx/core/popover';
import { TablePopoverDirective } from '@fundamental-ngx/core/table';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { FreeContentListItemComponent, ListComponent } from '@fundamental-ngx/platform/list';
import {
    CollectionStringFilter,
    FILTER_STRING_STRATEGY,
    FilterableColumnDataType,
    SortDirection,
    Table,
    TableColumn,
    TableService
} from '@fundamental-ngx/platform/table-helpers';
import { startWith } from 'rxjs/operators';

@Component({
    selector: 'fdp-table-cell-header-popover',
    templateUrl: './table-cell-header-popover.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PopoverComponent,
        TablePopoverDirective,
        ListComponent,
        FreeContentListItemComponent,
        NgTemplateOutlet,
        TemplateDirective,
        ListLinkDirective,
        ListIconDirective,
        ListTitleDirective,
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent,
        AsyncPipe,
        FdTranslatePipe
    ]
})
export class TableCellHeaderPopoverComponent implements AfterViewInit {
    /** Column definition. */
    @Input()
    column: TableColumn;

    /** Custom popover template. */
    @Input()
    popoverTemplate: Nullable<TemplateRef<any>>;

    /** Whether the popover is disabled. */
    @Input()
    disabled = false;

    /** Whether the column is frozen. */
    @Input()
    columnFrozen = false;

    /** Whether the filtering from header is disabled. */
    @Input()
    filteringFromHeaderDisabled: Nullable<boolean> = false;

    /** Column index */
    @Input()
    columnIndex: number;

    /** @hidden */
    @ViewChild(PopoverComponent, { static: false })
    popover: Nullable<PopoverComponent>;

    /** @hidden */
    @ViewChildren(TemplateDirective)
    _popoverItems: QueryList<TemplateDirective>;

    /** @hidden */
    _popoverItems$ = signal<TemplateRef<any>[]>([]);

    /** @hidden */
    _headerPopoverTriggers: TriggerConfig[] = [
        {
            trigger: 'click',
            openAction: true,
            closeAction: true,
            stopPropagation: true
        },
        {
            trigger: 'keydown.enter',
            openAction: true,
            closeAction: true,
            stopPropagation: true
        },
        {
            trigger: 'keydown.space',
            openAction: true,
            closeAction: true,
            stopPropagation: true
        }
    ];

    /** @hidden */
    protected readonly SORT_DIRECTION = SortDirection;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _tableService = inject(TableService);

    /** @hidden */
    private readonly _table = inject(Table);

    /** @hidden */
    ngAfterViewInit(): void {
        this._popoverItems.changes.pipe(startWith(null), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._popoverItems$.set(this._popoverItems.map((t) => t.templateRef));
        });
    }

    /** @hidden */
    _setColumnHeaderSortBy(field: TableColumn['key'], direction: SortDirection): void {
        this._tableService.setSort([{ field, direction }]);
        this.popover?.close();
    }

    /** @hidden */
    _setColumnHeaderGroupBy(field: TableColumn['key']): void {
        const state = this._tableService.getTableState();
        if (state.groupBy?.length === 1 && state.groupBy[0].field === field) {
            // reset grouping, if already grouped by this field
            this._tableService.setGroups([]);
        } else {
            this._tableService.setGroups([{ field, direction: SortDirection.NONE, showAsColumn: true }]);
        }
    }

    /** @hidden */
    _setColumnHeaderFilterBy(field: TableColumn['key'], value: any): void {
        if (!value) {
            this._tableService.removeFilters([field]);
            return;
        }
        const collectionFilter: CollectionStringFilter = {
            field,
            value,
            type: FilterableColumnDataType.STRING,
            strategy: FILTER_STRING_STRATEGY.CONTAINS,
            exclude: false
        };

        this._tableService.addFilters([collectionFilter]);
        this.popover?.close();
    }

    /** @hidden */
    _freeze(): void {
        this._table.freezeToColumn(this.column.name, this.column.endFreezable);
        this.popover?.close();
    }

    /** @hidden */
    _unFreeze(): void {
        this._table.unfreeze(this.column.name, this.column.endFreezable);
        this.popover?.close();
    }
}
