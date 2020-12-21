import { Component } from '@angular/core';

import { TableDataSource } from '@fundamental-ngx/platform';
import { TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-multiple-row-selection-example',
    templateUrl: './platform-table-multiple-row-selection-example.component.html'
})
export class PlatformTableMultipleRowSelectionExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());

    onRowSelectionChange(event): void {
        console.log(event);
    }
}
