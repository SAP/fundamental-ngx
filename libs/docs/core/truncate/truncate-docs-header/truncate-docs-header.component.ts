import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    DescriptionComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-truncate-header',
    templateUrl: './truncate-docs-header.component.html',
    imports: [HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent, RouterOutlet]
})
export class TruncateDocsHeaderComponent {}
