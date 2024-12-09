import { AsyncPipe, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { TableIconDirective } from '@fundamental-ngx/core/table';
import { SortDirection, TableColumn, TableService } from '@fundamental-ngx/platform/table-helpers';

@Component({
    selector: 'fdp-table-header-cell-content',
    templateUrl: './table-header-cell-content.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            fdp-table-header-cell-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-grow: 0;
            }
            fdp-table-header-cell-content .fd-table__text--no-wrap {
                width: 100%;
            }
        `
    ],
    imports: [NgTemplateOutlet, IconComponent, TableIconDirective, AsyncPipe, NgStyle]
})
export class TableHeaderCellContentComponent {
    /** Table Id */
    @Input()
    id: string;

    /** Column reference. */
    @Input()
    set column(value: Nullable<TableColumn>) {
        this._column$.set(value);
    }

    get column(): Nullable<TableColumn> {
        return this._column$();
    }

    /** Whether column has applied sorting. */
    readonly hasSorting$ = computed(() => {
        const column = this._column$();
        return column && this._fdpTableService.sortRules$().has(column.key);
    });

    /** Whether column has applied filtering. */
    readonly hasFilter$ = computed(() => {
        const column = this._column$();
        return column && this._fdpTableService.filterRules$().has(column.key);
    });

    /** Applied sorting. */
    readonly sorting$ = computed(() => {
        const column = this._column$();
        return column && this._fdpTableService.sortRules$().get(column.key);
    });

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;

    /** @hidden */
    private readonly _column$ = signal<Nullable<TableColumn>>(null);

    /** @hidden */
    private readonly _fdpTableService = inject(TableService);
}
