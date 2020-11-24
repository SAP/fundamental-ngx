import { Component } from '@angular/core';

import { ITEMS } from '../platform-table-docs.component';

@Component({
    selector: 'fdp-table-single-row-selection-example',
    templateUrl: './platform-table-single-row-selection-example.component.html'
})
export class PlatformTableSingleRowSelectionExampleComponent {
    source: any[] = ITEMS;

    onRowSelectionChange(event): void {
        console.log(event);
    }
}
