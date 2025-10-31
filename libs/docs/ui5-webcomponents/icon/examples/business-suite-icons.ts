import { Component, signal } from '@angular/core';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

// Import Fundamental Styles
import 'fundamental-styles/dist/paddings.css';

// Import the icons used in this example
import '@ui5/webcomponents-icons-business-suite/dist/2x1-grid-layout.js';
import '@ui5/webcomponents-icons-business-suite/dist/3d.js';
import '@ui5/webcomponents-icons-business-suite/dist/ab-testing.js';
import '@ui5/webcomponents-icons-business-suite/dist/activate.js';
import '@ui5/webcomponents-icons-business-suite/dist/add-polygon.js';

@Component({
    selector: 'ui5-icon-business-suite-example',
    templateUrl: './business-suite-icons.html',
    standalone: true,
    imports: [Icon, Label]
})
export class IconBusinessSuiteExample {
    readonly businessSuiteIcons = signal([
        { name: 'business-suite/add-polygon', label: 'Add Polygon' },
        { name: 'business-suite/2x1-grid-layout', label: '2x1 Grid Layout' },
        { name: 'business-suite/activate', label: 'Activate' },
        { name: 'business-suite/3d', label: '3D' },
        { name: 'business-suite/ab-testing', label: 'A/B Testing' }
    ]);
}
