import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { CollectionSort, SortDirection, TableColumn } from '@fundamental-ngx/platform/table-helpers';

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
    ]
})
export class TableHeaderCellContentComponent {
    /** Table Id */
    @Input()
    id: string;

    /** Column reference. */
    @Input()
    column: TableColumn;

    /** Whether column has applied sorting. */
    @Input()
    hasSorting = false;

    /** Whether column has applied filtering. */
    @Input()
    hasFilter = false;

    /** Applied sorting. */
    @Input()
    sorting: Nullable<CollectionSort>;

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;
}
