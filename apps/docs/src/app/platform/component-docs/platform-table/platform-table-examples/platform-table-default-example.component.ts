import { Component } from '@angular/core';

import { ITEMS } from '../platform-table-docs.component';

@Component({
    selector: 'fdp-table-default-example',
    templateUrl: './platform-table-default-example.component.html'
})
export class PlatformTableDefaultExampleComponent {
    source: any[] = ITEMS;
}
