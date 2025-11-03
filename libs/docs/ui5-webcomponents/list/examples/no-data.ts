import { Component, signal } from '@angular/core';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';

@Component({
    selector: 'ui5-list-no-data-example',
    templateUrl: './no-data.html',
    standalone: true,
    imports: [List]
})
export class ListNoDataExample {
    readonly noDataText = signal('No data available');
}
