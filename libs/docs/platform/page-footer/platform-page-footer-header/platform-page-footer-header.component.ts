import { Component } from '@angular/core';
import { InfoLabelComponent } from '@fundamental-ngx/core/info-label';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-platform-page-footer-header',
    templateUrl: './platform-page-footer-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        MessageStripComponent,
        InfoLabelComponent,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class PlatformPageFooterHeaderComponent {}
