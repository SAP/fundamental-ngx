import { Component } from '@angular/core';
import { DocPageComponent, HeaderComponent, HeaderTabsComponent, ImportComponent } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-input-header',
    templateUrl: './input-header.component.html',
    imports: [DocPageComponent, HeaderComponent, ImportComponent, HeaderTabsComponent]
})
export class InputHeaderComponent {}
