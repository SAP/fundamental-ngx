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
    selector: 'fdp-slider-header',
    templateUrl: './slider-header.component.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, RouterLink, ImportComponent, HeaderTabsComponent]
})
export class SliderHeaderComponent {}
