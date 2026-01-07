import { Component } from '@angular/core';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-basic-switch-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Switch]
})
export class BasicSwitchExample {}
