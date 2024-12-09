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
    selector: 'app-action-bar-header',
    templateUrl: './action-bar-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        MessageStripComponent,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class ActionBarHeaderComponent {}
