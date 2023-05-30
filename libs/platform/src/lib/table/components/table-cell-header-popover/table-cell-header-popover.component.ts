import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { DestroyedService, Nullable, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { PopoverComponent, TriggerConfig } from '@fundamental-ngx/core/popover';
import { BehaviorSubject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { TableColumn } from '../table-column/table-column';
import { SortDirection } from '../../enums';

@Component({
    selector: 'fdp-table-cell-header-popover',
    templateUrl: './table-cell-header-popover.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyedService]
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

    /** Applied sorting. */
    @Output()
    columnHeaderSortBy = new EventEmitter<{ key: TableColumn['key']; direction: SortDirection }>();

    /** Applied grouping. */
    @Output()
    columnHeaderGroupBy = new EventEmitter<TableColumn['key']>();

    /** Applied filtering. */
    @Output()
    columnHeaderFilterBy = new EventEmitter<{ key: TableColumn['key']; value: any }>();

    /** Column freezing. */
    @Output()
    freezeToColumn = new EventEmitter<{ name: TableColumn['name']; endFreezable: TableColumn['endFreezable'] }>();

    /** Column unfreezing. */
    @Output()
    unFreeze = new EventEmitter<{ name: TableColumn['name']; endFreezable: TableColumn['endFreezable'] }>();

    /** @hidden */
    @ViewChild(PopoverComponent, { static: false })
    popover: Nullable<PopoverComponent>;

    /** @hidden */
    @ViewChildren(TemplateDirective)
    _popoverItems: QueryList<TemplateDirective>;

    /** @hidden */
    _popoverItems$ = new BehaviorSubject<TemplateRef<any>[]>([]);

    /** @hidden */
    protected readonly SORT_DIRECTION = SortDirection;

    /** @hidden */
    private readonly _destroy$ = inject(DestroyedService);

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
    ngAfterViewInit(): void {
        this._popoverItems.changes.pipe(startWith(null), takeUntil(this._destroy$)).subscribe((items) => {
            this._popoverItems$.next(this._popoverItems.map((t) => t.templateRef));
        });
    }
}
