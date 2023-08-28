import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    selector: 'app-action-bar-header',
    templateUrl: './platform-action-bar-header.component.html',
    styleUrls: ['./platform-action-bar-header.component.scss'],
    standalone: true,
    imports: [
        DocPageComponent,
        HeaderComponent,
        MessageStripComponent,
        InfoLabelModule,
        DescriptionComponent,
        RouterLink,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class PlatformActionBarHeaderComponent {}
