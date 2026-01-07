import { Component, signal } from '@angular/core';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';

// Import Fundamental Styles
import 'fundamental-styles/dist/paddings.css';

// Import the icons used in this example
import '@ui5/webcomponents-icons-tnt/dist/actor.js';
import '@ui5/webcomponents-icons-tnt/dist/aggregator.js';
import '@ui5/webcomponents-icons-tnt/dist/association.js';
import '@ui5/webcomponents-icons-tnt/dist/network.js';
import '@ui5/webcomponents-icons-tnt/dist/repeater.js';

@Component({
    selector: 'ui5-icon-tnt-example',
    templateUrl: './tnt-icons.html',
    standalone: true,
    imports: [Icon]
})
export class IconTntExample {
    readonly tntIcons = signal([
        { name: 'tnt/actor', label: 'employee' },
        { name: 'tnt/aggregator', label: 'Add' },
        { name: 'tnt/association', label: 'Delete' },
        { name: 'tnt/network', label: 'Edit' },
        { name: 'tnt/repeater', label: 'Save' }
    ]);
}
