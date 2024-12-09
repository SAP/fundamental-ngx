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
    selector: 'app-button-header',
    templateUrl: './platform-button-header.component.html',
    styleUrls: ['./platform-button-header.component.scss'],
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        RouterLink,
        ImportComponent,
        HeaderTabsComponent,
        MessageStripComponent,
        LinkComponent
    ]
})
export class PlatformButtonHeaderComponent {}
