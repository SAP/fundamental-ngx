import { Directive } from '@angular/core';
import { DataSourceDirective, FD_DATA_SOURCE_TRANSFORMER } from '@fundamental-ngx/cdk/data-source';
import {
    FdbNavigationDataSource,
    NavigationDataSourceItem,
    NavigationDataSourceParser
} from '../models/navigation-data-source-item.model';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdb-navigation[dataSource]',
    standalone: true,
    providers: [
        {
            provide: FD_DATA_SOURCE_TRANSFORMER,
            useClass: NavigationDataSourceParser
        }
    ]
})
export class NavigationListDataSourceDirective<T extends Record<string, any>> extends DataSourceDirective<
    NavigationDataSourceItem<T>,
    FdbNavigationDataSource<NavigationDataSourceItem<T>>
> {}
