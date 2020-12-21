import { Component } from '@angular/core';

import { TableDataSource } from '@fundamental-ngx/platform';
import { TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-default-example',
    templateUrl: './platform-table-default-example.component.html'
})
export class PlatformTableDefaultExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());

    alert(message: string): void {
        alert(message);
    }
}
