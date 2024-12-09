import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-list-header',
    templateUrl: './list-header.component.html',
    styleUrls: ['./list-header.component.scss'],
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, RouterLink, ImportComponent, HeaderTabsComponent]
})
export class ListHeaderComponent {}
