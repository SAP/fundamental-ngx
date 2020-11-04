import { Component } from '@angular/core';

import { ITEMS } from '../platform-table-docs.component';

@Component({
    selector: 'fdp-table-freezable-example',
    templateUrl: './platform-table-freezable-example.component.html'
})
export class PlatformTableFreezableExampleComponent {
    source: any[] = ITEMS;

    onColumnFreezeChange(event): void {
        console.log(event);
    }
}
