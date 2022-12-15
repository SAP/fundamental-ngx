import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {
    FilterableColumnDataType,
    FilterType,
    TableDataProvider,
    TableDataSource,
    TableState
} from '@fundamental-ngx/platform/table';
import { Observable } from 'rxjs';

@Component({
    selector: 'fdp-platform-smart-filter-bar-loading-example',
    templateUrl: './platform-smart-filter-bar-loading-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformSmartFilterBarLoadingExampleComponent {
    readonly dataTypeEnum = FilterableColumnDataType;
    readonly filterTypeEnum = FilterType;

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
