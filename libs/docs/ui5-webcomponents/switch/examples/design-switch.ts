import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-design-switch',
    templateUrl: './design-switch.html',
    standalone: true,
    imports: [Switch, Label]
})
export class DesignSwitchExample {
    readonly designComparisons = signal([
        {
            label: 'Email Notifications',
            textualChecked: true,
            graphicalChecked: false,
            textOn: 'On',
            textOff: 'Off',
            description: 'Enable or disable email notifications'
        },
        {
            label: 'Auto-sync',
            textualChecked: false,
            graphicalChecked: true,
            textOn: 'Auto',
            textOff: 'Manual',
            description: 'Automatic data synchronization'
        }
    ]);
}
