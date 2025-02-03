import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-platform-info-label-header',
    templateUrl: './platform-info-label-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent,
        MessageStripComponent,
        RouterLink,
        LinkComponent
    ]
})
export class PlatformInfoLabelHeaderComponent {}
