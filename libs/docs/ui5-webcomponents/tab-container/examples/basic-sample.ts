import { Component } from '@angular/core';
import { Tab } from '@fundamental-ngx/ui5-webcomponents/tab';
import { TabContainer } from '@fundamental-ngx/ui5-webcomponents/tab-container';
import { TabSeparator } from '@fundamental-ngx/ui5-webcomponents/tab-separator';

@Component({
    selector: 'ui5-doc-tab-container-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [TabContainer, Tab, TabSeparator]
})
export class BasicSample {}
