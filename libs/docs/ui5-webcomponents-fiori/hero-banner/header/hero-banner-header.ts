import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-hero-banner-header',
    templateUrl: './hero-banner-header.html',
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class HeroBannerHeader {
    componentName = 'Hero Banner';
    packageName = '@ui5/webcomponents-fiori';
}
