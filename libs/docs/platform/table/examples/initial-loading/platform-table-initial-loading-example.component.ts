import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { PlatformTableModule, TableDataProvider, TableDataSource, TableState } from '@fundamental-ngx/platform/table';
import {
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective
} from '@fundamental-ngx/platform/table-helpers';

@Component({
    selector: 'fdp-platform-table-initial-loading-example',
    templateUrl: './platform-table-initial-loading-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective,
        FdDatetimeModule
    ]
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
