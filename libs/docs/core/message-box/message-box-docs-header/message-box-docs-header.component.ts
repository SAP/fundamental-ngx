import { Component } from '@angular/core';
import { TitleComponent } from '@fundamental-ngx/core/title';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-message-box-docs-header',
    templateUrl: './message-box-docs-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        ImportComponent,
        DescriptionComponent,
        TitleComponent,
        HeaderTabsComponent
    ]
})
export class MessageBoxDocsHeaderComponent {}
