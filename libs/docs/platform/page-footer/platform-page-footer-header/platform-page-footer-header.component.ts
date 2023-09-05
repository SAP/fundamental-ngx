import { Component } from '@angular/core';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
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
    standalone: true,
    imports: [
        DocPageComponent,
        HeaderComponent,
        MessageStripComponent,
        InfoLabelModule,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class PlatformPageFooterHeaderComponent {}
