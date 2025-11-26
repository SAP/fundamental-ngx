import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    selector: 'app-side-navigation-header',
    templateUrl: './side-navigation-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent,
        MessageStripComponent,
        LinkComponent
    ]
})
export class SideNavigationHeaderComponent {}
