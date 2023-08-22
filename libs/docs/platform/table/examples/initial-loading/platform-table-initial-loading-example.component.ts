import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { TableDataSource, TableDataProvider, TableState } from '@fundamental-ngx/platform/table';
import { TableInitialStateDirective } from '@fundamental-ngx/platform/table-helpers';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { TableHeaderResizerDirective } from '@fundamental-ngx/platform/table-helpers';
import { TableDataSourceDirective } from '@fundamental-ngx/platform/table-helpers';

@Component({
    selector: 'fdp-platform-table-initial-loading-example',
    templateUrl: './platform-table-initial-loading-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [TableDataSourceDirective, TableHeaderResizerDirective, PlatformTableModule, TableInitialStateDirective]
})
export class PlatformTableInitialLoadingExampleComponent {
    source: TableDataSource<any>;

    constructor() {
        this.source = new TableDataSource(new TableDataProviderExample());
    }
}

/**
 * Table Data Provider Example
 *
 */
export class TableDataProviderExample extends TableDataProvider<any> {
    fetch(tableState?: TableState): Observable<any[]> {
        return new Observable();
    }
}
