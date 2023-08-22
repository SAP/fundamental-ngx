import { Component } from '@angular/core';
import { HeaderTabsComponent } from '../../../shared/src/lib/core-helpers/header-tabs/header-tabs.component';
import { DescriptionComponent } from '../../../shared/src/lib/core-helpers/description/description';
import { ImportComponent } from '../../../shared/src/lib/core-helpers/import/import.component';
import { HeaderComponent } from '../../../shared/src/lib/core-helpers/header/header.component';
import { DocPageComponent } from '../../../shared/src/lib/core-helpers/doc-page/doc-page.component';

@Component({
    selector: 'app-notification-docs-header',
    templateUrl: './notification-docs-header.component.html',
    styleUrls: ['./notification-docs-header.component.scss'],
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, ImportComponent, DescriptionComponent, HeaderTabsComponent]
})
export class NotificationDocsHeaderComponent {}
