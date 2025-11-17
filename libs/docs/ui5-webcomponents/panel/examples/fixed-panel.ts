import { Component } from '@angular/core';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { Panel } from '@fundamental-ngx/ui5-webcomponents/panel';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-fixed-panel-sample',
    templateUrl: './fixed-panel.html',
    standalone: true,
    imports: [Panel, Text, List, ListItemStandard, Tag]
})
export class FixedPanelExample {
    readonly importantInfo = [
        {
            label: 'CPU Usage:',
            value: 'Normal',
            colorScheme: '8'
        },
        {
            label: 'Memory:',
            value: 'High',
            colorScheme: '3'
        },
        {
            label: 'Disk Space:',
            value: 'Normal',
            colorScheme: '8'
        },
        {
            label: 'Network:',
            value: 'Connected',
            colorScheme: '8'
        }
    ];
}
