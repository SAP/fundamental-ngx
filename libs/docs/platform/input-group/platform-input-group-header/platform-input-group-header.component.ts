import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-input-group-header',
    templateUrl: './platform-input-group-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent,
        MessageStripComponent,
        RouterLink
    ]
})
export class PlatformInputGroupHeaderComponent {}
