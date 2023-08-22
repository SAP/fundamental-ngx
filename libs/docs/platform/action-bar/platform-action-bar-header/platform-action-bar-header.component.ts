import { Component } from '@angular/core';
import { HeaderTabsComponent } from '../../../shared/src/lib/core-helpers/header-tabs/header-tabs.component';
import { ImportComponent } from '../../../shared/src/lib/core-helpers/import/import.component';
import { RouterLink } from '@angular/router';
import { DescriptionComponent } from '../../../shared/src/lib/core-helpers/description/description';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { HeaderComponent } from '../../../shared/src/lib/core-helpers/header/header.component';
import { DocPageComponent } from '../../../shared/src/lib/core-helpers/doc-page/doc-page.component';

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
