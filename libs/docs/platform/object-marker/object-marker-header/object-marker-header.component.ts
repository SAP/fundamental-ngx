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
    selector: 'fd-object-marker-header',
    templateUrl: './object-marker-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent,
        LinkComponent,
        MessageStripComponent,
        RouterLink
    ]
})
export class ObjectMarkerHeaderComponent {}
