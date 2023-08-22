import { Component } from '@angular/core';
import { HeaderTabsComponent } from '../../../shared/src/lib/core-helpers/header-tabs/header-tabs.component';
import { ImportComponent } from '../../../shared/src/lib/core-helpers/import/import.component';
import { DatetimeImportantComponent } from '../../../shared/src/lib/common-components/datetime-important/datetime-important.component';
import { RouterLink } from '@angular/router';
import { DescriptionComponent } from '../../../shared/src/lib/core-helpers/description/description';
import { HeaderComponent } from '../../../shared/src/lib/core-helpers/header/header.component';
import { DocPageComponent } from '../../../shared/src/lib/core-helpers/doc-page/doc-page.component';

@Component({
    selector: 'app-datetime-picker-header',
    templateUrl: './platform-datetime-picker-header.component.html',
    standalone: true,
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        RouterLink,
        DatetimeImportantComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class PlatformDatetimePickerHeaderComponent {}
