import { Component } from '@angular/core';
import { ButtonWebComponentModule } from '@fundamental-ngx/core/button';
import { FdWebComponentTabsModule } from '@fundamental-ngx/core/tabs';
import { makeAngularWebComponent } from '@fundamental-ngx/core/web-components';

@Component({
    selector: 'app-tabs-header',
    templateUrl: './tabs-header.component.html',
    styleUrls: ['./tabs-header.component.scss']
})
export class TabsHeaderComponent {
    constructor() {
        makeAngularWebComponent(FdWebComponentTabsModule);
        makeAngularWebComponent(ButtonWebComponentModule);
    }
}
