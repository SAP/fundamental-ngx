import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { PlatformSmartFilterBarModule } from '@fundamental-ngx/platform/smart-filter-bar';
import {
    FilterType,
    FilterableColumnDataType,
    PlatformTableModule,
    TableDataProvider,
    TableDataSource,
    TableState
} from '@fundamental-ngx/platform/table';
import {
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective
} from '@fundamental-ngx/platform/table-helpers';
import { Observable } from 'rxjs';

@Component({
    selector: 'fdp-platform-smart-filter-bar-loading-example',
    templateUrl: './platform-smart-filter-bar-loading-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        PlatformSmartFilterBarModule,
        ContentDensityDirective,
        TitleComponent,
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective,
        FdDatetimeModule
    ]
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
