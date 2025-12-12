import { Component } from '@angular/core';
import {
    IconTabBarComponent,
    IconTabBarContentTemplateDirective,
    TabConfig
} from '@fundamental-ngx/platform/icon-tab-bar';

@Component({
    selector: 'fdp-platform-icon-tab-bar-template-content-example',
    templateUrl: './platform-icon-tab-bar-template-content-example.component.html',
    imports: [IconTabBarComponent, IconTabBarContentTemplateDirective]
})
export class PlatformIconTabBarTemplateContentExampleComponent {
    items: TabConfig[] = [
        {
            label: 'Products',
            counter: 15,
            color: 'critical',
            contentTemplateId: 'products-template'
        },
        {
            label: 'Suppliers',
            counter: 8,
            contentTemplateId: 'suppliers-template'
        },
        {
            label: 'Orders',
            counter: 23,
            color: 'positive',
            contentTemplateId: 'orders-template'
        }
    ];
}
