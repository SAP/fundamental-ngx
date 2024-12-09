import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-icon-header',
    templateUrl: './icon-header.component.html',
    styleUrls: ['./icon-header.component.scss'],
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class IconHeaderComponent {
    customTabs = [
        {
            title: 'Search',
            link: '/core/icon/search'
        }
    ];
}
