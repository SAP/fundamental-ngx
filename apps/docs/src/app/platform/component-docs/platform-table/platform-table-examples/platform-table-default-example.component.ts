import { Component } from '@angular/core';

import { ITEMS } from '../platform-table-docs.component';
import { TableSortChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-table-default-example',
    templateUrl: './platform-table-default-example.component.html'
})
export class PlatformTableDefaultExampleComponent {
    source: any[] = ITEMS;

    logSortChange(event: TableSortChangeEvent): void {
        console.log('TableSortChangeEvent -> ', event);
    }
}
