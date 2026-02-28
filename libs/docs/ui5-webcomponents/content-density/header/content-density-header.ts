import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-content-density-header',
    templateUrl: './content-density-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, HeaderTabsComponent]
})
export class ContentDensityHeader {
    componentName = 'Content Density';
}
