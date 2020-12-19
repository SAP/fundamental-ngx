import { Component } from '@angular/core';

import { TableDataSource } from '@fundamental-ngx/platform';
import { TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-custom-column-example',
    templateUrl: './platform-table-custom-column-example.component.html'
})
export class PlatformTableCustomColumnExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());

    onRowSelectionChange(event): void {
        console.log(event);
    }
}
