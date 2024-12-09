import { Component } from '@angular/core';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-content-density-header',
    templateUrl: './content-density-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        MessageStripComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class ContentDensityHeaderComponent {}
