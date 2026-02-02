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
    selector: 'fd-approval-flow-header',
    templateUrl: './platform-approval-flow-header.component.html',
    styleUrls: ['./platform-approval-flow-header.component.scss'],
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
export class PlatformApprovalFlowHeaderComponent {}
