import { Component } from '@angular/core';
import { HeaderTabsComponent } from '../../../shared/src/lib/core-helpers/header-tabs/header-tabs.component';
import { ImportComponent } from '../../../shared/src/lib/core-helpers/import/import.component';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { DescriptionComponent } from '../../../shared/src/lib/core-helpers/description/description';
import { HeaderComponent } from '../../../shared/src/lib/core-helpers/header/header.component';
import { DocPageComponent } from '../../../shared/src/lib/core-helpers/doc-page/doc-page.component';

@Component({
    selector: 'app-inline-help-header',
    templateUrl: './inline-help-header.component.html',
    styleUrls: ['./inline-help-header.component.scss'],
    standalone: true,
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        MessageStripComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class InlineHelpHeaderComponent {}
