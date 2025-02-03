import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-generic-tag-header',
    templateUrl: './generic-tag-header.component.html',
    imports: [DocPageComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class GenericTagHeaderComponent {}
