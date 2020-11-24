import { Component } from '@angular/core';

import { ITEMS } from '../platform-table-docs.component';

@Component({
    selector: 'fdp-table-multiple-row-selection-example',
    templateUrl: './platform-table-multiple-row-selection-example.component.html'
})
export class PlatformTableMultipleRowSelectionExampleComponent {
    source: any[] = ITEMS;

    onRowSelectionChange(event): void {
        console.log(event);
    }
}
