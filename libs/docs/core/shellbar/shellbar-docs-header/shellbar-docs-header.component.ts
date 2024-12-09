import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-shellbar-docs-header',
    templateUrl: './shellbar-docs-header.component.html',
    styleUrls: ['./shellbar-docs-header.component.scss'],
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class ShellbarDocsHeaderComponent {}
