import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { ListComponent, ListItemComponent, ListLinkDirective, ListTitleDirective } from '@fundamental-ngx/core/list';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { Table, TableDataSourceDirective, TableService } from '@fundamental-ngx/platform/table-helpers';

@Component({
    selector: 'fdp-table-growing-button',
    imports: [ListComponent, ListItemComponent, ListTitleDirective, ListLinkDirective, AsyncPipe, FdTranslatePipe],
    templateUrl: './table-growing-button.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableGrowingButtonComponent {
    /** Whether to show items count. */
    @Input()
    showItemsCount = false;

    /** @hidden */
    readonly _tableService = inject(TableService);

    /** @hidden */
    readonly _dataSourceDirective = inject(TableDataSourceDirective);

    /** @hidden */
    readonly _table = inject(Table);

    /** @hidden */
    _loadMore(): void {
        (this._table as any)._onSpyIntersect(true);
    }
}
