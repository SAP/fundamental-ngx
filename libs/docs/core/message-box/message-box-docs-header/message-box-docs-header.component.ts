import { Component } from '@angular/core';
import { HeaderTabsComponent } from '../../../shared/src/lib/core-helpers/header-tabs/header-tabs.component';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DescriptionComponent } from '../../../shared/src/lib/core-helpers/description/description';
import { ImportComponent } from '../../../shared/src/lib/core-helpers/import/import.component';
import { HeaderComponent } from '../../../shared/src/lib/core-helpers/header/header.component';
import { DocPageComponent } from '../../../shared/src/lib/core-helpers/doc-page/doc-page.component';

@Component({
    selector: 'app-message-box-docs-header',
    templateUrl: './message-box-docs-header.component.html',
    standalone: true,
    imports: [
        DocPageComponent,
        HeaderComponent,
        ImportComponent,
        DescriptionComponent,
        TitleComponent,
        HeaderTabsComponent
    ]
})
export class MessageBoxDocsHeaderComponent {}
