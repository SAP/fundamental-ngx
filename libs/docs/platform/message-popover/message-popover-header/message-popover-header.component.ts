import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-message-popover-header',
    templateUrl: './message-popover-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        LinkComponent,
        RouterLink,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class MessagePopoverHeaderComponent {}
