import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {
    FilterableColumnDataType,
    FilterType,
    TableDataProvider,
    TableDataSource,
    TableState
} from '@fundamental-ngx/platform/table';
import { Observable } from 'rxjs';
import { TableInitialStateDirective } from '@fundamental-ngx/platform/table-helpers';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { TableHeaderResizerDirective } from '@fundamental-ngx/platform/table-helpers';
import { TableDataSourceDirective } from '@fundamental-ngx/platform/table-helpers';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformSmartFilterBarModule } from '@fundamental-ngx/platform/smart-filter-bar';

@Component({
    selector: 'fdp-platform-smart-filter-bar-loading-example',
    templateUrl: './platform-smart-filter-bar-loading-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PlatformSmartFilterBarModule,
        ContentDensityDirective,
        TitleComponent,
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective
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
