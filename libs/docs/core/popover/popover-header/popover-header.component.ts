import { Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-popover-header',
    templateUrl: './popover-header.component.html',
    styleUrls: ['./popover-header.component.scss'],
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        MessageStripComponent,
        ImportComponent,
        HeaderTabsComponent,
        IconComponent
    ]
})
export class PopoverHeaderComponent {}
