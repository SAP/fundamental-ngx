import { Component } from '@angular/core';
import { Tab } from '@fundamental-ngx/ui5-webcomponents/tab';
import { TabContainer } from '@fundamental-ngx/ui5-webcomponents/tab-container';
import { TabSeparator } from '@fundamental-ngx/ui5-webcomponents/tab-separator';

// Import icons
import '@ui5/webcomponents-icons/dist/error.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/information.js';
import '@ui5/webcomponents-icons/dist/sys-enter-2.js';
import '@ui5/webcomponents-icons/dist/warning.js';

@Component({
    selector: 'ui5-doc-tab-container-design-sample',
    templateUrl: './design-sample.html',
    standalone: true,
    imports: [TabContainer, Tab, TabSeparator]
})
export class DesignSample {}
