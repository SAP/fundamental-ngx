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
    selector: 'app-illustrated-message-header',
    templateUrl: './illustrated-message-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent,
        MessageStripComponent
    ]
})
export class IllustratedMessageHeaderComponent {}
