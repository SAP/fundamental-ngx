import { Component, signal } from '@angular/core';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { Panel } from '@fundamental-ngx/ui5-webcomponents/panel';

@Component({
    selector: 'ui5-basic-panel-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Panel, ListItemStandard]
})
export class BasicPanelExample {
    readonly userInfo = signal<string[]>([
        'Name: John Doe',
        'Email: john.doe@example.com',
        'Department: Engineering',
        'Role: Senior Developer'
    ]);
}
