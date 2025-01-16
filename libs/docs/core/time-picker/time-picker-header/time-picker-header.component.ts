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
    selector: 'app-time-picker-header',
    templateUrl: './time-picker-header.component.html',
    styleUrls: ['./time-picker-header.component.scss'],
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
