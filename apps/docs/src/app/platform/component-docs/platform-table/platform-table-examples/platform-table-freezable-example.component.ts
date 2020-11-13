import { Component } from '@angular/core';

import { TableDataSource } from '@fundamental-ngx/platform';
import { TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-freezable-example',
    templateUrl: './platform-table-freezable-example.component.html'
})
export class PlatformTableFreezableExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());

    onColumnFreezeChange(event): void {
        console.log(event);
    }
}
