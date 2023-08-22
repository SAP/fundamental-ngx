import { Component } from '@angular/core';
import { HeaderTabsComponent } from '../../../shared/src/lib/core-helpers/header-tabs/header-tabs.component';
import { ImportComponent } from '../../../shared/src/lib/core-helpers/import/import.component';
import { DatetimeImportantComponent } from '../../../shared/src/lib/common-components/datetime-important/datetime-important.component';
import { DescriptionComponent } from '../../../shared/src/lib/core-helpers/description/description';
import { HeaderComponent } from '../../../shared/src/lib/core-helpers/header/header.component';
import { DocPageComponent } from '../../../shared/src/lib/core-helpers/doc-page/doc-page.component';

@Component({
    selector: 'app-time-picker-header',
    templateUrl: './time-picker-header.component.html',
    styleUrls: ['./time-picker-header.component.scss'],
    standalone: true,
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        DatetimeImportantComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class TimePickerHeaderComponent {}
