import { Component } from '@angular/core';

import { TableDataSource } from '@fundamental-ngx/platform';

import { TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-p13-example',
    templateUrl: './platform-table-p13-example.component.html'
})
export class PlatformTableP13ExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());
}
