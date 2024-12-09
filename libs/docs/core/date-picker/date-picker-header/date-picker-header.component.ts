import { Component } from '@angular/core';
import {
    DatetimeImportantComponent,
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-date-picker-header',
    templateUrl: './date-picker-header.component.html',
    styleUrls: ['./date-picker-header.component.scss'],
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        DatetimeImportantComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class DatePickerHeaderComponent {}
