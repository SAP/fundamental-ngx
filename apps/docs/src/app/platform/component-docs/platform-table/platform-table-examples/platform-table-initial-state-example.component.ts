import { Component } from '@angular/core';

import { TableDataSource } from '@fundamental-ngx/platform';

import { TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-initial-state-example',
    templateUrl: './platform-table-initial-state-example.component.html'
})
export class PlatformTableInitialStateExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());
}
