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
    selector: 'app-time-header',
    templateUrl: './time-header.component.html',
    styleUrls: ['./time-header.component.scss'],
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        DatetimeImportantComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class TimeHeaderComponent {}
