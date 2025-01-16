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
    selector: 'app-datetime-picker-header',
    templateUrl: './datetime-picker-header.component.html',
    styleUrls: ['./datetime-picker-header.component.scss'],
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        DatetimeImportantComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class DatetimePickerHeaderComponent {}
