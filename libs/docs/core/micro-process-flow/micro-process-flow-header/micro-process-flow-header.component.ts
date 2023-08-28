import { Component } from '@angular/core';
import { DocPageComponent, HeaderComponent, HeaderTabsComponent, ImportComponent } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-micro-process-flow-header',
    templateUrl: './micro-process-flow-header.component.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, ImportComponent, HeaderTabsComponent]
})
export class MicroProcessFlowHeaderComponent {}
