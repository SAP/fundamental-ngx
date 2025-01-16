import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-rtl-service-header',
    templateUrl: './rtl-service-header.component.html',
    imports: [
        HeaderComponent,
        DocPageComponent,
        RouterOutlet,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class RtlServiceHeaderComponent {}
