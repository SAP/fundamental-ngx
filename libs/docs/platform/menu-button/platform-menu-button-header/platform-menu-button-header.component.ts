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
    selector: 'app-menu-button-header',
    templateUrl: './platform-menu-button-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        RouterLink,
        ImportComponent,
        HeaderTabsComponent,
        LinkComponent,
        MessageStripComponent
    ]
})
export class PlatformMenuButtonHeaderComponent {}
