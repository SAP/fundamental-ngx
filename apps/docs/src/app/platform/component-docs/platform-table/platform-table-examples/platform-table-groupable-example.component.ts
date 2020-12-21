import { Component } from '@angular/core';

import {
    TableDataSource,
    TableGroupChangeEvent,
    TableRowSelectionChangeEvent
} from '@fundamental-ngx/platform';
import { TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-groupable-example',
    templateUrl: './platform-table-groupable-example.component.html'
})
export class PlatformTableGroupableExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());

    logSelectionChange(event: TableRowSelectionChangeEvent<any>): void {
        console.log('TableRowSelectionChangeEvent -> ', event);
    }

    logGroupChange(event: TableGroupChangeEvent): void {
        console.log('TableGroupChangeEvent -> ', event);
    }
}
