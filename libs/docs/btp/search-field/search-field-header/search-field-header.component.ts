import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    DescriptionComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    templateUrl: './search-field-header.component.html',
    imports: [HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent, RouterOutlet]
})
export class SearchFieldHeaderComponent {
    constructor() {}
}
