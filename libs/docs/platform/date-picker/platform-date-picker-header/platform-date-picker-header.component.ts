import { Component } from '@angular/core';
import {
    DatetimeImportantComponent,
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';

@Component({
    selector: 'app-date-picker-header',
    templateUrl: './platform-date-picker-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        PlatformLinkModule,
        DatetimeImportantComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class PlatformDatePickerHeaderComponent {}
