import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { Panel } from '@fundamental-ngx/ui5-webcomponents/panel';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

@Component({
    selector: 'ui5-custom-header-panel-sample',
    templateUrl: './custom-header.html',
    styles: `
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }
    `,
    standalone: true,
    imports: [Panel, Button, Title, ListItemStandard]
})
export class CustomHeaderPanelExample {
    readonly userInfo = signal<string[]>([
        'Name: John Doe',
        'Email: john.doe@example.com',
        'Department: Engineering',
        'Role: Senior Developer'
    ]);
}
