import { Component } from '@angular/core';
import { HeaderTabsComponent } from '../../../shared/src/lib/core-helpers/header-tabs/header-tabs.component';
import { ImportComponent } from '../../../shared/src/lib/core-helpers/import/import.component';
import { DescriptionComponent } from '../../../shared/src/lib/core-helpers/description/description';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { HeaderComponent } from '../../../shared/src/lib/core-helpers/header/header.component';
import { DocPageComponent } from '../../../shared/src/lib/core-helpers/doc-page/doc-page.component';

@Component({
    selector: 'fd-platform-page-footer-header',
    templateUrl: './platform-page-footer-header.component.html',
    standalone: true,
    imports: [
        DocPageComponent,
        HeaderComponent,
        MessageStripComponent,
        InfoLabelModule,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class PlatformPageFooterHeaderComponent {}
